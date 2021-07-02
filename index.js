//npx babel-node --presets @babel/env index.js >log 2>&1 &
//disown -a
require('dotenv').config({ path: require('find-config')('.env') })
import {getDataArray} from './yogiyo' 
import {getData} from './baemin.js'
import {wemefReadData, coupangReadData} from './readfile.js'
import {getWemefData} from './imgWemef.js'
import {getCoupangData} from './imgCoupangeats.js'
import {telegramSendMessage} from './teleWebhook.js'

let data={};

async function setYogiyo(){
   let  moment = require('moment');
   require('moment-timezone'); 
   moment.tz.setDefault("Asia/Seoul"); 

   let date={now:moment() ,end:moment()}

   while(date.end.weekday()!=0){
      date.end.add(1,'day')
   }

   telegramSendMessage('yogiyo refresh start! \n time is '+date.now.format())

   console.log('yogiyo refresh start! \n time is '+date.now.format())

   const mysql = require('mysql2/promise');
   const pool = mysql.createPool({
      host     : 'localhost',
      port     :  3306,
      user     : process.env.DB_USER||'starho',
      password : process.env.DB_PW||'starho',
      database : 'menu',
      connectionLimit:10
   });
   data={}
   let connect = await pool.getConnection(conn =>conn)
   await connect.query('delete from data where app="yogiyo"');

   try{
      for(let i of Object.entries(await getDataArray(date))){
         let SqlRes = await connect.query(`select * from Menu where brandName="${i[0]}";`);
         if(SqlRes[0][0]){
            if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
               await connect.query(`insert into data(app,brand,price,img,category,uri) values('yogiyo','${i[0]}','${+i[1][0]}','${SqlRes[0][0].imageName}','${SqlRes[0][0].category}','${i[1][1]}')`);    
            }else{
               await connect.query(`insert into data(app,brand,price,img,category,uri) values('yogiyo','${i[0]}','${+i[1][0]}','${SqlRes[0][0].imageName}','기타','${i[1][1]}')`);    
            }
         }else{
            await connect.query(`insert into data(app,brand,price,img,category,uri) values('yogiyo','${i[0]}','${+i[1][0]}','없음','기타','${i[1][1]}')`);    
         }
         
         connect.release()
      }
   }catch(e){
      console.log(e)
   }finally{
   }

   connect.destroy()
   telegramSendMessage('yogiyo refresh end! \n time is '+date.now.format())
   
   console.log('yogiyo refresh end! \n time is '+date.now.format())
   readDB()
}


async function setBaemin(){
   let  moment = require('moment');
   require('moment-timezone'); 
   moment.tz.setDefault("Asia/Seoul"); 

   let date={now:moment()}

   telegramSendMessage('baemin refresh start! \n time is '+date.now.format())

   console.log('baemin refresh start! \n time is '+date.now.format())

   const mysql = require('mysql2/promise');
   const pool = mysql.createPool({
      host     : 'localhost',
      port     :  3306,
      user     : process.env.DB_USER||'starho',
      password : process.env.DB_PW||'starho',
      database : 'menu',
      connectionLimit:10
   });
   data={}
   let connect = await pool.getConnection(conn =>conn)
   await connect.query('delete from data where app="baemin"');

   try{
      for(let i of Object.entries(await getData())){
         let SqlRes = await connect.query(`select * from Menu where brandName="${i[0]}";`);
         if(SqlRes[0][0]){
            if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
               await connect.query(`insert into data(app,brand,price,img,category,uri) values('baemin','${i[0]}','${+i[1][0]}','${SqlRes[0][0].imageName}','${SqlRes[0][0].category}','${i[1][1]}')`);    
            }else{
               await connect.query(`insert into data(app,brand,price,img,category,uri) values('baemin','${i[0]}','${+i[1][0]}','${SqlRes[0][0].imageName}','기타','${i[1][1]}')`);    
            }
         }else{
            await connect.query(`insert into data(app,brand,price,img,category,uri) values('baemin','${i[0]}','${+i[1][0]}','없음','기타','${i[1][1]}')`);
         }
         connect.release()
      }
      data={}
   }catch(e){
      console.log(e)
   }finally{
   }

   connect.destroy()
   telegramSendMessage('baemin refresh end! \n time is '+date.now.format())
   
   console.log('baemin refresh end! \n time is '+date.now.format())
   readDB()
}

async function changeWemef(){
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
   await connect.query('delete from data where app="wemef"');

   for(let i of ( await wemefReadData() ) ){
      let SqlRes = await connect.query(`select * from Menu where brandName="${i[0]}";`);
      if(SqlRes[0][0]){
         if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
            await connect.query(`insert into data(app,brand,price,img,category,uri) values('wemef','${i[0]}','${+i[1]}','${SqlRes[0][0].imageName}','${SqlRes[0][0].category}','${i[2]}')`);   
         }else{
            await connect.query(`insert into data(app,brand,price,img,category,uri) values('wemef','${i[0]}','${+i[1]}','${SqlRes[0][0].imageName}','기타','${i[2]}')`);    
         }
      }else{
         await connect.query(`insert into data(app,brand,price,img,category,uri) values('wemef','${i[0]}','${+i[1]}','없음','기타','${i[2]}')`);
      }
      //console.log(i)
   }

   connect.destroy()
   let  moment = require('moment');
   require('moment-timezone');
   moment.tz.setDefault("Asia/Seoul");

   console.log('coupang data reload! \n time is '+moment().format())
   
   telegramSendMessage('coupang data reload! \n time is '+moment().format())

   readDB()
}

async function changeCoupang(){
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
   await connect.query('delete from data where app="coupang"');

   for(let i of ( await coupangReadData() ) ){
      let SqlRes = await connect.query(`select * from Menu where brandName="${i[0]}";`);
      if(SqlRes[0][0]){
         if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
            await connect.query(`insert into data(app,brand,price,img,category,uri) values('coupang','${i[0]}','${+i[1]}','${SqlRes[0][0].imageName}','${SqlRes[0][0].category}','${i[2]}')`);   
         }else{
            await connect.query(`insert into data(app,brand,price,img,category,uri) values('coupang','${i[0]}','${+i[1]}','${SqlRes[0][0].imageName}','기타','${i[2]}')`);    
         }
      }else{
         await connect.query(`insert into data(app,brand,price,img,category,uri) values('coupang','${i[0]}','${+i[1]}','없음','기타','${i[2]}')`);
      }
      //console.log(i)
   }

   connect.destroy()
   let  moment = require('moment');
   require('moment-timezone');
   moment.tz.setDefault("Asia/Seoul");

   console.log('Wemef data reload! \n time is '+moment().format())
   telegramSendMessage('Wemef data reload! \n time is '+moment().format())
   readDB()
}


async function readDB(){
   data={}
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

   telegramSendMessage('Wemef, coupang data reload! \n time is '+moment().format())

   console.log('Read Database! \n time is '+moment().format())

}

//시작 하는곳
let intervalId

setyogiyoBaemin()

async function setyogiyoBaemin(){
   setYogiyo()
   setBaemin()
   let data={baemin:[]}
   for(let i of Object.entries(await getData())){
      data.baemin.push(JSON.stringify(i))
   }
   intervalId=setInterval(async()=>await watchBaeminData(data),1000*60*20);
}

async function watchBaeminData(data){
   let baemin=[]

   for(let i of Object.entries(await getData())){
      baemin.push(JSON.stringify(i))
   }
   for(let i of baemin){
      if(!data.baemin.includes(i)){
         data.baemin=baemin.slice()
         setBaemin()
      }else{
         clearInterval(intervalId)
      }
   }
}

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
   setyogiyoBaemin()
   res.send("refresh!");
});

app.get('/chageCoupang', function(req, res) {
   (async()=>{
      await changeCoupang()
   })()
   res.send("chageCW");
});

app.get('/chageWemef', function(req, res) {
   (async()=>{
      await changeWemef()
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