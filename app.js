const { Client, DiscordAPIError } = require('discord.js');
const mongoose = require('mongoose');
let botCommands = {};

if (process.env.NODE_ENV !== 'production') {
    const { config } = require('dotenv');
    config({ path: __dirname + '/.env' });
}
const prefix = '!';
const rankChannelId = process.env.RANK_ID || '11111111111111111';

//DB
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connection successful!');
        botCommands = require('./commands/botc');
    });

// Discord Client
const client = new Client({
    disableEveryone: true,
});

// Discord Connect
client.on('ready', async() => {
    console.log(`${client.user.username} ONLINE!`);
    client.user.setActivity('Vim', { type: 'PLAYING' });
});

// Bot Listeners
client.on('message', async(message) => {
    if (!message.content.startsWith(prefix)) return;

    const fullMessage = message.content.slice(1);
    const args = fullMessage.split(' ');
    const command = args.shift().toLowerCase();
    if (message.channel.id != rankChannelId) return;
    // console.log(`${command} from ${message.author.username}`);
    if (command === 'stats') {
        botCommands.stats(message, args);
    } else if (command === 'highscore') {
        //highscore
    }
});

// Discord Client Login
client.login(process.env.TOKEN);