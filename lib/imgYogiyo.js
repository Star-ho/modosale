  //npx babel-node --presets @babel/env imgYogiyo.js
//끝

export async function getYogiyoData(){
    const fetch=require('node-fetch')
    const url='https://www.yogiyo.co.kr/api/v1/service_info/'
    let res=await fetch(url,{
        headers:{
            "X-ApiKey": "iphoneap",
            "X-ApiSecret": "fe5183cc3dea12bd0ce299cf110a75a2",
            "User-Agent": "Android/SM-N976N/7.1.2/yogiyo-android-6.4.0/"
        }
    })
        .then(res=>res.json())
        .then(res=>{
            return res.event_list.filter(v=>( v.type=='EVENT' )).map(v=>{
                return {title:v.title,img:v.url,scheme:'yogiyoapp://event?event_id='+v.id}
        })
    })
    return res
}

//   (async ()=>{
//     console.log(await getYogiyoData())
//   })()
