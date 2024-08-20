import { useState } from 'react'

const PaymentPage = () => {
  const countries = ['China', 'Russia', 'UK']
  const [menu, setMenu] = useState(false)
  const [country, setCountry] = useState('United States')

  const changeText = e => {
    setMenu(false)
    setCountry(e.target.textContent)
  }

  return (
    <div className="flex justify-center items-center lg:w-1/2 md:w-2/3 mx-auto">
      <div className="py-12">
        <div className="flex flex-col w-full space-y-9">
          <div className="flex flex-col xl:flex-row justify-center space-y-6 w-full">
            <div className=" bg-gray-100 flex flex-col w-full">
              <h3 className="text-2xl font-bold text-center">
                Payment Details
              </h3>
              <div className="flex flex-row justify-center items-center mt-6">
                <hr className="border w-full" />
                <hr className="border w-full" />
              </div>
              <div className="mt-8">
                <input
                  className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                  type="email"
                  placeholder="Email"
                />
              </div>

              <label className="mt-8 text-base leading-4 text-gray-800">
                Card details
              </label>
              <div className="mt-2 flex-col">
                <div>
                  <input
                    className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="email"
                    placeholder="0000 1234 6549 15151"
                  />
                </div>
                <div className="flex-row flex">
                  <input
                    className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="email"
                    placeholder="MM/YY"
                  />
                  <input
                    className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="email"
                    placeholder="CVC"
                  />
                </div>
              </div>

              <label className="mt-8 text-base leading-4 text-gray-800">
                Name on card
              </label>
              <div className="mt-2 flex-col">
                <div>
                  <input
                    className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="email"
                    placeholder="Name on card"
                  />
                </div>
              </div>

              <label className="mt-8 text-base leading-4 text-gray-800">
                Country or region
              </label>
              <div className="mt-2 flex-col">
                <div className="relative">
                  <button
                    className="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white"
                    type="button"
                  >
                    {country}
                  </button>
                  <svg
                    onClick={() => setMenu(!menu)}
                    className={
                      'transform  cursor-pointer absolute top-4 right-4 ' +
                      (menu ? 'rotate-180' : '')
                    }
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.5 5.75L8 10.25L12.5 5.75"
                      stroke="#27272A"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div
                    className={
                      'mt-1 absolute z-10 w-full flex bg-gray-50 justify-start flex-col text-gray-600 ' +
                      (menu ? 'block' : 'hidden')
                    }
                  >
                    {countries.map(country => (
                      <div
                        key={country}
                        className="cursor-pointer hover:bg-gray-800 hover:text-white px-4 py-2"
                        onClick={changeText}
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                </div>
                <input
                  className="border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                  type="text"
                  placeholder="ZIP"
                />
              </div>

              <button className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                <div>
                  <p className="text-base leading-4">Pay $10</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
