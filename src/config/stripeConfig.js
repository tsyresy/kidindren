// src/config/stripeConfig.js
import { loadStripe } from '@stripe/stripe-js'

// Clé publique Stripe (mode TEST)
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY

// Charger Stripe
export const stripePromise = loadStripe(stripePublicKey)

// Configuration des plans
export const STRIPE_PLANS = {
    standard: {
        amount: 39000, // MGA
        currency: 'mga',
        name: 'Standard',
        description: 'Plan Standard - Commission 5%'
    },
    premium: {
        amount: 79000, // MGA
        currency: 'mga',
        name: 'Premium',
        description: 'Plan Premium - Zéro commission'
    }
}