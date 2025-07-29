import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(req: NextRequest) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      { price: process.env.STRIPE_PRICE_ID!, quantity: 1 },
    ],
    success_url: `${req.headers.get('origin')}/billing?success=true`,
    cancel_url: `${req.headers.get('origin')}/billing`,
  })

  return NextResponse.json({ sessionId: session.id })
}