// Every slash command is an interaction, so to respond to a command, you need to create a listener for the Client#event:interactionCreate event that will execute code when your application receives an interaction.

// command = interaction.client.commands.get(interaction.commandName);

const {Events} = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if(!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
    },
};