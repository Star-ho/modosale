import {forTelegram} from './forTelegram'

const TelegramBot = require('node-telegram-bot-api')
const token = '1811045229:AAHsI7UbFW3m04ly8cVxwnm-m2oHbMXfHdI'
const telebot = new TelegramBot(token, {polling: true})
forTelegram(telebot)
