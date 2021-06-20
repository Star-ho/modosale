//npx babel-node --presets @babel/env index.js >log 2>&1 &
import {getDataArray} from './yogiyo' 
import {getData} from './baemin.js'
import {wemefReadData, coupangReadData} from './readfile.js'
import {getWemefData} from './imgWemef.js'
import {getCoupangData} from './imgCoupangeats.js'

let data={};
const TelegramBot = require('node-telegram-bot-api')
const token = '1763287615:AAHXTIliTgnhp8Aa7VArEif4bFLhwluW5Mw'
const telebot = new TelegramBot(token, {polling: false})

async function setData(){
   let  moment = require('moment');
   require('moment-timezone'); 
   moment.tz.setDefault("Asia/Seoul"); 

   let date={now:moment() ,end:moment()}

   while(date.end.weekday()!=0){
      date.end.add(1,'day')
   }

   telebot.sendMessage(1052011050, 'refresh start! \n time is '+date.now.format());

   console.log('refresh start! \n time is '+date.now.format())

   const mysql = require('mysql2/promise');
   const pool = mysql.createPool({
      host     : 'localhost',
      port     :  3306,
      user     : process.env.DB_USER||'root',
      password : process.env.DB_PW||'root',
      database : 'menu',
      connectionLimit:10
   });
   data={}
   let connect = await pool.getConnection(conn =>conn)
   await connect.query('delete from data');

   try{
      for(let i of Object.entries(await getDataArray(date))){
         let SqlRes = await connect.query(`select * from Menu where brandName="${i[0]}";`);
         if(SqlRes[0][0]){
            if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
               Object.assign(data,{ [i[0]] : [ "yogiyo",SqlRes[0][0].imageName, SqlRes[0][0].category, +i[1][0],i[1][1]  ] } )
            }else{
               Object.assign(data,{ [i[0]] : [ "yogiyo",SqlRes[0][0].imageName, "기타", +i[1][0],i[1][1]  ] } )
            }
         }else{
            Object.assign(data,{ [i[0]] : [ "yogiyo", "없음", "기타", +i[1][0],i[1][1]  ] } )
         }
         connect.release()
      }
      for(let i of Object.entries(await getData())){
         let SqlRes = await connect.query(`select * from Menu where brandName="${i[0]}";`);
         if(SqlRes[0][0]){
            if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
               Object.assign(data,{ [i[0]] : [ "baemin", SqlRes[0][0].imageName, SqlRes[0][0].category, +i[1][0],i[1][1] ] } )
            }else{
               Object.assign(data,{ [i[0]] : [ "baemin",SqlRes[0][0].imageName, "기타", +i[1][0],i[1][1] ] } )
            }
         }else{
            Object.assign(data,{ [i[0]] : [ "baemin", "없음", "기타", +i[1][0],i[1][1] ] } )
         }
         connect.release()
      }
      for(let i of ( await wemefReadData() ) ){
         let SqlRes = await connect.query(`select * from Menu where brandName="${i[0]}";`);
         if(SqlRes[0][0]){
            if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
               Object.assign(data,{ [i[0]] : [ "wemef", SqlRes[0][0].imageName, SqlRes[0][0].category, +i[1],i[2] ] } )
            }else{
               Object.assign(data,{ [i[0]] : [ "wemef",SqlRes[0][0].imageName, "기타", +i[1],i[2] ] } )
            }
         }else{
            Object.assign(data,{ [i[0]] : [ "wemef", "없음", "기타", +i[1],i[2] ] } )
         }
         //console.log(i)
      }
      for(let i of ( await coupangReadData() ) ){
         let SqlRes = await connect.query(`select * from Menu where brandName="${i[0]}";`);
         if(SqlRes[0][0]){
            if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
               Object.assign(data,{ [i[0]] : [ "coupang", SqlRes[0][0].imageName, SqlRes[0][0].category, +i[1],i[2] ] } )
            }else{
               Object.assign(data,{ [i[0]] : [ "coupang",SqlRes[0][0].imageName, "기타", +i[1],i[2] ] } )
            }
         }else{
            Object.assign(data,{ [i[0]] : [ "coupang", "없음", "기타", +i[1],i[2] ] } )
         }
         //console.log(i)
      }
   }catch(e){
      console.log(e)
   }finally{
   }

   //db에 넣기
   for(let i of Object.entries(data)){
      // console.log(`insert into data(app,brand,price,img,category,uri) values('${i[1][0]}','${i[0]}','${i[1][3]}','${i[1][1]}','${i[1][2]},'${i[1][4]}')`)
      let temp = await connect.query(`insert into data(app,brand,price,img,category,uri) values('${i[1][0]}','${i[0]}','${i[1][3]}','${i[1][1]}','${i[1][2]}','${i[1][4]}')`);    
      //create table data(app varchar(100),brand varchar(100), price int,img varchar(200), category varchar(20),uri  varchar(200) )
   }
   connect.destroy()
   telebot.sendMessage(1052011050, 'refresh end! \n time is '+date.now.format());

   console.log('refresh end! \n time is '+date.now.format())
   readDB()
}

async function changeCoupangWemef(){
   const mysql = require('mysql2/promise');
   const pool = mysql.createPool({
      host     : 'localhost',
      port     :  3306,
      user     : process.env.DB_USER||'root',
      password : process.env.DB_PW||'root',
      database : 'menu',
      connectionLimit:10
   });
   let data={}

   let connect = await pool.getConnection(conn =>conn)
   await connect.query('delete from data where app="coupang"');
   await connect.query('delete from data where app="wemef"');

   for(let i of ( await wemefReadData() ) ){
      let SqlRes = await connect.query(`select * from Menu where brandName="${i[0]}";`);
      if(SqlRes[0][0]){
         if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
            Object.assign(data,{ [i[0]] : [ "wemef", SqlRes[0][0].imageName, SqlRes[0][0].category, +i[1],i[2] ] } )
         }else{
            Object.assign(data,{ [i[0]] : [ "wemef",SqlRes[0][0].imageName, "기타", +i[1],i[2] ] } )
         }
      }else{
         Object.assign(data,{ [i[0]] : [ "wemef", "없음", "기타", +i[1],i[2] ] } )
      }
      //console.log(i)
   }
   for(let i of ( await coupangReadData() ) ){
      let SqlRes = await connect.query(`select * from Menu where brandName="${i[0]}";`);
      if(SqlRes[0][0]){
         if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
            Object.assign(data,{ [i[0]] : [ "coupang", SqlRes[0][0].imageName, SqlRes[0][0].category, +i[1],i[2] ] } )
         }else{
            Object.assign(data,{ [i[0]] : [ "coupang",SqlRes[0][0].imageName, "기타", +i[1],i[2] ] } )
         }
      }else{
         Object.assign(data,{ [i[0]] : [ "coupang", "없음", "기타", +i[1],i[2] ] } )
      }
      //console.log(i)
   }


   for(let i of Object.entries(data)){
      // console.log(`insert into data(app,brand,price,img,category,uri) values('${i[1][0]}','${i[0]}','${i[1][3]}','${i[1][1]}','${i[1][2]},'${i[1][4]}')`)
      let temp = await connect.query(`insert into data(app,brand,price,img,category,uri) values('${i[1][0]}','${i[0]}','${i[1][3]}','${i[1][1]}','${i[1][2]}','${i[1][4]}')`);    
      //create table data(app varchar(100),brand varchar(100), price int,img varchar(200), category varchar(20),uri  varchar(200) )
   }
   connect.destroy()
   let  moment = require('moment');
   require('moment-timezone');
   moment.tz.setDefault("Asia/Seoul");

   console.log('Wemef, coupang data reload! \n time is '+moment().format())
   
   telebot.sendMessage(1052011050, 'Wemef, coupang data reload! \n time is '+moment().format());

   readDB()
}

async function readDB(){
   data={}
   const mysql = require('mysql2/promise');
   const pool = mysql.createPool({
      host     : 'localhost',
      port     :  3306,
      user     : process.env.DB_USER||'root',
      password : process.env.DB_PW||'root',
      database : 'menu',
      connectionLimit:10
   });
   let connect = await pool.getConnection(conn =>conn)
   let SqlRes = await connect.query(`select * from data;`);

   for(let i of SqlRes[0]){
      Object.assign(data,{ [i.brand] : [ i.app,i.img, i.category, +i.price,i.uri ] } )
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

   telebot.sendMessage(1052011050, 'Wemef, coupang data reload! \n time is '+moment().format());

   console.log('Read Database! \n time is '+moment().format())

}

(async()=>{
   setData()
})()

var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(express.static('logo'));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
   if(req.param('ver')=='0.90'){
      res.send(JSON.stringify(data));
   }else{
      res.send(JSON.stringify({error:"error"}));
   }
});

app.get('/refresh', function(req, res) {
   (async()=>{
      await setData()
   })()
   res.send("refresh!");
});

app.get('/chageCW', function(req, res) {
   (async()=>{
      await changeCoupangWemef()
   })()
   res.send("chageCW");
});


app.get('/readdb', function(req, res) {
   (async()=>{
      await readDB()
   })()
   res.send("readDB!!");
});

app.get('/showimg', async function(req, res) {
   let retval=[]
   retval.push(...await getWemefData())
   retval.push(...await getCoupangData())
   let html=`
   <html><head></head><body>
   `
   retval.forEach(v=>{
      html+=`<div style="float: left;margin: 10;width: 45%;" ><img style="float: left" src="${v.img}" width="200" height="100" />
      `
      if(v.title){
         if(v.title.indexOf('_')){
            v.title=v.title.split('_')[0]
         }
         html+=`<p>${v.title}||${v.link}</p>
         `
      }
      html+='</div>\n'
   })
   html+=`</body></html>`
   res.send(html);
   
});

app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

var server = app.listen(3000, function(){
   console.log("Express server has started on port 3000")
})