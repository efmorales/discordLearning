const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('author')
        .setDescription('Returns a card with info about Enzo'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`Hi there! I hope you can have a great day!`)
            .setDescription(`I'm Enzo! I'm from Peru, currently living in New York. Let me show you a brief resume of me:`)
            .setColor(0x18e1ee)
            .setURL(`https://www.instagram.com/zanalphabetic/`)
            .setImage('https://cdn.discordapp.com/attachments/1014321307556524142/1040426113224159243/Zana_a_close-up_shot_of_a_fox_with_pink_pelt_sunbathing_in_the__f14a31a2-1ff7-4eb4-aeb5-e9823c98cf07.png')
            .setThumbnail('https://media.discordapp.net/attachments/1049871432932405368/1051728412936507402/photo_2022-12-12_00.12.27.jpeg')
            .setTimestamp(Date.now())
            .setAuthor({
                name: 'Enzo',
                iconURL: 'https://cdn.discordapp.com/attachments/1014321307556524142/1040426113224159243/Zana_a_close-up_shot_of_a_fox_with_pink_pelt_sunbathing_in_the__f14a31a2-1ff7-4eb4-aeb5-e9823c98cf07.png',
                url: `https://www.instagram.com/zanalphabetic/`,
            })
            .setFooter({
                iconURL: 'https://cdn.discordapp.com/attachments/1014321307556524142/1040426113224159243/Zana_a_close-up_shot_of_a_fox_with_pink_pelt_sunbathing_in_the__f14a31a2-1ff7-4eb4-aeb5-e9823c98cf07.png',
                text: 'Enzo'

            })
            .addFields([
                {
                    name: `Professional Anthropologist `,
                    value: `Qualitative Research specialist | Previous lead Design Researcher of Peru's Prime Minister's Secretariat of Digital Government | Private Sector Healthcare Digital Transformation Researcher`,
                    // inline: true,
                },
                {
                    name: 'Alumni of MIT (Boston - USA) & PUCP (Lima - PE)',
                    value: 'Professional Certificate in Digital Transformation - MIT | Anthropologist - PUCP | ',
                    // inline: true,
                },
                {
                    name: 'Computer Science student (NY - USA)',
                    value: 'First term in the Codeimmersives program. Coding experience in nodeJS & discordJS',
                    // inline: true,
                },
                {
                    name: 'Digital FX student',
                    value: 'I love the creation of digital fantasy worlds and scenarios.',
                    // inline: true,
                }
                ,
                {
                    name: 'Metacognition practicioner',
                    value: "I'm mega passionate about 'learning how to learn' because I love to accumulate cool new skills and develop them!",
                    // inline: true,
                }
            ]);

        await interaction.reply({
            embeds: [embed]
        })

    },
}
