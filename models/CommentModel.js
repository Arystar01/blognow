import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true  
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }, // 👈 add this
 
});

export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default Comment;