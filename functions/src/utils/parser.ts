import * as cheerio from 'cheerio';

function chunk(arr: any[], chunkSize = 1, cache = []) {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

export default function parser(responseString?: string): ExchangeRate[] {
  if (!responseString) throw new Error('Missing params: Response String is required');
  const $ = cheerio.load(responseString);
  const str = $('tbody').text();
  const filteredDirty = str
    .split('\n')
    .map(s => s.trim())
    .filter(s => s !== '');
  const chunked = chunk(filteredDirty, 3);
  return chunked
    .map(row => {
      const [currency, buying, selling] = row;
      if (['USD', 'EUR', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'GBP', 'HKD', 'NZD', 'SGD'].indexOf(currency) === -1) {
        return null;
      }
      return {
        currency,
        buying: Number(buying),
        selling: Number(selling),
      } as ExchangeRate
    })
    .filter(row => row !== null)
}
