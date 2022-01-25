import { db } from './mongodb';


const TelegramBot = require('node-telegram-bot-api')

const token = '5217370374:AAGtGp_ArvaO7iZJmqx3kOz0a5sXI_K_p3Y';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/register/, async (msg) => {
  const chatId = msg.chat.id
  db.collection('users-v2').insertOne({ chatId });
  console.log('User registered');
  bot.sendMessage(chatId, '✔️ Done.')
})

const handler = async (message: { message: string }) => {
  const users = await db.collection('users-v2').find({}).toArray();
  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      bot.sendMessage(users[i].chatId, message.message)
    }
  }
}

import http from 'http';

import config from './config.json';

const server = http.createServer((request, response) => {
    let data = '';

    if (request.method === "GET") {
        data = 'GET RESPONSE';
    } else if (request.method === "POST") {
        let data = '';

        request.on('data', (chunk: string) => {
            data += chunk;
        });

        request.on('end', async () => {     
            let dataJson;
            try {
              dataJson = JSON.parse(data);
            } catch(e) {
              console.error(e);
              return;
            }
            try {
              await handler(dataJson);
            } catch(error) {
              console.error('ERROR tg-handler', error);
            }
        })
    }

    response.end(data);
});

console.log('🚀 Start listen tg-warnings server');
server.listen(config.server.port, config.server.host);
