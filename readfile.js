export async function wemefReadData(){
    let fs = require('fs');
    let res=[]
    let data=fs.readFileSync('itemlistWemef', 'utf8')
    data=data.split(process.env.Linux_CRLF||'\n').map(v=>v.split('||'))
    data.forEach(v=>{
        if(v[2]){
            res.push([v[0],v[1],v[2]])    
            return
        }
        res.push([v[0],v[1]])
    });
    res.pop()
    return res
}

export async function coupangReadData(){
    let fs = require('fs');
    require('dotenv').config();
    let res=[]
    let data=fs.readFileSync('itemlistCoupang', 'utf8')
    data=data.split(process.env.Linux_CRLF||'\n').map(v=>v.split('||'))
        data.forEach(v=>{
            if(v[2]){
                res.push([v[0],v[1],v[2]])  
                return 
            }
            res.push([v[0],v[1]])
    });
    res.pop()
    return res
}