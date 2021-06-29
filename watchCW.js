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
      telegramSendMessage("coupang add"+i)
    }
  }

  data.coupang=coupang.slice()
  data.wemef=wemef.slice()

}


