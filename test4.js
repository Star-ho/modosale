(async ()=>{
  const spawn = require('await-spawn')

  let spawnRet = await spawn('python', ['imgToVal.py',`path\\result0.png`,1]); 
  let aa= spawnRet.toString()
  console.log(aa)

})()

// async function download(uri, filename){
//     var fs = require('fs'),
//       fetch = require('node-fetch');
//     let temp
//     let temp1
//     uri=uri.replace(temp,temp1)
  
//     let res=await fetch(uri)
//     let buffer = await res.buffer()
//     fs.writeFileSync(filename, buffer, ()=>null)
//   };