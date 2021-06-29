export async function telegramSendMessage(text){
    const fetch = require('node-fetch');
    while(text.includes('&')){
        text=text.replace('&','||')
      }
    let sendURL=`https://api.telegram.org/bot1811045229:AAHsI7UbFW3m04ly8cVxwnm-m2oHbMXfHdI/sendMessage?chat_id=1052011050&text=${encodeURI(text)}`
    let deleteURL=`https://api.telegram.org/bot1811045229:AAHsI7UbFW3m04ly8cVxwnm-m2oHbMXfHdI/setWebhook?url=`
    await fetch(sendURL)
    await fetch(deleteURL)
 }