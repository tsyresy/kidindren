// src/pages/LandingAboutPage.jsx - CODE COMPLET CORRIGÉ
import { Box, Container, Typography, Grid, Card, CardContent, Button, Avatar, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material'
import {
    RocketLaunch,
    Security,
    Speed,
    AccountBalance,
    TrendingUp,
    School,
    Support,
    CheckCircle,
    ExpandMore,
    People,
    LocationOn,
    Email,
    Phone,
    Verified,
    Stars,
    Shield,
    FlashOn,
    Groups,
    AttachMoney,
    MenuBook,
    Timeline,
    EmojiEvents,
    Schedule
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import '../styles/Landing.css'

export default function LandingAboutPage() {
    const navigate = useNavigate()

    // Statistiques
    const stats = [
        { value: '10,000+', label: 'Utilisateurs actifs', icon: <People /> },
        { value: '50M+', label: 'MGA traités', icon: <TrendingUp /> },
        { value: '99.9%', label: 'Taux de succès', icon: <Stars /> },
        { value: '24/7', label: 'Support disponible', icon: <Support /> }
    ]

    // Services principaux
    const services = [
        {
            icon: <AttachMoney sx={{ fontSize: 50, color: '#16f98a' }} />,
            title: 'Transactions PayPal vers Mobile Money',
            description: 'Convertissez vos fonds PayPal en Ariary et recevez-les directement sur votre compte Mobile Money (Mvola, Orange Money, Airtel Money). Dépôt et retrait en quelques minutes seulement.',
            keywords: 'PayPal Madagascar, Mobile Money, Mvola, Orange Money, Airtel Money, conversion PayPal Ariary'
        },
        {
            icon: <School sx={{ fontSize: 50, color: '#16f98a' }} />,
            title: 'Formations Digitales pour Freelancers',
            description: 'Accédez à des formations complètes pour démarrer votre carrière de freelance : création de comptes PayPal, Fiverr, Upwork, prospection clients, et bien plus. Devenez autonome financièrement grâce au digital.',
            keywords: 'formation freelance Madagascar, formation PayPal, formation Fiverr, formation Upwork, devenir freelance'
        },
        {
            icon: <Shield sx={{ fontSize: 50, color: '#16f98a' }} />,
            title: 'Sécurité Bancaire Maximale',
            description: 'Vos transactions sont protégées par un cryptage SSL de niveau bancaire. Conformité totale aux régulations malgaches. Vos données personnelles ne sont jamais partagées avec des tiers.',
            keywords: 'sécurité transaction Madagascar, cryptage SSL, protection données, transaction sécurisée'
        }
    ]

    // Pourquoi choisir Payvilus
    const advantages = [
        'Transactions PayPal rapides et sécurisées vers Mobile Money',
        'Support client réactif en français et malgache',
        'Tarifs compétitifs et transparents sans frais cachés',
        'Interface simple et intuitive, accessible à tous',
        'Compatible avec tous les opérateurs : Mvola, Orange Money, Airtel Money',
        'Formations gratuites pour démarrer le freelancing en ligne',
        'Plan gratuit pour tester nos services sans engagement',
        'Traitement ultra-rapide : 5 à 120 minutes selon votre plan',
        'Réductions jusqu\'à 40% sur les formations digitales',
        'Équipe malgache qui comprend vos besoins locaux'
    ]

    // Notre histoire
    const timeline = [
        {
            year: '2024',
            title: 'Lancement de Payvilus',
            description: 'Création de la plateforme pour répondre au besoin croissant des freelancers malgaches d\'accéder à leurs fonds PayPal.'
        },
        {
            year: '2024',
            title: 'Intégration Mobile Money',
            description: 'Partenariat avec les principaux opérateurs malgaches : Mvola, Orange Money, Airtel Money.'
        },
        {
            year: '2024',
            title: 'Lancement Formations',
            description: 'Ajout d\'un catalogue de formations digitales pour aider les Malgaches à devenir freelancers.'
        },
        {
            year: '2025',
            title: 'Expansion Continue',
            description: 'Plus de 10,000 utilisateurs font confiance à Payvilus pour leurs transactions PayPal.'
        }
    ]

    // FAQ
    const faqs = [
        {
            question: 'Qu\'est-ce que Payvilus ?',
            answer: 'Payvilus est une plateforme malgache qui permet de convertir vos fonds PayPal en Ariary et de les recevoir directement sur votre compte Mobile Money (Mvola, Orange Money, Airtel Money). Nous proposons également des formations pour devenir freelancer et gagner de l\'argent en ligne.'
        },
        {
            question: 'Comment fonctionne le dépôt PayPal vers Mobile Money ?',
            answer: 'C\'est simple : créez un compte, choisissez votre plan (Free, Standard ou Premium), indiquez le montant à déposer et votre numéro Mobile Money. Nous traitons votre demande et vous recevez vos fonds en 5 à 120 minutes selon votre plan.'
        },
        {
            question: 'Quels sont les frais de transaction ?',
            answer: 'Plan Free : 15% de commission. Plan Standard (39,000 MGA/mois) : 5% de commission avec traitement prioritaire. Plan Premium (79,000 MGA/mois) : 0% de commission et traitement ultra-rapide en 5-15 minutes.'
        },
        {
            question: 'Est-ce sécurisé ?',
            answer: 'Absolument. Nous utilisons un cryptage SSL de niveau bancaire pour protéger toutes vos transactions. Vos données personnelles sont sécurisées et ne sont jamais partagées avec des tiers. Nous sommes conformes aux régulations malgaches.'
        },
        {
            question: 'Quels opérateurs Mobile Money sont supportés ?',
            answer: 'Payvilus supporte tous les principaux opérateurs malgaches : Mvola (Telma), Orange Money (Orange Madagascar), et Airtel Money (Airtel Madagascar).'
        },
        {
            question: 'Proposez-vous des formations ?',
            answer: 'Oui ! Nous offrons des formations digitales complètes pour vous aider à devenir freelancer : création de comptes PayPal, Fiverr, Upwork, prospection de clients, rédaction de propositions gagnantes, et bien plus. Certaines formations sont gratuites.'
        },
        {
            question: 'Comment créer un compte ?',
            answer: 'Cliquez sur "S\'inscrire" en haut de la page, remplissez vos informations (nom, email, mot de passe), validez votre email, et vous êtes prêt à utiliser Payvilus. L\'inscription est 100% gratuite.'
        },
        {
            question: 'Puis-je tester avant de payer un abonnement ?',
            answer: 'Bien sûr ! Notre plan Free est totalement gratuit et vous permet de tester nos services. Vous payez seulement 15% de commission par transaction, sans abonnement mensuel.'
        }
    ]

    // Équipe
    const team = [
        {
            name: 'Équipe Technique',
            role: 'Développement & Innovation',
            description: 'Développeurs malgaches passionnés qui construisent et maintiennent la plateforme.',
            icon: <RocketLaunch sx={{ fontSize: 40, color: '#16f98a' }} />
        },
        {
            name: 'Équipe Support',
            role: 'Service Client 24/7',
            description: 'Support bilingue (français/malgache) disponible pour répondre à toutes vos questions.',
            icon: <Support sx={{ fontSize: 40, color: '#16f98a' }} />
        },
        {
            name: 'Équipe Finance',
            role: 'Transactions & Sécurité',
            description: 'Spécialistes qui garantissent la sécurité et la rapidité de vos transactions.',
            icon: <Security sx={{ fontSize: 40, color: '#16f98a' }} />
        },
        {
            name: 'Équipe Formation',
            role: 'Éducation Digitale',
            description: 'Experts freelance qui créent des contenus pédagogiques de qualité.',
            icon: <School sx={{ fontSize: 40, color: '#16f98a' }} />
        }
    ]

    return (
        <Box sx={{ bgcolor: '#f8fafc' }}>
            {/* Navbar */}
            <header className="landing-navbar" style={{ position: 'sticky', top: 0, zIndex: 1000, bgcolor: 'white' }}>
                <div className="landing-navbar-content">
                    <div className="landing-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <img
                            src="https://res.cloudinary.com/djillj6xt/image/upload/v1763394595/CL-B-3_sigqnz.png"
                            alt="Payvilus - Transactions PayPal Madagascar"
                        />
                    </div>
                    <nav className="landing-nav">
                        <a href="/#pourquoi-nous">Services</a>
                        <a href="/#avis">Avis</a>
                        <a href="/about" style={{ fontWeight: 700, color: '#16f98a' }}>À propos</a>
                    </nav>
                    <div className="landing-ctas">
                        <a href="/login" className="btn-nav-secondary">Connexion</a>
                        <a href="/register" className="btn-nav-primary">S'inscrire</a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #010F1B 0%, #0a1929 100%)',
                    color: 'white',
                    py: { xs: 8, md: 12 },
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <Chip
                                label="🇲🇬 100% Malgache"
                                sx={{
                                    bgcolor: 'rgba(22, 249, 138, 0.2)',
                                    color: '#16f98a',
                                    fontWeight: 700,
                                    mb: 3
                                }}
                            />
                            <Typography variant="h1" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
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
                            <Typography variant="h5" sx={{ mb: 4, color: '#94a3b8', fontWeight: 400, lineHeight: 1.6 }}>
                                La première plateforme malgache pour convertir vos fonds PayPal en Ariary via Mobile Money
                                et apprendre le freelancing digital
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                                    href="#contact"
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
                                    Nous contacter
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Box sx={{ textAlign: 'center' }}>
                                <RocketLaunch sx={{ fontSize: { xs: 150, md: 250 }, color: '#16f98a', opacity: 0.3 }} />
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
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 12px 40px rgba(22, 249, 138, 0.2)'
                                    }
                                }}
                            >
                                <Box sx={{ color: '#16f98a', mb: 2, fontSize: 40 }}>
                                    {stat.icon}
                                </Box>
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
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                                background: 'linear-gradient(135deg, #010F1B, #16f98a)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Notre Mission : Démocratiser l'Accès au Digital
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.8 }}>
                            Payvilus est né d'un constat simple : à Madagascar, des milliers de freelancers et entrepreneurs
                            digitaux gagnent de l'argent sur PayPal, mais peinent à accéder à leurs fonds à cause de la complexité
                            bancaire. Nous avons créé Payvilus pour résoudre ce problème.
                        </Typography>
                    </Box>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
                        <strong>Notre vision :</strong> Permettre à chaque Malgache de participer à l'économie digitale mondiale,
                        sans les barrières traditionnelles. Que vous soyez graphiste sur Fiverr, développeur sur Upwork, vendeur
                        sur Etsy, ou créateur de contenu, Payvilus vous permet de recevoir vos paiements PayPal directement sur
                        votre compte Mobile Money (Mvola, Orange Money, Airtel Money) en quelques minutes.
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
                        <strong>Au-delà des transactions :</strong> Nous ne nous contentons pas de faciliter vos transactions.
                        Payvilus propose également des <strong>formations digitales complètes</strong> pour vous aider à démarrer
                        votre carrière de freelancer : comment créer un compte PayPal, comment utiliser Fiverr et Upwork, comment
                        trouver vos premiers clients, comment fixer vos tarifs, et bien plus encore.
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                        <strong>Une équipe 100% malgache :</strong> Contrairement à d'autres plateformes, Payvilus est développé,
                        géré et maintenu par une équipe entièrement malgache basée à Antananarivo. Nous comprenons vos défis,
                        nous parlons votre langue, et nous sommes là pour vous accompagner à chaque étape.
                    </Typography>
                </Container>
            </Box>

            {/* Services Principaux */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            background: 'linear-gradient(135deg, #010F1B, #16f98a)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Nos Services
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Des solutions complètes pour réussir dans le digital
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    border: '1px solid #e2e8f0',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        borderColor: '#16f98a',
                                        boxShadow: '0 12px 40px rgba(22, 249, 138, 0.2)'
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        bgcolor: '#f0fdf4',
                                        borderRadius: 3,
                                        p: 3,
                                        display: 'inline-flex',
                                        mb: 3
                                    }}
                                >
                                    {service.icon}
                                </Box>
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#010F1B' }}>
                                    {service.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                                    {service.description}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#16f98a', fontWeight: 600, fontStyle: 'italic' }}>
                                    Mots-clés : {service.keywords}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Notre Histoire */}
            <Box sx={{ bgcolor: 'white', py: 8 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                                background: 'linear-gradient(135deg, #010F1B, #16f98a)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Notre Histoire
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            De l'idée à plus de 10,000 utilisateurs
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {timeline.map((item, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Avatar
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            bgcolor: index === timeline.length - 1 ? '#16f98a' : '#e2e8f0',
                                            color: index === timeline.length - 1 ? '#010F1B' : '#64748b',
                                            fontSize: 28,
                                            fontWeight: 800,
                                            mx: 'auto',
                                            mb: 2,
                                            boxShadow: index === timeline.length - 1 ? '0 4px 20px rgba(22, 249, 138, 0.4)' : 'none'
                                        }}
                                    >
                                        {item.year}
                                    </Avatar>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#010F1B' }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        {item.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Pourquoi Choisir Payvilus */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            background: 'linear-gradient(135deg, #010F1B, #16f98a)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Pourquoi Choisir Payvilus ?
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        10 raisons de nous faire confiance
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {advantages.map((advantage, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        bgcolor: '#f0fdf4',
                                        transform: 'translateX(10px)'
                                    }
                                }}
                            >
                                <CheckCircle sx={{ color: '#16f98a', fontSize: 28, flexShrink: 0, mt: 0.5 }} />
                                <Typography variant="body1" sx={{ fontWeight: 600, color: '#010F1B', lineHeight: 1.6 }}>
                                    {advantage}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Notre Équipe */}
            <Box sx={{ bgcolor: 'white', py: 8 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                                background: 'linear-gradient(135deg, #010F1B, #16f98a)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Notre Équipe
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Des experts malgaches à votre service
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {team.map((member, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        p: 3,
                                        height: '100%',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        border: '1px solid #e2e8f0',
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            borderColor: '#16f98a'
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            bgcolor: '#f0fdf4',
                                            borderRadius: '50%',
                                            width: 100,
                                            height: 100,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mx: 'auto',
                                            mb: 2
                                        }}
                                    >
                                        {member.icon}
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#010F1B' }}>
                                        {member.name}
                                    </Typography>
                                    <Typography variant="body2" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                                        {member.role}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        {member.description}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* FAQ */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            background: 'linear-gradient(135deg, #010F1B, #16f98a)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Questions Fréquentes
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Tout ce que vous devez savoir sur Payvilus
                    </Typography>
                </Box>

                {faqs.map((faq, index) => (
                    <Accordion
                        key={index}
                        sx={{
                            mb: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            border: '1px solid #e2e8f0',
                            '&:before': { display: 'none' },
                            '&:hover': {
                                borderColor: '#16f98a'
                            }
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#010F1B' }}>
                                {faq.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                {faq.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Container>

            {/* Contact */}
            <Box sx={{ bgcolor: 'white', py: 8 }} id="contact">
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                                background: 'linear-gradient(135deg, #010F1B, #16f98a)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Contactez-Nous
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Nous sommes là pour vous aider
                        </Typography>
                    </Box>

                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            <Card sx={{ textAlign: 'center', p: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                                <Box sx={{ bgcolor: '#f0fdf4', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                                    <Email sx={{ fontSize: 40, color: '#16f98a' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Email</Typography>
                                <Typography variant="body1" color="primary" sx={{ fontWeight: 600 }}>
                                    support@payvilus.com
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ textAlign: 'center', p: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                                <Box sx={{ bgcolor: '#f0fdf4', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                                    <LocationOn sx={{ fontSize: 40, color: '#16f98a' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Localisation</Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Antananarivo, Madagascar
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ textAlign: 'center', p: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                                <Box sx={{ bgcolor: '#f0fdf4', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                                    <Schedule sx={{ fontSize: 40, color: '#16f98a' }} />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Horaires</Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Lun-Ven: 8h-18h GMT+3
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* CTA Final */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #010F1B 0%, #0a1929 100%)',
                    color: 'white',
                    py: 10
                }}
            >
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <EmojiEvents sx={{ fontSize: 80, color: '#16f98a', mb: 3 }} />
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>
                        Prêt à Transformer Votre Vie Digitale ?
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, color: '#cbd5e1' }}>
                        Rejoignez plus de 10,000 Malgaches qui utilisent Payvilus pour leurs transactions PayPal
                        et leur carrière de freelance
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/register')}
                            sx={{
                                bgcolor: '#16f98a',
                                color: '#010F1B',
                                fontWeight: 700,
                                px: 5,
                                py: 2,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    bgcolor: '#13d67a',
                                    transform: 'scale(1.05)'
                                }
                            }}
                        >
                            Créer Mon Compte Gratuit
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate('/login')}
                            sx={{
                                borderColor: '#16f98a',
                                color: '#16f98a',
                                fontWeight: 700,
                                px: 5,
                                py: 2,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    borderColor: '#13d67a',
                                    bgcolor: 'rgba(22, 249, 138, 0.1)'
                                }
                            }}
                        >
                            J'ai Déjà un Compte
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ bgcolor: '#010F1B', color: 'white', py: 6 }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" sx={{ textAlign: 'center', color: '#94a3b8' }}>
                        © {new Date().getFullYear()} Payvilus. Tous droits réservés. | Made with ❤️ by Waviloid Studio in Madagascar
                    </Typography>
                    <Typography variant="caption" sx={{ textAlign: 'center', display: 'block', mt: 2, color: '#64748b' }}>
                        Mots-clés SEO : PayPal Madagascar, Mobile Money Madagascar, Mvola, Orange Money, Airtel Money,
                        conversion PayPal Ariary, freelance Madagascar, formation freelance, Fiverr Madagascar, Upwork Madagascar,
                        transaction sécurisée Madagascar, devenir freelancer, gagner argent en ligne Madagascar
                    </Typography>
                </Container>
            </Box>
        </Box>
    )
}