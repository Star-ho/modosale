let  moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 
let MountName= moment().format('MMM').toUpperCase()+'_'
