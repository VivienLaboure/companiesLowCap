const compareWithCompetitors = require('./functions/compareWithCompetitors');
const compareWithCompetitors_console = require('./functions/compareWithCompetitors_console');
require('dotenv').config();

//exemple de symboles de concurrents pharmaceutiques à comparer 
const competitors = ['PFE', 'MRK', 'JNJ', 'GSK', 'AZN'];
compareWithCompetitors_console(competitors)

/*const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');



const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Quand le bot est prêt
client.once('ready', () => {
    console.log('Bot prêt !');
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!compare')) {
        await compareWithCompetitors(competitors, message);
    }
});

// Se connecter au bot
client.login(process.env.TOKEN_DISCORD_BOT);
*/