import {getData} from './baemin.js'

let intervalId

async function watchBaeminData(data){
    let baemin=[]
 
    for(let i of Object.entries(await getData())){
       baemin.push(JSON.stringify(i))
    }
    for(let i of baemin){
       if(!data.baemin.includes(i)){
          data.baemin=baemin.slice()
          //setBaemin()
       }else{
          clearInterval(intervalId)
       }
    }
 }

(async()=>{
   let data={baemin:[]}
   for(let i of Object.entries(await getData())){
      data.baemin.push(JSON.stringify(i))
   }
   console.log(111)
   console.log(watchBaeminData)
   intervalId=setInterval( () => watchBaeminData(data),1000*60*20);
})()

