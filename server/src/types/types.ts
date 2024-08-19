export type TicketRequest = {
  userId: string
  title: string
  description: string
  callMethod: number
}

export type AccountDetails = {
  premium: number
  tickets_created: number
  messages_sent: number
}

export type accountCheck = {
  count: number
}

export type accountStatus = {
  premium: number
}

export type tickets_created = {
  tickets_created: number
}
