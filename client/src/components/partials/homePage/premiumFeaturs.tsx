import { Link } from 'react-router-dom'

export default function PremiumFeatures() {
  return (
    <div className="mt-32 bg-white rounded-md px-4 py-12">
      <div className="grid md:grid-cols-2 justify-center items-center gap-10 max-w-7xl mx-auto">
        <div className="max-md:text-center">
          <h2 className="md:text-4xl text-3xl font-extrabold mb-6">
            Unlock Premium Features
          </h2>
          <p>
            Upgrade to access exclusive features designed to enhance your
            experience. With premium, you can enjoy faster support, advanced
            customization, and priority access to new tools and updates.
          </p>
          <div className="mt-10">
            <Link
              to="/pricing"
              className="px-6 py-3 rounded-xl text-white bg-cyan-900 transition-all hover:bg-cyan-800 mt-12"
            >
              Try it today
            </Link>
          </div>
        </div>
        <div>
          <img
            src="flash.png"
            alt="Premium Benefits"
            className="w-full mx-auto"
          />
        </div>
      </div>
    </div>
  )
}
