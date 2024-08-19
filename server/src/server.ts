import express from 'express'
import cors from 'cors'
import {
  accountCheck,
  AccountDetails,
  accountStatus,
  TicketRequest,
  tickets_created,
} from './types/types'
import * as dbUtils from './utils/dbUtils'

const app = express()
const PORT = 8080

const corsOptions = {
  origin: 'http://localhost:5173',
  optionSuccessStatus: 200,
}

app.use(cors())
app.use(express.json())

//Get account Statistics
app.get('/account/data/:accountId', async (req, res) => {
  const accountId = req.params.accountId
  if (!accountId) {
    return res.status(400).send('No account Provided')
  }

  try {
    const account = await dbUtils.GetAccountDetails(accountId)
    if (!account) {
      return res.status(400).send('No account in Database')
    }
    return res.status(200).json(account)
  } catch (error) {
    return res.status(500).send('An unexpected error happened')
  }
})

//Create New Ticket, need to see if account statistics exists, check total usage, and create ticket
app.post('/ticket/create', cors(corsOptions), async (req, res) => {
  let premium = false
  const ticketData = req.body as TicketRequest

  if (!ticketData || !ticketData.title) {
    return res.status(400).send('Invalid Request Body')
  }

  try {
    const accountExists = await dbUtils.CheckAccountExists(ticketData.userId)

    if (accountExists === 0) {
      await dbUtils.createFreeAccount(ticketData.userId)
    } else {
      const account_premium = await dbUtils.checkAccountPremiumStatus(
        ticketData.userId
      )

      if (account_premium === 1) {
        premium = true
      } else {
        const limit_reached = await dbUtils.CheckTicketCreatedAmount(
          ticketData.userId
        )
        console.log(limit_reached)

        if (limit_reached) {
          return res.status(400).send('Account Ticket Creation Limit Reached')
        }
      }
    }

    await dbUtils.CreateTicket(
      ticketData.userId,
      ticketData.title,
      ticketData.description,
      premium,
      ticketData.callMethod
    )

    await dbUtils.UpdateAccountDetails(ticketData.userId)

    return res.status(200).send('Ticket Created')
  } catch (error) {
    console.error('Error creating ticket:', (error as Error).message)
    return res.status(500).send('Internal Server Error')
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
