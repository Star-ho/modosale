//npx babel-node --presets @babel/env yogiyo.js
//https://www.daleseo.com/js-babel-node/
//해야할거
import {telegramSendMessage} from './modusailUtil.js'

export async function getDataArray(date){
  let  moment = require('moment');
  require('moment-timezone'); 
  moment.tz.setDefault("Asia/Seoul"); 

  date=moment()

  let weeknumber=date.weekday()||7
  const cheerio = require("cheerio");
  const fetch = require('node-fetch');
  let arr=Array.from({length:100},()=>[])

  let url=await fetch('https://www.yogiyo.co.kr/api/v1/service_info/',{
        headers:{
            "X-ApiKey": "iphoneap",
            "X-ApiSecret": "fe5183cc3dea12bd0ce299cf110a75a2",
            "User-Agent": "Android/SM-N976N/7.1.2/yogiyo-android-6.4.0/"
        }
    })
    .then(res=>res.json())
    .then(res=>{
        res=res.event_list.filter(v=>v.url.includes('ohal_app'))[0].url
        return res
    })
  // let url=`http://wp.yogiyo.co.kr/20210801_ohal_app/?7`

  console.log(url)
  let response = await fetch(url)
  .then(res=>res.text())
  let $=cheerio.load(response)
  //7 - 13 - 19 - 27
  // console.log(url)

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
  // console.log(arr)

  let img=Array.from({length:arr.length},()=>'')
  for(let i =0;i<arr.length;i++){
    if(arr[i][0].indexOf('포장')!=-1){
      continue
    }
    try{
      img[i]=arr[i][1]+''
      arr[i][1]=await imgToCost(arr[i][1],i,2)
      
    }catch(e){
      // console.log(e)
      continue
    }
  }
  
  let res={}
  for(let i=0;i<arr.length;i++){
    if(arr[i][0].indexOf('포장')!=-1){
      continue
    }
    let v=arr[i].slice()
    v[0]=String(v[0])

    while(v[1].indexOf('.')!=-1){
      let index=v[1].indexOf('.')
      v[1]=v[1].split('')
      v[1].splice(index,1)
      v[1]=v[1].join('')
    }
    let temp
    try{
      temp=+v[1].split('\n')[1].split(' ')[2].split(',').join('')
    }catch{
      temp=+v[1].split('_')
      temp=parseInt(temp[temp.length-1])
    }
    if(!temp){
      temp=v[1].replace(/[^0-9]/g,'');
    }
    // console.log(v,temp)
    if(+temp<1000||+temp>10000){
      // console.log(v[1],i,`path\\result${i}.png`)
      const spawn = require('await-spawn')

      let spawnRet = await spawn(process.env.PYPATH||'python3', ['./lib/imgToVal.py',`path/result${i}.png`,1]); 
      v[1]= spawnRet.toString()
      // console.log(v[0])


      while(v[1].indexOf('.')!=-1){
        let index=v[1].indexOf('.')
        v[1]=v[1].split('')
        v[1].splice(index,1)
        v[1]=v[1].join('')
      }
      try{
        temp=v[1].split('\n')[2].split(' ')[0].split(',').join('')
        // console.log(temp)
        temp= +temp.slice(0,-1)
      }catch{
        temp=+v[1].split('_')
        temp=parseInt(temp[temp.length-1])
      }
      if(!temp){
        temp=v[1].replace(/[^0-9]/g,'');
      }
      
      if(v[0].toLowerCase()=='gsthefresh'){
        v[0]='GS더프레시'
        v[1]=+(""+v[1]).slice(2)  
      }
      temp=''+ +temp
      while(temp.length>4){
        temp=temp.slice(1)
      }
      while(temp.length<4){
        temp=temp+'0'
      }
      await telegramSendMessage(`${v[0]}\n ${v[1]}\n 결과:${temp}`)
      await telegramSendMessage(img[i])

      // console.log(temp,11)

    }

    v[1]=temp

    if(v[0].toLowerCase()=='gsthefresh'){
      v[0]='GS더프레시'
      v[1]=+(""+v[1]).slice(2)
    }
    if(v[0]=='오늘의 포장 할인'){
      continue;
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
  }
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
    try{
      temp=uri.match(/[^0-9a-zA-Z~!@#$%^&*()_+|<>?:{}\/.,-]/g).join('')
      temp1=(uri.match(/[가-힣]/g).join(''))
    }catch{
        temp= Hangul.assemble(uri.match(/[^0-9a-zA-Z~!@#$%^&*()_+|<>?:{}\/.,-]/g))
        temp1=(temp)
    }
    uri=uri.replace(temp,temp1)
  }catch{
    uri=uri
  }
  
  let res=await fetch(encodeURI(uri),{
      timeout: 30000
    })
  
  let buffer = await res.buffer()
  fs.writeFileSync(filename, buffer, ()=>null)
};

//npx babel-node --presets @babel/env yogiyo.js
async function imgToCost(src,i,blurSize){
  let res
  let flag=1
  var fs = require('fs');
  var sharp = require('sharp');
  let inputPath=`path/down${i}.png`
  const outputPath=`path/result${i}.png`
  // console.log(src)
  src=decodeURI(src)
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
 
  const spawn = require('await-spawn')
  try{
  res = await spawn(process.env.PYPATH||'python3', ['./lib/imgToVal.py',outputPath,blurSize]); 
  }catch(e){
    console.log(e)
    console.log('spawn-error')
  }
  res=res.toString()  
  if(flag==1){
    return -1
  }
  return res
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
