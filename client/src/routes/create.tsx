import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { ClipLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

export default function CreateTicket() {
  const { isSignedIn, user, isLoaded } = useUser()
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    callMethod: 1,
    keywords: [''],
  })

  console.log(ticket)

  function handleKeywordChange(index: number, value: string) {
    const updatedKeywords = [...ticket.keywords]
    updatedKeywords[index] = value
    setTicket(prev => ({ ...prev, keywords: updatedKeywords }))
  }

  function handleAddKeyword() {
    setTicket(prev => ({ ...prev, keywords: [...ticket.keywords, ''] }))
  }

  function handleRemoveKeyword(index: number) {
    const updatedKeywords = ticket.keywords.filter((_, i) => i !== index)
    setTicket(prev => ({ ...prev, keywords: updatedKeywords }))
  }

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
          <form className="grid gap-4">
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
            <div>
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="keywords"
              >
                Keywords
              </label>
              <p className="text-gray-600 text-sm">
                Add keywords to make it easier for experts to find your ticket.
              </p>
              <div className="space-y-2">
                {ticket.keywords.map((keyword, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={keyword}
                      onChange={e => handleKeywordChange(index, e.target.value)}
                      className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Enter keyword"
                    />
                    {ticket.keywords.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddKeyword}
                className="mt-2 inline-flex items-center justify-center rounded-md border border-primary bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm"
              >
                + Add Keyword
              </button>
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
                  setTicket(prev => ({ ...prev, description: e.target.value }))
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
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              type="submit"
            >
              Create Ticket
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
