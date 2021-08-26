let fs = require('fs');
let res=[]
let data=fs.readFileSync('textfile/itemlistCoupang', 'utf8')
const {EOL} = require('os');
data=data.split(EOL).map(v=>v.split('||'))
    data.forEach(v=>{
        res.push([v[0],v[1],v[2]])
});

// console.log(res);

