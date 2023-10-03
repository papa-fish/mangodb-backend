require('dotenv').config();
require('./index');

const User = require('../models/user');

console.log('test bed for mangodb api mongodb');

async function test() {
    await User.deleteMany({});

    await User.create({
        email: 'dummyuser@gmail.com',
        passwordDigest: 'dummyUserPassword',
        username: 'Fish',
    });

    await User.create({
        email: 'testuser@gmail.com',
        passwordDigest: 'testUserPassword',
        username: 'Test',
    });

    const users = await User.find();
    console.log(users)
};

test();