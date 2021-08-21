class Error {
    constructor(message) {
        this.message = message;
    this.name = "Error"; // (name은 내장 에러 클래스마다 다릅니다.)
    }
}

class ParseError extends Error {   
    constructor(message) {
        super(message); // (1)
        this.name = "ValidationError"; // (2)
    }
}
export function koreaMoment(){
    let  moment = require('moment');
    require('moment-timezone'); 
    moment.tz.setDefault("Asia/Seoul"); 
    return moment
}

export function printLog(str){
    let time=koreaMoment()
    console.log(str+time.format())
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
    let connect = await makeDBConnet()

   return connet
  }