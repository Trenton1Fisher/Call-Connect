import SubscriptionPlans from '../components/partials/homePage/pricingPlans'
import { useState } from 'react'
import { FAQ } from '../constants/FAQ'

export default function Pricing() {
  const [openFAQ, setOpenFAQ] = useState({
    open: false,
    id: -1,
  })
  return (
    <>
      <SubscriptionPlans />
      <div className="mx-auto py-24 md:w-1/2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-muted-foreground md:text-xl/relaxed mb-8">
          Get answers to the most common questions about our product.
        </p>
        {FAQ.map((question, index) => (
          <>
            <div
              onClick={() => setOpenFAQ({ open: !openFAQ.open, id: index })}
              className="mb-4 my-2 flex shadow-lg bg-zinc-200 dark:bg-[#2b2b2b] rounded-lg p-4 cursor-pointer"
            >
              <h3 className="font-bold text-lg md:text-xl">
                {question.question}
              </h3>
              <p className="ml-auto text-lg font-bold">
                {openFAQ.open && index === openFAQ.id ? '-' : '+'}
              </p>
            </div>
            {openFAQ.open && index === openFAQ.id && (
              <p className="font-semibold dark:text-white text-gray-500 mb-8">
                {question.answer}
              </p>
            )}
          </>
        ))}
      </div>
    </>
  )
}
