require('dotenv').config();
require('./index');

const User = require('../models/user');

console.log('test bed for mangodb api mongodb');

async function test() {
    await User.deleteMany({});

    await User.create({
        email: 'dummyuser@gmail.com',
        passwordDigest: 'dummyUserPassword'
    });

    const users = await User.find();
    console.log(users);
};

test();