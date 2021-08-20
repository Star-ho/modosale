import {fs} from "fs"
import {fetch} from 'node-fetch'

async function download(uri, filename, callback){
  let res=await fetch(uri)
  let buffer = await res.buffer()
  fs.writeFile(filename, buffer, () => 
  console.log('finished downloading!'));
};

// download('http://dhkorea.wpengine.com/wp-content/uploads/2021/04/YGY_%E1%84%8B%E1%85%A9%E1%84%82%E1%85%B3%E1%86%AF%E1%84%8B%E1%85%B4%E1%84%92%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%B5%E1%86%AB_new_lineup_hosigi_5000.png', 'path/down.png', function(){
//   console.log('done');
// });