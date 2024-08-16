type TicketForm = {
  title: string
  description: string
  keywords: string[]
  callMethod: number
}

export function validateTicketForm(ticket: TicketForm) {
  if (!ticket.title) {
    return { passed: false, message: 'Please Fill Out Title Field' }
  }

  if (ticket.keywords.length > 5) {
    return { passed: false, message: 'Please Use Under Five Keywords' }
  }

  return { passed: true, message: 'Passed' }
}
