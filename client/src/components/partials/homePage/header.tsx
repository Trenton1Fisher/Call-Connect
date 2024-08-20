import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="relative">
      <div className="px-4 sm:px-10">
        <div className="mt-16 max-w-4xl mx-auto text-center relative z-10">
          <h1 className="md:text-6xl text-4xl font-extrabold mb-6 md:!leading-[75px]">
            Get Help, Fast & Easy with Call Connect
          </h1>
          <p className="text-base">
            Create a ticket for assistance, and connect with experts via video
            calls in real-time. Join the community and solve problems together.
            Quick, efficient, and collaborative.
          </p>
          <div className="mt-10">
            <SignedIn>
              <Link
                to="/create"
                className="w-full mt-12 px-6 py-3 rounded-xl text-white bg-cyan-900 transition-all hover:bg-cyan-800"
              >
                Get Started
              </Link>
            </SignedIn>
            <SignedOut>
              <Link
                to="/login"
                className="w-full mt-6 px-6 py-3 rounded-xl text-white bg-cyan-900 transition-all hover:bg-cyan-800"
              >
                Get Started
              </Link>
            </SignedOut>
          </div>
        </div>
        <hr className="my-12 border-gray-300" />
      </div>
      <img
        src="https://readymadeui.com/bg-effect.svg"
        className="absolute inset-0 w-full h-full"
        alt="background-effect"
      />
    </div>
  )
}
