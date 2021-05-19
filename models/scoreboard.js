const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    event: {
        type: String,
        requird: [true, 'a Score must have a price'],
    },
    discordTag: {
        type: String,
        requird: [true, 'a Score must have a price'],
    },
    name: {
        type: String,
        requird: [true, 'a Score must have a price'],
    },
    rank: {
        type: Number,
        requird: [true, 'a Score must have a price'],
    },
    score: {
        type: Number,
        requird: [true, 'a Score must have a price'],
    },
});

const ScoreBoard = mongoose.model('ScoreBoard', scoreSchema);

module.exports = ScoreBoard;