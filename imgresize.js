

let path='path/down2.png'

const sharp = require('sharp');
sharp(path).extract({left:80,top:0,width:500,height:180}).toFile('path/result2.png')