const { compare } = require('bcrypt');
const User = require('../models/user');

exports.friends_add_friends = (req, res, next) => {
    var checkFlag = true;
    const userData = req.userData;
    const friendFrom = req.body.friendFrom;
    const friendTo = req.body.friendTo;
    if (userData.username !== friendFrom) {
        checkFlag = false;
    }

    if(checkFlag) {
        User.find({ username: friendTo })
        .exec()
        .then(usr => {
            if (usr.length === 0) {
                res.status(500).json({
                    message: friendTo + " is not a valid username"
                });    
            } else {
                User.find({ username: friendFrom })
                .exec()
                .then(user => {
                    if (user[0].friends.indexOf(friendTo) === -1) {
                        user[0].friends.push(friendTo);
                        user[0].save();
                        res.status(201).json({
                            message: friendFrom + " added " + friendTo + " to his-her friends list"
                        });
                    } else {
                        res.status(200).json({
                            message: friendFrom + " already added " + friendTo + " to his-her friends list"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                });
                    }
                })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });    
    } else {
        res.status(500).json({
            message: "Given token is not associated with the user"
        });
    }
    
};