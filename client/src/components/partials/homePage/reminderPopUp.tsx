type ReminderPopUpProps = {
  makePayment: () => Promise<void>
  setReminderPopUp: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ReminderPopUp({
  makePayment,
  setReminderPopUp,
}: ReminderPopUpProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-md mx-4 bg-white shadow-md rounded-lg">
        <button
          onClick={() => setReminderPopUp(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Leaving Current Site
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            This Will Take You To A Stripe Checkout Page
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Please Do not Enter Real Card Information, Use Provided Credentials:
          </p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Card Number:</span>
              <span>4242 4242 4242 4242</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Expiration Date:</span>
              <span>Any Date That Has Not Passed</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">CSV:</span>
              <span>Any 3-digit number</span>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-end">
          <button
            onClick={makePayment}
            className="text-blue-600 hover:underline"
          >
            Click Here To Continue
          </button>
        </div>
      </div>
    </div>
  )
}
