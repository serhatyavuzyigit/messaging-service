const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
exports.user_signup = (req, res, next) => {

    User.find({
        $or: [
            { email: req.body.email },
            { username: req.body.username }
        ]
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'User exists'
                });    
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        return res.status(500).json({ error: err });
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            username: req.body.username,
                            password: hash,
                            friends: [],
                            blocks: []
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created.'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({ error: err });
                            });
                    }
                });
            }
        })
        .catch();
};

exports.user_login = (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            username: user[0].username,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    ); 
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                }
                return res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.user_get_all = (req, res, next) => {
    User.find()
        .select('email username friends blocks')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        _id: doc._id,
                        email: doc.email,
                        username: doc.username,
                        friends: doc.friends,
                        blocks: doc.blocks,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id 
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
};

exports.user_delete = (req, res, next) => {  
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};