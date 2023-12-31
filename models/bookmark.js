const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
);

module.exports = mongoose.model('Bookmark', bookmarkSchema);