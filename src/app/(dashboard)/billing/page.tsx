'use client'
import { useState } from 'react'

export default function BillingPage() {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    const res = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
    })
    const { sessionId } = await res.json()
    const { loadStripe } = await import('@stripe/stripe-js')
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    await stripe?.redirectToCheckout({ sessionId })
  }

  return (
    <main className="glass min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {/* … pricing cards … */}
        <button
          onClick={handleUpgrade}
          disabled={loading}
          className="w-full gradient-border"
        >
          {loading ? 'Redirecting…' : 'Upgrade to Pro'}
        </button>
      </div>
    </main>
  )
}