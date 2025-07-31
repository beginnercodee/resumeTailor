'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  { name: 'Free', price: '$0', features: ['3 resumes / month', 'Basic AI tailoring', 'PDF export'] },
  { name: 'Pro', price: '$9.99', features: ['Unlimited resumes', 'Detailed feedback', 'Priority support', 'Export to multiple formats'] },
]

export default function BillingPage() {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    const res = await fetch('/api/stripe/create-checkout-session', { method: 'POST' })
    const { sessionId } = await res.json()
    const { loadStripe } = await import('@stripe/stripe-js')
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    await stripe?.redirectToCheckout({ sessionId })
  }

  return (
    <main className="glass min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Choose Your Plan
      </h1>
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="glass rounded-xl p-6 flex flex-col justify-between hover:shadow-[0_0_20px_oklch(0.7_0.19_276.75_/_0.5)] transition-shadow"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-3xl font-extrabold mb-4">{plan.price}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Button onClick={handleUpgrade} disabled={loading} className="w-full">
              {loading ? 'Redirecting…' : 'Upgrade to Pro'}
            </Button>
          </div>
        ))}
      </div>
    </main>
  )
}