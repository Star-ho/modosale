//npx babel-node --presets @babel/env coupangWemefChangedata.js

import { getWemefData } from './imgWemef.js'
import { telegramSendMessage } from './teleWebhook.js';

export async function wemefReadData(){
    let fs = require('fs');
    let res={}
    let readData=fs.readFileSync('textfile/itemlistWemef', 'utf8')
    const {EOL} = require('os');
    let wemefData=await getWemefData(false)
    readData=readData.split(EOL).map(v=>v.split('||'))
    // console.log(readData)
    // console.log(wemefData)
    //현재 존재하는값 정리
    wemefData.forEach(v=>{
        for(let i of readData){
            if(v.id==i[2]){
                if(Object.keys(res).includes(i[0])){
                    if(+i[1]>+res[i[0]][0]){
                        Object.assign(res,{ [i[0]] :[i[1],v.scheme] })    
                    }
                    return
                }
                Object.assign(res,{ [i[0]] :[i[1],v.scheme] })    
                return
            }
        }
        if(v.id&&v.id.includes('신규')==false){
            telegramSendMessage(JSON.stringify(v))
        }
    });

    // console.log(Object.keys(res).length)
    return res
}

// (async()=>{
    // await wemefReadData()
    // console.log(await wemefReadData())
// })()

export async function coupangReadData(){
    let fs = require('fs');
    require('dotenv').config();
    let res=[]
    let data=fs.readFileSync('textfile/itemlistCoupang', 'utf8')
    const {EOL} = require('os');
    data=data.split(EOL).map(v=>v.split('||'))
    data.forEach(v=>{
        if(v[2]){
            Object.assign(res,{ [v[0]] :[v[1],v[2]] })    
            return
        }
        Object.assign(res,{ [v[0]] :[v[1]] })    
    });
    return res
}