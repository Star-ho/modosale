import {getDataArray} from './yogiyo' 
// import {wemefReadData} from './readfile.js'
import {getWemefData} from './imgWemef.js'
(async ()=>{
  
  // getWemefData()
  // console.log(wemefReadData())
  const moment = require('moment');

  let date={now:moment() ,end:moment()}
  
  
  while(date.end.weekday()!=0){
     date.end.add(1,'day')
  }
  console.log(await getDataArray(date))
  // let inputPath=`wemefO/down0.png`

  // download("https://d1lr36zkig3axf.cloudfront.net/storage/banner/20210506/91bb74ef2243a4ec2e278ef3034d3bed.png",inputPath)
})()

// async function download(uri, filename){
//     var fs = require('fs'),
//       fetch = require('node-fetch');
//     let temp
//     let temp1
//     uri=uri.replace(temp,temp1)
  
//     let res=await fetch(uri)
//     let buffer = await res.buffer()
//     fs.writeFileSync(filename, buffer, ()=>null)
//   };