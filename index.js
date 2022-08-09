// const {token, ERApiKey} = require('./config.json');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const {TOKEN, API_KEY} = process.env
const CurrencyConverter = require('./src/currency-converter');
const cc = new CurrencyConverter(API_KEY);


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

    if (message.content.startsWith('!calc') ) {
        const fullMsg = message.content;
        const expression = fullMsg.split(' ')[1];        

        try {
            const result = eval(expression);
            if (!expression || !result) {
                message.channel.send('Expressão inválida.');
                return;
            }
            message.reply(`Resultado: ${result}`);    
        } catch (err) {
            message.channel.send('Houve algum erro.');
            return;
        }
    }

    if (message.content.startsWith('!conv')) {
        const msgContent = message.content;
        
        try {
            const base = msgContent.split(' ')[1].toUpperCase();
            const target = msgContent.split(' ')[2].toUpperCase();
            const amount = msgContent.split(' ')[3];

            if (!amount) {
                const resp = cc.convertNoAmount(base, target);
                resp.then((value) => {message.reply(value.toFixed(2).toString())});   
                return;
            } 
                
            const resp = cc.convert(base, target, amount);
            resp.then((value) => {message.reply(value.toFixed(2).toString())});      
    
        } catch (err)  {
            message.channel.send('Houve algum erro.');
            return;
        }

    }
    
})

client.on('messageDelete', (message) => {
    if (message.author.bot) return;

    message.channel.send(`A mensagem apagada foi: \n${message.content}`);
})


client.login(TOKEN);