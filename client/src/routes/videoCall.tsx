import { useParams } from 'react-router-dom'

export default function VideoCall() {
  const { id } = useParams()
  if (id) {
    console.log(id)
  }
  if (!id) {
    console.log('no id')
  }
  return (
    <div>
      <p>video call room</p>
    </div>
  )
}
