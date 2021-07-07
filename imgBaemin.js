  //npx babel-node --presets @babel/env imgBaemin.js

  export async function getBaeminData(){
  
    const fetch=require('node-fetch')
  
    const url='https://api.smartbaedal.com/v2/main/inventories?lat=37.47999141&lng=126.9439155&deviceId=OPUDf7739905f204d223&eventCode=&appver=10.27.1&carrier=45005&site=7jWXRELC2e&dvcid=OPUDf7739905f204d223&deviceModel=SM-N976N&adid=NONE&sessionId=e2b37e06d6d4d181636c30081&osver=25&oscd=2'
    let res=await fetch(url,{
        headers:{
            'User-Agent': 'and1_10.27.1',
            'Carrier': '45005',
            'Device-Height': '1600',
            'Device-Width': '900',
            'USER-BAEDAL': 'VUBMtjqTlvcezUwk5K3jHQQ5vIIhZ3o5/NLsE3fA8SjTuQ1iOvMEqefQVKhULmhPWhY0MYtcOHOgHAjZwvnUROXklR/754h5rItBp2Hw2GPHZlQoKyX9igKlOJiTtmPgqWJHHz4KAeiP+t7GcjbXZO111/1WUWgTpLxCjq33YeCYKQlWZwmbU99ebm5sCvCK'
        }
    })
    .then(res=>res.json())
    .then(res=>res.data.mainBanners)
    .then(res=>
        res.map(v=>{return {title:v.title,imageUrl:v.imageUrl}})
    )

    return res
  }
