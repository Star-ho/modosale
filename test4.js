import {getWemefData} from './imgWemef.js'
import {getCoupangData} from './imgCoupangeats.js'

(async ()=>{
  let data={wemef:[],coupang:[]}
  for(let i of await getWemefData()){
    data.wemef.push(JSON.stringify(i))
  }
  for(let i of await getCoupangData()){
    data.coupang.push(JSON.stringify(i))
  }
  
  // watchData()
  setInterval(async()=>await watchData(data),1000*2);
})()
async function watchData(data){
  let wemef=[]
  let coupang=[]
  let extra=[]

  for(let i of await getWemefData()){
    wemef.push(JSON.stringify(i))
  }
  for(let i of await getCoupangData()){
    coupang.push(JSON.stringify(i))
  }

  for(let i of wemef){
    if(!data.wemef.includes(i)){
      extra.push(i)
    }
  }

  for(let i of data.coupang){
    if(!coupang.includes(i)){
      extra.push(i)
    }
  }

  for(let i of coupang){
    if(!data.coupang.includes(i)){
      extra.push(i)
    }
  }

  for(let i of data.wemef){
    if(!wemef.includes(i)){
      extra.push(i)
    }
  }
  if(extra.length>0){
    data.coupang=coupang.slice()
    data.wemef=wemef.slice()
    console.log(extra)
    const TelegramBot = require('node-telegram-bot-api')
    const token = '1811045229:AAHsI7UbFW3m04ly8cVxwnm-m2oHbMXfHdI'
    const telebot = new TelegramBot(token, {polling: true})

    telebot.sendMessage(1052011050, extra.toString());
  }
}




// let  moment = require('moment');

// require('moment-timezone');
// moment.tz.setDefault("Asia/Seoul");

// console.log('refresh end! \n time is '+moment().format())