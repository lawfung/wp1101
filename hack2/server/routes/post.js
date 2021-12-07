import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)

router.get('/allPosts', async (req, res) => {
    try {
        const lst = await Post.find({}).sort({timestamp : -1});
        if(lst.length === 0){
            throw 'empty';
        }
        // res.send({message : "success", data : lst.map(e => `${e.Name}, ${e.Subject}, ${e.Score}` )} )
        // console.log(lst)
        res.send({message : "success", data : lst } )
    } catch (e) { res.status(403).send({ message: "error", data : null }) }
})

// TODO 3-(1): create the 2nd API (/api/postDetail)

router.get('/postDetail', async (req, res) => {
    // console.log("asdlfkl")
    try {
        // console.log("CC")
        const P = await Post.findOne({postId : req.query.pid});
        // console.log(P)
        if(P){
            res.send({message : "success", post : P} )
        }
        else{
            throw "not found"
        }
    } catch (e) { res.status(403).send({ message: "error", post : null }) }
})

// TODO 4-(1): create the 3rd API (/api/newPost)

router.post('/newPost', async (req, res) => {
    try {
        const message = new Post(req.body)
        console.log(req.body)
        console.log(message)
        await message.save();
        // console.log("asdlfkl")
        res.send({message : "success"} )
    } catch (e) { res.status(403).send({ message: "error", post: null }) }
})

// TODO 5-(1): create the 4th API (/api/post)

router.delete('/post', async (req, res) => {
    try {
        const D = await Post.deleteMany({postId : req.query.pid})
        if(D['deletedCount'] === 0){
            throw "fail"
        }
        console.log(D)
        console.log(req.body.pid)
        res.send({message : "success"} )
    } catch (e) { res.status(403).send({ message: "error", post: null }) }
})

export default router