import { useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import { useEffect, useState } from 'react'
import { TicketSearch } from '../types/queryTypes'
import { FaVideo, FaCommentDots } from 'react-icons/fa'

export default function Browse() {
  const { isSignedIn, user } = useUser()
  const [loading, setLoading] = useState(false)
  const [tickets, setTickets] = useState<TicketSearch | null>()

  useEffect(() => {
    setLoading(true)
    async function getOpenTickets() {
      try {
        const response = await fetch(
          `http://localhost:8080/ticket/getAll/${1}`,
          {
            method: 'GET',
          }
        )
        if (!response.ok) {
          console.log('Failed to fetch account data')
          return
        }

        const ticketData: TicketSearch = await response.json()
        if (!ticketData) {
          throw new Error()
        }
        setTickets(ticketData)
      } catch (error) {
        console.log(error)
      }
    }
    getOpenTickets()
    setLoading(false)
  }, [user])

  if (loading) {
    return (
      <div className="h-screen text-center flex flex-col items-center justify-center md:mt-[-100px]">
        <h3>Searching For Open Tickets</h3>
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
    <div className="font-sans antialiased min-h-screen browse-container">
      <h1 className="font-sans font-bold text-3xl md:text-5xl my-8 leading-none text-center text-gray-600 dark:text-gray-200">
        {tickets?.count} Results Found
      </h1>
      {tickets ? (
        tickets.tickets.map((ticket, index) => (
          <div key={index} className="mx-auto px-4 py-4 max-w-xl relative">
            <div className="absolute top-4 right-4 px-4 py-4 text-xs font-bold rounded-lg">
              {ticket.premium ? (
                <span className="flex items-center gap-1">
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
                    className="h-4 w-4 text-primary"
                  >
                    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path>
                    <path d="M5 21h14"></path>
                  </svg>
                  Premium
                </span>
              ) : (
                <span className="flex items-center gap-1">
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
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Free
                </span>
              )}
            </div>
            <div className="absolute top-4 right-left px-4 py-4 text-xs font-bold rounded-lg">
              {ticket.room_category === 1 ? (
                <span className="flex items-center bg-green-100 text-green-800 text-xs font-medium py-1 px-2 rounded-full">
                  <FaVideo className="w-4 h-4 mr-1" />
                  <span>Video Call</span>
                </span>
              ) : (
                <span className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded-full">
                  <FaCommentDots className="w-4 h-4 mr-1" />
                  <span>Message Room</span>
                </span>
              )}
            </div>

            <div className="bg-gray-50 md:bg-white md:shadow-xl md:rounded-lg">
              <div className="bg-gray-50 md:bg-white md:shadow-lg dark:bg-gray-900 md:dark:bg-gray-800">
                <a href="#">
                  <div className="p-4">
                    <p className=" font-bold mb-2 pt-4 mt-4 text-2xl text-gray-600 dark:text-gray-200 tracking-normal">
                      {ticket.title}
                    </p>
                    <div className="break-words text-sm text-gray-600 dark:text-gray-400">
                      <p>{ticket.description}</p>
                    </div>
                  </div>
                </a>
                <div className="flex items-center justify-between p-2 md:p-4 md:mx-4">
                  <a href="#">
                    <div className="flex items-center ml-2">
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <span>
                          Created:{' '}
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </a>
                  <div className="text-sm md:text-base text-left text-gray-600 dark:text-gray-400 px-8 py-2">
                    <Link
                      to={`/call?room=${ticket.room_id}`}
                      className=" truncate bg-cyan-900 text-white font-semibold p-2 rounded-lg"
                    >
                      Join Call
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No Results Found</div>
      )}
    </div>
  )
}
