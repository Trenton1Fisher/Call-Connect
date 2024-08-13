import Features from '../components/partials/homePage/features'
import Header from '../components/partials/homePage/header'
import PremiumFeatures from '../components/partials/homePage/premiumFeaturs'
import SubscriptionPlans from '../components/partials/homePage/pricingPlans'

export default function HomePage() {
  return (
    <>
      <Header />
      <Features />
      <PremiumFeatures />
      <SubscriptionPlans />
    </>
  )
}
