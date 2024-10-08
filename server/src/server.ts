import express from 'express'
import cors from 'cors'
import { ClientRequest, createServer } from 'http'
import { Server } from 'socket.io'
import { messages_sent, TicketRequest, update_account } from './types/types'
import * as dbUtils from './utils/dbUtils'
import dotenv from 'dotenv'
import Stripe from 'stripe'
import { StreamClient, UserRequest } from '@stream-io/node-sdk'

dotenv.config()

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
if (!STRIPE_SECRET_KEY) {
  console.log('Stripe key not found')
}
const stripe = new Stripe(STRIPE_SECRET_KEY as string)

const STREAM_API_KEY = process.env.STREAM_API_KEY
const STREAM_SECRET_KEY = process.env.STREAM_SECRET_KEY
if (!STREAM_API_KEY || !STREAM_SECRET_KEY) {
  console.log('stream keys not found')
}
const streamClient = new StreamClient(
  STREAM_API_KEY as string,
  STREAM_SECRET_KEY as string
)

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

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

// Handle Socket.IO connections
io.on('connect', socket => {
  //Message Room Handlers
  socket.on('join_room_with_id', async (roomid: string) => {
    socket.join(roomid)
    const socketsInRoom = await io.in(roomid).fetchSockets()
    if (socketsInRoom.length > 2) {
      socket.to(socket.id).emit('room_full')
    } else if (socketsInRoom.length === 2) {
      io.in(roomid).emit('both_users_joined')
      try {
        await dbUtils.UpdateRoomFullStatus(roomid)
      } catch (error) {
        console.error(
          `Error deleting ticket for room ${roomid}:`,
          (error as Error).message
        )
      }
    }
  })

  socket.on('message_from_client', function (msgObj, roomId) {
    socket.to(roomId).emit('message_from_server', msgObj)
  })

  socket.on('guest_left_room', async function (room_id: string) {
    try {
      await dbUtils.DeleteTicketWithRoomId(room_id)
    } catch (error) {
      console.error(
        `Error deleting ticket for room ${room_id}:`,
        (error as Error).message
      )
    }
    socket.to(room_id).emit('show_left_room')
  })

  //Video call handlers
  socket.on('join_video_with_id', async (room_id: string) => {
    socket.join(room_id)
    const socketsInRoom = await io.in(room_id).fetchSockets()

    if (socketsInRoom.length > 2) {
      // Prevent more than 2 users from joining
      socket.leave(room_id)
      socket.emit('room_full')
    } else if (socketsInRoom.length === 2) {
      // Notify both users that they can start the video connection
      io.in(room_id).emit('both_users_joined')
    }
  })

  socket.on('callUser', (roomId: string) => {
    io.to(roomId)
  })

  socket.on('answerCall', () => {})

  socket.on('disconnect', async (room_id: string) => {
    io.to(room_id).emit('guest_left_room')
  })
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

  try {
    const ticket = await dbUtils.CheckIfUserCreatedRoom(userId)
    if (!ticket) {
      return res.status(200).send('User did not create this room')
    }

    const account_status = await dbUtils.checkAccountPremiumStatus(userId)
    if (account_status === 1) {
      await dbUtils.incrementMessagesSent(userId)
      return res.status(200).send('Premium Account')
    }

    const messagesSent: messages_sent = await dbUtils.CheckAccountMessagesSent(
      userId
    )
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

app.post('/account/refund', async (req, res) => {
  const body = req.body as { userId: string; roomId: string }

  try {
    const ticket = await dbUtils.CheckIfUserCreatedRoom(body.userId)
    if (!ticket) {
      return res.status(200).send('User did not create this room')
    }
    await dbUtils.RefundFreeAccountTicket(body.userId)
  } catch (error) {}

  return res.status(200).send('account updated')
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/getStreamToken/:accountId', async (req, res) => {
  try {
    const accountId = req.params.accountId

    if (!accountId) {
      return res.status(400).send('No Account Found')
    }

    const userId = accountId
    const newUser: UserRequest = {
      id: userId,
      role: 'user',
      custom: {
        color: 'red',
      },
      name: `user${accountId}`,
      image: 'link/to/profile/image',
    }
    await streamClient.upsertUsers([newUser])

    // Generate the user token and check for errors
    const user_id = streamClient.generateUserToken({ user_id: accountId })
    if (!user_id) {
      return res.status(500).send('Auth token could not be generated')
    }

    return res.status(200).json({ user_id })
  } catch (error) {
    console.error('Internal server error:', error)
    return res.status(500).send('Internal server error')
  }
})
