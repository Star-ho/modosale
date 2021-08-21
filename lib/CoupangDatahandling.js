import {telegramSendMessage} from './modusailUtil.js'
import {coupangHandlingFunc} from './DBHandling.js'
import { koreaMoment } from './modusailUtil.js';

// coupangDataHandling()
const importMsg='****************************************'
export function coupangDataHandling(obj){
    require('dotenv').config();
    const urlencode = require('urlencode'); 
    let fs = require('fs');
    let res=[]
    let data=fs.readFileSync('textfile/itemlistCoupang', 'utf8')
    const {EOL} = require('os');
    data=data.split(EOL).map(v=>v.split('||'))
    data.forEach(v=>{
        if(v[2]){
            res.push([v[0],v[1],v[2]])    
        }else{
            res.push([v[0],v[1]])
        }
        
    });
    if(res[res.length-1][0]==''){
        res.pop()
    }
    // console.log(obj)
    
    let isMounthlyMenu=urlencode.decode(obj.scheme).split('=')[2]

    // console.log(isMounthlyMenu)
    let time = koreaMoment()
    let MounthName= time().format('MMM').toUpperCase()+'_'

    try{
        if(isMounthlyMenu.startsWith(MounthName)){
            monthlyMenu({urlParam:obj.scheme,isAdd:obj.add})
            return
        }
    }catch(e){
        console.log(e)
        return
    }

    res=res.filter(v=>v[2]==obj.id)
    // console.log(obj)
    if(res.length==0){
        telegramSendMessage(importMsg+'\n'+'not found\n'+obj.img+'\n'+obj.id+'\n'+obj.scheme+'\n'+importMsg)
        return
    }
    // console.log(obj)
    
    for(let i of res){
        coupangHandlingFunc([i[0],i[1],obj.scheme,obj.add])
    }
}

// (async()=>{
//     coupangDataHandling({scheme:'==JUL_',add:false})
// })()

export async function monthlyMenu({isAdd,urlParam}){
    try{    
        //삭제시에는 URL접속 시 에러가 리턴됨
        //그래서 삭제시에는 파일에 기록되어 있는것 삭제
        let fs = require('fs');
        const fetch = require('node-fetch');
        const urlencode = require('urlencode'); 
        
        // console.log(isAdd)
        if(!isAdd){
            let itemData=fs.readFileSync('textfile/itemlistCoupangMonthly', 'utf8')
            const {EOL} = require('os');
            itemData=itemData.split(EOL).map(v=>v.split('||'))
            
            if(itemData[itemData.length-1][0]==''){
                itemData.pop()
            }
            for(let item of itemData){
                coupangHandlingFunc([item[0],item[1],item.scheme,isAdd])
            }
            return
        }
        
        urlParam=urlencode.decode(urlParam).split('=')[2]
        
        let url=`https://web.coupangeats.com/customer/landingPage?key=`+urlParam
        
        let response = await fetch(url,{
            headers:{
                "X-EATS-APP-VERSION": "1.2.21",
                "X-EATS-PCID": "15efdf4b-7bfc-3db1-a3c1-6c147ac1f3ca",
                "X-EATS-DEVICE-ID": "15efdf4b-7bfc-3db1-a3c1-6c147ac1f3ca",
                'X-EATS-OS-TYPE': 'ANDROID'
            }
        })
        .then(res=>res.text())

        // console.log(response)
        const imgPath='https://img1a.coupangcdn.com/'
        let data=fs.readFileSync('textfile/itemlistCoupangImage', 'utf8')
        const {EOL} = require('os');
        data=data.split(EOL)
        if(data[data.length-1][0]==''){
            data.pop()
        }
        const cheerio = require("cheerio");
        let $=cheerio.load(response)
        response=JSON.parse($(`#landing_page`)['0'].attribs['data-landingpage']).images
        // console.log(response)
        // console.log(data)
        for(let i of response){
            if(i.scheme){
                if(data.includes(i.imageUrl)){
                    let itemData=fs.readFileSync('textfile/itemlistCoupangMonthly', 'utf8')
                    const {EOL} = require('os');
                    itemData=itemData.split(EOL).map(v=>v.split('||'))
                
                    if(itemData[itemData.length-1][0]==''){
                        itemData.pop()
                    }
                    itemData=itemData.filter(v=>v[2].toLowerCase()=='coupang'+i.scheme.toLowerCase())

                    if(itemData.length==0){
                        telegramSendMessage(importMsg+'\n'+'not found\n'+imgPath+i.imageUrl+'\n'+i.id+'\n'+i.scheme+'\n'+importMsg)
                    }
                    // console.log([itemData[0][0],itemData[0][1],i.scheme,isAdd])
                    if(itemData[0]){
                        coupangHandlingFunc([itemData[0][0],itemData[0][1],i.scheme,true])
                    }
        
                }else{
                    telegramSendMessage(importMsg+'\n'+'not found\n'+imgPath+i.imageUrl+'\n'+i.id+'\n'+i.scheme+'\n'+importMsg)
                }
            }
        }

    }catch(e){
        console.log(e)
        telegramSendMessage(JSON.stringify(e))
    }
}


