const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

let topNewsIdAPI = async () => {

    try {
        let response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
        let ids = await response.json();
        return ids

    } catch (error) {
        console.log(error);
        return 'https://images.dog.ceo/breeds/pyrenees/sarge1.jpg';
    }
}

let hnContentAPI = async () => {

    try {

        let ids = await topNewsIdAPI();
        
        let r = await fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[0]}.json?print=pretty`)
        
        let hnContent = await r.json();
        
        // console.log(hnContent.title);
        // console.log(hnContent.url);
        // console.log(`https://news.ycombinator.com/item?id=${ids[i]}`);
        return hnContent;
        
    } catch (error) {
        console.log(error);
    }
        
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('hackernews')
        .setDescription('Returns the current top new in Hacker News website'),
    async execute(interaction, client) {
        const hnId = await topNewsIdAPI();
        const infoObject = await hnContentAPI();
        const embed = new EmbedBuilder()
            .setColor(0x18e1ee)
            .setTitle(`${infoObject.title}`)
            .setURL(`${infoObject.url}`)
            .setDescription(`This is the current Hacker News top story`)
            .setImage('https://cdn.discordapp.com/attachments/1014321307556524142/1050513193845399683/Zana_a_Hacker_News_website_logo_startup_illustration_the_logo_h_c1f323e6-f515-4117-827a-e4db37f576d3.png')
            .setTimestamp(Date.now())
            .setAuthor({
                name: 'Click here to access the comments section in HackerNews 👈',
                iconURL: 'https://cdn.discordapp.com/attachments/1014321307556524142/1050513193845399683/Zana_a_Hacker_News_website_logo_startup_illustration_the_logo_h_c1f323e6-f515-4117-827a-e4db37f576d3.png',
                url: `https://news.ycombinator.com/item?id=${hnId[0]}`,
            })
            .setFooter({
                iconURL: 'https://cdn.discordapp.com/attachments/1014321307556524142/1050513193845399683/Zana_a_Hacker_News_website_logo_startup_illustration_the_logo_h_c1f323e6-f515-4117-827a-e4db37f576d3.png',
                text: `posted by ${infoObject.by}.`

            })

        await interaction.reply({
            embeds: [embed]
        })

    },
}


// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('dog')
//         .setDescription('Replies with a dog picture!'),
//     async execute(interaction) {
//         let dogUrl = await dogAPI();
//         interaction.reply(`${dogUrl}`);
//     }
// };