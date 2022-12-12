// Require the necessary discord.js classes

const fs = require('node:fs'); // gives me access to the functions and modules inside the 'fs' package. It gives a wide variety of file handling operations such as reading or editing the info inside a file.
const path = require('node:path'); // creates a system-agnostic path to a file or directory
require("dotenv").config(); // gives access to the dotenv package. This package lets you store API keys, passwords, and sensible information in general.
let { token } = process.env; // Object destructuring. This constant is calling the "token" line inside the .env folder

const { // Object destructuring. We are importing these 4 constant variables from the 'discord.js' module.
    Client, // gives us access to the "client" class inside the discord.js package. This module is a core one, because it let us log-in, log-out, access to servers and more.
    Collection, // stores and manages collections of data.
    Events, // registry of different eventListeners that we can use out of the box thanks to this.
    GatewayIntentBits // provides constants for the gateways of information the Discord API provides. More about a couple of lines bellow.
} = require('discord.js'); // extracts the specified 4 variables. Now we can use them.

// Create a new client instance

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
}); // Here we are gaining access to this information gateways thanks to the creation of a new "Client" module that reads the "intents" property and makes available all the related events to "guilds" (discord servers), messages inside the server, content and members. 

// ===== EVENTS =====

const eventsPath = path.join(__dirname, 'events'); // a string of a directory path! path.join() will create a path of access; for this particular case it will use the current directory (__dirname is nodeJS global variable) and 'events' is the folder name where I'm storing the event related scripts.  
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')); // An array of files! fs.readdirSync(eventsPath) is reading each file inside the events folder, and including their names into an array [...] if the file ends with .js, they will go inside the array, if not, they will not be pushed into the array.

for (const file of eventFiles) { // we are looping through our array! we are going through each file inside the 'events' folder at a time.
    const filePath = path.join(eventsPath, file); // path of the selected file.
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args)); // eventListener
    } else {
        client.on(event.name, (...args) => event.execute(...args)); // eventListener
    }
}

// ==== COMMANDS ====

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