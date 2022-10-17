const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    commenterId: { type: String, required: true },
    postId: { type: String, required: true },
    //title: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type : Date, default: Date.now },
});

module.exports = mongoose.model('comment', commentSchema);