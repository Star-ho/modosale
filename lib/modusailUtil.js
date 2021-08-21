export function koreaMoment(){
    let  moment = require('moment');
    require('moment-timezone'); 
    moment.tz.setDefault("Asia/Seoul"); 
    return moment
}

koreaMoment()

export function printLog(str){
    let time=koreaMoment()
    console.log(str+time().format())
}

export function printAndSendLog(str){
    telegramSendMessage(str)
    printLog(str)
}

export async function telegramSendMessage(text){
    const fetch = require('node-fetch');
    if(typeof(text)=='string'){
        while(text.includes('&')){
        text=text.replace('&','||')
        }
    }
    let sendURL=`https://api.telegram.org/bot1811045229:AAHsI7UbFW3m04ly8cVxwnm-m2oHbMXfHdI/sendMessage?chat_id=1052011050&text=${encodeURI(text)}`
    let deleteURL=`https://api.telegram.org/bot1811045229:AAHsI7UbFW3m04ly8cVxwnm-m2oHbMXfHdI/setWebhook?url=`
    await fetch(sendURL)
    await fetch(deleteURL)
}

export async function makeDBConnet(){
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


   return connect
  }