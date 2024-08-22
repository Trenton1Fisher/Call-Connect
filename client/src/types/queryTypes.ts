export type AccountDetails = {
  premium: number
  tickets_created: number
  messages_sent: number
}

export type TicketSearch = {
  count: number
  tickets: TicketSearchTickets[]
}

export type TicketSearchTickets = {
  title: string
  description: string
  callMethod: number
  premium: boolean
  created_at: Date
  room_category: number
  room_id: string
}

export type ClientSecretReturn = {
  client_secret: string
}

export type RoomExists = {
  room_exists: boolean
}

export type MessageType = {
  message: string
  isUser: boolean
}
