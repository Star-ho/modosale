import {getDataArray} from './yogiyo' 
import {getData} from './baemin.js'
import {wemefReadData, coupangReadData} from './coupangWemefChangedata.js'
import {makeDBConnet, printAndSendLog, telegramSendMessage} from './modusailUtil.js'

require('dotenv').config();

export async function insertFunc(appname){
   printAndSendLog(`${appname} refresh start! \n time is `)
   let connect = makeDBConnet()
   let obj
   if(appname=='yogiyo'){
      obj= await getDataArray()
   }else if(appname=='baemin'){
      obj=  await getData()
   }else if(appname=='wemef'){
      obj=await wemefReadData()
   }else if(appname=='coupang'){
      obj=await coupangReadData()
   }
   // console.log(obj)
   await connect.query(`delete from data where app="${appname}"`);
   try{
      for(let i of Object.entries(obj) ){
         let isUnifiedName=(await connect.query(`select * from UnifiedName where fakeName='${i[0]}'`))[0][0];
         if(isUnifiedName){
            i[0]=isUnifiedName.realName
         }
         let SqlRes = await connect.query(`select * from Menu where brandName="${i[0]}";`);
         let isDuple = await connect.query(`select * from data where brand="${i[0]}" and app="${appname}";`);
         if(isDuple[0][0]){
            return
         }
         if(SqlRes[0][0]){
            if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
               await connect.query(`insert into data(app,brand,price,img,category,uri) values('${appname}','${i[0]}','${+i[1][0]}','${SqlRes[0][0].imageName}','${SqlRes[0][0].category}','${i[1][1]}')`);    
            }else{
               await connect.query(`insert into data(app,brand,price,img,category,uri) values('${appname}','${i[0]}','${+i[1][0]}','${SqlRes[0][0].imageName}','기타','${i[1][1]}')`);    
            }
         }else{
            await connect.query(`insert into data(app,brand,price,img,category,uri) values('${appname}','${i[0]}','${+i[1][0]}','없음','기타','${i[1][1]}')`);    
         }
         connect.release()
      }
   }catch(e){
      console.log(e)
   }finally{
   }

   connect.destroy()
   printAndSendLog(`${appname} refresh end! \n time is `)
}


export async function deleteFunc(appname){
   let connect = makeDBConnet()

   await connect.query(`delete from data where app="${appname}"`);

   connect.destroy()
}

export async function readDBFunc(appname){
   let data={}
   let connect = await makeDBConnet()

   let SqlRes = await connect.query(`select * from data;`);

   for(let i of SqlRes[0]){
      Object.assign(data,{ [i.id] : [i.brand, i.app,i.img, i.category, +i.price,i.uri ] } )
   }
   // Object.assign(data,{ [i[0]] : [ "coupang",SqlRes[0][0].imageName, "기타", +i[1],i[2] ] } )
   // app: 'coupang',
   // brand: '아티제',
   // price: '4000',
   // img: 'artisee.png',
   // category: '기타',
   // uri: 'undefined'
   connect.destroy()

   printAndSendLog('Read Database! \n time is ')
   return data
}


export async function coupangHandlingFunc(data){
   let connect = makeDBConnet()
   try{
      if(data[3]){
         let SqlRes = await connect.query(`select * from Menu where brandName="${data[0]}";`);
         let isDuple = await connect.query(`select * from data where brand="${data[0]}" and app="coupang";`);
         if(isDuple[0][0]){
            return
         }
         if(SqlRes[0][0]){
            if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
               await connect.query(`insert into data(app,brand,price,img,category,uri) values('coupang','${data[0]}','${+data[1]}','${SqlRes[0][0].imageName}','${SqlRes[0][0].category}','${data[2]}')`);    
            }else{
               await connect.query(`insert into data(app,brand,price,img,category,uri) values('coupang','${data[0]}','${+data[1]}','${SqlRes[0][0].imageName}','기타','${data[2]}')`);    
            }
         }else{
            await connect.query(`insert into data(app,brand,price,img,category,uri) values('coupang','${data[0]}','${+data[1]}','없음','기타','${data[2]}')`);    
         }
      }else{
         await connect.query(`delete from data where brand="${data[0]}" and app='coupang';`);
      }
      
      connect.release()
   
   }catch(e){
      console.log(e)
   }

   
   connect.destroy()
   const request = require('request');
   request('http://127.0.0.1:3000/readDB')
}

