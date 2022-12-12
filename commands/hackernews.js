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

let randomTop10 = () => {
    return (Math.floor(Math.random() * 10))
};


let hnContentAPI = async () => {

    try {

        let rTop10 = randomTop10();
        let ids = await topNewsIdAPI();
        let r = await fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[rTop10]}.json?print=pretty`);

        let hnContent = await r.json();

        return hnContent;

    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('hackernews')
        .setDescription('Returns one randomized top 10 news from the Hacker News website'),
    async execute(interaction, client) {
        const hnId = await topNewsIdAPI();
        const infoObject = await hnContentAPI();
        const embed = new EmbedBuilder()
            .setColor(0x18e1ee)
            .setTitle(`${infoObject.title}`)
            .setURL(`${infoObject.url}`)
            .setDescription(`This is a current top 10 Hacker News story`)
            .setImage('https://cdn.discordapp.com/attachments/1014321307556524142/1050513193845399683/Zana_a_Hacker_News_website_logo_startup_illustration_the_logo_h_c1f323e6-f515-4117-827a-e4db37f576d3.png')
            .setTimestamp(Date.now())
            .setAuthor({
                name: 'Click here to access the comments section in HackerNews 👈',
                iconURL: 'https://cdn.discordapp.com/attachments/1014321307556524142/1050513193845399683/Zana_a_Hacker_News_website_logo_startup_illustration_the_logo_h_c1f323e6-f515-4117-827a-e4db37f576d3.png',
                url: `https://news.ycombinator.com/item?id=${infoObject.id}`,
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