require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../library/app_error');

router.post('/login', async (req, res, next) => {

    const { email, password } = req.body;

    try{

        const user = await User.findOne({ email });

        if(!user) {
            throw new AppError(400, 'Invalid Email or Password');
        };

        const match = await bcrypt.compare(password, user.passwordDigest)

        if(!match) {
            throw new AppError(400, 'Invalid Email or Password');
        };

        const token = createJsonWebToken({
            id: user._id,
            email: user.email,
            user_id: user.username,
        });

        res.json(token);

    } catch(err) {
        next(err);
    };
});

router.post('/signup', async (req, res, next) => {

    const { email, username, password } = req.body;
    
    try {
        const user = await User.create({
            email: email,
            username: username,
            passwordDigest: password
        });

        res.json(user);

    } catch(err) {
        next(err);
    };
});

function createJsonWebToken(data) {
    return jwt.sign(data, process.env.SECRET, {
        expiresIn: '24h'
    });
};

module.exports = router;