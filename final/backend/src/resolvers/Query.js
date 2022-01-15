
const axios = require('axios');

let resolution_dict = {
  '1 min' : 60, 
  '5 min' : 60 * 5, 
  '15 min' : 60 * 15, 
  '30 min' : 60 * 30, 
  '1 hr' : 60 * 60, 
  '2 hr' : 60 * 60 * 2, 
  '4 hr' : 60 * 60 * 4, 
  '1 day' : 86400
};

const GetKline = async (url) => {
  const data = await axios.get(url)
    .then(res => { return res.data })
    .catch(err => { console.log('Error: ', err.message); })
  return data;
};

const getUsernameFromCookie = async (cookieDatabase, cookie) => {
  const isExist = await cookieDatabase.findOne({cookie});
  if (!isExist) return null;
  else return isExist["user"];
};

const Query = {
  async Candlestick(parent, {asset, startTime, endTime, scale, cookie}, {}, info) {

    let ftx_base_url = 'https://ftx.com/api/markets/' + asset + '/candles?'
    let start_time = startTime, end_time = endTime - 1, resolution = resolution_dict[scale];

    if (resolution === undefined) return null;

    let url = ftx_base_url + 'resolution=' + resolution + '&start_time=' + start_time + '&end_time=' + end_time;

    try {
      const data = await GetKline(url);
      return data['result'].map(item => ({
        startTime: item['time'] / 1000,
        scale: scale,
        open: item['open'],
        high: item['high'],
        low: item['low'],
        close: item['close']
      }))
    } catch {
      return null;
    }

  },
  async GetRecord(parent, {strategyID, cookie}, { recordDatabase, cookieDatabase }, info) {
    console.log("strategyID = " + strategyID);
    const username = await getUsernameFromCookie(cookieDatabase, cookie);
    if (username === null) {
      console.log("username is null");
      return [];
    }

    if (strategyID === "") {
      const list = await recordDatabase.find({username});
      console.log(list);
      return list;
    }
    const list = await recordDatabase.find({strategyID, username});
    return list;
  },
  async GetStrategy(parent, {id, cookie}, { strategyDatabase, cookieDatabase }, info) {
    const username = await getUsernameFromCookie(cookieDatabase, cookie);
    if (username === null) {
      console.log("username is null");
      return null;
    }

    console.log("id = " + id);
    if (id === "") {
      const result = await strategyDatabase.find({name: {$ne: ""}, username: username});
      return result;
    }
    const result = await strategyDatabase.find({id, username});
    return result;
  },
  async GetUsername(parent, {cookie}, { cookieDatabase }, info) {
    const isExist = await cookieDatabase.findOne({cookie});
    if (!isExist) return null;
    else return isExist['user'];
  }
};

export default Query;
