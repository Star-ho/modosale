
const TelegramBot = require('node-telegram-bot-api')
const token = '1811045229:AAHsI7UbFW3m04ly8cVxwnm-m2oHbMXfHdI'
const telebot = new TelegramBot(token, {polling: true})

telebot.sendMessage(1052011050, 'Received your message');


// Matches "/echo [whatever]"
telebot.onText(/\/e (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    console.log(chatId)
    // send back the matched "whatever" to the chat
    telebot.sendMessage(chatId, resp+''+msg.chat.id);
});

