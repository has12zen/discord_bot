const { MessageEmbed } = require('discord.js');
const ScoreBoard = require('../models/scoreboard.js');

const statEmbede = async(user, doc) => {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Your Rank is #${doc.rank}`)
        .setURL(process.env.WEBSITE || 'https://google.com')
        .setAuthor(user.tag, user.displayAvatarURL())
        .setDescription(
            `Your Score for the event ${doc.event} is ${doc.score}.\n\n${
				doc.rank > 10
					? 'Keep working hard to appear on the website'
					: 'Congraturlations!!! :tada:'
			}\n\n`
        )
        .setTimestamp(new Date());
    return embed;
};

exports.stats = async(message, args) => {
    const user = message.author;
    if (args.length != 1) {
        message.reply('Please Give Event Name!');
        return;
    }
    const doc = await ScoreBoard.find()
        .where({ discordTag: user.tag, event: args[0] })
        .exec();
    if (doc.length != 1) {
        message.reply(
            'There is no record for this event \nPlease make sure you have typed the event name correctly.\n if there is some error pls contact admin'
        );
        return;
    }
    console.log(doc);
    let embede = await statEmbede(user, doc[0]);
    message.reply(embede);
};