import { UserProfile } from '@clerk/clerk-react'
import { SignOutButton } from '@clerk/clerk-react'
export default function Account() {
  return (
    <div className="flex flex-col items-center justify-center h-screen mt-[-50px]">
      <div className="">
        <SignOutButton>
          <button className="text-lg font-bold bg-red-600 text-white p-2 rounded-xl mb-4">
            Sign Out
          </button>
        </SignOutButton>
        <UserProfile />
      </div>
    </div>
  )
}
