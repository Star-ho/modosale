//npx babel-node --presets @babel/env watchCW.js  > watchlog 2>&1 &
//disown -a
import {getWemefData} from './imgWemef.js'
import {getCoupangData} from './imgCoupangeats.js'
import {telegramSendMessage} from './teleWebhook.js'

(async ()=>{
  let data={wemef:[],coupang:[]}
  let wemefData=await getWemefData()
  let coupnagData=await getCoupangData()
  for(let i of await wemefData){
    data.wemef.push(JSON.stringify(i))
  }
  for(let i of await coupnagData){
    data.coupang.push(JSON.stringify(i))
  }
  console.log(data)
  setInterval(async()=>await watchData(data),1000*60*10);
})()


async function watchData(data){
  let  moment = require('moment');
  require('moment-timezone'); 
  moment.tz.setDefault("Asia/Seoul"); 

  let date={now:moment()}
  console.log('watch start! \n time is '+date.now.format())

  let wemef=[]
  let coupang=[]
  let extra=''
  let wemefData=await getWemefData()
  let coupnagData=await getCoupangData()
  for(let i of wemefData){
    wemef.push(JSON.stringify(i))
  }
  for(let i of coupnagData){
    coupang.push(JSON.stringify(i))
  }

  for(let i of wemef){
    if(!data.wemef.includes(i)){
      telegramSendMessage("wemef add"+i)
    }
  }

  for(let i of data.wemef){
    if(!wemef.includes(i)){
      telegramSendMessage("wemef delete"+i)
    }
  }

  for(let i of data.coupang){
    if(!coupang.includes(i)){
      telegramSendMessage("coupang delete"+i)
      extra+="coupang delete"+i+'\n'
    }
  }

  for(let i of coupang){
    if(!data.coupang.includes(i)){
      if(i.img=='https://t5c.coupangcdn.com/thumbnails/remote/1024x1024/image/eats_operation_center/0b22/d0524aeb467f0d1371628d517795d8061c620df5414178bf4b62589b7564.png'){
        const request = require('request');
        request('http://127.0.0.1:3000/changeCoupang')
        telegramSendMessage("coupang add 7월 브랜드 할인")
      }else{
        telegramSendMessage("coupang add"+i)
      }
    }
  }

  data.coupang=coupang.slice()
  data.wemef=wemef.slice()

}


