let { SlashCommandBuilder } = require('discord.js');

let dogUrl = '';

let dogAPI = async () => {
    let response = await fetch('https://dog.ceo/api/breeds/image/random');
    let data = await response.json();
    dogUrl = data.message;
} 

dogAPI();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Replies with a dog picture!'),
    async execute(interaction) {
        await interaction.reply(`${dogUrl}`);
        await dogAPI();
    }
};

// fetch('https://dog.ceo/api/breeds/image/random')
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data.message);
//         img.src = data.message;

//     })