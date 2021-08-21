//npx babel-node --presets @babel/env imgWemef.js
import { telegramSendMessage } from './modusailUtil'

export async function getWemefData(isAll){
  const fetch = require('node-fetch');

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
  try{
    const cheerio = require("cheerio");
    let $=cheerio.load(res)
    res= $('.view_coupon_desc')['0'].children[1].children
    res=res[res.length-2].children
    res=res.filter(v=>v.name=='a'||v.name=='img')
    // console.log(res[0].attribs.href.split('/')[res[0].attribs.href.split('/').length-1])
  }catch{
    telegramSendMessage('fuckkkking wemef error!!!!')
    console.log('wemef error')
  }
  let retval=[]
  for(let i of res){
    // console.log(i)
    if(i.name==='a'){
      if(i.children[0].name=='img'){
        // console.log(i.children[0].attribs['data-filename'])
        let id=i.children[0].attribs['data-filename']
        retval.push({img:i.children[0].attribs.src,scheme:i.attribs.href,id:id})

      }
    }else if(i.name==='img'&&isAll){
      // console.log(i.attribs['data-filename'])
      let id=i.attribs['data-filename']
      retval.push({img:i.attribs.src,scheme:undefined,id:id})
    }
  }
  // console.log(retval)

  
  return retval
}

export async function getWemefBannerData(){
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