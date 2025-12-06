// src/pages/About.jsx - VERSION UTILISATEURS CONNECTÉS
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Chip, Divider, Button } from '@mui/material'
import {
    Email,
    Phone,
    LocationOn,
    Schedule,
    Security,
    Update,
    TrendingUp,
    People,
    Code,
    Verified,
    Copyright,
    Policy,
    ArrowForward
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

export default function About() {
    const navigate = useNavigate()
    const { user } = useAuth()

    // Informations de contact
    const contactInfo = [
        {
            icon: <Email sx={{ color: '#16f98a' }} />,
            label: 'Email',
            value: 'support@payvilus.com',
            action: 'mailto:support@payvilus.com'
        },
        {
            icon: <Phone sx={{ color: '#16f98a' }} />,
            label: 'Support client',
            value: '+261 34 XX XXX XX',
            action: 'tel:+261340000000'
        },
        {
            icon: <LocationOn sx={{ color: '#16f98a' }} />,
            label: 'Localisation',
            value: 'Antananarivo, Madagascar',
            action: null
        },
        {
            icon: <Schedule sx={{ color: '#16f98a' }} />,
            label: 'Horaires support',
            value: 'Lun-Ven: 8h-18h GMT+3',
            action: null
        }
    ]

    // Équipe
    const team = [
        {
            name: 'Équipe Technique',
            role: 'Développement & Sécurité',
            description: 'Garantit la stabilité et la sécurité de la plateforme'
        },
        {
            name: 'Équipe Support',
            role: 'Service Client',
            description: 'Répond à vos questions 24/7'
        },
        {
            name: 'Équipe Finance',
            role: 'Transactions & Conformité',
            description: 'Traite vos transactions en toute sécurité'
        }
    ]

    // Informations légales
    const legalInfo = [
        {
            icon: <Verified sx={{ color: '#16f98a' }} />,
            title: 'Plateforme vérifiée',
            description: 'Conforme aux régulations malgaches'
        },
        {
            icon: <Security sx={{ color: '#16f98a' }} />,
            title: 'Données sécurisées',
            description: 'Cryptage SSL et protection des données personnelles'
        },
        {
            icon: <TrendingUp sx={{ color: '#16f98a' }} />,
            title: 'En croissance',
            description: 'Des milliers d\'utilisateurs nous font confiance'
        }
    ]

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ py: 6, flex: 1 }}>
                {/* En-tête */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: '#010F1B' }}>
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
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        Votre partenaire de confiance pour les transactions PayPal à Madagascar
                    </Typography>
                    <Chip
                        label="Plateforme active depuis 2024"
                        color="success"
                        icon={<Update />}
                        sx={{ fontWeight: 600 }}
                    />
                </Box>

                {/* Notre Mission */}
                <Card sx={{ mb: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#010F1B' }}>
                            Notre Mission
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                            Payvilus a été créé pour résoudre un problème simple mais crucial : <strong>permettre aux Malgaches
                            d'accéder facilement à leurs fonds PayPal</strong> sans les contraintes bancaires traditionnelles.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                            Que vous soyez freelance, entrepreneur en ligne, ou simplement quelqu'un qui reçoit des paiements
                            internationaux, nous vous offrons une solution <strong>rapide, sécurisée et transparente</strong> pour
                            convertir vos euros/dollars PayPal en Ariary via Mobile Money.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                            Nous croyons que l'accès aux services financiers digitaux est un droit, pas un privilège.
                            C'est pourquoi nous proposons un plan gratuit et des tarifs compétitifs pour tous.
                        </Typography>
                    </CardContent>
                </Card>

                {/* Informations Légales */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#010F1B' }}>
                        Sécurité & Conformité
                    </Typography>
                    <Grid container spacing={3}>
                        {legalInfo.map((item, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        border: '1px solid #e2e8f0',
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            borderColor: '#16f98a'
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <Box
                                                sx={{
                                                    bgcolor: '#f0fdf4',
                                                    borderRadius: 2,
                                                    p: 1.5,
                                                    display: 'flex'
                                                }}
                                            >
                                                {item.icon}
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#010F1B' }}>
                                                {item.title}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Informations de Contact */}
                <Card sx={{ mb: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#010F1B' }}>
                            Nous Contacter
                        </Typography>
                        <Grid container spacing={3}>
                            {contactInfo.map((item, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: '#f8fafc',
                                            cursor: item.action ? 'pointer' : 'default',
                                            transition: 'all 0.3s',
                                            '&:hover': item.action ? {
                                                bgcolor: '#f0fdf4',
                                                transform: 'translateX(5px)'
                                            } : {}
                                        }}
                                        onClick={() => item.action && window.open(item.action, '_blank')}
                                    >
                                        <Box
                                            sx={{
                                                bgcolor: 'white',
                                                borderRadius: 2,
                                                p: 1.5,
                                                display: 'flex',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                            }}
                                        >
                                            {item.icon}
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                                {item.label}
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#010F1B' }}>
                                                {item.value}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Besoin d'aide immédiate ?
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<ArrowForward />}
                                onClick={() => navigate('/support')}
                                sx={{
                                    bgcolor: '#16f98a',
                                    color: '#010F1B',
                                    fontWeight: 700,
                                    '&:hover': {
                                        bgcolor: '#13d67a'
                                    }
                                }}
                            >
                                Accéder au Support
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

                {/* Notre Équipe */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#010F1B' }}>
                        Notre Équipe
                    </Typography>
                    <Grid container spacing={3}>
                        {team.map((member, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        border: '1px solid #e2e8f0',
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            borderColor: '#16f98a'
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Avatar
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                bgcolor: '#16f98a',
                                                color: '#010F1B',
                                                mx: 'auto',
                                                mb: 2,
                                                fontSize: 32,
                                                fontWeight: 800
                                            }}
                                        >
                                            {member.name.charAt(0)}
                                        </Avatar>
                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: '#010F1B' }}>
                                            {member.name}
                                        </Typography>
                                        <Typography variant="body2" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                                            {member.role}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {member.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Informations Légales - Liens */}
                <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#010F1B' }}>
                            Informations Légales
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <Policy sx={{ color: '#16f98a' }} />
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        Politique de confidentialité
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                                    Vos données sont protégées et ne sont jamais partagées avec des tiers.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <Copyright sx={{ color: '#16f98a' }} />
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        Conditions d'utilisation
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                                    En utilisant Payvilus, vous acceptez nos conditions de service.
                                </Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Chip label="Version 1.0.0" size="small" />
                            <Chip label="Dernière mise à jour: Décembre 2024" size="small" />
                            <Chip label="Statut: Opérationnel ✅" color="success" size="small" />
                        </Box>
                    </CardContent>
                </Card>
            </Container>

            {/* Footer */}
            <Box sx={{ bgcolor: 'white', py: 4, borderTop: '1px solid #e2e8f0', mt: 4 }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                        © {new Date().getFullYear()} Payvilus. Tous droits réservés. | Made with ❤️ in Madagascar
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}