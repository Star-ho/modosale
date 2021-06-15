//토큰  ODU0MDI0NDU0NjY5OTkxOTc2.YMd6QQ.RFOytdnCAke3tYbUWD72KGHp2sY

const Discord = require("discord.js");

const client = new Discord.Client();

client.on("message", async function(message) {
    // message 작성자가 봇이면 그냥 return
    if (message.author.bot) return;
    const mysql = require('mysql2/promise');
    const pool = mysql.createPool({
       host     : 'localhost',
       port     :  3306,
       user     : 'root',
       password : 'root',
       database : 'menu',
       connectionLimit:10
    });
    
    let connect = await pool.getConnection(conn =>conn)
    if(message.content.indexOf('  ')!=-1){
        message.reply(`스페이스 두번 드갔다 조심해라`);
    }
    const command = message.content.split('\n')
    let res=''
    let data=''
    switch(command[0]){
        case 'h':
        case 'help':
            message.reply(`---------------------------
            데이터양식
            select
            select * from data where brand=[ data[i] ];
            selectall
            select * from data;
            update
            update data SET [ data[0] ]=[ data[1] ] where brand=[ data[2] ] and app=[ data[3] ]
            ---------------------------
             `);
            break;
        case 'select':
            data=command[1].split(' ')
            try{
                for(let i=0;i<data.length;i++){
                    let SQLRes = (await connect.query(`select * from data where brand="${data[i]}";`))[0];
                    for(let i of SQLRes){
                        res+=i.app+' '+i.brand+' '+i.price+'\n'
                    }
                }
            }catch(e){
                message.reply('error!');
            }
            message.reply(res);
            break;
        case 'selectall':
            try{
                let SQLRes = (await connect.query(`select * from data;`))[0];
            }catch(e){
                message.reply('error!');
            }
            for(let i of SQLRes){
                res+=i.app+' '+i.brand+' '+i.price+'\n'
            }
            message.reply(res);
            break;
        case 'update':
            data=command[1].split(' ')
            try{
                res = (await connect.query(`update data SET ${data[0]}=${data[1]} where brand="${data[2]}" and app="${data[3]}" `));
            }catch(e){
                message.reply('error!');
            }
            console.log(res)
            message.reply(res);
            break;
    }
    
    


});

client.login(`ODU0MDI0NDU0NjY5OTkxOTc2.YMd6QQ.RFOytdnCAke3tYbUWD72KGHp2sY`);