export async function wemefReadData(){
    let fs = require('fs');
    let res=[]
    let data=fs.readFileSync('wemefitemlist', 'utf8')
    data=data.split('\r\n').map(v=>v.split('||'))
        data.forEach(v=>{
            res.push([v[0],v[1],v[2]])
    });
    return res
}

export async function coupangReadData(){
    let fs = require('fs');
    let res=[]
    let data=fs.readFileSync('coupangitemlist', 'utf8')
    data=data.split('\r\n').map(v=>v.split('||'))
        data.forEach(v=>{
            res.push([v[0],v[1],v[2]])
    });
    return res
}