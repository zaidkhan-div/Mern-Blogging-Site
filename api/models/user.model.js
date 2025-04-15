import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
    { timestamps: true });
// With timestamps: true, every time a document is created or updated, MongoDB will automatically populate the createdAt and updatedAt fields with the current date and time.    

const User = mongoose.model('User', userSchema);

export default User;
