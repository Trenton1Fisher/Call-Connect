import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { socket } from '../config/socket'
import Loading from '../components/partials/videoRoom/loading'

export default function VideoCall() {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null)
  const currentUserVideoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    socket.connect()
    setLoading(true)
    const handleConnect = () => {
      socket.emit('join_video_with_id', id)
    }

    const handleBothUsersJoined = () => {
      setLoading(false)
    }

    const handleDisconnect = () => {
      socket.emit('')
    }

    socket.on('connect', handleConnect)

    socket.on('both_users_joined', handleBothUsersJoined)
    socket.on('disconnect', handleDisconnect)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('both_users_joined', handleBothUsersJoined)
      socket.off('disconnect', handleDisconnect)
      socket.disconnect()
    }
  }, [id])

  return (
    <div className="h-screen">
      {loading && <Loading />}
      <video ref={currentUserVideoRef} autoPlay muted className="hidden" />
      <video ref={remoteVideoRef} autoPlay className="w-full h-full" />
    </div>
  )
}
