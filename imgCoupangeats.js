  //npx babel-node --presets @babel/env imgCoupangeats.js

export async function getCoupangData(){
  
  const fetch=require('node-fetch')

  const url='https://api.coupangeats.com/endpoint/store.get_gateway?nextToken=&badgeFilters='
  let res=await fetch(url,{
      headers:{
          "X-EATS-APP-VERSION": "1.2.21",
          "X-EATS-PCID": "15efdf4b-7bfc-3db1-a3c1-6c147ac1f3ca",
          "X-EATS-DEVICE-ID": "15efdf4b-7bfc-3db1-a3c1-6c147ac1f3ca",
          'X-EATS-OS-TYPE': 'ANDROID'

      }
  })
  res=(await res.json()).data.entityList[0].entity.data.list.map(v=>{
    return {img:v.imagePath}
  })
  //{이미지경로, URIscheme, id, eocumentKey(?), expireationDateText}
  // console.log(res)
  return res
}

(async()=>{
  let data=await getCoupangData()
  data=data.filter(v=>v.img=='https://t5c.coupangcdn.com/thumbnails/remote/1024x1024/image/eats_operation_center/0b22/d0524aeb467f0d1371628d517795d8061c620df5414178bf4b62589b7564.png')
  console.log(data)
})()