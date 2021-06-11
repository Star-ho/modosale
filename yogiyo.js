//npx babel-node --presets @babel/env yogiyo.js
//https://www.daleseo.com/js-babel-node/

import { createWorker } from 'tesseract.js';

export async function getDataArray(date){
  date.now=new Date().getTime()

  while(date.now>date.end){
    date.end=new Date(date.end+3600000*24*7).getTime()
  }


  let weeknumber=7-(new Date(date.end).getDate()-new Date(date.now).getDate()) 
  let year= new Date(date.end-3600000*24*6).getFullYear() 
  let startDay= ('000'+(new Date(date.end-3600000*24*6).getMonth()+1)).slice(-2) + ('000'+new Date(date.end-3600000*24*6).getDate()).slice(-2) 
  let endDay= ('000'+(new Date(date.end).getMonth()+1)).slice(-2) + ('000'+new Date(date.end).getDate()).slice(-2) 
  const cheerio = require("cheerio");
  const fetch = require('node-fetch');
  let arr=Array.from({length:100},()=>[])
  let url=`http://wp.yogiyo.co.kr/${year}${startDay}-${endDay}_ohal_app/?${weeknumber}`
  let response = await fetch(url)
  .then(res=>res.text())
  let $=cheerio.load(response)
  //7 - 13 - 19 - 27
  // console.log(url)
  //  let response = await fetch('http://wp.yogiyo.co.kr/20210607-0613_ohal_app/?2')//22년되면 바꿔야해 제발
  let i=0
  $(`.tab-${weeknumber}`)['0'].children.forEach((v)=>{
    if(v.type==='comment'){
      arr[i].push(v.data)
    }

    if(v.children&&v.children[0]&&v.children[0].attribs){
        arr[i].push(v.children[0].attribs.src)
    }
    if(v.attribs&&v.attribs.href){
      arr[i].push(v.attribs.href)
      i++
    }
  })
  // console.log(arr)
  arr=arr.filter(v=>v.length>0)
  //url이 잘못날라올때
  arr=arr.map(v=>{
    while(v.length>3){
      v.shift()
    }
    while(v[1][0]!='h'){
      v[1]=v[1].slice(1)
    }
    while(v[1][v[1].length-1]!='g'){
      v[1]=v[1].slice(0,v[1].length-1)
    }
    v[1]=v[1]
    return v
  })

  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('kor');
  await worker.initialize('kor');
  for(let i =0;i<arr.length;i++){
    try{
      arr[i][1]=await imgToCost(arr[i][1],i,worker)
    }catch{
      console.log(arr[i])
      continue
    }
    //console.log(arr[i][1])
  }
  //arr[0][1]=await imgToCost(arr[0][1],i,worker)

  let res={}
  arr.forEach( (v,index) => {
    v[0]=String(v[0])

    while(v[1].indexOf('.')!=-1){
      let index=v[1].indexOf('.')
      v[1]=v[1].split('')
      v[1].splice(index,1)
      v[1]=v[1].join('')
    }
    let temp
    try{
      temp=+v[1].split('\n')[1].split(' ')[0].split(',').join('')
    }catch{
      temp=+v[1].split('_')
      temp=parseInt(temp[temp.length-1])

    }
    if(!temp){
      temp=v[1].replace(/[^0-9]/g,'');
    }

    v[1]=temp
    if(v[0]=='gsthefresh'){
      v[0]='GS더프레시'
    }
    if(v[0]=='오늘의 포장 할인'){
      return;
    }
    
    if(v[0].indexOf('—')!=-1){
      v[0]=v[0].replace('—','')
    }
    if(v[0].indexOf('-')!=-1){
      v[0]=v[0].replace('-','')
    }
    if(v[0].indexOf('000')){
      v[0]=v[0].replace(/[0-9]000/ig,'')
    }
    v[0]=v[0].match(/[ㄱ-ㅎ가-힣0-9a-zA-Z]/ig).join('')

    Object.assign(res, { [v[0]] : [+v[1],v[2]]} )
  })
  await worker.terminate();
  deleteFile()
  return res
  
}

async function download(uri, filename){
  var fs = require('fs'),
    fetch = require('node-fetch');
  const Hangul = require('hangul-js');
  let temp
  let temp1
  try{
      temp=Hangul.match(/[^0-9a-zA-Z~!@#$%^&*()_+|<>?:{}\/.,-]/g).join('')
      temp1=encodeURIComponent(uri.match(/[가-힣]/g).join(''))
  }catch{
      temp= Hangul.assemble(uri.match(/[^0-9a-zA-Z~!@#$%^&*()_+|<>?:{}\/.,-]/g))
      temp1=encodeURIComponent(temp)
  }
  uri=uri.replace(temp,temp1)


  let res=await fetch(uri,{
    timeout: 30000
  })
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
  try{
    await download(src, inputPath)
  }catch(error){
    console.log("error!",src)
    console.log(error)

    await download(src, inputPath)
  }
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

  const p = path.join(__dirname, 'path');

  try { // D
  const files = fs.readdirSync(p);  
  if (files.length) 
    files.forEach(f => removePath(path.join(p, f), printResult)); 
  } catch (err) {
  if (err) return console.log(err);
  }
}

//imgToCost('http://dhkorea.wpengine.com/wp-content/uploads/2021/04/YGY_%E1%84%8B%E1%85%A9%E1%84%82%E1%85%B3%E1%86%AF%E1%84%8B%E1%85%B4%E1%84%92%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%B5%E1%86%AB_new_lineup_hosigi_5000.png')
