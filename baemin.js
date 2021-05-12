const cheerio = require("cheerio"); //baemin://./frBrandDetail?frBrandDetail_brandHomeId=98&frBrandDetail_dongCode=000&frBrandDetail_title=%EC%9D%BC%EB%AF%B8%EB%A6%AC%EA%B8%88%EA%B3%84%EC%B0%9C%EB%8B%AD
const fetch = require('node-fetch');

let arr=Array.from({length:100},()=>[]);
(async()=>{
    let i=11
    let count=0;
    let res={}
    let arr=[]
    let size=0
    while(i>9){
    let response = await fetch(`https://lounge.baemin.com/api/lounge/brands/cards/TODAY_BENEFITS?pageNumber=${count}&pageSize=100`)
    .then(response=>response.json())
    i=response.size
    size+=response.size
    arr.push(Object.assign({},response.data))
    count++
    }
    return [arr,size]
})()
.then((res)=>{
  //console.log(res)  
  let k=0;
  let size=res[1]
  res=res[0]
  let obj={}
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
  console.log(obj)
  console.log(Object.keys(obj).length)
  
})

