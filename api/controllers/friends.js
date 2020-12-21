const User = require('../models/user');

exports.friends_add_friends = (req, res, next) => {
    const friendFrom = req.body.friendFrom;
    const friendTo = req.body.friendTo;
    console.log(friendFrom);
    User.find({ username: friendFrom })
        .exec()
        .then(user => {
            if (user[0].friends.indexOf(friendTo) === -1) {
                user[0].friends.push(friendTo);
                user[0].save();
            } else {
                return res.status(200).json({
                    message: "They are already friends"
                });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    
    User.find({ username: friendTo })
        .exec()
        .then(user => {
            if (user[0].friends.indexOf(friendFrom) === -1) {
                user[0].friends.push(friendFrom);
                user[0].save();
            } else {
                return res.status(200).json({
                    message: "They are already friends"
                });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    return res.status(201).json({
        message: "Friendship began"
    });

    
};