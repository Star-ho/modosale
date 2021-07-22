import {getDataArray} from './yogiyo' 
import {getData} from './baemin.js'
import {wemefReadData, coupangReadData} from './coupangWemefChangedata.js'
import {telegramSendMessage} from './teleWebhook.js'

require('dotenv').config();

export async function insertFunc(appname,date){
   
   let  moment = require('moment');
   require('moment-timezone'); 
   moment.tz.setDefault("Asia/Seoul"); 

   telegramSendMessage(`${appname} refresh start! \n time is ${moment().format()}`)
   console.log(`${appname} refresh start! \n time is ${moment().format()}`)

   const mysql = require('mysql2/promise');
   const pool = mysql.createPool({
      host     : 'localhost',
      port     :  3306,
      user     : process.env.DB_USER||'starho',
      password : process.env.DB_PW||'starho',
      database : 'menu',
      connectionLimit:10
   });

   let connect = await pool.getConnection(conn =>conn)
   let obj
   if(appname=='yogiyo'){
      obj= await getDataArray(date)
   }else if(appname=='baemin'){
      obj=  await getData()
   }else if(appname=='wemef'){
      obj=await wemefReadData()
   }else if(appname=='coupang'){
      obj=await coupangReadData()
   }
   console.log(obj)
   await connect.query(`delete from data where app="${appname}"`);
   try{
      for(let i of Object.entries(obj) ){
         let isUnifiedName=(await connect.query(`select * from UnifiedName where fakeName='${i[0]}'`))[0][0];
         if(isUnifiedName){
            i[0]=isUnifiedName.realName
         }
         let SqlRes = await connect.query(`select * from Menu where brandName="${i[0]}";`);
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

   telegramSendMessage(`${appname} refresh end! \n time is ${moment().format()}`)
   console.log(`${appname} refresh end! \n time is ${moment().format()}`)
}


export async function deleteFunc(appname){
   const mysql = require('mysql2/promise');
   const pool = mysql.createPool({
      host     : 'localhost',
      port     :  3306,
      user     : process.env.DB_USER||'starho',
      password : process.env.DB_PW||'starho',
      database : 'menu',
      connectionLimit:10
   });

   let connect = await pool.getConnection(conn =>conn)
   await connect.query(`delete from data where app="${appname}"`);

   connect.destroy()
}

export async function readDBFunc(appname){
   let data={}
   const mysql = require('mysql2/promise');
   const pool = mysql.createPool({
      host     : 'localhost',
      port     :  3306,
      user     : process.env.DB_USER||'starho',
      password : process.env.DB_PW||'starho',
      database : 'menu',
      connectionLimit:10
   });
   let connect = await pool.getConnection(conn =>conn)
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

   let  moment = require('moment');
   require('moment-timezone');
   moment.tz.setDefault("Asia/Seoul");

   telegramSendMessage('Read Database! \n time is '+moment().format())
   console.log('Read Database! \n time is '+moment().format())
   return data
}


export async function coupangHandlingFunc(data){
   const mysql = require('mysql2/promise');
   const pool = mysql.createPool({
      host     : 'localhost',
      port     :  3306,
      user     : process.env.DB_USER||'starho',
      password : process.env.DB_PW||'starho',
      database : 'menu',
      connectionLimit:10
   });

   let connect = await pool.getConnection(conn =>conn)

   try{
      if(data[3]){
         let SqlRes = await connect.query(`select * from Menu where brandName="${data[0]}";`);
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
         await connect.query(`delete from data where brand="${data[0]}";`);
      }
      
      connect.release()
   
   }catch(e){
      console.log(e)
   }

   
   connect.destroy()
   const request = require('request');
   request('http://127.0.0.1:3000/readDB')
}

