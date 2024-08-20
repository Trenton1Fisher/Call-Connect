import { FormEvent, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import { validateTicketForm } from '../utils/CreateTicketVilidate'
import { JoinRoomModal } from '../components/partials/createTicketPage/roomModal'
import CreateTicketErrorModal from '../components/partials/createTicketPage/errorModal'

export default function CreateTicket() {
  const { isSignedIn, user, isLoaded } = useUser()
  const [loading, setLoading] = useState(false)
  const [joinRoom, setJoinRoom] = useState(false)
  const [roomNumber, setRoomNumber] = useState('')
  const [isError, setIsError] = useState({
    show: false,
    errorMessage: '',
  })
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    callMethod: 1,
  })

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

  async function createTicket(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setLoading(true)

    if (!user) {
      setLoading(false)
      return
    }
    const fullTicket = {
      ...ticket,
      userId: user.id,
    }

    const validation = validateTicketForm(ticket)
    if (validation.passed) {
      try {
        const res = await fetch('http://localhost:8080/ticket/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fullTicket),
        })
        if (!res.ok) {
          setLoading(false)
          return res.text().then(errorMessage => {
            setIsError({ show: true, errorMessage: errorMessage })
          })
        }
        const roomId: string = await res.json()
        setRoomNumber(roomId)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    setLoading(false)
    setTicket({
      title: '',
      description: '',
      callMethod: 1,
    })
    setJoinRoom(true)
  }

  return (
    <>
      {isError.show && (
        <CreateTicketErrorModal message={isError.errorMessage} />
      )}
      <section className="min-h-screen flex justify-center items-center md:mt-[-50px] ticket-container">
        <div className="rounded-xl bg-card border-4 border-opacity-10 border-cyan-900 text-card-foreground w-full max-w-md mx-auto bg-white shadow-xl">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
              Create a Support Ticket
            </h3>
            <p className="text-sm text-muted-foreground">
              Fill out the form below to report an issue or request assistance.
            </p>
          </div>
          <div className="p-6">
            <form className="grid gap-4" onSubmit={createTicket}>
              <div className="grid gap-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-black border-opacity-30 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="title"
                  placeholder="Briefly describe the issue"
                  value={ticket.title}
                  onChange={e =>
                    setTicket(prev => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="flex w-full rounded-md border border-black border-opacity-30 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px]"
                  id="description"
                  placeholder="Provide more details about the problem"
                  value={ticket.description}
                  onChange={e =>
                    setTicket(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className="grid gap-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="contact-method"
                >
                  Contact Method
                </label>
                <select
                  className="p-2 rounded-xl border border-black border-opacity-30"
                  onChange={e =>
                    setTicket(prev => ({
                      ...prev,
                      callMethod: Number(e.target.value),
                    }))
                  }
                >
                  <option value="1">Video Call</option>
                  <option value="2">Message Room</option>
                </select>
              </div>
              <button
                disabled={loading}
                className="items-center bg-cyan-900 text-white hover:bg-cyan-700 p-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
                type="submit"
              >
                {loading ? 'Loading...' : 'Create Ticket'}
              </button>
            </form>
          </div>
        </div>
      </section>
      {joinRoom && (
        <JoinRoomModal joinRoom={joinRoom} roomNumber={roomNumber} />
      )}
    </>
  )
}
