import mongoose from 'mongoose'
 
const Schema = mongoose.Schema;
const RecordSchema = new Schema({
    id: String,
    strategyID: String,
    assetType: String,
    startTime: Number,
    endTime: Number,
    start: Number,
    end: Number,
    high: Number,
    low: Number,
    username: String
});

export default mongoose.model('Records', RecordSchema);
