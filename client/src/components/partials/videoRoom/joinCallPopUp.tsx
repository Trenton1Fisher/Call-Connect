type JoinCallPopUpProps = {
  joinCall: () => void
}

export default function JoinCallPopUp({ joinCall }: JoinCallPopUpProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <p className="mb-4 text-lg font-semibold">
          User has joined. Would you like to start a call with them?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={joinCall}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Start Call
          </button>
        </div>
      </div>
    </div>
  )
}
