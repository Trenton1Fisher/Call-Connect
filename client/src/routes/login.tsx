import { SignIn } from '@clerk/clerk-react'

export default function Login() {
  return (
    <section className="pt-32 flex flex-col justify-center items-center h-screen mt-[-50px] md:mt-[-90px] auth-container">
      <div className="w-full max-w-md mx-auto mt-8 mb-8 mx-2 bg-white shadow-md rounded-lg">
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Pre-built Account Information
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Use these credentials for quick access (Premium features activated):
          </p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Email 1:</span>
              <span>dev1@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email 2:</span>
              <span>dev2@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Password:</span>
              <span>password</span>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-yellow-100 rounded-lg">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-yellow-800 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-xs text-yellow-800">
              For demonstration purposes these accounts have premium features
              activated.
            </span>
          </div>
        </div>
      </div>
      <SignIn signUpUrl="/register" />
    </section>
  )
}
