import { Link } from 'react-router-dom'

type ErrorModalProps = {
  message: string
}

export default function CreateTicketErrorModal({ message }: ErrorModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="min-h-screen flex justify-center items-center md:mt-[-50px] ticket-container">
        <div className="rounded-xl bg-card border-4 border-opacity-10 border-red-500 text-card-foreground w-full max-w-md mx-auto bg-white shadow-xl">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-red-600">
              Error Creating Ticket
            </h3>
            <p className="text-sm text-red-600">{message}</p>
            <Link
              to="/account"
              className="text-sm text-cyan-900 hover:underline mt-2"
            >
              View your account statistics
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
