const { compare } = require('bcrypt');
const User = require('../models/user');
const UserService = require('../service/user');


const friends_add_friends = async function(req, res, next) {
    var checkFlag = true;
    const userData = req.userData;
    const friendFrom = req.body.friendFrom;
    const friendTo = req.body.friendTo;
    if (userData.username !== friendFrom) {
        checkFlag = false;
    }
    const userFromArray = await UserService.get_user(friendFrom);
    const userToArray = await UserService.get_user(friendTo);
    var returnMessage = "";
    if (userToArray.length === 0) {
        checkFlag = false;
        returnMessage = friendTo + " is not a valid username";
    }

    if (checkFlag) {
        const userFrom = userFromArray[0];
        const userTo = userToArray[0];

        if (userFrom.friends.indexOf(userTo) === -1) {
            userFrom.friends.push(userTo);
            
            const ind = userFrom.blocks.indexOf(userTo);
            if (ind > -1) {
                userFrom.blocks.splice(ind, 1);
            }
            userFrom.save();
            res.status(201).json({
                message: friendFrom + " added " + friendTo + " to his-her friends list"
            });
        } else {
            res.status(200).json({
                message: friendFrom + " already added " + friendTo + " to his-her friends list"
            });
        }
    } else {
        res.status(500).json({
            message: returnMessage
        });
    }


}    

exports.friends_add_friends = friends_add_friends;