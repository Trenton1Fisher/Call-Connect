import { Dispatch } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { socket } from '../../../config/socket'

type UserCanceledPopupProps = {
  setUserCanceled: Dispatch<React.SetStateAction<boolean>>
}

export default function UserCanceledPopup({
  setUserCanceled,
}: UserCanceledPopupProps) {
  const navigate = useNavigate()
  const { user } = useUser()
  const { id } = useParams()

  async function handleAccountResetForFreeAccounts() {
    if (!user) {
      return
    }
    const user_id = user.id
    const res = await fetch('http://localhost:8080/account/refund', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user_id, roomId: id }),
    })
    if (!res.ok) {
      console.error('Internal Sever Error')
    }
    socket.disconnect()
    navigate('/')
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <p className="mb-4 text-lg font-semibold">
          User has cancelled the call before connecting, do you opt to continue
          or end the call. Note that for free users you will be refunded the
          ticket usage and will not count towards your limits.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setUserCanceled(false)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Stay In Call
          </button>
          <button
            onClick={handleAccountResetForFreeAccounts}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
