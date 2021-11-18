import express from 'express'
import {AddCard, deleteDB, QueryCard} from '../mongo'

const router = express.Router()
router.post('/create-card', async (req, res) => {
  res.json(await AddCard(req.body.name, req.body.subject, req.body.score))
})
router.delete('/clear-db', async (_, res) => {
    res.json( { message: await deleteDB() })
})
router.get('/query-cards', async (req, res) => {
  res.json(await QueryCard(req.query.type, req.query.queryString))
})
export default router