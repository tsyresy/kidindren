// src/pages/Subscription.jsx - THÈME SOMBRE AVEC ANIMATIONS
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Container, Grid, Card, CardContent, Button, Typography, Chip } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import VerifiedIcon from '@mui/icons-material/Verified'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useSubscription } from '../hooks/useSubscription'
import { supabase } from '../config/supabaseClient'

export default function Subscription() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { subscription, plan: currentPlan, loading } = useSubscription(user?.id)
    const [allPlans, setAllPlans] = useState([])
    const [loadingPlans, setLoadingPlans] = useState(true)

    const planIcons = {
        'free': StarIcon,
        'standard': VerifiedIcon,
        'premium': WorkspacePremiumIcon
    }

    const planColors = {
        'free': '#999',
        'standard': '#3EF0D0',
        'premium': '#FFD700'
    }

    useEffect(() => {
        fetchAllPlans()
    }, [])

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

    const handleSubscribe = async (planSlug) => {
        if (planSlug === currentPlan?.slug) {
            alert('Vous êtes déjà abonné à ce plan')
            return
        }
        alert(`Fonctionnalité d'abonnement ${planSlug} à venir avec Stripe`)
    }

    const handleCancel = async () => {
        if (currentPlan?.slug === 'free') {
            alert('Vous ne pouvez pas annuler le plan Free')
            return
        }

        const confirm = window.confirm('Êtes-vous sûr de vouloir annuler votre abonnement?')
        if (!confirm) return

        try {
            const { error } = await supabase
                .from('user_subscriptions')
                .update({ status: 'cancelled', cancel_at_period_end: true })
                .eq('user_id', user.id)

            if (error) throw error
            alert('Abonnement annulé')
            window.location.reload()
        } catch (err) {
            console.error('Erreur annulation:', err)
            alert('Erreur lors de l\'annulation')
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

    const CurrentPlanIcon = planIcons[currentPlan?.slug] || StarIcon
    const currentColor = planColors[currentPlan?.slug] || '#999'

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #05220B 0%, #010F1B 100%)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 50%, rgba(22, 249, 138, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
            }
        }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
                {/* En-tête */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'gradient 3s ease infinite',
                            '@keyframes gradient': {
                                '0%, 100%': { backgroundPosition: '0% 50%' },
                                '50%': { backgroundPosition: '100% 50%' }
                            }
                        }}
                    >
                        Gestion de l'Abonnement
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#F8F8F8', opacity: 0.8 }}>
                        Choisissez le plan qui vous convient
                    </Typography>
                </Box>

                {/* Plan Actuel */}
                <Card
                    sx={{
                        mb: 6,
                        background: 'rgba(22, 249, 138, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${currentColor}`,
                        borderRadius: 3,
                        boxShadow: `0 8px 32px rgba(22, 249, 138, 0.2)`,
                        transition: 'all 0.3s ease'
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${currentColor}40, ${currentColor}20)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CurrentPlanIcon sx={{ fontSize: 48, color: currentColor }} />
                            </Box>
                            <Box>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: '#F8F8F8', mb: 0.5 }}>
                                    Plan {currentPlan?.name}
                                </Typography>
                                <Typography variant="body1" sx={{ color: currentColor, fontWeight: 600 }}>
                                    Votre abonnement actuel
                                </Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={3} sx={{ mb: 3 }}>
                            <Grid item xs={6} sm={3}>
                                <Box sx={{ textAlign: 'center', p: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                                    <Typography variant="body2" sx={{ color: '#999', mb: 1 }}>
                                        COÛT MENSUEL
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#F8F8F8' }}>
                                        {currentPlan?.monthly_price
                                            ? `${currentPlan.monthly_price.toLocaleString('fr-FR')} MGA`
                                            : 'Gratuit'
                                        }
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Box sx={{ textAlign: 'center', p: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                                    <Typography variant="body2" sx={{ color: '#999', mb: 1 }}>
                                        COMMISSION
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#16f98a' }}>
                                        {currentPlan?.commission_rate}%
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Box sx={{ textAlign: 'center', p: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                                    <Typography variant="body2" sx={{ color: '#999', mb: 1 }}>
                                        TRAITEMENT
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#3EF0D0' }}>
                                        {currentPlan?.processing_time_min}-{currentPlan?.processing_time_max} min
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Box sx={{ textAlign: 'center', p: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                                    <Typography variant="body2" sx={{ color: '#999', mb: 1 }}>
                                        FORMATIONS
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFD700' }}>
                                        -{currentPlan?.course_discount}%
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        {currentPlan?.features && (
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" sx={{ color: '#F8F8F8', fontWeight: 600, mb: 2 }}>
                                    Fonctionnalités incluses :
                                </Typography>
                                <Grid container spacing={1}>
                                    {currentPlan.features.map((feature, idx) => (
                                        <Grid item xs={12} sm={6} key={idx}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CheckCircleIcon sx={{ color: '#16f98a', fontSize: 20 }} />
                                                <Typography variant="body2" sx={{ color: '#F8F8F8' }}>
                                                    {feature}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}

                        {currentPlan?.slug !== 'free' && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleCancel}
                                sx={{ mt: 2 }}
                            >
                                Annuler l'abonnement
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {/* Plans Disponibles */}
                <Typography
                    variant="h4"
                    sx={{
                        mb: 4,
                        fontWeight: 700,
                        color: '#F8F8F8',
                        textAlign: 'center'
                    }}
                >
                    Autres plans disponibles
                </Typography>

                <Grid container spacing={4}>
                    {allPlans.map((p) => {
                        const PlanIcon = planIcons[p.slug] || StarIcon
                        const planColor = planColors[p.slug] || '#999'
                        const isCurrent = p.slug === currentPlan?.slug

                        return (
                            <Grid item xs={12} md={4} key={p.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        background: isCurrent
                                            ? 'rgba(22, 249, 138, 0.1)'
                                            : 'rgba(255, 255, 255, 0.05)',
                                        backdropFilter: 'blur(10px)',
                                        border: `2px solid ${isCurrent ? planColor : 'transparent'}`,
                                        borderRadius: 3,
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        overflow: 'visible',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: `0 12px 40px ${planColor}40`,
                                            border: `2px solid ${planColor}`
                                        }
                                    }}
                                >
                                    {isCurrent && (
                                        <Chip
                                            label="Plan actuel"
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: -12,
                                                right: 20,
                                                background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                                                color: '#010F1B',
                                                fontWeight: 700
                                            }}
                                        />
                                    )}

                                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                        <Box
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                margin: '0 auto 2rem',
                                                borderRadius: '50%',
                                                background: `linear-gradient(135deg, ${planColor}40, ${planColor}20)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <PlanIcon sx={{ fontSize: 40, color: planColor }} />
                                        </Box>

                                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#F8F8F8', mb: 1 }}>
                                            {p.name}
                                        </Typography>

                                        <Box sx={{ my: 3 }}>
                                            <Typography
                                                variant="h3"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: planColor,
                                                    mb: 0.5
                                                }}
                                            >
                                                {p.monthly_price ? p.monthly_price.toLocaleString('fr-FR') : 'Gratuit'}
                                            </Typography>
                                            {p.monthly_price && (
                                                <Typography variant="body2" sx={{ color: '#999' }}>
                                                    MGA / mois
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box sx={{ textAlign: 'left', mb: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                                <CheckCircleIcon sx={{ color: planColor, fontSize: 20 }} />
                                                <Typography variant="body2" sx={{ color: '#F8F8F8' }}>
                                                    Commission: <strong>{p.commission_rate}%</strong>
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                                <CheckCircleIcon sx={{ color: planColor, fontSize: 20 }} />
                                                <Typography variant="body2" sx={{ color: '#F8F8F8' }}>
                                                    Traitement: <strong>{p.processing_time_min}-{p.processing_time_max} min</strong>
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                                <CheckCircleIcon sx={{ color: planColor, fontSize: 20 }} />
                                                <Typography variant="body2" sx={{ color: '#F8F8F8' }}>
                                                    Formations: <strong>-{p.course_discount}%</strong>
                                                </Typography>
                                            </Box>
                                            {p.features?.map((feature, idx) => (
                                                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                                    <CheckCircleIcon sx={{ color: planColor, fontSize: 20 }} />
                                                    <Typography variant="body2" sx={{ color: '#F8F8F8' }}>
                                                        {feature}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>

                                        <Button
                                            fullWidth
                                            variant={isCurrent ? 'outlined' : 'contained'}
                                            disabled={isCurrent}
                                            onClick={() => handleSubscribe(p.slug)}
                                            sx={{
                                                py: 1.5,
                                                fontWeight: 700,
                                                fontSize: '1rem',
                                                background: isCurrent
                                                    ? 'transparent'
                                                    : `linear-gradient(135deg, ${planColor}, ${planColor}dd)`,
                                                color: isCurrent ? planColor : '#010F1B',
                                                border: `2px solid ${planColor}`,
                                                '&:hover': {
                                                    background: isCurrent
                                                        ? 'transparent'
                                                        : planColor,
                                                    transform: 'translateY(-2px)'
                                                }
                                            }}
                                        >
                                            {isCurrent ? 'Plan actuel' : `S'abonner à ${p.name}`}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </Box>
    )
}