// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'. This is closer to an eventListener

const {Events} = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};

// The name property states which event this file is for, and the once property holds a boolean value that specifies if the event should run only once. You don't need to specify this in interactionCreate.js as the default behavior will be to run on every event instance. The execute function holds your event logic, which will be called by the event handler whenever the event emits.
