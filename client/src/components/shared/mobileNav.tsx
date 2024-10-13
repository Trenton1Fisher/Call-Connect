import { SignedIn } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

type MobileNavProps = {
  openMobileNav: boolean
  setOpenMobileNav: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MobileNav({
  openMobileNav,
  setOpenMobileNav,
}: MobileNavProps) {
  return (
    <>
      {openMobileNav ? (
        <div
          onClick={() => setOpenMobileNav(false)}
          className=" fixed w-full h-screen top-0 left-0 bg-black/50 z-50"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="absolute h-screen left-0 top-0 w-60 bg-white dark:bg-[#2b2b2b] z-[999] px-5 border-r border-black overflow-y-hidden flex flex-col gap-10"
          >
            <div className="border-b py-5 text-center">
              {' '}
              <Link to="/" className="flex gap-2 font-bold items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                  <rect x="2" y="6" width="14" height="12" rx="2" />
                </svg>
                <span className="text-xl">Call Connect</span>
              </Link>
            </div>
            <ul className=" ">
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to="/"
                  className="hover:text-blue-600 block font-semibold"
                >
                  Home
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to="/pricing"
                  className="hover:text-blue-600 block font-semibold"
                >
                  Pricing
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to="/create"
                  className="hover:text-blue-600 block font-semibold"
                >
                  Get Help
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to="/browse"
                  className="hover:text-blue-600 block font-semibold"
                >
                  Join a Call
                </Link>
              </li>
              <SignedIn>
                <li className="max-lg:border-b max-lg:py-3 px-3">
                  <Link
                    to="/account"
                    className="hover:text-blue-600 block font-semibold"
                  >
                    View Account
                  </Link>
                </li>
              </SignedIn>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  )
}
