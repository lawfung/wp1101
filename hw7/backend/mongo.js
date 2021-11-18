import mongoose from 'mongoose';
import ScoreCard from './models/ScoreCard'
import dotenv from "dotenv-defaults";
dotenv.config()
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("mongo db connection created"));
 

const AddCard = async (Name, Subject, Score) => {
    try {
        const existing = await ScoreCard
            .findOneAndUpdate({ Name, Subject }, {Name, Subject, Score}, {upsert : true});
        return {message : `${existing ? "Updating" : "Adding"} (${Name}, ${Subject}, ${Score})`, card : true};
    } catch (e) { return {message : "error: " + e, card : null}; }
};
  
const deleteDB = async () => {
    try {
        await ScoreCard.deleteMany({});
        return "Database cleared";
    } catch (e) { return "Database deletion failed"; }
};

const QueryCard = async (type, str) => {
    try {
        const lst = await ScoreCard.find({ [type] : str });
        if(lst.length === 0){
            return {message : `${type} (${str}) not found!`};
        }
        return {messages : lst.map(e => `${e.Name}, ${e.Subject}, ${e.Score}` )};
    } catch (e) { return {message : "error: " + e}; }
}

export {AddCard, deleteDB, QueryCard};