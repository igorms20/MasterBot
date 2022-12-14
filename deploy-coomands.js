const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	// new SlashCommandBuilder().setName('help').setDescription('Mostra a lista de comandos do bot'),
	// new SlashCommandBuilder().setName('hello').setDescription('Responde com Olá'),
    // new SlashCommandBuilder().setName('calc').setDescription('Faz um cálculo matemático')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
.then(() => console.log('Comandos registrados com sucesso!'))
.catch(console.error);    