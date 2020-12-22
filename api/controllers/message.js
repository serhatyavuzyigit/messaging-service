const User = require('../models/user');
const Message = require('../models/message');
const mongoose = require('mongoose');
const user = require('../models/user');

exports.message_send_message = (req, res, next) => {    
    var checkFlag = true;
    const userData = req.userData;
    const messageFrom = req.body.messageFrom;
    const messageTo = req.body.messageTo;

    friends = userData.friend;
    blocks = userData.blocks;

    var returnMessage = "";

    if(userData.username !== messageFrom) {
        checkFlag = false;
        returnMessage = "Given token is not associated with the user";
    }
    
    if((friends.indexOf(messageTo) === -1) || (blocks.indexOf(messageTo) !== -1)) {
        checkFlag = false;
        returnMessage = messageTo + " is not in the friends or in the blocks";
    }

    if(checkFlag) {
        User.find({ username: messageTo })
            .exec()
            .then(usr => {
                if (usr.length === 0) {
                    res.status(500).json({
                        message: messageTo + " is not a valid username"
                    });    
                } else {

                    if(usr[0].friends.indexOf(messageFrom) === -1) {
                        res.status(500).json({
                            message: messageTo + " and " + messageFrom + " are not friends" 
                        });     
                    } else if(usr[0].blocks.indexOf(messageFrom) !== -1){
                        res.status(500).json({
                            message: messageTo + " blocked " + messageFrom
                        }); 
                    }
                    else {
                        const content = req.body.content;
                        const sendTime = Date(Date.now());
                    
                        const msg = new Message({
                            _id: mongoose.Types.ObjectId(),
                            from: messageFrom, 
                            to: messageTo, 
                            content: content, 
                            sendTime: sendTime
                        });
                        msg.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "message sent"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({ error: err });    
                            });
                    }
                }    
            })
            .catch();
    } else {
        res.status(500).json({
            message: returnMessage
        });
    }


};  

exports.message_get_messages = (req, res, next) => {
    const username = req.params.username;
    Message.find({
        $or: [
            { to: username },
            { from: username }
        ]    
        })
        .select('from to content sendTime')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                messages: docs.map(doc => {
                    return {
                        from: doc.from, 
                        to: doc.to, 
                        content: doc.content, 
                        sendTime: doc.sendTime.toString()
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

