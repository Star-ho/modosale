//npx babel-node --presets @babel/env watchBanner.js  > watchlog 2>&1 &
//disown -a
import {getWemefData,getWemefBannerData} from './imgWemef.js'
import {getCoupangData} from './imgCoupangeats.js'
import {telegramSendMessage} from './teleWebhook.js'
import {getBaeminData} from './imgBaemin.js'
import {getYogiyoData} from './imgYogiyo.js'
import { coupangDataHandling} from './CoupangDatahandling.js'
import { getDataArray } from './yogiyo.js'

(async ()=>{
  let data={wemef:[],coupang:[],baemin:[],yogiyo:[],wemefBanner:[]}
  let wemefData=await getWemefData(true)
  let wemefBannerData=await getWemefBannerData()
  let coupnagData=await getCoupangData()
  let yogiyoData = await getYogiyoData()
  let baeminData = await getBaeminData()

  for(let i of wemefData){
    data.wemef.push(JSON.stringify(i))
  }
  for(let i of wemefBannerData){
    data.wemefBanner.push(JSON.stringify(i))
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
  // console.log(data.coupang)
  // coupangDataHandling(Object.assign({}, JSON.parse(data.coupang[0]),{add:false}))
  setInterval(async()=>await watchData(data),1000*60*10);
})()


async function watchData(data){
  let  moment = require('moment');
  require('moment-timezone'); 
  moment.tz.setDefault("Asia/Seoul"); 

  let date={now:moment()}
  console.log('watch start! \n time is '+date.now.format())

  let wemefBanner=[]
  let wemef=[]
  let coupang=[]
  let baemin=[]
  let yogiyo=[]
  let wemefBannerData=await getWemefBannerData()
  let wemefData=await getWemefData(true)
  let coupnagData=await getCoupangData()
  let yogiyoData=await getYogiyoData()
  let baeminData=await getBaeminData()
  
  for(let i of wemefData){
    wemef.push(JSON.stringify(i))
  }
  for(let i of wemefBannerData){
    wemefBanner.push(JSON.stringify(i))
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
  
  for(let i of baemin){
    if(!data.baemin.includes(i)){
      await telegramSendMessage("baemin add"+i)
    }
  }

  for(let i of data.baemin){
    if(!baemin.includes(i)){
      await telegramSendMessage("baemin delete"+i)
    }
  }

  for(let i of yogiyo){
    if(!data.yogiyo.includes(i)){
      await telegramSendMessage("yogiyo add"+i)
    }
  }

  for(let i of data.yogiyo){
    if(!yogiyo.includes(i)){
      await telegramSendMessage("yogiyo delete"+i)
    }
  }
  
  for(let i of coupang){
    if(!data.coupang.includes(i)){
      await telegramSendMessage("coupang add"+i)
      coupangDataHandling(Object.assign({}, JSON.parse(i),{add:true}))


    }
  }

  for(let i of data.coupang){
    if(!coupang.includes(i)){
      await telegramSendMessage("coupang delete"+i)
      coupangDataHandling(Object.assign({}, JSON.parse(i),{add:false}))

    }
  }

  for(let i of wemef){
    if(!data.wemef.includes(i)){
      const request = require('request');
      request('http://127.0.0.1:3000/changeWemef')
    }
  }

  for(let i of data.wemef){
    if(!wemef.includes(i)){
      const request = require('request');
      request('http://127.0.0.1:3000/changeWemef')
    }
  }

  for(let i of wemefBanner){
    if(!data.wemefBanner.includes(i)){
      await telegramSendMessage("wemefBanner add"+i)
    }
  }

  for(let i of data.wemefBanner){
    if(!wemefBanner.includes(i)){
      await telegramSendMessage("wemefBanner delete"+i)
    }
  }

  data.wemefBanner=wemefBanner.slice()
  data.coupang=coupang.slice()
  data.wemef=wemef.slice()
  data.baemin=baemin.slice()
  data.yogiyo=yogiyo.slice()
}


