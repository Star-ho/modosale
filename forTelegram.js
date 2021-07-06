//npx babel-node --presets @babel/env  forTelegram.js >teleLog 2>&1 &    
//disown -a
require('dotenv').config({ path: require('find-config')('.env') })
const TelegramBot = require('node-telegram-bot-api')
const token = '1811045229:AAHsI7UbFW3m04ly8cVxwnm-m2oHbMXfHdI'
let telebot = new TelegramBot(token, {polling: true})
import { coupangReadData} from './readfile.js'

//https://api.telegram.org/bot1811045229:AAHsI7UbFW3m04ly8cVxwnm-m2oHbMXfHdI/getUpdates

telebot.onText(/^(help)|^(h)/, (msg) => {
    const chatId = 1052011050;
    telebot.sendMessage(chatId, `---------------------------
    데이터양식
    select
    select * from data where brand=[ data[i] ];
    ex)
    select
    아티제

    selectall
    select * from data;
    ex)
    selectall

    insert
    "insert into data(app,brand,price,img,category,uri) values('[data[0]]','[data[1]]','[data[2]]','DB에서 할당','DB에서 할당','[data[3]]')"
    ex)
    insert
    yogiyo 아티제 4000
    baemin://
    yogiyoapp://open
    coupangeats://
    cupping://doCommand
    
    update
    update data SET price=[ data[0] ] where brand=[ data[1] ] and app=[ data[2] ]
    ex)
    update
    4000 아티제 yogiyo

    delete
    'Delete from data where brand="[data[0]]" and app="[data[1]]"'
    ex)
    delete
    아티제 yogiyo

    loadCoupang
    쿠팡로드

    unloadCoupang
    쿠핑언로드

    /refresh
    /chageCoupang
    /chageWemef
    /readdb
    http://sailmoa.com/showimg
    ---------------------------
    `);
});


telebot.onText(/^allselect/, async (msg) => {
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
    const chatId = 1052011050;
    let res=''
    let SQLRes
    try{
        SQLRes = (await connect.query(`select * from data;`))[0];
    }catch(e){
        telebot.sendMessage(chatId,'11')
    }
    for(let i of SQLRes){
        res+=i.app+' '+i.brand+' '+i.price+'\n'
    }

    telebot.sendMessage(chatId,res)
});


telebot.onText(/^select/, async (msg) => {
    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
    host     : 'localhost',
    port     :  3306,
    user     : process.env.DB_USER||'starho',
    password : process.env.DB_PW||'starho',
    database : 'menu',
    connectionLimit:10
    });
    const chatId = 1052011050;
    let connect = await pool.getConnection(conn =>conn)
    let res=''
    try{
        const command = msg.text.split('\n')
        let data=command[1].split(' ')
    
        for(let i=0;i<data.length;i++){
            let SQLRes = (await connect.query(`select * from data where brand="${data[i]}";`))[0];
            for(let i of SQLRes){
                res+=i.app+' '+i.brand+' '+i.price+'\n'
            }
        }
    }catch(e){
        telebot.sendMessage(chatId,e)
    }
    if(res){
        telebot.sendMessage(chatId,res)
    }else{
        telebot.sendMessage(chatId,'error')
    }
});


telebot.onText(/^appselect/, async (msg) => {
    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
    host     : 'localhost',
    port     :  3306,
    user     : process.env.DB_USER||'starho',
    password : process.env.DB_PW||'starho',
    database : 'menu',
    connectionLimit:10
    });
    const chatId = 1052011050;
    let connect = await pool.getConnection(conn =>conn)
    let res=''
    try{
        const command = msg.text.split('\n')
        let data=command[1].split(' ')
    
        for(let i=0;i<data.length;i++){
            let SQLRes = (await connect.query(`select * from data where app="${data[i]}";`))[0];
            for(let i of SQLRes){
                res+=i.app+' '+i.brand+' '+i.price+'\n'
            }
        }
    }catch(e){
        telebot.sendMessage(chatId,e)
    }
    if(res){
        telebot.sendMessage(chatId,res)
    }else{
        telebot.sendMessage(chatId,'error')
    }
});


telebot.onText(/^update/, async (msg) => {
    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
    host     : 'localhost',
    port     :  3306,
    user     : process.env.DB_USER||'starho',
    password : process.env.DB_PW||'starho',
    database : 'menu',
    connectionLimit:10
    });
    const chatId = 1052011050;
    let connect = await pool.getConnection(conn =>conn)
    let res
    try{
        const command = msg.text.split('\n')
        let data=command[1].split(' ')
        res = (await connect.query(`update data SET price=${+data[0]} where brand="${data[1]}" and app="${data[2]}" `));
        console.log(`update data SET price=${+data[0]} where brand="${data[1]}" and app="${data[2]}" `)
    }catch(e){
        telebot.sendMessage(chatId,e)
    }
    telebot.sendMessage(chatId,JSON.stringify(res))
    const request = require('request');
    request('http://127.0.0.1:3000/readDB')
});

telebot.onText(/^insert/, async (msg) => {
    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
    host     : 'localhost',
    port     :  3306,
    user     : process.env.DB_USER||'starho',
    password : process.env.DB_PW||'starho',
    database : 'menu',
    connectionLimit:10
    });
    const chatId = 1052011050;
    let res
    try{
        let connect = await pool.getConnection(conn =>conn)
        const command = msg.text.split('\n')
        let data=command[1].split(' ')
        if(data[0]=='coupang'){
            var qs = require('querystring');
            data.push('coupangeats://SearchResult?keyword='+qs.escape(data[1])+'&sourceType=Promotion')
        }
        let SqlRes = await connect.query(`select * from Menu where brandName="${data[1]}";`);
         if(SqlRes[0][0]){
            if(SqlRes[0][0].category=="치킨"||SqlRes[0][0].category=="피자"||SqlRes[0][0].category=="한식"||SqlRes[0][0].category=="양식"){
               await connect.query(`insert into data(app,brand,price,img,category,uri) values('${data[0]}','${data[1]}','${+data[2]}','${SqlRes[0][0].imageName}','${SqlRes[0][0].category}','${data[3]}')`);    
            }else{
               await connect.query(`insert into data(app,brand,price,img,category,uri) values('${data[0]}','${data[1]}','${+data[2]}','${SqlRes[0][0].imageName}','기타','${data[3]}')`);    
            }
         }else{
            await connect.query(`insert into data(app,brand,price,img,category,uri) values('${data[0]}','${data[1]}','${+data[2]}','없음','기타','${data[3]}')`);    
         }
        
        
    }catch(e){
        telebot.sendMessage(chatId,e)
    }
    telebot.sendMessage(chatId,JSON.stringify(res))
    const request = require('request');
    request('http://127.0.0.1:3000/readDB')
});

telebot.onText(/^delete/, async (msg) => {
    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
    host     : 'localhost',
    port     :  3306,
    user     : process.env.DB_USER||'starho',
    password : process.env.DB_PW||'starho',
    database : 'menu',
    connectionLimit:10
    });
    const chatId = 1052011050;
    let connect = await pool.getConnection(conn =>conn)
    let res
    try{
        const command = msg.text.split('\n')
        let data=command[1].split(' ')
    
        res = await connect.query(`Delete from data where brand="${data[0]}" and app="${data[1]}"`);
    }catch(e){
        telebot.sendMessage(chatId,e)
    }
    telebot.sendMessage(chatId,JSON.stringify(res))
    const request = require('request');
    request('http://127.0.0.1:3000/readDB')
});

telebot.onText(/^loadCoupang/, async (msg) => {
    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
       host     : 'localhost',
       port     :  3306,
       user     : process.env.DB_USER||'starho',
       password : process.env.DB_PW||'starho',
       database : 'menu',
       connectionLimit:10
    });
    const chatId = 1052011050;
    let connect = await pool.getConnection(conn =>conn)
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
 
    telebot.sendMessage(chatId,"coupang DataLoad!!")
    const request = require('request');
    request('http://127.0.0.1:3000/readDB')
})


telebot.onText(/^unloadCoupang/, async (msg) => {
    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
    host     : 'localhost',
    port     :  3306,
    user     : process.env.DB_USER||'starho',
    password : process.env.DB_PW||'starho',
    database : 'menu',
    connectionLimit:10
    });
    const chatId = 1052011050;
    let connect = await pool.getConnection(conn =>conn)
    let res
    try{
        res = await connect.query(`Delete from data where app="coupang"`);
    }catch(e){
        telebot.sendMessage(chatId,e)
    }
    telebot.sendMessage(chatId,JSON.stringify(res))
    const request = require('request');
    request('http://127.0.0.1:3000/readDB')
});