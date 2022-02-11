const { Schema, model } = require("mongoose");

const postSquema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
},
{
  timestamps: true,
});

module.exports = model("Post", postSquema);