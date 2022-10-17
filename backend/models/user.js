const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator')

const userSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true},
    email: { type: String, required: true, validate: [isEmail], unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false},
    imageUrl: { type: String, default: "" },
    businessUnit: { type: String },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);