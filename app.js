const compareWithCompetitors = require('./functions/compareWithCompetitors');


require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

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

// Répond à un message
client.on('messageCreate', async (message) =>  {
    if (message.content.startsWith('!compare')) {
        // Récupérer les arguments après !compare
        const args = message.content.slice('!compare'.length).trim().split(',');

        // Nettoyage des arguments
        const companies = args.map(arg => arg.trim());

        const responseMessage = await compareWithCompetitors(companies)
        console.log('responseMessage', responseMessage);
        // Afficher les entreprises dans la console et répondre dans Discord
        console.log(`Comparaison pour : ${companies.join(', ')}`);
        message.channel.send(`Comparaison demandée pour : ${responseMessage}`);
    }
});


// Se connecter au bot
client.login(process.env.TOKEN_DISCORD_BOT);
