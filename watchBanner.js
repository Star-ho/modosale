//npx babel-node --presets @babel/env watchBanner.js  > watchlog 2>&1 &
//disown -a
import {getWemefBannerData} from './imgWemef.js'
import {getCoupangData} from './imgCoupangeats.js'
import {telegramSendMessage} from './teleWebhook.js'
import { getBaeminData } from './imgBaemin.js'
import { getYogiyoData } from './imgYogiyo.js'
import { coupangDataHandling} from './CoupangDatahandling.js'
import { getDataArray } from './yogiyo.js'

(async ()=>{
  let data={wemef:[],coupang:[],baemin:[],yogiyo:[]}
  let wemefData=await getWemefBannerData(true)
  let coupnagData=await getCoupangData()
  // let yogiyoData = await getYogiyoData()
  // let baeminData = await getBaeminData()

  for(let i of wemefData){
    data.wemef.push(JSON.stringify(i))
  }

  for(let i of coupnagData){
    data.coupang.push(JSON.stringify(i))
  }
  console.log(coupnagData)
  // for(let i of yogiyoData){
  //   data.yogiyo.push(JSON.stringify(i))
  // }
  // for(let i of baeminData){
  //   data.baemin.push(JSON.stringify(i))
  // }

  // console.log(data.wemefBanner)
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

  let wemef=[]
  let coupang=[]
  // let baemin=[]
  // let yogiyo=[]
  let wemefData=await getWemefBannerData(true)
  let coupnagData=await getCoupangData()
  // let yogiyoData=await getYogiyoData()
  // let baeminData=await getBaeminData()
  
  for(let i of wemefData){
    wemef.push(JSON.stringify(i))
  }
  for(let i of coupnagData){
    coupang.push(JSON.stringify(i))
  }

  // for(let i of yogiyoData){
  //   yogiyo.push(JSON.stringify(i))
  // }
  // for(let i of baeminData){
  //   baemin.push(JSON.stringify(i))
  // }
  
  // for(let i of baemin){
  //   if(!data.baemin.includes(i)){
  //     await telegramSendMessage("baemin add"+i)
  //   }
  // }

  // for(let i of data.baemin){
  //   if(!baemin.includes(i)){
  //     await telegramSendMessage("baemin delete"+i)
  //   }
  // }

  // for(let i of yogiyo){
  //   if(!data.yogiyo.includes(i)){
  //     await telegramSendMessage("yogiyo add"+i)
  //   }
  // }

  // for(let i of data.yogiyo){
  //   if(!yogiyo.includes(i)){
  //     await telegramSendMessage("yogiyo delete"+i)
  //   }
  // }
  
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
      await telegramSendMessage("wemef add"+i)
    }
  }

  for(let i of data.wemef){
    if(!wemef.includes(i)){
      await telegramSendMessage("wemef delete"+i)
    }
  }


  data.coupang=coupang.slice()
  data.wemef=wemef.slice()
  // data.baemin=baemin.slice()
  // data.yogiyo=yogiyo.slice()
}


