import express from 'express'
import cors from 'cors'
import route from './routes/index'
import bodyParser from 'body-parser'; 

const app = express()

// init middleware
app.use(cors())
app.use(bodyParser.json());


// define routes
app.use('/api', route)

// define server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})