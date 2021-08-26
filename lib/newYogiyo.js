(async()=>{
    await setYogiyoNew()
})()

export async function setYogiyoNew(){
    let yogiyoRes = await getYogiyoSaleList()
    
    return yogiyoRes
}

async function getYogiyoSaleList(){
    const fetch=require('node-fetch');
    let yogiyoRes={}
    let locs=[  [37.4806211750226,126.944095160739]/**우리집 */, 
                [37.496559,126.956980]/**숭실대 */,
                [37.481185,126.997724]/**방배역 */,
                [37.557157,126.942628]/**연세대,이화, 서강 */, 
                [37.590225,127.028756]/**고려대 */,
                [37.504840,126.954515]/**중앙대 */,
                [37.594645,127.057298]/**경희대 */,
                [37.552553,126.924341]/**홍익대 */,
                [35.231631,129.085424]/**부산대 */,
                [35.104760,129.020415]/**동아대 부민캠 */,
                [35.112622,128.966424]/**동아대 승학캠 */,
                [35.135333,129.099338]/**부경대,경성대 */,
            ]
    let reqResArr=[]
    for(let loc of locs){
        let url=[`https://www.yogiyo.co.kr/api/v1/restaurants-geo/?order=rank&max_mov=&zip_code=151058&payment=all&max_delivery_fee=&home_category=all&use_hotdeal_v2=true&lng=${loc[1]}&items=70&category=%EC%A0%84%EC%B2%B4&has_discount=&own_delivery_only=false&type=all&page=0&lat=${loc[0]}`,
        ]
        let reqRes=fetch(url,{
            headers:{
                "X-ApiKey": "iphoneap",
                "X-ApiSecret": "fe5183cc3dea12bd0ce299cf110a75a2",
                "User-Agent": "Android/SM-N976N/7.1.2/yogiyo-android-6.4.0/"
            }
        }).then(v=>v.json()).then(v=>v.hotdeals.items)
        reqResArr.push(reqRes)
    }
    await Promise.allSettled(reqResArr).then(promiseRes=>{
        promiseRes.forEach(res=>{
            if(res.status=="fulfilled"){
                res.value.forEach(v=>{
                    Object.assign(yogiyoRes, { [`${v.name}`] : [v.additional_discount,'yogiyoapp://franchise?fr_id='+v.franchise_id] } )
                })
            }
        })
    })
   
    return yogiyoRes
}