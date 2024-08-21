export function accountExistsQuery(): string {
  return 'SELECT COUNT(*) AS count FROM call_connect_account WHERE account_id = ?'
}

export function checkAccountStatusQuery(): string {
  return 'SELECT premium FROM call_connect_account WHERE account_id = ?'
}

export function createFreeAccountWithUserIdQuery(): string {
  return 'INSERT INTO call_connect_account(account_id, premium) VALUES(?, ?)'
}

export function createNewTicketQuery(): string {
  return 'INSERT INTO call_connect_ticket (account_id, title, description, premium, room_category, room_id) VALUES (?, ?, ?, ?, ?, ?)'
}

export function updateAccountDetailsQuery(): string {
  return 'UPDATE call_connect_account SET tickets_created = tickets_created + 1 WHERE account_id = ?'
}

export function getAccountDetailsQuery(): string {
  return 'SELECT premium, tickets_created, messages_sent FROM call_connect_account WHERE account_id = ?'
}

export function getTicketsCreatedQuery(): string {
  return 'SELECT tickets_created FROM call_connect_account WHERE account_id = ?'
}

export function getTotalNumTicketsQuery(): string {
  return 'SELECT COUNT(*) AS count FROM call_connect_ticket'
}

export function getTicketsDataQuery(): string {
  return 'SELECT title, description, premium, room_id, created_at, room_category FROM call_connect_ticket ORDER BY premium DESC, created_at ASC LIMIT ? OFFSET ?'
}

export function deleteTicketWithRoomIdQuery(): string {
  return 'DELETE FROM call_connect_ticket WHERE room_id = ?'
}

export function UpdateAccountToPremiumQuery(): string {
  return 'UPDATE call_connect_account SET premium = 1 WHERE account_id = ?'
}
