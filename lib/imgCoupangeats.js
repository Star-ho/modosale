//npx babel-node --presets @babel/env imgCoupangeats.js
//끝
export async function getCoupangData(){
  const fetch = require('node-fetch');
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
    return {img:v.imagePath,scheme:'coupang'+v.scheme,id:v.id,expireDate:v.expireationDateText}
  })
  //{이미지경로, URIscheme, id, eocumentKey(?), expireationDateText}
  // console.log(res)
  return res
}

export async function getCoupangMonthlyData(){
  const fetch = require('node-fetch');
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
    return {img:v.imagePath,scheme:'coupang'+v.scheme,id:v.id,expireDate:v.expireationDateText}
  })
  //{이미지경로, URIscheme, id, eocumentKey(?), expireationDateText}
  // console.log(res)
  return res
}

// (async()=>{
//   let data=await getCoupangData()
//   console.log(data)
// })()