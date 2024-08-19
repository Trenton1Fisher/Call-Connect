export function accountExistsQuery(): string {
  return 'SELECT COUNT(*) AS count FROM call_connect_account WHERE account_id = ?'
}

export function checkAccountStatus(): string {
  return 'SELECT premium FROM call_connect_account WHERE account_id = ?'
}

export function createFreeAccountWithUserId(): string {
  return 'INSERT INTO call_connect_account(account_id, premium) VALUES(?, ?)'
}

export function createNewTicket(): string {
  return 'INSERT INTO call_connect_ticket (account_id, title, description, premium, room_category) VALUES (?, ?, ?, ?, ?)'
}

export function updateAccountDetails(): string {
  return 'UPDATE call_connect_account SET tickets_created = tickets_created + 1 WHERE account_id = ?'
}

export function getAccountDetails(): string {
  return 'SELECT premium, tickets_created, messages_sent FROM call_connect_account WHERE account_id = ?'
}
