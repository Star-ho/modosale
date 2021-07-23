//npx babel-node --presets @babel/env coupangWemefChangedata.js

import { getWemefData } from './imgWemef.js'

export async function wemefReadData(){
    let fs = require('fs');
    let res={}
    let readData=fs.readFileSync('textfile/itemlistWemef', 'utf8')
    const {EOL} = require('os');
    let wemefData=await getWemefData(false)
    readData=readData.split(EOL).map(v=>v.split('||'))
    // console.log(readData)
    // console.log(wemefData)
    readData.forEach(v=>{
        for(let i of wemefData){
            if(i.id==v[2]){
                if(Object.keys(res).includes(v[0])){
                    // console.log(v)
                    return
                }
                Object.assign(res,{ [v[0]] :[v[1],i.scheme] })    
            }
        }
    });
    // console.log(Object.keys(res).length)
    return res
}

// (async()=>{
//     console.log(await wemefReadData())
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