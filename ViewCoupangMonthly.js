const imgPath='https://img1a.coupangcdn.com/'
//끝
async function monthlyMenu(){
    const fetch = require('node-fetch');
    const fs = require('fs');

    let url=`https://web.coupangeats.com/customer/landingPage?key=AUG_0826_IN`

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
    let data=fs.readFileSync('textfile/itemlistCoupangImage', 'utf8')
    const {EOL} = require('os');
    data=data.split(EOL)
    if(data[data.length-1][0]==''){
        data.pop()
    }
    const cheerio = require("cheerio");
    let $=cheerio.load(response)
    let response1=JSON.parse($(`#landing_page`)['0'].attribs['data-landingpage']).images
    let res=[]
    for(let i of response1){
        if(i.scheme){
            res.push(i)
        }
    }
    console.log(res)
    res = ViewImage(res)
    fs.writeFile('view.html', res, 'utf8', function(error){
        console.log('write end') 
    });

}

function ViewImage(res){
    let retval=[]
    console.log(res)
    for(let i of res){
        retval.push({img:imgPath+i.imageUrl,id:i.id,scheme:i.scheme})
    }
    let html=`
    <html><head></head><body>
    `
    retval.forEach(v=>{
       html+=`<div style="float: left;margin: 10;width: 45%;" ><img style="float: left" src="${v.img}" width="200" height="100" />`
       html+=`<p>coupang${v.scheme}</p>`
    //    html+=`<p>${v.id},coupang${v.scheme}</p>`
       html+='</div>\n'
    })
    for(let i of res){
        html+=`<p>${i.imageUrl}</p>`
    }
    html+=`</body></html>`
    return html
}

(async()=>{
    await monthlyMenu()
})()