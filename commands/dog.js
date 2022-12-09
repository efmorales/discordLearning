let { SlashCommandBuilder } = require('discord.js');

// let dogUrl = '';

let dogAPI = async () => {

    try {
        let response = await fetch('https://dog.ceo/api/breeds/image/random');
        let data = await response.json();
        return data.message;
    } catch (error) {
        console.log(error);
        return 'https://images.dog.ceo/breeds/pyrenees/sarge1.jpg';
    }

}

// dogAPI();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Replies with a dog picture!'),
    async execute(interaction) {
        let dogUrl = await dogAPI();
        interaction.reply(`${dogUrl}`);
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