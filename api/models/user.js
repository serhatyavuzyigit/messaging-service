const mongoose = require('mongoose');
const { mountpath } = require('../../app');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    username: {type: String, required: true, unique: true},
    password: { type: String, required: true }, 
    friends: { type: Array },
    blocks: {type: Array }
});

module.exports = mongoose.model('User', userSchema); 