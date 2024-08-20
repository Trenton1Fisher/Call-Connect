import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type JoinRoomProps = {
  joinRoom: boolean
  roomNumber: string
}

export function JoinRoomModal({ joinRoom, roomNumber }: JoinRoomProps) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  if (!joinRoom) {
    return null
  }

  async function deleteTicket() {
    setLoading(true)

    try {
      const res = await fetch('http://localhost:8080/ticket/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: roomNumber }),
      })
      if (res.ok) {
        setLoading(false)
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
          <h2 className="text-lg font-semibold mb-4">
            Would You Like to Join Your Room?
          </h2>
          <p className="mb-4">
            Ticket created. Note: If you say no, your ticket will be deleted and
            if on a free account this will count towards your account limits.
          </p>
          <div className="flex justify-end space-x-4">
            <Link
              to={`/call?room=${roomNumber}`}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Join
            </Link>
            <button
              onClick={deleteTicket}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              {loading ? 'Deleting...' : 'No, Thanks'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
