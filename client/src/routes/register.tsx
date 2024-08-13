import { SignUp } from '@clerk/clerk-react'

export default function Register() {
  return (
    <section className="flex justify-center items-center h-screen mt-[-100px] auth-container">
      <SignUp signInUrl="/login" />
    </section>
  )
}
