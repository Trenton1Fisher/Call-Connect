import { useUser } from '@clerk/clerk-react'
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk'
import { ReactNode, useState, useEffect, createContext } from 'react'

const apiKey = import.meta.env.VITE_STREAM_API_KEY as string

const VideoContext = createContext(null)

export const useVideoContext = () => {
  return useContext(VideoContext)
}

export const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>()
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (!isLoaded || !user) return
    if (!apiKey) throw new Error('Stream Api key missing')

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      },
    })
  }, [user, isLoaded])

  return <StreamVideo client={videoClient}>{children}</StreamVideo>
}
