// Require the necessary discord.js classes

const fs = require('node:fs');
const path = require('node:path');
require("dotenv").config();
let { token } = process.env;

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Collection();

//First, path.join() helps to construct a path to the commands directory. The fs.readdirSync() method then reads the path to the directory and returns an array of all the file names it contains. To ensure only command files get processed, Array.filter() removes any non-JavaScript files from the array.

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// With the correct files identified, the last step is to loop over the array and dynamically set each command into the client.commands Collection. For each file being loaded, check that it has at least the data and execute properties. This helps to prevent errors resulting from loading empty, unfinished or otherwise incorrect command files while you're still developing.

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Log in to Discord with your client's token with the .login function
client.login(token);

// console.log(process.env.token)