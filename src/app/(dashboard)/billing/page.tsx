'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: ['3 resumes / month', 'Basic AI tailoring', 'PDF export'],
  },
  {
    name: 'Pro',
    price: '$9.99',
    features: [
      'Unlimited resumes',
      'Detailed feedback',
      'Priority support',
      'Export to multiple formats',
    ],
  },
]

export default function BillingPage() {
  return (
    <main className="glass min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass rounded-xl p-6 ${plan.name === 'Pro' ? 'border-primary' : ''}`}
          >
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
            <button className="w-full gradient-border">
              {plan.name === 'Free' ? 'Current Plan' : 'Upgrade to Pro'}
            </button>
          </motion.div>
        ))}
      </div>
    </main>
  )
}