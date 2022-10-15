const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    userPseudo: { type: String, required: true },
    //title: { type: String, required: true },
    description: { type: String, required: true },
    timestamps: { type : Date, default: Date.now },
    imageUrl: { type: String},
    likes: { type: Number, default: 0 },
   // dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    //usersDisliked: { type: [String] },
    // comments: {
    //     type: [
    //         {
    //             commenterId: String,
    //             text: String,
    //             timestamp: Date
    //         }
    //     ],
    // },
});

module.exports = mongoose.model('post', postSchema);