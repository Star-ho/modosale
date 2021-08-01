(async()=> {

    const fetch=require('node-fetch')
  
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
    console.log(url)
    // url=url.filter(v=>v.img.includes('ohal_app'))[0].img
    // console.log(url)
})()
