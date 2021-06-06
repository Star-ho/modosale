//npx babel-node --presets @babel/env index.js

//import {getDataArray} from './yogiyo' 
import {getData} from './baemin.js'
import {wemefReadData, coupangReadData} from './readfile.js'

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
host     : 'localhost',
port     :  3306,
user     : 'root',
password : 'root',
database : 'menu',
connectionLimit:4
});

let data={};

(async ()=>{
   let connect= await pool.getConnection(conn =>conn)
   
   // for(let i of Object.entries(await getDataArray())){
   //    let SqlRes = await connect.query(`select * from menu where brandName="${i[0]}";`);
   //    if(SqlRes[0][0]&&+i[1]){
   //       if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
   //          Object.assign(data,{ [i[0]] : [ "yogiyo",SqlRes[0][0].imageName, SqlRes[0][0].category, +i[1] ] } )
   //       }else{
   //          Object.assign(data,{ [i[0]] : [ "yogiyo",SqlRes[0][0].imageName, "기타", +i[1] ] } )
   //       }
   //    }else{
   //       Object.assign(data,{ [i[0]] : [ "yogiyo", "없음", "기타", +i[1] ] } )
   //    }
   //    connect.release()
   // }
   for(let i of Object.entries(await getData())){
      let SqlRes = await connect.query(`select * from menu where brandName="${i[0]}";`);
      if(SqlRes[0][0]){
         if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
            Object.assign(data,{ [i[0]] : [ "baemin", SqlRes[0][0].imageName, SqlRes[0][0].category, +i[1] ] } )
         }else{
            Object.assign(data,{ [i[0]] : [ "baemin",SqlRes[0][0].imageName, "기타", +i[1] ] } )
         }
      }else{
         Object.assign(data,{ [i[0]] : [ "baemin", "없음", "기타", +i[1] ] } )
      }
      connect.release()
   }
   for(let i of ( await wemefReadData() ) ){
      let SqlRes = await connect.query(`select * from menu where brandName="${i[0]}";`);
      if(SqlRes[0][0]){
         if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
            Object.assign(data,{ [i[0]] : [ "wemef", SqlRes[0][0].imageName, SqlRes[0][0].category, +i[2] ] } )
         }else{
            Object.assign(data,{ [i[0]] : [ "wemef",SqlRes[0][0].imageName, "기타", +i[2] ] } )
         }
      }else{
         Object.assign(data,{ [i[0]] : [ "wemef", "없음", "기타", +i[2] ] } )
      }
      //console.log(i)
   }
   for(let i of ( await coupangReadData() ) ){
      let SqlRes = await connect.query(`select * from menu where brandName="${i[0]}";`);
      if(SqlRes[0][0]){
         if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
            Object.assign(data,{ [i[0]] : [ "coupang", SqlRes[0][0].imageName, SqlRes[0][0].category, +i[2] ] } )
         }else{
            Object.assign(data,{ [i[0]] : [ "coupang",SqlRes[0][0].imageName, "기타", +i[2] ] } )
         }
      }else{
         Object.assign(data,{ [i[0]] : [ "coupang", "없음", "기타", +i[2] ] } )
      }
      //console.log(i)
   }
   connect.destroy()
   console.log(data)
})()


// var express = require('express');
// var app = express();
// const bodyParser = require('body-parser');

// app.use(express.static('logo'));
// // respond with "hello world" when a GET request is made to the homepage
// app.get('/', function(req, res) {
//    if(req.param('ver')=='0.90'){
//       res.send(JSON.stringify(data));
//    }else{
//       res.send(JSON.stringify({error:"error"}));
//    }
// });
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// var server = app.listen(3000, function(){
//    console.log("Express server has started on port 3000")
// })