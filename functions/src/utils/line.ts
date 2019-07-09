import fetch from 'node-fetch';

const LINE_ACCESS_TOKEN = 'i2JGNSbwsb7aSs7IStxChAv77IVXqeeZ/ijJpfsUgcAY9BNXmC1qEdlHgRctnkz+ypfal5ZpnJ1OT/WDVpcdg0T1KQ7+L+dNVV1yh9tulfdPPkDz9TGuUlp0cT3aQivupHa3ttOazg3SStuoH+9AdAdB04t89/1O/w1cDnyilFU=';

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';

const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
};

const fetchWrapper = (endpoint, options?) => fetch(`${LINE_MESSAGING_API}${endpoint}`, {
  headers: LINE_HEADER,
  ...options,
});

export default fetchWrapper;
