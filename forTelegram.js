//npx babel-node --presets @babel/env  forTelegram.js > ./log/teleLog 2>&1 &    
//disown -a
//끝

import { telegramSendMessage,makeDBConnet } from './lib/modusailUtil';
require('dotenv').config({ path: require('find-config')('.env') })
const TelegramBot = require('node-telegram-bot-api');
const token = '1811045229:AAHsI7UbFW3m04ly8cVxwnm-m2oHbMXfHdI'
let telebot = new TelegramBot(token, {polling: true})

//https://api.telegram.org/bot1811045229:AAHsI7UbFW3m04ly8cVxwnm-m2oHbMXfHdI/getUpdates

telebot.onText(/^(help)|^(h)/, (msg) => {
    const chatId = 1052011050;
    if(msg.chat.id==chatId){
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

        couapngAdd
        ex)
        coupangAdd
        버거킹 4000 8032
        브랜드 가격 ID

        /refresh
        /chageCoupang
        /chageWemef
        /readdb
        /showimg

        ---------------------------
        `);
    }
});


telebot.onText(/^allselect/, async (msg) => {
    const chatId = 1052011050;
    if(msg.chat.id==chatId){
        let connect = await makeDBConnet()
        const chatId = 1052011050;
        let res=''
        let SQLRes
        try{
            SQLRes = (await connect.query(`select * from data;`))[0];
        }catch(e){
            telebot.sendMessage(chatId,e.stringify())
        }
        for(let i of SQLRes){
            res+=i.app+' '+i.brand+' '+i.price+'\n'
        }

        telebot.sendMessage(chatId,res)
    }
});


telebot.onText(/^select/, async (msg) => {
    const chatId = 1052011050;
    if(msg.chat.id==chatId){
        const chatId = 1052011050;
        let connect = await makeDBConnet()
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
            telebot.sendMessage(chatId,e.stringify())
        }
        if(res){
            telebot.sendMessage(chatId,res)
        }else{
            telebot.sendMessage(chatId,'error')
        }
    }
});


telebot.onText(/^appselect/, async (msg) => {
    const chatId = 1052011050;
    if(msg.chat.id==chatId){

        const chatId = 1052011050;
        let connect = await makeDBConnet()
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
    }
});


telebot.onText(/^update/, async (msg) => {
    const chatId = 1052011050;
    if(msg.chat.id==chatId){
        const chatId = 1052011050;
        let connect = await makeDBConnet()
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
        const fetch = require('node-fetch');
        fetch('http://127.0.0.1:3000/readDB').catch((e)=>{
            console.log(e)
            telegramSendMessage('for telegram error!\n')
        })
    }
});

telebot.onText(/^insert/, async (msg) => {
    const chatId = 1052011050;
    if(msg.chat.id==chatId){
        const chatId = 1052011050;
        let res
        try{
            let connect = await makeDBConnet()
            const command = msg.text.split('\n')
            let data=command[1].split(' ')
            if(data[0]=='coupang'&&data[3]==undefined){
                var qs = require('querystring');
                data.push('coupangeats://SearchResult?keyword='+qs.escape(data[1])+'&sourceType=Promotion')
            }
            console.log(data)
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
        const fetch = require('node-fetch');
        fetch('http://127.0.0.1:3000/readDB').catch((e)=>{
            console.log(e)
            telegramSendMessage('for telegram error!\n')
        })
    }
});

telebot.onText(/^delete/, async (msg) => {
    const chatId = 1052011050;
    if(msg.chat.id==chatId){
        const chatId = 1052011050;
        let connect = await makeDBConnet()
        let res
        try{
            const command = msg.text.split('\n')
            let data=command[1].split(' ')
        
            res = await connect.query(`Delete from data where brand="${data[0]}" and app="${data[1]}"`);
        }catch(e){
            telebot.sendMessage(chatId,e)
        }
        telebot.sendMessage(chatId,JSON.stringify(res))
        const fetch = require('node-fetch');
        fetch('http://127.0.0.1:3000/readDB').catch((e)=>{
            console.log(e)
            telegramSendMessage('for telegram error!\n')
        })
    }
});

telebot.onText(/^coupangAdd/, async (msg) => {
    var fs = require('fs')
    const command = msg.text.split('\n')
    let data=command[1].split(' ')
    let itemList=fs.readFileSync('textfile/itemlistCoupang', 'utf8')
    const {EOL} = require('os');
    itemList=itemList.split(EOL).map(v=>v.split('||'))
    let isDuple=itemList.filter(v=>v[2]==123)
    
    if(isDuple.length){
      itemList=itemList.map(v=>{
        if(v[2]==data[2]){
          v=[data[0],data[1],data[2]]
        }
        return v
      })
      telegramSendMessage('Coupang itemlist update!')
    }else{
      itemList.push([data[0],data[1],data[2]])
      telegramSendMessage('Coupang itemlist add!')
    }
    itemList=itemList.map(v=>v.join('||')).join(EOL)
    fs.writeFileSync('textfile/itemlistCoupang', itemList, ()=>null)
});

