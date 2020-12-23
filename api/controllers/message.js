const Message = require('../models/message');
const mongoose = require('mongoose');
const UserService = require('../service/user');

const message_send_message = async function (req, res, next) {
 
    var checkFlag = true;
    const userData = req.userData;
    const messageFrom = req.body.messageFrom;
    const messageTo = req.body.messageTo;

    var returnMessage = "";

    if(userData.username !== messageFrom) {
        checkFlag = false;
        returnMessage = "Given token is not associated with the user";
    }

    const userFromArray = await UserService.get_user(friendFrom);
    const userToArray = await UserService.get_user(friendTo);
    if (userToArray.length === 0) {
        checkFlag = false;
        returnMessage = messageTo + " is not a valid username";
    }

    if (checkFlag) {
        const userFrom = userFromArray[0];
        const userTo = userToArray[0];

        fromFriends = userFrom.friends;
        fromBlocks = userFrom.blocks;

        toFriends = userTo.friends;
        toBlocks = userTo.blocks;

        if((fromFriends.indexOf(messageTo)===-1) || (fromBlocks.indexOf(messageTo)!==-1)){
            res.status(500).json({
                message: messageTo + " is not in the friends or in the blocks"
            });
        } else {
            if(toFriends.indexOf(messageFrom) === -1) {
                res.status(500).json({
                    message: messageFrom + " and " + messageTo + " are not friends" 
                });     
            } else if(toBlocks.indexOf(messageFrom) !== -1){
                res.status(500).json({
                    message: messageTo + " blocked " + messageFrom
                }); 
            } else {
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

    } else {
        res.status(500).json({
            message: returnMessage
        });
    }
}  

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

exports.message_send_message = message_send_message;