import mongoose from 'mongoose'
 
const Schema = mongoose.Schema;
const StrategySchema = new Schema({
    id: String,
    name: String,
    username: String
});

export default mongoose.model('Strategys', StrategySchema);
