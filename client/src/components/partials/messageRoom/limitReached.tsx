import { Link } from 'react-router-dom'

export default function MessageLimitPopup() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Message Limit Reached</h2>
        <p className="mb-4">
          You have reached your message limit. Please check your account
          statistics for more details.
        </p>
        <div className="flex justify-end">
          <Link to="/account" className="text-blue-600 hover:underline mr-4">
            Check your account statistics
          </Link>
        </div>
      </div>
    </div>
  )
}
