const UserService = require('../service/user');

const blocks_add_blocks = async function(req, res, next) {

    var checkFlag = true;
    const userData = req.userData;
    const blockFrom = req.body.blockFrom;
    const blockTo = req.body.blockTo;

    var returnMessage = "";
    if (userData.username !== blockFrom) {
        checkFlag = false;
        returnMessage = "given token is not associated with user";
    }
    const userFromArray = await UserService.get_user(blockFrom);
    const userToArray = await UserService.get_user(blockTo);
    
    if (userToArray.length === 0) {
        checkFlag = false;
        returnMessage = blockTo + " is not a valid username";
    }

    if (checkFlag) {
        const userFrom = userFromArray[0];
        const userTo = userToArray[0];

        if (userFrom.blocks.indexOf(userTo) === -1) {
            userFrom.blocks.push(userTo);
            
            const ind = userFrom.friends.indexOf(userTo);
            if (ind > -1) {
                userFrom.friends.splice(ind, 1);
            }
            userFrom.save();
            res.status(201).json({
                message: blockFrom + " added " + blockTo + " to his-her friends list"
            });
        } else {
            res.status(200).json({
                message: blockFrom + " already added " + blockTo + " to his-her friends list"
            });
        }
    } else {
        res.status(500).json({
            message: returnMessage
        });
    }


}

exports.blocks_add_blocks = blocks_add_blocks;