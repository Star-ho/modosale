import {wemefReadData} from './readfile.js'


(async()=>{
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
 
})()
