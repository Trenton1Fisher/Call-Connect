import { UserProfile } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'
import { SignOutButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { useEffect } from 'react'
import { useState } from 'react'
import { AccountDetails } from '../types/queryTypes'

export default function Account() {
  const { isSignedIn, user, isLoaded } = useUser()
  const [accountStatistics, setAccountStatistics] = useState({
    premium: 0,
    tickets_created: 0,
    messages_sent: 0,
  })

  useEffect(() => {
    async function fetchAccountData() {
      try {
        if (!user) {
          return
        }
        const response = await fetch(
          `http://localhost:8080/account/data/${user.id}`,
          {
            method: 'GET',
          }
        )

        if (!response.ok) {
          console.log('Failed to fetch account data')
          return
        }

        const accountData: AccountDetails = await response.json()
        if (!accountData) {
          throw new Error()
        }
        setAccountStatistics(accountData)
      } catch (error) {
        console.log('Error fetching account data:', error)
      }
    }
    fetchAccountData()
  }, [user])

  if (!isLoaded) {
    return (
      <div className="h-screen text-center flex flex-col items-center justify-center md:mt-[-100px]">
        <h3>Retrieving Account Details</h3>
        <ClipLoader />
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="h-screen text-center flex flex-col items-center justify-center md:mt-[-100px]">
        <h3>Please Create An account Before Proceeding</h3>
        <Link className="underline text-blue-700" to="/login">
          Login
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center md:mt-12 sm:mt-24 min-h-screen">
      <div className="mx-auto py-12">
        <div className="flex">
          <h3 className="text-2xl font-bold">Account Details</h3>
          <SignOutButton>
            <button className="text-lg font-bold bg-red-600 text-white p-2 rounded-xl mb-4 ml-auto">
              Sign Out
            </button>
          </SignOutButton>
        </div>
        <UserProfile />
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold">Account Statistics</h3>
        <div>
          <div className="w-full max-w-4xl mx-auto py-8 md:py-12 px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                    Tickets Created
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold">
                      {accountStatistics.tickets_created}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-muted-foreground"
                    >
                      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                      <path d="M13 5v2"></path>
                      <path d="M13 17v2"></path>
                      <path d="M13 11v2"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                    Messages Sent
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold">
                      {accountStatistics.messages_sent}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                    Account Status
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-4xl font-bold">
                      {accountStatistics.premium ? 'Premium' : 'Free'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
