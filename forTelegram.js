const TelegramBot = require('node-telegram-bot-api')
const token = '1811045229:AAHsI7UbFW3m04ly8cVxwnm-m2oHbMXfHdI'
const telebot = new TelegramBot(token, {polling: true})

telebot.onText(/(help)|(h)/, (msg) => {
    const chatId = msg.chat.id;
    telebot.sendMessage(chatId, `---------------------------
    데이터양식
    select
    select * from data where brand=[ data[i] ];
    selectall
    select * from data;
    insert

    update
    update data SET [ data[0] ]=[ data[1] ] where brand=[ data[2] ] and app=[ data[3] ]
    ---------------------------
     `);
});


telebot.onText(/^selectall/, async (msg) => {
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
    const chatId = msg.chat.id;
    let res=''
    let SQLRes
    try{
        SQLRes = (await connect.query(`select * from data;`))[0];
    }catch(e){
        telebot.sendMessage(chatId,e)
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
       user     : process.env.DB_USER||'root',
       password : process.env.DB_PW||'root',
       database : 'menu',
       connectionLimit:10
    });
    const chatId = msg.chat.id;
    let connect = await pool.getConnection(conn =>conn)
    const command = msg.text.split('\n')
    let res=''
    let data=command[1].split(' ')
    try{
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


telebot.onText(/^update/, async (msg) => {
    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
       host     : 'localhost',
       port     :  3306,
       user     : process.env.DB_USER||'root',
       password : process.env.DB_PW||'root',
       database : 'menu',
       connectionLimit:10
    });
    const chatId = msg.chat.id;
    let connect = await pool.getConnection(conn =>conn)
    const command = msg.text.split('\n')
    let res
    let data=command[1].split(' ')
    try{
        res = (await connect.query(`update data SET ${data[0]}=${+data[1]} where brand="${data[2]}" and app="${data[3]}" `));
        console.log(`update data SET ${data[0]}=${+data[1]} where brand="${data[2]}" and app="${data[3]}" `)
    }catch(e){
        telebot.sendMessage(chatId,e)

    }
    telebot.sendMessage(chatId,JSON.stringify(res))
});

telebot.onText(/^insert/, async (msg) => {
    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
       host     : 'localhost',
       port     :  3306,
       user     : process.env.DB_USER||'root',
       password : process.env.DB_PW||'root',
       database : 'menu',
       connectionLimit:10
    });
    const chatId = msg.chat.id;
    let connect = await pool.getConnection(conn =>conn)
    const command = msg.text.split('\n')
    let res
    let data=command[1].split(' ')
    try{
        res = await connect.query(`insert into data(app,brand,price,img,category,uri) values('${data[0]}','${data[1]}','${data[2]}','없음','${data[3]}','${data[4]}')`);
    }catch(e){
        telebot.sendMessage(chatId,e)
    }
    telebot.sendMessage(chatId,JSON.stringify(res))
});

telebot.onText(/^delete/, async (msg) => {
    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
       host     : 'localhost',
       port     :  3306,
       user     : process.env.DB_USER||'root',
       password : process.env.DB_PW||'root',
       database : 'menu',
       connectionLimit:10
    });
    const chatId = msg.chat.id;
    let connect = await pool.getConnection(conn =>conn)
    const command = msg.text.split('\n')
    let res
    let data=command[1].split(' ')
    try{
        res = await connect.query(`Delete from data where brand="${data[0]}" and app="${data[1]}"`);
    }catch(e){
        telebot.sendMessage(chatId,e)
    }
    telebot.sendMessage(chatId,JSON.stringify(res))
});
