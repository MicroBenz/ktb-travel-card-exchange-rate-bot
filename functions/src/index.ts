import * as functions from 'firebase-functions';
import fetch from 'node-fetch'

import parser from './utils/parser';
import line from './utils/line';

const KTB_ENDPOINT = 'https://www.exch.ktb.co.th/exchangerate/pages/travelCardRate';

async function getTravelCardRate() {
  try {
    const raw = await fetch(KTB_ENDPOINT).then(res => res.text());
    return parser(raw);
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const rates = functions.https.onRequest(async (req, res) => {
  const raw = await getTravelCardRate();
  return res.send(raw);
});

/*
{
  "events": [
    {
      "type": "message",
      "replyToken": "b669db6edb5e48dbb5961ab8...",
      "source": {
        "userId": "U3c28a70ed7c5e7ce2c9a7597...",
        "type": "user"
      },
      "timestamp": 1531072356142,
      "message": {
        "type": "text",
        "id": "82347...",
        "text": "ทดสอบ"
      }
    }
  ]
}
*/

interface BotIncomingMessageEvent {
  type: 'message' | 'follow' | 'unfollow' | 'join' | 'leave' | 'memberJoined' | 'memberLeft' | 'postback' | 'beacon' | 'accountLink' | 'things',
  replyToken: string,
  message: BotMessage,
  source: {
    userId: string,
    type: 'user'
  }
}

interface BotMessage {
  type: 'text'
  id: string
  text: string
}

async function reply(replyToken: string, text: string) {
  return line('/reply', {
    method: 'POST',
    body: JSON.stringify({
      replyToken,
      messages: [
        {
          type: 'text',
          text
        }
      ]
    })
  })
}

async function broadcast(text: string) {
  return line('/broadcast', {
    method: 'POST',
    body: JSON.stringify({
      messages: [
        {
          type: 'text',
          text
        }
      ]
    })
  })
}

export const LineBot = functions.https.onRequest(async (req, res) => {
  try {
    if (req.body.events[0].message.type !== 'text') {
      return res.send('not support');
    }
    const { replyToken, message }: BotIncomingMessageEvent = req.body.events[0];
    const { text } = message;
    if (!text.includes('ask')) {
      await reply(replyToken, `Please 'ask'`);
      return res.send({ status: 'success' });
    }
    const [useless, currencyWithSpace] = text.split('ask');
    const currency = currencyWithSpace.trim();
    const rates = await getTravelCardRate();
    const selectedRate = rates.find(r => r.currency.toLowerCase() === currency);
    console.log({ selectedRate, rates });
    if (selectedRate) {
      await reply(replyToken, `Rate for ${currency}: Selling = ${selectedRate.selling} / Buying: ${selectedRate.buying}`);
    } else {
      await reply(
        replyToken,
        `Today rate are\n${rates.map(rate => `${rate.currency} -> Selling = ${rate.selling} / Buying: ${rate.buying}`).join('\n')}`
      );
    }
    return res.send({ status: 'success' });
  } catch (e) {
    console.error(e);
    return res.send({ status: 'I pretend to success' });
  }
});

export const LineBroadcast = functions.https.onRequest(async (req, res) => {
  try {
    const rates = await getTravelCardRate();
    const str = `Today rate are\n${rates.map(rate => `${rate.currency} -> Selling = ${rate.selling} / Buying: ${rate.buying}`).join('\n')}`;
    await broadcast(str);
    return res.send({ status: 'success' });
  } catch (e) {
    console.error(e);
    return res.send({ status: 'I pretend to success' });
  }
});

export const scheduledFunction = functions
  .pubsub.schedule("* * * * *")
  .timeZone('Asia/Bangkok')
  .onRun((context) => {
    console.info("This will be run every minute!");
    broadcast('Hi');
});
