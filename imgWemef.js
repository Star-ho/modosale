// import { createWorker } from 'tesseract.js';
//npx babel-node --presets @babel/env wemef.js

export async function getWemefData(){
  const fetch=require('node-fetch')

  const url='https://api.wmpo.co.kr/gate?lat=37.4799003321726&lon=126.943954234576'
  let res=await fetch(url,{
      headers:{'token':"6128b8da-28d2-488f-8a76-57d0ff3cc033",
      "User-Agent":"Cupping/7.7.1 (com.wemakeprice.cupping; build:77; Android 7.1.2) Retrofit2/2.4.0"}
  })
  res=(await res.json()).data.templates[0].items.map(v=>{
    return {title:v.title, link:v.link, img:v.image}
  })
  return res
}

// 실행시
// (async ()=>{
//     const fetch=require('node-fetch')

//     const url='https://api.wmpo.co.kr/gate'
//     let res=await fetch(url,{
//         headers:{'token':"6128b8da-28d2-488f-8a76-57d0ff3cc033",
//         "User-Agent":"Cupping/7.7.1 (com.wemakeprice.cupping; build:77; Android 7.1.2) Retrofit2/2.4.0"}
//     })
//     res=(await res.json()).data.templates[0].items.map(v=>{
//       return {title:v.title, link:v.link, img:v.image}
//     })
//     // console.log(res)
//     return res
// })()


async function download(uri, filename){
    var fs = require('fs'),
      fetch = require('node-fetch');
    let temp
    let temp1
    uri=uri.replace(temp,temp1)
  
    let res=await fetch(uri)
    let buffer = await res.buffer()
    fs.writeFileSync(filename, buffer, ()=>null)
  };
  
  async function imgToCost(src,i,worker){
    let res
    let flag=1
    var fs = require('fs');
    var sharp = require('sharp');
    let inputPath=`wemefO/down${i}.png`
    const outputPath=`wemefO/result${i}.png`
    try{
      await download(src, inputPath)
    }catch(error){
      // console.log(error)
      await download(src, inputPath)
    }
    let outputStream
    //이미지 오른쪽 자를떄
    // if(i<3){
      outputStream= await sharp(inputPath).extract({left:0,top:0,width:350,height:250}).toBuffer()
      fs.writeFileSync(outputPath,outputStream)
    // }else{
    //   outputStream= await sharp(inputPath).extract({left:250,top:0,width:450,height:200}).toBuffer()
    //   fs.writeFileSync(outputPath,outputStream)
    // }
    flag=0
    res = await worker.recognize(
      outputPath,
    )
    if(flag==1){
      return -1
    }
    return res.data.text
  }
  
  function deleteFile(){
    const fs = require('fs');
    const path = require('path');
    const removePath = (p, callback) => { // A 
    fs.stat(p, (err, stats) => { 
      if (err) return callback(err);
  
      if (!stats.isDirectory()) { // B 
        return fs.unlink(p, err => err ? callback(err) : callback(null, p));
      }
  
      fs.rmdir(p, (err) => {  
        if (err) return callback(err);
        return callback(null, p);
      });
    });
    };
    const printResult = (err, result) => {
    if (err) return console.log(err);
    // console.log(`${result} 를 정상적으로 삭제했습니다`);
    };
  
    const p = path.join(__dirname, 'wemefO');
  
    try { // D
    const files = fs.readdirSync(p);  
    if (files.length) 
      files.forEach(f => removePath(path.join(p, f), printResult)); 
    } catch (err) {
    if (err) return console.log(err);
    }
  }