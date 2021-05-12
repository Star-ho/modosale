import { createWorker } from 'tesseract.js';


async function getDataArray(){
  const cheerio = require("cheerio");
  const fetch = require('node-fetch');
  let arr=Array.from({length:100},()=>[])
  let response = await fetch('http://wp.yogiyo.co.kr/20210510-0516_ohal_app/?1')
  .then(res=>res.text())
  let $=cheerio.load(response)
  //7 - 13 - 19 - 27
  let i=0
  $('.tab-3')['0'].children.forEach((v)=>{
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
  for(let i =0;i<arr.length;i++){
    arr[i][1]=await imgToCost(arr[i][1])
  }
  console.log(arr)
}

async function download(uri, filename){
  var fs = require('fs'),
    fetch = require('node-fetch');
  let res=await fetch(uri)
  let buffer = await res.buffer()
  await fs.writeFile(filename, buffer, () => 
  console.log('finished downloading!'));
};
//npx babel-node --presets @babel/env yogiyo.js
async function imgToCost(src){
  let path='path/down.png'
  await download(src, path);

  var Clipper = require('image-clipper');
  var clipper = Clipper();
  clipper.configure({
      canvas: require('canvas')
  });
  
  clipper.image(path, function() {
      this.crop(90, 1 ,500,300)
      .quality(150)
      .toFile(path, function() {
        console.log('saved!');
    });
  });
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage('kor');
  await worker.initialize('kor');
  const { data: { text } } = await worker.recognize(
    path
    );
  //console.log(text);
  await worker.terminate();
  return text
}
getDataArray()
//imgToCost('http://dhkorea.wpengine.com/wp-content/uploads/2021/04/YGY_%E1%84%8B%E1%85%A9%E1%84%82%E1%85%B3%E1%86%AF%E1%84%8B%E1%85%B4%E1%84%92%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%B5%E1%86%AB_new_lineup_hosigi_5000.png')
