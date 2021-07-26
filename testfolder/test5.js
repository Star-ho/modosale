
(async()=>{
    // console.log(await wemefReadData())
    var fs = require('fs')
    const fetch=require('node-fetch')
    const Hangul = require('hangul-js');

    let url=decodeURI('http://dhkorea.wpengine.com/wp-content/uploads/2021/06/%E1%84%92%E1%85%A1%E1%86%AF%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3.png')
    console.log(url)
    let temp= Hangul.assemble(url.match(/[^0-9a-zA-Z~!@#$%^&*()_+|<>?:{}\/.,-]/g))
    console.log(temp)
    temp1=(temp.match(/[가-힣]/g).join(''))
    url=url.replace(temp,temp1)
    let res=await fetch(encodeURI(url),{
        timeout: 30000
      })
    console.log(res)
    let buffer = await res.buffer()
    fs.writeFileSync('11.png', buffer, ()=>null)
})()
