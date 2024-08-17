import { Link } from 'react-router-dom'

type JoinRoomProps = {
  joinRoom: boolean
}

export function JoinRoomModal({ joinRoom }: JoinRoomProps) {
  if (!joinRoom) {
    return null
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
              to="/room"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Join
            </Link>
            <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded">
              No, Thanks
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
