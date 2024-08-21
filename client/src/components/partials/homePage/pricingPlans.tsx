import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

export default function SubscriptionPlans() {
  //Setup Stripe Payment Session
  async function makePayment() {
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
    )
    if (!stripe) {
      return
    }
    const response = await fetch(
      'http://localhost:8080/checkout/create-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: 1000 }),
      }
    )
    const session = await response.json()
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })
    if (result.error) {
      console.log(result.error)
    }
  }

  return (
    <div className="mt-32 max-w-7xl mx-auto">
      <div className="text-center">
        <h2 className="md:text-4xl text-3xl font-extrabold">
          Choose a Plan that Suits You
        </h2>
      </div>
      <div className="grid lg:grid-cols-2 mx-auto gap-8 mt-16 md:w-2/3 w-full">
        <div className="bg-white rounded sm:p-6 p-4 min-h-[600px]">
          <h3 className="text-xl font-semibold">Free</h3>
          <p className="mt-2">
            Ideal for individuals who need quick access to basic features.
          </p>
          <div className="mt-6">
            <h2 className="text-4xl font-semibold">
              $0<span className="text-gray-500 ml-2 text-[15px]">Free</span>
            </h2>
            <div className="flex items-center justify-center text-center">
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
          <div className="mt-6">
            <h4 className="text-base font-bold mb-4">Plan Includes</h4>
            <ul className="space-y-5">
              {[
                '4 problem tickets per month',
                'Video Calls Limited To 15 minutes each',
                '100 messages per month',
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    className="mr-4 fill-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-blue-600 rounded min-h-[600px] sm:p-6 p-4 text-white shadow-lg shadow-blue-300">
          <h3 className="text-xl font-semibold">Professional</h3>
          <p className="mt-2">
            Ideal for individuals who need advanced features and tools for
            client work.
          </p>
          <div className="mt-6">
            <h2 className="text-4xl font-semibold">
              $10
              <span className="text-gray-200 ml-2 text-[15px]">
                One Time Payment
              </span>
            </h2>
            <div className="flex items-center justify-center text-center">
              <SignedIn>
                <button
                  onClick={makePayment}
                  className="w-full mt-12 px-6 py-3 rounded-xl bg-white text-black transition-all hover:bg-gray-300"
                >
                  Get Started
                </button>
              </SignedIn>
              <SignedOut>
                <Link
                  to="/login"
                  className="w-full mt-6 px-6 py-3 rounded-xl bg-white transition-all text-black hover:bg-gray-300"
                >
                  Get Started
                </Link>
              </SignedOut>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-base font-bold mb-4">Plan Includes</h4>
            <ul className="space-y-5">
              {[
                'Unlimited problem tickets',
                'Unlimited video calls',
                'Unlimited messages',
                'First priority on ticket resolution',
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    className="mr-4 fill-white"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
