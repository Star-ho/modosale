(async () =>{
	let fs = require('fs');
const fetch = require('node-fetch');
const urlencode = require('urlencode'); 

urlParam=urlencode.decode(urlParam).split('=')[2]

let url=`https://web.coupangeats.com/customer/landingPage?key=JUL_0714_IN`

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
let data=fs.readFileSync('itemlistCoupangImage', 'utf8')
const {EOL} = require('os');
data=data.split(EOL)
if(data[data.length-1][0]==''){
    data.pop()
}
const cheerio = require("cheerio");
let $=cheerio.load(response)
response=JSON.parse($(`#landing_page`)['0'].attribs.['data-landingpage']).images
// console.log(response)
// console.log(data)
for(let i of response){
    if(i.scheme){
        if(data.includes(i.imageUrl)){
            let itemData=fs.readFileSync('itemlistCoupangMonthly', 'utf8')
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
            coupangHandlingFunc([itemData[0][0],itemData[0][1],i.scheme,true])

        }else{
            telegramSendMessage(importMsg+'\n'+'not found\n'+imgPath+i.imageUrl+'\n'+i.id+'\n'+i.scheme+'\n'+importMsg)
        }
    }
})}()
