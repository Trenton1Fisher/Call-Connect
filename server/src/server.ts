import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 8080

const corsOptions = {
  origin: 'http://localhost:5173',
  optionSuccessStatus: 200,
}

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from the server')
})

app.post('/ticket/create', cors(corsOptions), (req, res) => {
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
