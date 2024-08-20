export type TicketRequest = {
  userId: string
  title: string
  description: string
  callMethod: number
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
  room_category: number
  room_id: string
  created_at: Date
}

export type AccountDetails = {
  premium: number
  tickets_created: number
  messages_sent: number
}

export type accountCheck = {
  count: number
}

export type countCheck = {
  count: number
}

export type accountStatus = {
  premium: number
}

export type tickets_created = {
  tickets_created: number
}
