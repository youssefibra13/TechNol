const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Unintended Consequences", "Tech Ethics & Philosophy", "Race & Technology", "AI & Society", "Tech in Conflict", "Design for Justice", "Future of Tech", "Health & Tech"],
        message: "{VALUE} is not supported"
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });  

module.exports = model('Post', postSchema);