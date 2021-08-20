//npx babel-node --presets @babel/env forCoupangMonthlyAdd.js

import {coupangHandlingFunc} from './DBHandling.js'
import {telegramSendMessage} from './teleWebhook.js'


(async () =>{
    const importMsg='****************************************'
	let fs = require('fs');
    const fetch = require('node-fetch');
    const urlencode = require('urlencode'); 


    let url=`https://web.coupangeats.com/customer/landingPage?key=AUG_0818_IN`

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
    let a='data-landingpage'
    response=JSON.parse($(`#landing_page`)['0'].attribs[a]).images

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
                if(itemData[0]){
                    console.log([itemData[0][0],itemData[0][1],i.scheme,true])
                    coupangHandlingFunc([itemData[0][0],itemData[0][1],i.scheme,true])
                }

        }else{
            telegramSendMessage(importMsg+'\n'+'not found\n'+imgPath+i.imageUrl+'\n'+i.id+'\n'+i.scheme+'\n'+importMsg)
        }
    }
}
})()
