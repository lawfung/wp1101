import mongoose from 'mongoose'
 
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    user: String,
    hashPasswd: String,
});

export default mongoose.model('Users', UserSchema);