// const {token, ERApiKey} = require('./config.json');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const {TOKEN} = process.env

const calc = require('./src/bot-commands/calc');
const conv = require('./src/bot-commands/conv');


const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
]});

client.once('ready', () => {
    console.log('O Bot está pronto!');
})

// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isChatInputCommand()) return;

// 	const { commandName } = interaction;

//     if (commandName === 'help') {
//         interaction.channel.send(`**Lista de comandos:** \n${showCommands()}`);
//     }
    
// 	if (commandName === 'hello') {
// 		await interaction.reply(`Olá ${interaction.user}! Tudo bem?`);
// 	}

//     if (commandName === 'calc') {
//         console.log(interaction);
//     }
// });

function showCommands() {
    const commands = {
        "!hello": "Diz olá",
        "!calc [expressão]": "Calcula uma expressão matemática",
        "!conv [base] [moeda alvo] [valor de conversão]": "Converte moedas"
    }
    let commandsText = '';
    for (const i in commands) {
        commandsText += `${i} - ${commands[i]}\n`
    }
    
    return commandsText;
}

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!help')) {
        message.channel.send(`**Lista de comandos:** \n${showCommands()}`);
    }

    if (message.content.startsWith('!hello')) {
        message.channel.send(`Olá ${message.author}! Como vai?`);
    }

    if (message.content.startsWith('!calc')) {
        calc(message);
    }        

    if (message.content.startsWith('!conv')) {
        conv(message);
    }
    
})

client.on('messageDelete', (message) => {
    if (message.author.bot) return;

    message.channel.send(`A mensagem apagada foi: \n${message.content}`);
})


client.login(TOKEN);