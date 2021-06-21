//npx babel-node --presets @babel/env watchCW.js  > watchlog 2>&1 &

import {getWemefData} from './imgWemef.js'
import {getCoupangData} from './imgCoupangeats.js'
import {telegramSendMessage} from './teleWebhook.js'

(async ()=>{
  let data={wemef:[],coupang:[]}
  for(let i of await getWemefData()){
    data.wemef.push(JSON.stringify(i))
  }
  for(let i of await getCoupangData()){
    data.coupang.push(JSON.stringify(i))
  }
  
  setInterval(async()=>await watchData(data),1000*60*60);
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
    telegramSendMessage(extra.toString())

  }
}


