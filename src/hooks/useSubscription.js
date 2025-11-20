// src/hooks/useSubscription.js - VERSION CORRIGÉE
import { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient'

export const useSubscription = (userId) => {
    const [subscription, setSubscription] = useState(null)
    const [plan, setPlan] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!userId) {
            setLoading(false)
            return
        }

        const fetchSubscription = async () => {
            try {
                setLoading(true)

                // Récupérer l'abonnement de l'utilisateur avec le plan
                const { data: subscriptionData, error: subError } = await supabase
                    .from('user_subscriptions')
                    .select(`
            *,
            subscription_plans (*)
          `)
                    .eq('user_id', userId)
                    .single()

                if (subError) {
                    // Si pas d'abonnement trouvé (PGRST116), utiliser le plan Free par défaut
                    if (subError.code === 'PGRST116') {
                        console.log('Pas d\'abonnement trouvé, utilisation du plan Free')
                        const { data: freePlan, error: planError } = await supabase
                            .from('subscription_plans')
                            .select('*')
                            .eq('slug', 'free')
                            .single()

                        if (planError) {
                            console.error('Erreur récupération plan Free:', planError)
                            throw planError
                        }

                        setPlan(freePlan)
                        setSubscription(null)
                    } else {
                        // Autre erreur
                        console.error('Erreur récupération abonnement:', subError)
                        throw subError
                    }
                } else {
                    // Abonnement trouvé
                    setSubscription(subscriptionData)
                    setPlan(subscriptionData.subscription_plans)
                }

                setError(null)
            } catch (err) {
                console.error('Erreur dans useSubscription:', err)
                setError(err.message)

                // En cas d'erreur, définir un plan Free par défaut pour ne pas bloquer l'interface
                setPlan({
                    id: 1,
                    name: 'Free',
                    slug: 'free',
                    monthly_price: null,
                    commission_rate: 15,
                    processing_time_min: 20,
                    processing_time_max: 120,
                    course_discount: 0,
                    features: ['Traitement basique', 'Sécurité standard', 'Accès aux formations']
                })
            } finally {
                setLoading(false)
            }
        }

        fetchSubscription()

        // S'abonner aux changements en temps réel avec la nouvelle API
        const channel = supabase
            .channel('subscription_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'user_subscriptions',
                    filter: `user_id=eq.${userId}`
                },
                (payload) => {
                    console.log('Changement abonnement détecté:', payload)
                    fetchSubscription()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [userId])

    return { subscription, plan, loading, error }
}

// Fonction utilitaire pour calculer les frais
export const calculateCommission = (amount, commissionRate) => {
    return (amount * commissionRate) / 100
}

// Fonction pour calculer le montant final
export const calculateFinalAmount = (amount, currency, commissionRate, isDeposit = true) => {
    // Taux de change
    const exchangeRates = {
        EUR: isDeposit ? 5450 : 4800,
        USD: isDeposit ? 4700 : 4500
    }

    const rate = exchangeRates[currency]
    const mgaAmount = amount * rate
    const commissionAmount = calculateCommission(mgaAmount, commissionRate)

    const finalAmount = isDeposit
        ? mgaAmount + commissionAmount  // Pour dépôt, ajouter commission
        : mgaAmount - commissionAmount  // Pour retrait, soustraire commission

    return {
        mgaAmount: mgaAmount.toFixed(2),
        commission: commissionAmount.toFixed(2),
        final: finalAmount.toFixed(2)
    }
}

// Taux de change constants
export const EXCHANGE_RATES = {
    deposit: {
        EUR: 5450,
        USD: 4700
    },
    withdrawal: {
        EUR: 4800,
        USD: 4500
    }
}