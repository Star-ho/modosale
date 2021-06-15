//토큰  ODU0MDI0NDU0NjY5OTkxOTc2.YMd6QQ.RFOytdnCAke3tYbUWD72KGHp2sY

const Discord = require("discord.js");
const prefix = "!";

const client = new Discord.Client();

client.on("message", function(message) {
    // message 작성자가 봇이면 그냥 return
    if (message.author.bot) return;
    // message 시작이 prefix가 아니면 return
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    
    if (command === "ping") {
        message.reply(`pong!`);
    }
});

client.login(`ODU0MDI0NDU0NjY5OTkxOTc2.YMd6QQ.RFOytdnCAke3tYbUWD72KGHp2sY`);