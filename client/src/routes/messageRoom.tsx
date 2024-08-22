import { useNavigate, useParams } from 'react-router-dom'
import { socket } from '../config/socket'
import { FormEvent, useEffect, useState } from 'react'
import { MessageType } from '../types/queryTypes'
import { useUser } from '@clerk/clerk-react'
import MessageLimitPopup from '../components/partials/messageRoom/limitReached'

export default function MessageRoom() {
  const { id } = useParams()
  const { user } = useUser()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<MessageType[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [limitReached, setLimitReached] = useState(false)

  useEffect(() => {
    async function CheckRoomStatus() {
      try {
        const response = await fetch(`http://localhost:8080/room/exists/${id}`)
        if (response.ok) {
          const room_exists = await response.json()
          if (room_exists.room_exists) {
            socket.connect()
          } else {
            navigate('/404')
          }
        } else {
          console.error('Failed to check room status:', response.statusText)
          navigate('/404')
        }
      } catch (error) {
        console.error('Error checking room status:', error)
        navigate('/404')
      }
    }

    const handleNewMessage = (msgObject: { msg: string }) => {
      setMessages(prevMessages => [
        ...prevMessages,
        { message: msgObject.msg, isUser: false },
      ])
    }

    socket.on('connect', () => {
      socket.emit('join_room_with_id', id)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected From Room')
    })

    socket.on('message_from_server', handleNewMessage)

    CheckRoomStatus()

    return () => {
      socket.off('connect')
      socket.off('message_from_server')
      socket.off('disconnect')
      socket.disconnect()
    }
  }, [id, navigate])

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!user) {
      return navigate('/')
    }
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8080/message/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      })
      if (!response.ok) {
        setLimitReached(true)
      }
    } catch (error) {
      console.log(error)
    }

    if (newMessage.trim()) {
      const newMessageObj = {
        message: newMessage,
        isUser: true,
      }
      setMessages(prevMessages => [...prevMessages, newMessageObj])
      const msgObject = { msg: newMessage }
      socket.emit('message_from_client', msgObject, id)
      setNewMessage('')
    }
    setLoading(false)
  }

  function handleDisconnect() {
    socket.disconnect()
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-10">
      <div className="flex flex-col w-full max-w-xl bg-white shadow-xl rounded-lg">
        <div className="relative flex flex-col flex-grow h-[calc(100vh-150px)]">
          <div className="flex flex-col flex-grow p-4 pb-24 overflow-y-auto">
            {messages.length > 0 &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col w-full mt-2 space-x-3 max-w-xs ${
                    message.isUser ? 'ml-auto items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`flex w-full ${
                      message.isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {!message.isUser && (
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    )}
                    <div>
                      <div
                        className={`p-3 rounded ${
                          message.isUser
                            ? 'bg-blue-600 text-white rounded-l-lg rounded-br-lg'
                            : 'bg-gray-300 text-gray-800 rounded-r-lg rounded-bl-lg'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                      </div>
                      <p
                        className={`text-xs mt-1 ${
                          message.isUser
                            ? 'text-blue-600 text-right'
                            : 'text-gray-600 text-left'
                        }`}
                      >
                        {message.isUser ? 'You' : 'Other'}
                      </p>
                    </div>
                    {message.isUser && (
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <form
            onSubmit={sendMessage}
            className="bg-gray-300 p-4 absolute bottom-0 left-0 w-full flex items-center"
          >
            <input
              className="flex-grow h-10 rounded px-3 text-sm mr-2"
              type="text"
              placeholder="Type your message…"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white h-10 px-4 rounded mr-2"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
            <button
              className="bg-red-600 text-white h-10 px-4 rounded"
              onClick={handleDisconnect}
              disabled={loading}
              type="button"
            >
              Disconnect
            </button>
          </form>
        </div>
      </div>
      {limitReached && <MessageLimitPopup />}
    </div>
  )
}
