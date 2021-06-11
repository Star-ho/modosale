let fs = require('fs');
let res=[]
let data=fs.readFileSync('itemlist', 'utf8')
data=data.split(process.env.Linux_CRLF||'\r\n').map(v=>v.split('||'))
    data.forEach(v=>{
        res.push([v[0],v[1],v[2]])
});

console.log(res);

