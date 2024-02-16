import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentModel = new Schema(
    {
        from: { type: Object },
        text: { type: String },
        replies: [
            {
                text: { type: String },
                from: { type: Object }
            }
        ],
    },
    { timestamps: true }
);

const Comment = mongoose.model('topBikeComments', commentModel);

export default Comment;
