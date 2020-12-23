const User = require('../models/user');
const { use } = require('../routes/user');

const get_user = async function(_username) {
    try {
        const user = await User.find({ username: _username });
        return user;
    } catch (err) {
        console.log(err);
    }
};

exports.get_user = get_user;