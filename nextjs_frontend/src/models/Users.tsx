import mongoose from 'mongoose';

export interface UserSchema {
    name: string,
    email: string,
    password: string,
};

const UserModel = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

export default mongoose.models.Bot || 
    mongoose.model('Users', UserModel);
