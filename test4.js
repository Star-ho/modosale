
watchBaeminData()

setInterval(()=>watchBaeminData(),1000*120);

async function watchBaeminData(){
    let str=''
    let arr=Array.from({length:100},()=>[]);
    const fetch = require('node-fetch');
    let obj={};
    let res =await (async()=>{
    let i
    let count=0;
    let arr=[]
    let size=0
    do{
        let response = await fetch(`https://lounge.baemin.com/api/lounge/brands/cards/TODAY_BENEFITS?pageNumber=${count}&pageSize=100`)
        .then(response=>response.json())
        i=response.size
        size+=response.size
        arr.push(Object.assign({},response.data))
        for(let i of response.data){
            str+=i.brandName
        }
        
        count++
    }while(i>=10) 
    return [arr,size]
    })()
    console.log(str)
    console.log('*****'+res[1]+'*****')
    // console.log(res)
}