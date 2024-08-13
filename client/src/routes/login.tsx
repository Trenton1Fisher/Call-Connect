import { SignIn } from '@clerk/clerk-react'

export default function Login() {
  return (
    <section className="flex justify-center items-center h-screen mt-[-100px] auth-container">
      <SignIn signUpUrl="/register" />
    </section>
  )
}
