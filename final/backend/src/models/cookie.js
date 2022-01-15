import mongoose from 'mongoose'
 
const Schema = mongoose.Schema;
const CookieSchema = new Schema({
    user: String,
    cookie: String,
});

export default mongoose.model('Cookies', CookieSchema);