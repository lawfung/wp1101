import express from 'express'
import { genNumber, getNumber } from '../core/getNumber'
const router = express.Router()
router.post('/start', (_, res) => {
  genNumber()  // 用亂數產生一個猜數字的 number
  res.json({ msg: 'The game has started.' })
})
router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = (req.query.number).match(/^[1-9][0-9]+$/) && parseInt(req.query.number, 10);
  // roughScale(req.query.number, 10)
  // check if NOT a num or not in range [1,100]
  // console.log(guessed)
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(406).send({ msg: `"${req.query.number}" is not a legal number.` })
  } else if (number === guessed) {
    res.send({msg : "Equal"})
  }
  else if(number < guessed) {
    res.send({msg : "Smaller"})
  }
  else{
    res.send({msg : "Bigger"})
  }
})
router.post('/restart', (_, res) => {
  genNumber()  // 用亂數產生一個猜數字的 number
  res.json({ msg: 'The game has restarted.' })
})
export default router