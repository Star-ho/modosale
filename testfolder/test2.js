
let urls=[['https://lounge.baemin.com/api/lounge/brands/cards/BRAND_NEW?pageNumber=','&pageSize=10'],
[`https://lounge.baemin.com/api/lounge/brands/cards/GIFT?pageNumber=`,`&pageSize=10`],
[`https://lounge.baemin.com/api/lounge/brands/cards/CAFE?pageNumber=`,`&pageSize=10`],
[`https://lounge.baemin.com/api/lounge/brands/cards/STEAMED_MIDNIGHT?pageNumber=`,`&pageSize=10`],
[`https://lounge.baemin.com/api/lounge/brands/cards/FASTFOOD?pageNumber=`,`&pageSize=10`],
[`https://lounge.baemin.com/api/lounge/brands/cards/PIZZA?pageNumber=`,`&pageSize=10`],
[`https://lounge.baemin.com/api/lounge/brands/cards/KOREAN?pageNumber=`,`&pageSize=10`],
[`https://lounge.baemin.com/api/lounge/brands/cards/CHICKEN?pageNumber=`,`&pageSize=10`],
[`https://lounge.baemin.com/api/lounge/brands/cards/SNACK?pageNumber=`,`&pageSize=10`],
[`https://lounge.baemin.com/api/lounge/brands/cards/CHINA_ASIAN?pageNumber=`,`&pageSize=10`],
[`https://lounge.baemin.com/api/lounge/brands/cards/JOKBAL?pageNumber=`,`&pageSize=10`]]
let totalobj={};
(async ()=>{
    for(let i of urls){
        let temp=await getData(i)
        Object.assign(totalobj,temp)
    }
    console.log(11)
    console.log(totalobj)
})()

async function getData(url){
    let count=0;
    let arr=Array.from({length:100},()=>[]);
    const fetch = require('node-fetch');
    let obj={};
    await (async()=>{
      let i
      let arr=[]
      let size=0
      do{
        let response = await fetch(url[0]+count+url[1])
        .then(response=>response.json())
        i=Object.keys(response.data).length
        //console.log(response,1)
        size+=response.size
        arr.push(Object.assign({},response.data))
        count++
        //console.log(url[0]+count+url[1],size)
      }while(i>=10) 
      return [arr,size]
    })()
    .then((res)=>{
    let size=res[1]
    res=res[0]
    let arr=Array.from({length:size},()=>[])
    for(let i=0;i<res.length;i++){
      for(let j=0;j<Object.keys(res[i]).length;j++){
        Object.assign(obj,{[res[i][`${j}`].brandName]:{
          id:res[i][`${j}`].id,
          logoUrl:res[i][`${j}`].logoUrl,
          maxDiscountCouponPrice:res[i][`${j}`].maxDiscountCouponPrice,
        }
      })
      }
    }
    //console.log(obj)
    //console.log(Object.keys(obj).length)
    }) 
    return obj
  }
  
  