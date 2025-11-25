// src/pages/Subscription.jsx - AVEC STRIPE PAYMENT INTENT + DOWNGRADE VERS FREE
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Container, Grid, Button, Typography, List, ListItem, ListItemIcon, ListItemText, Alert } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import StarIcon from '@mui/icons-material/Star'
import VerifiedIcon from '@mui/icons-material/Verified'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import Navbar from '../components/Navbar'
import PaymentModal from '../components/PaymentModal'
import { useAuth } from '../context/AuthContext'
import { useSubscription } from '../hooks/useSubscription'
import { supabase } from '../config/supabaseClient'
import toast, { Toaster } from 'react-hot-toast'
import '../styles/Membership.css'

export default function Subscription() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { subscription, plan: currentPlan, loading, refetch } = useSubscription(user?.id)
    const [allPlans, setAllPlans] = useState([])
    const [loadingPlans, setLoadingPlans] = useState(true)
    const [paymentModalOpen, setPaymentModalOpen] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [downgradingToFree, setDowngradingToFree] = useState(false)

    const planConfig = {
        'free': {
            icon: StarIcon,
            color: '#424242',
            highlight: false,
            description: 'Outils de base pour découvrir PayPal et le digital.',
            ctaText: 'Revenir au plan gratuit',
            ctaVariant: 'outlined'
        },
        'standard': {
            icon: VerifiedIcon,
            color: '#16f98a',
            highlight: false,
            description: 'Outils avancés pour freelancers en croissance.',
            ctaText: 'Choisir ce plan',
            ctaVariant: 'contained'
        },
        'premium': {
            icon: WorkspacePremiumIcon,
            color: '#FFD700',
            highlight: true,
            description: 'Solution complète pour professionnels du digital.',
            ctaText: 'Choisir ce plan',
            ctaVariant: 'outlined'
        }
    }

    useEffect(() => {
        fetchAllPlans()
    }, [])

    useEffect(() => {
        // Vérifier si paiement réussi (retour de Stripe)
        const paymentStatus = searchParams.get('payment')
        if (paymentStatus === 'success') {
            toast.success('Paiement réussi ! Votre abonnement a été activé.')
            // Nettoyer l'URL
            window.history.replaceState({}, '', '/subscription')
            // Recharger les données après un délai
            setTimeout(() => {
                refetch()
            }, 2000)
        }
    }, [searchParams, refetch])

    const fetchAllPlans = async () => {
        try {
            const { data, error } = await supabase
                .from('subscription_plans')
                .select('*')
                .order('id', { ascending: true })

            if (error) throw error
            setAllPlans(data || [])
        } catch (err) {
            console.error('Erreur récupération plans:', err)
        } finally {
            setLoadingPlans(false)
        }
    }

    // Fonction pour revenir au plan Free (sans Stripe)
    const handleDowngradeToFree = async (freePlan) => {
        if (!user?.id) {
            toast.error('Vous devez être connecté')
            return
        }

        // Demander confirmation
        const confirmed = window.confirm(
            'Êtes-vous sûr de vouloir passer au plan Free ? Vous perdrez les avantages de votre plan actuel.'
        )

        if (!confirmed) return

        setDowngradingToFree(true)

        try {
            // Mettre à jour l'abonnement vers Free
            const { error } = await supabase
                .from('user_subscriptions')
                .upsert({
                    user_id: user.id,
                    plan_id: freePlan.id,
                    status: 'active',
                    stripe_subscription_id: null,
                    current_period_start: new Date().toISOString().split('T')[0],
                    current_period_end: null,
                    cancel_at_period_end: false,
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: 'user_id'
                })

            if (error) {
                console.error('Erreur downgrade:', error)
                toast.error('Erreur lors du changement de plan')
            } else {
                toast.success('Vous êtes maintenant sur le plan Free', {
                    icon: '✅',
                    duration: 4000,
                })
                // Recharger les données
                setTimeout(() => {
                    refetch()
                }, 1000)
            }
        } catch (error) {
            console.error('Erreur:', error)
            toast.error('Une erreur est survenue')
        } finally {
            setDowngradingToFree(false)
        }
    }

    const handleSubscribe = async (plan) => {
        // Si plan gratuit, downgrade direct
        if (plan.slug === 'free') {
            // Si déjà sur Free
            if (currentPlan?.slug === 'free') {
                toast.error('Vous êtes déjà sur le plan gratuit')
                return
            }
            // Sinon, downgrade
            handleDowngradeToFree(plan)
            return
        }

        // Si déjà abonné à ce plan
        if (plan.slug === currentPlan?.slug) {
            toast.error('Vous êtes déjà abonné à ce plan')
            return
        }

        // Ouvrir le modal de paiement pour les plans payants
        setSelectedPlan(plan)
        setPaymentModalOpen(true)
    }

    const handlePaymentModalClose = async (success) => {
        setPaymentModalOpen(false)
        setSelectedPlan(null)

        if (success) {
            toast.success('Abonnement activé avec succès !', {
                icon: '🎉',
                duration: 5000,
            })
            // Attendre que le webhook traite le paiement
            await new Promise(resolve => setTimeout(resolve, 2000))
            // Recharger les données
            refetch()
        }
    }

    if (loading || loadingPlans) {
        return (
            <Box sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #05220B 0%, #010F1B 100%)'
            }}>
                <Navbar />
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#16f98a'
                }}>
                    <Typography>Chargement...</Typography>
                </Box>
            </Box>
        )
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #05220B 0%, #010F1B 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Toaster position="top-right" />
            <Navbar />

            <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
                {/* En-tête */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            color: '#F8F8F8'
                        }}
                    >
                        Choisissez votre plan
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#999', fontWeight: 400 }}>
                        Des tarifs simples et transparents pour tous
                    </Typography>
                </Box>

                {/* Grille des plans */}
                <Grid
                    container
                    spacing={3}
                    sx={{
                        justifyContent: 'center',
                        flexWrap: { xs: 'wrap', md: 'nowrap' },
                        alignItems: 'stretch'
                    }}
                >
                    {allPlans.map((plan) => {
                        const config = planConfig[plan.slug] || planConfig['free']
                        const PlanIcon = config.icon
                        const isHighlight = config.highlight
                        const isCurrent = plan.slug === currentPlan?.slug

                        return (
                            <Grid
                                item
                                xs={12}
                                md={4}
                                key={plan.id}
                                sx={{
                                    display: 'flex',
                                    minWidth: { md: 0 },
                                    flex: { md: '1 1 0' }
                                }}
                            >
                                <Box
                                    className={`pricing-card ${isHighlight ? 'highlight' : ''} ${isCurrent ? 'current' : ''}`}
                                    sx={{
                                        height: '100%',
                                        width: '100%',
                                        background: isHighlight
                                            ? 'linear-gradient(135deg, #16f98a 0%, #3EF0D0 50%, #16f98a 100%)'
                                            : '#1a1a1a',
                                        backgroundSize: isHighlight ? '200% 200%' : 'auto',
                                        animation: isHighlight ? 'gradient-shift 3s ease infinite' : 'none',
                                        borderRadius: 4,
                                        padding: 4,
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: isCurrent
                                            ? '3px solid #FFD700'
                                            : (isHighlight ? '3px solid #16f98a' : 'none'),
                                        transform: 'scale(1)',
                                        transition: 'all 0.3s ease',
                                        boxShadow: isHighlight
                                            ? '0 20px 60px rgba(22, 249, 138, 0.6), 0 0 0 3px rgba(22, 249, 138, 0.3)'
                                            : '0 10px 30px rgba(0, 0, 0, 0.3)',
                                        '@keyframes gradient-shift': {
                                            '0%': {
                                                backgroundPosition: '0% 50%'
                                            },
                                            '50%': {
                                                backgroundPosition: '100% 50%'
                                            },
                                            '100%': {
                                                backgroundPosition: '0% 50%'
                                            }
                                        },
                                        '&:hover': {
                                            transform: 'scale(1.03)',
                                            boxShadow: isHighlight
                                                ? '0 25px 70px rgba(22, 249, 138, 0.8), 0 0 0 5px rgba(22, 249, 138, 0.5)'
                                                : '0 15px 40px rgba(0, 0, 0, 0.4)'
                                        }
                                    }}
                                >
                                    {/* Badge "Plan actuel" */}
                                    {isCurrent && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: -15,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                background: '#FFD700',
                                                color: '#010F1B',
                                                px: 3,
                                                py: 0.5,
                                                borderRadius: 20,
                                                fontSize: '0.85rem',
                                                fontWeight: 700,
                                                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)'
                                            }}
                                        >
                                            ⭐ Plan actuel
                                        </Box>
                                    )}

                                    {/* Badge "Recommandé" */}
                                    {isHighlight && !isCurrent && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: -15,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                background: '#010F1B',
                                                color: '#16f98a',
                                                px: 3,
                                                py: 0.5,
                                                borderRadius: 20,
                                                fontSize: '0.85rem',
                                                fontWeight: 700,
                                                boxShadow: '0 4px 15px rgba(22, 249, 138, 0.6)',
                                                border: '2px solid #16f98a'
                                            }}
                                        >
                                            👑 Recommandé
                                        </Box>
                                    )}

                                    {/* Nom du plan */}
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                            color: isHighlight ? '#010F1B' : '#F8F8F8',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}
                                    >
                                        <PlanIcon sx={{ fontSize: 28 }} />
                                        {plan.name}
                                    </Typography>

                                    {/* Prix */}
                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 0.5 }}>
                                            <Typography
                                                variant="h2"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: isHighlight ? '#010F1B' : '#F8F8F8',
                                                    lineHeight: 1,
                                                    fontSize: plan.monthly_price > 50000 ? '2.5rem' : '3rem'
                                                }}
                                            >
                                                {plan.monthly_price ? plan.monthly_price.toLocaleString('fr-FR') : '0'}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    ml: 1,
                                                    color: isHighlight ? '#05220B' : '#999',
                                                    fontWeight: 600
                                                }}
                                            >
                                                MGA
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: isHighlight ? '#05220B' : '#666',
                                                fontWeight: 500
                                            }}
                                        >
                                            {plan.monthly_price ? 'par mois' : 'Gratuit'}
                                        </Typography>
                                    </Box>

                                    {/* Description */}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 3,
                                            color: isHighlight ? '#05220B' : '#999',
                                            lineHeight: 1.6
                                        }}
                                    >
                                        {config.description}
                                    </Typography>

                                    {/* Bouton CTA */}
                                    <Button
                                        fullWidth
                                        variant={isCurrent ? 'outlined' : 'contained'}
                                        disabled={isCurrent || downgradingToFree}
                                        onClick={() => handleSubscribe(plan)}
                                        sx={{
                                            py: 1.5,
                                            mb: 3,
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            background: isCurrent
                                                ? 'transparent'
                                                : (isHighlight ? '#fff' : 'transparent'),
                                            color: isCurrent
                                                ? '#666'
                                                : (isHighlight ? '#16f98a' : '#F8F8F8'),
                                            border: isCurrent
                                                ? '2px solid #666'
                                                : (isHighlight ? 'none' : '2px solid #424242'),
                                            '&:hover': {
                                                background: isCurrent
                                                    ? 'transparent'
                                                    : (isHighlight ? '#f0f0f0' : 'rgba(22, 249, 138, 0.1)'),
                                                border: isCurrent
                                                    ? '2px solid #666'
                                                    : (isHighlight ? 'none' : '2px solid #16f98a'),
                                                transform: 'translateY(-2px)'
                                            },
                                            '&:disabled': {
                                                opacity: 0.6
                                            }
                                        }}
                                    >
                                        {downgradingToFree && plan.slug === 'free'
                                            ? 'Changement en cours...'
                                            : isCurrent
                                                ? 'Plan actuel'
                                                : config.ctaText
                                        }
                                    </Button>

                                    {/* "Billed monthly" */}
                                    {plan.monthly_price && (
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                mb: 3,
                                                color: isHighlight ? '#05220B' : '#666',
                                                textAlign: 'center',
                                                display: 'block'
                                            }}
                                        >
                                            Facturé mensuellement
                                        </Typography>
                                    )}

                                    {/* Titre de la section features */}
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                            color: isHighlight ? '#010F1B' : '#F8F8F8'
                                        }}
                                    >
                                        {plan.name} comprend :
                                    </Typography>

                                    {/* Features */}
                                    <List dense sx={{ mb: 2 }}>
                                        <ListItem disablePadding sx={{ mb: 1 }}>
                                            <ListItemIcon sx={{ minWidth: 32 }}>
                                                <CheckIcon
                                                    sx={{
                                                        fontSize: 20,
                                                        color: isHighlight ? '#010F1B' : '#16f98a'
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`Commission : ${plan.commission_rate}%`}
                                                primaryTypographyProps={{
                                                    fontSize: '0.9rem',
                                                    color: isHighlight ? '#05220B' : '#F8F8F8'
                                                }}
                                            />
                                        </ListItem>

                                        <ListItem disablePadding sx={{ mb: 1 }}>
                                            <ListItemIcon sx={{ minWidth: 32 }}>
                                                <CheckIcon
                                                    sx={{
                                                        fontSize: 20,
                                                        color: isHighlight ? '#010F1B' : '#16f98a'
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`Traitement : ${plan.processing_time_min}-${plan.processing_time_max} min`}
                                                primaryTypographyProps={{
                                                    fontSize: '0.9rem',
                                                    color: isHighlight ? '#05220B' : '#F8F8F8'
                                                }}
                                            />
                                        </ListItem>

                                        <ListItem disablePadding sx={{ mb: 1 }}>
                                            <ListItemIcon sx={{ minWidth: 32 }}>
                                                <CheckIcon
                                                    sx={{
                                                        fontSize: 20,
                                                        color: isHighlight ? '#010F1B' : '#16f98a'
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`Formations : -${plan.course_discount}%`}
                                                primaryTypographyProps={{
                                                    fontSize: '0.9rem',
                                                    color: isHighlight ? '#05220B' : '#F8F8F8'
                                                }}
                                            />
                                        </ListItem>

                                        {plan.features?.map((feature, idx) => (
                                            <ListItem key={idx} disablePadding sx={{ mb: 1 }}>
                                                <ListItemIcon sx={{ minWidth: 32 }}>
                                                    <CheckIcon
                                                        sx={{
                                                            fontSize: 20,
                                                            color: isHighlight ? '#010F1B' : '#16f98a'
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={feature}
                                                    primaryTypographyProps={{
                                                        fontSize: '0.9rem',
                                                        color: isHighlight ? '#05220B' : '#F8F8F8'
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>

                {/* Note en bas */}
                <Box sx={{ textAlign: 'center', mt: 8 }}>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                        Tous les plans incluent une garantie de remboursement de 30 jours
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        Des questions ? <Button sx={{ color: '#16f98a', textTransform: 'none', p: 0, minWidth: 'auto', ml: 0.5 }}>Contactez-nous</Button>
                    </Typography>
                </Box>
            </Container>

            {/* Modal de paiement Stripe */}
            {selectedPlan && (
                <PaymentModal
                    isOpen={paymentModalOpen}
                    onClose={handlePaymentModalClose}
                    plan={selectedPlan}
                    user={user}
                />
            )}
        </Box>
    )
}