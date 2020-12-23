const { compare } = require('bcrypt');
const UserService = require('../service/user');


const friends_add_friends = async function(req, res, next) {
    var checkFlag = true;
    const userData = req.userData;
    const friendFrom = req.body.friendFrom;
    const friendTo = req.body.friendTo;
    var returnMessage = "";
    if (userData.username !== friendFrom) {
        checkFlag = false;
        returnMessage = "given token is not associated with user";
    }
    const userFromArray = await UserService.get_user(friendFrom);
    const userToArray = await UserService.get_user(friendTo);
    
    if (userToArray.length === 0) {
        checkFlag = false;
        returnMessage = friendTo + " is not a valid username";
    }

    if (checkFlag) {
        const userFrom = userFromArray[0];

        if (userFrom.friends.indexOf(friendTo) === -1) {
            userFrom.friends.push(friendTo);
            
            const ind = userFrom.blocks.indexOf(friendTo);
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