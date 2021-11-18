import mongoose from 'mongoose'
 
const Schema = mongoose.Schema;
const GradeSchema = new Schema({
  Name: String,
  Subject: String,
  Score: Number
});
const ScoreCard = mongoose.model('ScoreCard', GradeSchema);

export default ScoreCard;