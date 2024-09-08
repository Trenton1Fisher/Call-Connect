import { Link } from 'react-router-dom'

export default function RoomFull() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Room Full</h2>
        <p className="mb-4">
          This Rooms capacity has already been reached, please exit the room.
        </p>
        <div className="flex justify-end">
          <Link to="/" className="text-blue-600 hover:underline mr-4">
            Click Here To Exit Room
          </Link>
        </div>
      </div>
    </div>
  )
}
