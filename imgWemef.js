//npx babel-node --presets @babel/env wemef.js

export async function getWemefData(){
  const fetch=require('node-fetch')
  const fs = require('fs');
  let url='https://api.wmpo.co.kr/gate?lat=37.4799003321726&lon=126.943954234576'
  let headers={
    'token':"6128b8da-28d2-488f-8a76-57d0ff3cc033",
    "User-Agent":"Cupping/7.7.1 (com.wemakeprice.cupping; build:77; Android 7.1.2) Retrofit2/2.4.0"
  }
  let res=await fetch(url,{
      headers:headers
    }).then(res=>res.json())
  res=res.data.templates[1].items
  for(let i of res){
    if(i.title==='쿠폰모음'){
      url=i.link.split('=')
      url=url[url.length-1]
      res=Object.assign({},i)
      break
    }
  }
  res=await fetch(url,{
    headers:headers
  }).then(res=>res.text())
  const cheerio = require("cheerio");
  let $=cheerio.load(res)
  res= $('.view_coupon_desc')['0'].children[1].children[1].children
  res=res.filter(v=>v.name=='a'||v.name=='img')
  // console.log(res[0].attribs.href.split('/')[res[0].attribs.href.split('/').length-1])
  let retval=[]
  for(let i of res){
    // console.log(i)
    if(i.name==='a'){
      let temp=i.attribs.href.split('/')
      temp=temp[temp.length-1]
      retval.push({img:i.children[0].attribs.src,id:temp,scheme:i.attribs.href})
    }else if(i.name==='img'){
      // console.log(i)
      retval.push({img:i.attribs.src,id:undefined,scheme:undefined})
    }
  }
  // console.log(retval)
  return retval
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

