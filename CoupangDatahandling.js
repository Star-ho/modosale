import {telegramSendMessage} from './teleWebhook.js'

const importMsg='****************************************'
export function coupangDataHandling(obj){
    require('dotenv').config();
    let fs = require('fs');
    let res=[]
    let data=fs.readFileSync('itemlistCoupang', 'utf8')
    const {EOL} = require('os');
    data=data.split(EOL).map(v=>v.split('||'))
    data.forEach(v=>{
        if(v[2]){
            res.push([v[0],v[1],v[2]])    
            return
        }
        res.push([v[0],v[1]])
    });
    if(res[res.length-1][0]==''){
        res.pop()
    }
    res=res.filter(v=>v[2]==obj.id)
    if(res.length==0){
        telegramSendMessage(importMsg+'\n'+'not found\n'+obj.img+'\n'+importMsg)
        return
    }
    console.log(res)
    if(obj.add){
        console.log(obj.id)
    }else{

    }
}


