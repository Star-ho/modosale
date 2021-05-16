
//https://www.daleseo.com/js-babel-node/

import { createWorker } from 'tesseract.js';

export async function getDataArray(){
  const cheerio = require("cheerio");
  const fetch = require('node-fetch');
  let arr=Array.from({length:100},()=>[])
  let response = await fetch('http://wp.yogiyo.co.kr/20210510-0516_ohal_app/?1')
  .then(res=>res.text())
  let $=cheerio.load(response)
  //7 - 13 - 19 - 27
  let i=0
  $('.tab-7')['0'].children.forEach((v)=>{
    if(v.type==='comment'){
      arr[i].push(Object.assign(v.data))
    }
    if(v.children){
      if(v.children[0]&&v.children[0].attribs){
        arr[i].push(Object.assign(v.children[0].attribs.src))
        i++
      }
    }
  })

  arr=arr.filter(v=>v.length>0)
  arr=arr.map(v=>{
    while(v.length>2){
      v.shift()
    }
    while(v[1][0]!='h'){
      v[1]=v[1].slice(1)
    }
    while(v[1][v[1].length-1]!='g'){
      v[1]=v[1].slice(0,v[1].length-1)
    }
    v[1]=encodeURI(v[1])
    return v
  })

  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('kor');
  await worker.initialize('kor');
  for(let i =0;i<arr.length;i++){
    //console.log(i)
    arr[i][1]=await imgToCost(arr[i][1],i,worker)
    //console.log(arr[i][1])
  }
  //arr[0][1]=await imgToCost(arr[0][1],i,worker)

  await worker.terminate();
  let res={}
  arr.forEach(v=>{
    v[0]=String(v[0])
    v[1]=v[1].split('\n')[1].split(' ')[0].split(',').join('')
    Object.assign(res, { [v[0]] : v[1]} )
  })
  //console.log(arr)


  return res
  //console.log(String(arr[0][0]))
}

async function download(uri, filename){
  var fs = require('fs'),
    fetch = require('node-fetch');
  let res=await fetch(uri)
  let buffer = await res.buffer()
  fs.writeFileSync(filename, buffer, ()=>null)
};
//npx babel-node --presets @babel/env yogiyo.js
async function imgToCost(src,i,worker){
  let res
  let flag=1
  var fs = require('fs');
  var sharp = require('sharp');
  let inputPath=`path/down${i}.png`
  const outputPath=`path/result${i}.png`
  await download(src, inputPath)
  let outputStream
  if(i<3){
    outputStream= await sharp(inputPath).extract({left:80,top:0,width:420,height:180}).toBuffer()
    fs.writeFileSync(outputPath,outputStream)
  }else{
    outputStream= await sharp(inputPath).extract({left:250,top:0,width:450,height:200}).toBuffer()
    fs.writeFileSync(outputPath,outputStream)
  }
  flag=0
  res = await worker.recognize(
    outputPath,
  )
  if(flag==1){
    return -1
  }
  return res.data.text
}

//imgToCost('http://dhkorea.wpengine.com/wp-content/uploads/2021/04/YGY_%E1%84%8B%E1%85%A9%E1%84%82%E1%85%B3%E1%86%AF%E1%84%8B%E1%85%B4%E1%84%92%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%B5%E1%86%AB_new_lineup_hosigi_5000.png')
