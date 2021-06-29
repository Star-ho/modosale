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

