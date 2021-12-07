// import WebSocket from 'ws';
// import http from 'http'
// import express from 'express';
import mongoose from 'mongoose';
import Message from './message';

const url = "mongodb+srv://lawfung:boook1234@cluster0.2q4c7.mongodb.net/hack2?retryWrites=true&w=majority"

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {console.log("mongo db connection created")})

const db = mongoose.connection
db.on("error", (error) => {
    throw new Error("DB connection error: " + error);
});

db.once('open', () => {
    const f = async () => {
        const message = new Message({ name : 1, body : 2 })
        await message.save();
        console.log("before")
        await Message.deleteMany({});
        // try {
        //     await Message.deleteMany({});
        // } catch (e) { console.log(e) }
        console.log("finish")
    }
    f();
})
