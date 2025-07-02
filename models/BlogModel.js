import { auth } from "@clerk/nextjs/dist/types/server";
import mongoose from "mongoose";

const BlogSchema= new mongoose.Schema({
    authorClerkId: {
        type: String,
        required: true
    }, 
    authorUsername: {
        type: String,
        required: true
    },
    authorFirstName: {
        type: String,
        required: true
    }, authorLastName:{
        type: String,
        required: true
    },
    authorProfilePicture: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    MainPicture: {
        type: String,
        required: true
    },
    category:{
        type: String,
        enum: [ 'culture', 'education', 'entertainment', 'fashion', 'food', 'health', 'lifestyle', 'politics', 'science', 'sports', 'technology', 'travel', 'other'],

        required: true
    },
    breaking : { 
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {timestamps: true    })

export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)

export default Blog