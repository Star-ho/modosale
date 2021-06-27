 //baemin://./frBrandDetail?frBrandDetail_brandHomeId=98

 //export { getData};

  export async function getData(){
    let cateArr=['PIZZA','FASTFOOD','KOREAN','CAFE','JOKBAL','SNACK','CHICKEN','STEAMED_MIDNIGHT','CHINA_ASIAN']
    const fetch = require('node-fetch');
    let obj={};
    let res =await (async()=>{
        let i
        let count=0;
        let arr=[]
        let size=0
        for(let j=0;j<cateArr.length;j++){
            do{
                let response = await fetch(`https://lounge.baemin.com/api/lounge/brands/cards/${cateArr[j]}?pageNumber=${count}&pageSize=10`)
                .then(response=>response.json())
                i=response.data.length
                size+=response.size
                arr.push(Object.assign({},response.data))
                count++
            }while(i>=10) 
            count=0
        }
        return [arr,size]
    })()
  //console.log(res)  
  let k=0;
  let size=res[1]
  res=res[0]
  for(let i=0;i<res.length;i++){
    for(let j=0;j<Object.keys(res[i]).length;j++){
      Object.assign(obj,{[res[i][`${j}`].brandName]:{
        id:res[i][`${j}`].id,
        logoUrl:res[i][`${j}`].logoUrl,
        maxDiscountCouponPrice:res[i][`${j}`].maxDiscountCouponPrice,
        brandId:res[i][`${j}`].id
      }
    })
    }
  }
  //console.log(Object.keys(obj).length)
  // console.log(obj)
  res={}
  for(let i of Object.entries(obj)){
    if(i[1].maxDiscountCouponPrice){
      Object.assign(res, { [i[0]] : [i[1].maxDiscountCouponPrice,'baemin://./frBrandDetail?frBrandDetail_brandHomeId='+i[1].brandId]} )
    }
  }
   //console.log(res)
  return res
}

