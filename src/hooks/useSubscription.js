// src/hooks/useSubscription.js - VERSION CORRIGÉE
import { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient'

export function useSubscription(userId) {
    const [subscription, setSubscription] = useState(null)
    const [plan, setPlan] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchSubscription = async () => {
        if (!userId) {
            setLoading(false)
            return
        }

        try {
            setLoading(true)

            console.log('🔍 useSubscription - Chargement pour user:', userId)

            // Récupérer l'abonnement de l'utilisateur avec le plan associé
            const { data: userSubscription, error: subError } = await supabase
                .from('user_subscriptions')
                .select(`
                    *,
                    subscription_plans (*)
                `)
                .eq('user_id', userId)
                .single()

            // Si erreur mais c'est juste "pas d'abonnement trouvé"
            if (subError && subError.code !== 'PGRST116') {
                console.error('Erreur récupération abonnement:', subError)
                throw subError
            }

            // Si l'utilisateur a un abonnement
            if (userSubscription && userSubscription.subscription_plans) {
                console.log('✅ Abonnement trouvé:', userSubscription.subscription_plans.name)
                console.log('📊 Détails du plan:', {
                    name: userSubscription.subscription_plans.name,
                    slug: userSubscription.subscription_plans.slug,
                    commission_rate: userSubscription.subscription_plans.commission_rate,
                    processing_time_min: userSubscription.subscription_plans.processing_time_min,
                    processing_time_max: userSubscription.subscription_plans.processing_time_max
                })

                setSubscription(userSubscription)
                setPlan(userSubscription.subscription_plans)
            } else {
                // Par défaut : Plan Free
                console.log('📌 Pas d\'abonnement actif, chargement du plan Free...')

                const { data: freePlan, error: freePlanError } = await supabase
                    .from('subscription_plans')
                    .select('*')
                    .eq('slug', 'free')
                    .single()

                if (freePlanError) {
                    console.error('Erreur récupération plan Free:', freePlanError)
                    throw freePlanError
                }

                console.log('✅ Plan Free chargé par défaut:', freePlan.name)
                setSubscription(null)
                setPlan(freePlan)
            }

        } catch (error) {
            console.error('❌ Erreur useSubscription:', error)
            setSubscription(null)
            setPlan(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSubscription()
    }, [userId])

    // Fonction pour recharger l'abonnement
    const refetch = () => {
        console.log('🔄 Rechargement de l\'abonnement...')
        fetchSubscription()
    }

    return {
        subscription,
        plan,
        loading,
        refetch
    }
}