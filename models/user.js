const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        passwordDigest: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function(next) {
    if(!this.isModified('passwordDigest')) {
        return next();
    };
    this.passwordDigest = await bcrypt.hash(this.passwordDigest, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);