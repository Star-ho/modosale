(async()=>{
    const fetch = require('node-fetch');

    let url='http://dhkorea.wpengine.com/wp-content/uploads/2021/06/이삭-토스트-1.png'
    let res=await fetch(encodeURI(url))
    console.log(res)
})()