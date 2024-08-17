import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import { accountCheck, accountStatus, TicketRequest } from './types/types'
import {
  accountExistsQuery,
  checkAccountStatus,
  createFreeAccountWithUserId,
  createNewTicket,
} from './queries'

const app = express()
const PORT = 8080

const corsOptions = {
  origin: 'http://localhost:5173',
  optionSuccessStatus: 200,
}

const databaseConnection = new sqlite3.Database(
  '../database/mydatabase.db',
  err => {
    if (err) {
      console.error('Error connecting to the database:', err.message)
    } else {
      console.log('Connected to the mydatabase.db SQLite database.')
    }
  }
)

app.use(cors())
app.use(express.json())

app.post('/ticket/create', cors(corsOptions), (req, res) => {
  let premium = false
  const ticketData = req.body as TicketRequest
  if (!ticketData || !ticketData.title) {
    return res.status(400).send('Invalid Request Body')
  }

  databaseConnection.get(
    accountExistsQuery(),
    [ticketData.userId],
    (err, row: accountCheck) => {
      if (err) {
        console.error('Error checking account existence:', err.message)
        return res.status(400).send('Error Retreiving Account Information')
      }

      if (row) {
        console.log('Query result:', row)
        if (row.count === 0) {
          databaseConnection.run(
            createFreeAccountWithUserId(),
            [ticketData.userId, false],
            err => {
              if (err) {
                console.error('Error checking account existence:', err.message)
                return res
                  .status(400)
                  .send('Could Not Generate Account For User')
              }
            }
          )
        } else {
          databaseConnection.get(
            checkAccountStatus(),
            [ticketData.userId],
            (err, row: accountStatus) => {
              if (err) {
                console.error('Error checking account existence:', err.message)
                return res
                  .status(400)
                  .send('Could Not Generate Account For User')
              }
              if (row.premium === 1) {
                premium = true
              }
            }
          )
        }
      } else {
        return res
          .status(400)
          .send('Error Accessing Database Please Try Again Later')
      }
    }
  )

  databaseConnection.run(
    createNewTicket(),
    [
      ticketData.userId,
      ticketData.title,
      ticketData.description,
      false,
      ticketData.callMethod,
    ],
    err => {
      if (err) {
        console.error('Error inserting ticket:', err.message)
        return res
          .status(400)
          .send('Error accessing database. Please try again later.')
      }
    }
  )
  return res.status(200).send('Ticket Created')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
