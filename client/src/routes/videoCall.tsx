// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import { socket } from '../config/socket'
import Loading from '../components/partials/videoRoom/loading'
// import { useUser } from '@clerk/clerk-react'
// import {
//   Call,
//   CallingState,
//   StreamCall,
//   StreamTheme,
//   StreamVideo,
//   StreamVideoClient,
//   useCallStateHooks,
// } from '@stream-io/video-react-sdk'
// import { MyParticipantList } from '../components/partials/videoRoom/ParticipantsList'
// import { MyFloatingLocalParticipant } from '../components/partials/videoRoom/MyFloatingParticipant'
// import { User } from '@stream-io/video-react-sdk'

// const apiKey = import.meta.env.VITE_STREAM_API_KEY as string

export default function VideoCall() {
  // const { id } = useParams()
  // const { user: currentUser, isLoaded } = useUser()
  const [loading, setLoading] = useState(true) // Always in loading state
  // const [videoClient, setVideoClient] = useState<StreamVideoClient>()
  // const [call, setCall] = useState<Call>()

  // useEffect(() => {
  //   socket.connect()
  //   const handleConnect = () => {
  //     socket.emit('join_video_with_id', id)
  //   }

  //   const handleBothUsersJoined = async () => {}

  //   const handleDisconnect = () => {
  //     socket.emit('') // Handle disconnection
  //   }

  //   const getAuthenticationToken = async () => {
  //     if (!currentUser || !isLoaded) return

  //     try {
  //       const userId = currentUser.id ? encodeURIComponent(currentUser.id) : ''
  //       const url = `http://localhost:8080/getStreamToken/userId=${userId}`

  //       const res = await fetch(url, {
  //         method: 'GET',
  //       })

  //       if (!res.ok) throw new Error('Failed to fetch stream token')

  //       const data = await res.json()
  //       const token = data.user_id
  //       console.log(token)

  //       if (!data || !data.user_id) throw new Error('Auth Id not found')

  //       const user: User = {
  //         id: currentUser.id,
  //       }
  //       const newClient = new StreamVideoClient({
  //         apiKey,
  //         token,
  //         user,
  //       })
  //       setVideoClient(newClient)
  //       const call = newClient.call('defalt', id!)
  //       setCall(call)
  //       setLoading(false)
  //       await call?.join({ create: true })
  //     } catch (error) {
  //       console.error('Error fetching stream token:', error)
  //     }
  //   }

  //   socket.on('connect', handleConnect)
  //   socket.on('both_users_joined', handleBothUsersJoined)
  //   socket.on('disconnect', handleDisconnect)

  //   if (currentUser && isLoaded) {
  //     getAuthenticationToken()
  //   }

  //   return () => {
  //     socket.off('connect', handleConnect)
  //     socket.off('both_users_joined', handleBothUsersJoined)
  //     socket.off('disconnect', handleDisconnect)
  //     socket.disconnect()
  //   }
  // }, [id, currentUser, isLoaded])

  //Pausing this feature as a roadblock has been hit, i know this is useless
  useEffect(() => {
    setLoading(true)
  }, [])

  return <div className="h-screen">{loading && <Loading />}</div>
}

// export const MyUILayout = () => {
//   const {
//     useCallCallingState,
//     useLocalParticipant,
//     useRemoteParticipants,
//     // ... other hooks
//   } = useCallStateHooks()

//   const callingState = useCallCallingState()
//   const localParticipant = useLocalParticipant()
//   const remoteParticipants = useRemoteParticipants()

//   if (callingState !== CallingState.JOINED) {
//     return <div>Loading...</div>
//   }

//   return (
//     <StreamTheme>
//       <MyParticipantList participants={remoteParticipants} />
//       <MyFloatingLocalParticipant participant={localParticipant} />
//     </StreamTheme>
//   )
// }
