const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    from: { type: String, required: true },
    to: { type: String, required: true },
    content: { type: String, required: true },
    sendTime: { type: Date, required: true }
}); 

module.exports = mongoose.model('Message', messageSchema);