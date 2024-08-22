import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {
  messages_sent,
  room_exists,
  room_exists_id,
  TicketRequest,
  update_account,
} from './types/types'
import * as dbUtils from './utils/dbUtils'
import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config()

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
if (!STRIPE_SECRET_KEY) {
  console.log('Stripe key not found')
}
const stripe = new Stripe(STRIPE_SECRET_KEY as string)
const app = express()
const PORT = 8080

const corsOptions = {
  origin: 'http://localhost:5173',
  optionSuccessStatus: 200,
}

app.use(cors())
app.use(express.json())

// Create the HTTP server
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

// Handle Socket.IO connections
io.on('connect', socket => {
  console.log(`New client connected: ${socket.id}`)
  socket.on('join_room_with_id', (roomid: string) => {
    socket.join(roomid)
    io.to(roomid).emit('new_user_join')
  })

  socket.on('message_from_client', function (msgObj, roomId) {
    socket.to(roomId).emit('message_from_server', msgObj)
  })

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`)
  })

  // You can add more event handlers here
})

//Get account Statistics
app.get('/account/data/:accountId', async (req, res) => {
  const accountId = req.params.accountId
  if (!accountId) {
    return res.status(400).send('No account Provided')
  }

  try {
    const accountExists = await dbUtils.CheckAccountExists(accountId)
    if (accountExists === 0) {
      await dbUtils.createFreeAccount(accountId)
    }
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

        if (limit_reached) {
          return res.status(400).send('Account Ticket Creation Limit Reached')
        }
      }
    }

    const roomId = await dbUtils.CreateTicket(
      ticketData.userId,
      ticketData.title,
      ticketData.description,
      premium,
      ticketData.callMethod
    )

    await dbUtils.UpdateAccountDetails(ticketData.userId)

    return res.status(200).json(roomId)
  } catch (error) {
    console.error('Error creating ticket:', (error as Error).message)
    return res.status(500).send('Internal Server Error')
  }
})

//Search Tickets with pagination page included
app.get('/ticket/getAll/:page', async (req, res) => {
  const page = req.params.page
  try {
    const ticketsCount = await dbUtils.getTotalTicketsCount()
    const ticketSearch = await dbUtils.getPaginatedTickets(Number(page), 15)
    if (!ticketSearch) {
      return res.status(400).send('No tickets Found')
    }
    return res.status(200).json({ count: ticketsCount, tickets: ticketSearch })
  } catch (error) {
    console.error('Error Searching tickets:', (error as Error).message)
    return res.status(500).send('Internal Server Error')
  }
})

app.post('/ticket/delete', async (req, res) => {
  const roomId = req.body as { id: string }
  try {
    await dbUtils.DeleteTicketWithRoomId(roomId.id)
    return res.status(200).send('Ticket Deleted')
  } catch (error) {
    console.error('Error Searching tickets:', (error as Error).message)
    return res.status(500).send('Internal Server Error')
  }
})

app.get('/checkout/create-session', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
    })

    return res.status(200).json({ client_secret: paymentIntent.client_secret })
  } catch (error) {
    return res.status(500).send('Could not get Client Secret')
  }
})

app.post('/checkout/create-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Call-Connect Premium Account',
          },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    success_url: 'http://localhost:5173/success',
    cancel_url: 'http://localhost:5173/cancel',
  })

  res.json({ id: session.id })
})

app.post('/account/update/premium', async (req, res) => {
  const userId = req.body as update_account

  try {
    await dbUtils.UpdateAccountToPremium(userId.userID)
    return res.status(200).send('Account Updated')
  } catch (error) {
    return res.status(500).send('Could not Update Account')
  }
})

app.post('/message/check', async (req, res) => {
  const userId = req.body.userId
  console.log(userId)

  try {
    const ticket = await dbUtils.CheckIfUserCreatedRoom(userId)
    if (!ticket) {
      return res.status(200).send('User did not create this room')
    }

    const account_status = await dbUtils.checkAccountPremiumStatus(userId)
    if (account_status === 1) {
      return res.status(200).send('Premium Account')
    }

    const messagesSent: messages_sent = await dbUtils.CheckAccountMessagesSent(
      userId
    )
    console.log(messagesSent)
    const MESSAGE_LIMIT = 100
    if (messagesSent.messages_sent >= MESSAGE_LIMIT) {
      return res.status(403).send('Message limit reached')
    }

    await dbUtils.incrementMessagesSent(userId)

    return res.status(200).send('Message Sent')
  } catch (error) {
    console.error('Error handling message check:', error)
    return res.status(500).send('Could not update account')
  }
})

app.get('/room/exists/:roomId', async (req, res) => {
  const roomId = req.params.roomId

  try {
    const exists = await dbUtils.CheckIfRoomExists(roomId)
    return res.status(200).json({ room_exists: exists === 1 })
  } catch (error) {
    console.error('Error checking room existence:', error)
    return res.status(500).json({ room_exists: false })
  }
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
