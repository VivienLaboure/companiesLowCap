const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Quand le bot est prêt
client.once('ready', () => {
  console.log('Bot prêt !');
});

// Répond à un message
client.on('messageCreate', message => {
  if (message.content === '!ping') {
    message.channel.send('Pong!');
  }
});

// Se connecter au bot
client.login('TOKEN_DISCOD_BOT');
