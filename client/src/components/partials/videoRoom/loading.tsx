import { ClipLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className="h-screen text-center flex flex-col items-center justify-center md:mt-[-100px]">
      <h3>Waiting For Another User to join Room</h3>
      <ClipLoader />
    </div>
  )
}
