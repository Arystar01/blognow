import mongoose from "mongoose";
import Blog from "./BlogModel";


const UserSchema = new mongoose.Schema({
    clerkID: {
        type: String, required: true, unique: true
    },
    username: {
        type: String, required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        // default:"https://res.cloudinary.com/dmbqxjx0u/image/upload/v1688554887/default-profile-pic_q5qx2y.png"
    },
    bio: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    }, 
    MyBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    likedBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    savedBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
createdAt: {
        type: Date,
        default: Date.now
    }
    
}, {timestamps: true});

export const User = mongoose.models.User || mongoose.model('User', UserSchema); 
export default User;