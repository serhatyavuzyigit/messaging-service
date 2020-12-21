const User = require('../models/user');

exports.blocks_add_blocks = (req, res, next) => {
    const blockFrom = req.body.blockFrom;
    const blockTo = req.body.blockTo;
    User.find({ username: blockFrom })
        .exec()
        .then(user => {
            if (user[0].blocks.indexOf(blockTo) === -1) {
                user[0].blocks.push(blockTo);
                user[0].save();
            } else {
                return res.status(200).json({
                    message: "They are already blocked each other"
                });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    
    User.find({ username: blockTo })
        .exec()
        .then(user => {
            if (user[0].blocks.indexOf(blockFrom) === -1) {
                user[0].blocks.push(blockFrom);
                user[0].save();
            } else {
                return res.status(200).json({
                    message: "They are already blocked each other"
                });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    return res.status(201).json({
        message: "They blocked each other"
    });

    
};