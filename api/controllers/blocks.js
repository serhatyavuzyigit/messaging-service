const User = require('../models/user');

exports.blocks_add_blocks = (req, res, next) => {
    var checkFlag = true;
    const userData = req.userData;
    const blockFrom = req.body.blockFrom;
    const blockTo = req.body.blockTo;
    if (userData.username !== blockFrom) {
        checkFlag = false;
    }

    if(checkFlag) {
        User.find({ username: blockTo })
        .exec()
        .then(usr => {
            if (usr.length === 0) {
                res.status(500).json({
                    message: blockTo  + " is not a valid username"
                });    
            } else {
                User.find({ username: blockFrom })
                .exec()
                .then(user => {
                    if (user[0].blocks.indexOf(blockTo) === -1) {
                        user[0].blocks.push(blockTo);
                        user[0].save();
                        res.status(201).json({
                            message: blockFrom + " added " + blockTo + " to his-her blocks list"
                        });
                    } else {
                        res.status(200).json({
                            message: blockFrom + " already added " + blockTo + " to his-her blocks list"
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