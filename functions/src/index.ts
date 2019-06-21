import * as functions from 'firebase-functions';
import fetch from 'node-fetch'

import parser from './utils/parser';

const KTB_ENDPOINT = 'https://www.exch.ktb.co.th/exchangerate/pages/travelCardRate';

export const rates = functions.https.onRequest(async (request, response) => {
  const raw = await fetch(KTB_ENDPOINT).then(res => res.text());
  response.send(parser(raw));
});
