import sqlite3 from 'sqlite3'
import {
  accountExistsQuery,
  checkAccountStatusQuery,
  createFreeAccountWithUserIdQuery,
  createNewTicketQuery,
  getAccountDetailsQuery,
  getTicketsCreatedQuery,
  updateAccountDetailsQuery,
} from './queries'
import {
  accountCheck,
  AccountDetails,
  accountStatus,
  tickets_created,
} from '../types/types'

const databaseConnection = new sqlite3.Database(
  '../database/mydatabase.db',
  err => {
    if (err) {
      console.error('Error connecting to the database:', err.message)
    } else {
      console.log('Connected to the mydatabase.db SQLite database.')
    }
  }
)

export function GetAccountDetails(
  accountId: string
): Promise<AccountDetails | null> {
  return new Promise((resolve, reject) => {
    databaseConnection.get(
      getAccountDetailsQuery(),
      [accountId],
      (err, row: AccountDetails) => {
        if (err) {
          console.error('Error checking account existence', err.message)
          reject(new Error('Error Retreiving Account Information'))
        } else {
          resolve(row || null)
        }
      }
    )
  })
}

export function CheckAccountExists(userId: string): Promise<number> {
  return new Promise((resolve, reject) => {
    databaseConnection.get(
      accountExistsQuery(),
      [userId],
      (err, row: accountCheck) => {
        if (err) {
          console.error('Error checking account existence:', err.message)
          reject(new Error('Could not check account existence'))
        } else if (row) {
          resolve(row.count)
        } else {
          reject(new Error('No account found'))
        }
      }
    )
  })
}

export function createFreeAccount(userId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    databaseConnection.run(
      createFreeAccountWithUserIdQuery(),
      [userId],
      err => {
        if (err) {
          console.error('Error creating New Account:', err.message)
          reject(new Error('Could not create new Account'))
        } else {
          resolve()
        }
      }
    )
  })
}

export function checkAccountPremiumStatus(userId: string): Promise<number> {
  return new Promise((resolve, reject) => {
    databaseConnection.get(
      checkAccountStatusQuery(),
      [userId],
      (err, row: accountStatus) => {
        if (err) {
          console.error('Error checking account status:', err.message)
          reject(new Error('Could not check account status'))
        } else if (row) {
          resolve(row.premium)
        } else {
          reject(new Error('No account found'))
        }
      }
    )
  })
}

export function CheckTicketCreatedAmount(userId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    databaseConnection.get(
      getTicketsCreatedQuery(),
      [userId],
      (err, row: tickets_created) => {
        if (err) {
          console.error('Error checking ticket count:', err.message)
          reject(new Error('Could not check the number of tickets created'))
        } else if (row && row.tickets_created >= 4) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    )
  })
}

export function CreateTicket(
  userId: string,
  title: string,
  description: string,
  premium: boolean,
  callMethod: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    databaseConnection.run(
      createNewTicketQuery(),
      [userId, title, description, premium, callMethod],
      err => {
        if (err) {
          console.error('Error creating ticket:', err.message)
          reject(new Error('Could not create ticket'))
        } else {
          resolve()
        }
      }
    )
  })
}

export function UpdateAccountDetails(userId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    databaseConnection.run(updateAccountDetailsQuery(), [userId], err => {
      if (err) {
        console.error('Error creating ticket:', err.message)
        reject(new Error('Could not create ticket'))
      } else {
        resolve()
      }
    })
  })
}
