type TicketForm = {
  title: string
  description: string
  callMethod: number
}

export function validateTicketForm(ticket: TicketForm) {
  if (!ticket.title) {
    return { passed: false, message: 'Please Fill Out Title Field' }
  }
  return { passed: true, message: 'Passed' }
}
