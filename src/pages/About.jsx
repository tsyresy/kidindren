// src/pages/About.jsx - VERSION COMPLÈTE
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Button } from '@mui/material'
import {
    RocketLaunch,
    Security,
    Speed,
    AccountBalance,
    CheckCircle,
    TrendingUp,
    School,
    Support as SupportIcon,
    ArrowForward
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function About() {
    const navigate = useNavigate()

    // Statistiques
    const stats = [
        { value: '10,000+', label: 'Utilisateurs actifs' },
        { value: '50M+', label: 'MGA traités' },
        { value: '99.9%', label: 'Taux de succès' },
        { value: '24/7', label: 'Support disponible' }
    ]

    // Valeurs
    const values = [
        {
            icon: <Security sx={{ fontSize: 40, color: '#16f98a' }} />,
            title: 'Sécurité maximale',
            description: 'Vos transactions sont protégées avec les dernières technologies de cryptage bancaire.'
        },
        {
            icon: <Speed sx={{ fontSize: 40, color: '#16f98a' }} />,
            title: 'Rapidité',
            description: 'Recevez vos fonds en quelques minutes seulement, 24h/24 et 7j/7.'
        },
        {
            icon: <AccountBalance sx={{ fontSize: 40, color: '#16f98a' }} />,
            title: 'Tarifs transparents',
            description: 'Aucun frais caché. Vous savez exactement ce que vous payez avant chaque transaction.'
        },
        {
            icon: <SupportIcon sx={{ fontSize: 40, color: '#16f98a' }} />,
            title: 'Support réactif',
            description: 'Notre équipe est disponible pour répondre à toutes vos questions rapidement.'
        }
    ]

    // Comment ça marche
    const howItWorks = [
        {
            step: '1',
            title: 'Créez votre compte',
            description: 'Inscription gratuite en moins de 2 minutes'
        },
        {
            step: '2',
            title: 'Choisissez votre plan',
            description: 'Free, Standard ou Premium selon vos besoins'
        },
        {
            step: '3',
            title: 'Effectuez vos transactions',
            description: 'Déposez ou retirez depuis votre compte PayPal'
        },
        {
            step: '4',
            title: 'Recevez vos fonds',
            description: 'Via Mobile Money en quelques minutes'
        }
    ]

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />

            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #010F1B 0%, #0a1929 100%)',
                    color: 'white',
                    py: 12,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>
                                À propos de{' '}
                                <span
                                    style={{
                                        background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                  Payvilus
                </span>
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4, color: '#94a3b8', fontWeight: 400 }}>
                                La solution malgache pour vos transactions PayPal
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4, color: '#cbd5e1', lineHeight: 1.8 }}>
                                Payvilus est né d'une vision simple : permettre à tous les Malgaches d'accéder facilement
                                à leurs fonds PayPal via Mobile Money. Plus besoin de compte bancaire complexe ou de
                                frais exorbitants.
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForward />}
                                onClick={() => navigate('/subscription')}
                                sx={{
                                    bgcolor: '#16f98a',
                                    color: '#010F1B',
                                    fontWeight: 700,
                                    px: 4,
                                    py: 1.5,
                                    '&:hover': {
                                        bgcolor: '#13d67a'
                                    }
                                }}
                            >
                                Commencer maintenant
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    height: 400,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <RocketLaunch sx={{ fontSize: 200, color: '#16f98a', opacity: 0.2 }} />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Statistiques */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    {stats.map((stat, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <Card
                                sx={{
                                    textAlign: 'center',
                                    py: 4,
                                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    border: '1px solid #e2e8f0',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 8px 30px rgba(22, 249, 138, 0.15)'
                                    }
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        mb: 1
                                    }}
                                >
                                    {stat.value}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                    {stat.label}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Notre Mission */}
            <Box sx={{ bgcolor: 'white', py: 8 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                                background: 'linear-gradient(135deg, #010F1B, #16f98a)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Notre Mission
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                            Démocratiser l'accès aux services financiers digitaux à Madagascar
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {values.map((value, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Card
                                    sx={{
                                        p: 4,
                                        height: '100%',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        border: '1px solid #e2e8f0',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            borderColor: '#16f98a',
                                            boxShadow: '0 8px 30px rgba(22, 249, 138, 0.15)'
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                        <Box
                                            sx={{
                                                bgcolor: '#f0fdf4',
                                                borderRadius: 2,
                                                p: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {value.icon}
                                        </Box>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#010F1B' }}>
                                                {value.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                                {value.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Comment ça marche */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            background: 'linear-gradient(135deg, #010F1B, #16f98a)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Comment ça fonctionne ?
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        4 étapes simples pour commencer
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {howItWorks.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Avatar
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        bgcolor: '#16f98a',
                                        color: '#010F1B',
                                        fontSize: 32,
                                        fontWeight: 800,
                                        mx: 'auto',
                                        mb: 2,
                                        boxShadow: '0 4px 20px rgba(22, 249, 138, 0.3)'
                                    }}
                                >
                                    {item.step}
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#010F1B' }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/support')}
                        sx={{
                            borderColor: '#16f98a',
                            color: '#16f98a',
                            fontWeight: 700,
                            px: 4,
                            py: 1.5,
                            '&:hover': {
                                borderColor: '#13d67a',
                                bgcolor: 'rgba(22, 249, 138, 0.05)'
                            }
                        }}
                    >
                        Besoin d'aide ? Contactez-nous
                    </Button>
                </Box>
            </Container>

            {/* Pourquoi choisir Payvilus */}
            <Box sx={{ bgcolor: 'white', py: 8 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                                background: 'linear-gradient(135deg, #010F1B, #16f98a)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Pourquoi choisir Payvilus ?
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {[
                            'Transactions rapides et sécurisées',
                            'Support client réactif en français',
                            'Tarifs compétitifs et transparents',
                            'Interface simple et intuitive',
                            'Compatible avec tous les opérateurs Mobile Money',
                            'Formations gratuites pour démarrer en ligne'
                        ].map((feature, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <CheckCircle sx={{ color: '#16f98a', fontSize: 28 }} />
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#010F1B' }}>
                                        {feature}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Final */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #010F1B 0%, #0a1929 100%)',
                    color: 'white',
                    py: 8
                }}
            >
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
                        Prêt à commencer ?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, color: '#cbd5e1' }}>
                        Rejoignez des milliers d'utilisateurs qui font confiance à Payvilus
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/register')}
                            sx={{
                                bgcolor: '#16f98a',
                                color: '#010F1B',
                                fontWeight: 700,
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    bgcolor: '#13d67a'
                                }
                            }}
                        >
                            Créer un compte gratuit
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate('/formation')}
                            sx={{
                                borderColor: '#16f98a',
                                color: '#16f98a',
                                fontWeight: 700,
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    borderColor: '#13d67a',
                                    bgcolor: 'rgba(22, 249, 138, 0.1)'
                                }
                            }}
                        >
                            Découvrir les formations
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Footer simple */}
            <Box sx={{ bgcolor: '#f8fafc', py: 4, borderTop: '1px solid #e2e8f0' }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                        © {new Date().getFullYear()} Payvilus. Tous droits réservés. | Made with ❤️ in Madagascar
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}