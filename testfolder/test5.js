//npx babel-node --presets @babel/env test5.js

import {wemefReadData } from '../readfile.js'

(async()=>{

    console.log(await wemefReadData())
})()