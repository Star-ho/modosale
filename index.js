//npx babel-node --presets @babel/env index.js

import {getDataArray} from './yogiyo' 
import {getData} from './baemin.js'

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
   
   for(let i of Object.entries(await getDataArray())){
      let SqlRes = await connect.query(`select * from menu where brandName="${i[0]}";`);
      if(SqlRes[0][0]){
         Object.assign(data,{ [i[0]] : [ "yogiyo",SqlRes[0][0].imageName, SqlRes[0][0].category, +i[1] ] } )
      }else{
         Object.assign(data,{ [i[0]] : [ "yogiyo", "없음", "없음", +i[1] ] } )
      }
      connect.release()
   }
   for(let i of Object.entries(await getData())){
      let SqlRes = await connect.query(`select * from menu where brandName="${i[0]}";`);
      console.log(`select * from menu where brandName="${i[0]}";`)
      if(SqlRes[0][0]){
         Object.assign(data,{ [i[0]] : [ "baemin", SqlRes[0][0].imageName, SqlRes[0][0].category, +i[1] ] } )
      }else{
         Object.assign(data,{ [i[0]] : [ "baemin", "noimage.png", "기타", +i[1] ] } )
      }
      connect.release()
   }
   //Object.assign(data,{baemin:})
   connect.destroy()
   //console.log(data)
})()
var http = require("http");


http.createServer(function (request, response) {

   // Set the response HTTP header with HTTP status and Content type
   response.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});

   // Send the response body "Hello World"
   response.end(JSON.stringify(data));
}).listen(3000);
