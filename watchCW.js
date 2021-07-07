//npx babel-node --presets @babel/env watchCW.js  > watchlog 2>&1 &
//disown -a
import {getWemefData} from './imgWemef.js'
import {getCoupangData} from './imgCoupangeats.js'
import {telegramSendMessage} from './teleWebhook.js'
import {getBaeminData} from './imgBaemin.js'
import {getYogiyoData} from './imgYogiyo.js'


(async ()=>{
  let data={wemef:[],coupang:[],baemin:[],yogiyo:[]}
  let wemefData=await getWemefData()
  let coupnagData=await getCoupangData()
  let yogiyoData = await getYogiyoData()
  let baeminData = await getBaeminData()

  for(let i of wemefData){
    data.wemef.push(JSON.stringify(i))
  }
  for(let i of coupnagData){
    data.coupang.push(JSON.stringify(i))
  }
  for(let i of yogiyoData){
    data.yogiyo.push(JSON.stringify(i))
  }
  for(let i of baeminData){
    data.baemin.push(JSON.stringify(i))
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
  let baemin=[]
  let yogiyo=[]
  let wemefData=await getWemefData()
  let coupnagData=await getCoupangData()
  let yogiyoData=await getYogiyoData()
  let baeminData=await getBaeminData()
  
  for(let i of wemefData){
    wemef.push(JSON.stringify(i))
  }
  for(let i of coupnagData){
    coupang.push(JSON.stringify(i))
  }

  for(let i of yogiyoData){
    yogiyo.push(JSON.stringify(i))
  }
  for(let i of baeminData){
    baemin.push(JSON.stringify(i))
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

  for(let i of baemin){
    if(!data.baemin.includes(i)){
      telegramSendMessage("baemin add"+i)
    }
  }

  for(let i of data.baemin){
    if(!baemin.includes(i)){
      telegramSendMessage("baemin delete"+i)
    }
  }

  for(let i of yogiyo){
    if(!data.yogiyo.includes(i)){
      telegramSendMessage("yogiyo add"+i)
    }
  }

  for(let i of data.yogiyo){
    if(!yogiyo.includes(i)){
      telegramSendMessage("yogiyo delete"+i)
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
        console.log('7월브랜드 추가')
        request('http://127.0.0.1:3000/changeCoupang')
        telegramSendMessage("coupang add 7월 브랜드 할인")
      }else{
        telegramSendMessage("coupang add"+i)
      }
    }
  }

  data.coupang=coupang.slice()
  data.wemef=wemef.slice()
  data.baemin=baemin.slice()
  data.yogiyo=yogiyo.slice()
}


