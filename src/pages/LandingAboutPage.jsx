// src/pages/LandingAboutPage.jsx - VERSION INTERNATIONALE COMPLÈTE AVEC FOOTER
import { Box, Container, Typography, Grid, Card, Button, Avatar, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material'
import {
    RocketLaunch,
    Security,
    School,
    Support,
    CheckCircle,
    ExpandMore,
    People,
    LocationOn,
    Email,
    Stars,
    AttachMoney,
    EmojiEvents,
    Schedule,
    Language,
    Storefront,
    Visibility,
    Public,
    TrendingUp,
    Business,
    Psychology,
    Groups,
    AccessTime,
    VerifiedUser,
    Translate,
    Payment
} from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import LandingFooter from '../components/LandingFooter'
import '../styles/Landing.css'

export default function LandingAboutPage() {
    const navigate = useNavigate()

    // Statistiques
    const stats = [
        { value: '50,000+', label: 'Utilisateurs mondiaux', icon: <Public /> },
        { value: '$10M+', label: 'Volume traité', icon: <TrendingUp /> },
        { value: '99.9%', label: 'Taux de succès', icon: <Stars /> },
        { value: '4 Pays', label: 'Présence directe', icon: <Language /> }
    ]

    // Services principaux
    const services = [
        {
            icon: <AttachMoney sx={{ fontSize: 50, color: '#16f98a' }} />,
            title: 'Transactions PayPal Internationales',
            description: 'Convertissez vos fonds PayPal en devises locales (USD, CAD, EUR, MGA) et recevez-les sur votre compte bancaire ou Mobile Money. Transactions sécurisées disponibles aux États-Unis, Canada, France, Madagascar et bientôt partout dans le monde.',
            keywords: 'Transactions internationales, PayPal USA, PayPal Canada, PayPal France, PayPal Madagascar, conversion devises, virement bancaire international, Mobile Money',
            link: '/services/transactions-paypal',
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop'
        },
        {
            icon: <School sx={{ fontSize: 50, color: '#16f98a' }} />,
            title: 'Formations Digitales Professionnelles',
            description: 'Accédez à notre académie avec 50+ formations certifiées internationalement : freelancing, e-commerce, marketing digital, développement web, design graphique, copywriting, SEO. Formez-vous aux métiers du futur depuis n\'importe où dans le monde.',
            keywords: 'Formation professionnelle en ligne, e-learning certifié, freelance international, formation marketing digital, cours e-commerce, certification digitale',
            link: '/services/formations-digitales',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop'
        },
        {
            icon: <Visibility sx={{ fontSize: 50, color: '#16f98a' }} />,
            title: 'Services de Visibilité Digitale',
            description: 'Boostez votre présence en ligne avec nos services professionnels : SEO international, publicité Google Ads et Facebook Ads, gestion de réseaux sociaux, création de contenu, email marketing. Solutions adaptées aux entreprises et créateurs de contenu du monde entier.',
            keywords: 'Marketing digital international, SEO global, publicité en ligne, gestion réseaux sociaux, croissance digitale, Google Ads, Facebook Ads',
            link: '/contact',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop'
        },
        {
            icon: <Storefront sx={{ fontSize: 50, color: '#16f98a' }} />,
            title: 'Payvilus Store - Marketplace International',
            description: 'Notre marketplace mondial pour acheter et vendre des produits digitaux, services freelance, templates, ebooks, logiciels, formations et bien plus. Connectez-vous avec des clients et prestataires du monde entier. Plateforme e-commerce complète avec paiements sécurisés.',
            keywords: 'Marketplace international, e-commerce global, vente en ligne, services freelance, produits digitaux, plateforme vente, Payvilus Store',
            link: 'https://www.payvilus.store',
            external: true,
            badge: 'Découvrez',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop'
        }
    ]

    // Zones de service
    const serviceZones = [
        {
            country: 'États-Unis',
            flag: '🇺🇸',
            services: 'Transactions PayPal, Formations, Visibilité, Marketplace',
            currency: 'USD',
            support: 'Anglais',
            color: '#3b82f6'
        },
        {
            country: 'Canada',
            flag: '🇨🇦',
            services: 'Transactions PayPal, Formations, Visibilité, Marketplace',
            currency: 'CAD, USD',
            support: 'Anglais, Français',
            color: '#ef4444'
        },
        {
            country: 'France',
            flag: '🇫🇷',
            services: 'Transactions PayPal, Formations, Visibilité, Marketplace',
            currency: 'EUR',
            support: 'Français',
            color: '#8b5cf6'
        },
        {
            country: 'Madagascar',
            flag: '🇲🇬',
            services: 'Transactions PayPal + Mobile Money, Formations, Visibilité, Marketplace',
            currency: 'MGA, USD, EUR',
            support: 'Français, Malgache',
            color: '#16f98a'
        }
    ]

    // Pourquoi choisir Payvilus
    const advantages = [
        '🌍 Plateforme digitale internationale avec présence dans 4 pays',
        '💰 Transactions PayPal sécurisées vers comptes bancaires et Mobile Money',
        '🗣️ Support multilingue : Anglais, Français, Malgache',
        '🎓 Formations professionnelles certifiées reconnues internationalement',
        '📈 Services de visibilité pour booster votre croissance en ligne',
        '🛒 Marketplace Payvilus Store pour vendre et acheter mondialement',
        '💎 Tarifs compétitifs et transparents sans frais cachés',
        '⏰ Support client 24/7 disponible dans votre fuseau horaire',
        '🔒 Sécurité bancaire maximale : SSL, RGPD, PCI-DSS',
        '🚀 Propulsé par Waviloid Studio, leader en innovation digitale'
    ]

    // Notre histoire
    const timeline = [
        {
            year: '2024 Q1',
            title: 'Fondation de Payvilus',
            description: 'Création de la plateforme par Waviloid Studio avec la vision de démocratiser l\'accès aux services digitaux mondiaux.',
            icon: <RocketLaunch sx={{ fontSize: 30, color: '#16f98a' }} />
        },
        {
            year: '2024 Q2',
            title: 'Lancement International',
            description: 'Déploiement des services aux États-Unis, Canada, France et Madagascar. Intégration des transactions PayPal multidevises.',
            icon: <Public sx={{ fontSize: 30, color: '#16f98a' }} />
        },
        {
            year: '2024 Q3',
            title: 'Académie de Formations',
            description: 'Lancement de l\'académie avec 50+ formations professionnelles certifiées dans le digital.',
            icon: <School sx={{ fontSize: 30, color: '#16f98a' }} />
        },
        {
            year: '2024 Q4',
            title: 'Services de Visibilité',
            description: 'Ajout des services de marketing digital, SEO et gestion de campagnes publicitaires internationales.',
            icon: <Visibility sx={{ fontSize: 30, color: '#16f98a' }} />
        },
        {
            year: '2025',
            title: 'Payvilus Store',
            description: 'Lancement de notre marketplace international pour connecter acheteurs et vendeurs du monde entier.',
            icon: <Storefront sx={{ fontSize: 30, color: '#16f98a' }} />
        }
    ]

    // FAQ
    const faqs = [
        {
            question: 'Qu\'est-ce que Payvilus ?',
            answer: 'Payvilus est une plateforme digitale internationale propulsée par Waviloid Studio. Nous sommes comme META pour l\'écosystème digital : nous offrons une suite complète de services incluant transactions PayPal vers comptes bancaires/Mobile Money, formations professionnelles certifiées, services de visibilité en ligne (SEO, publicité, réseaux sociaux), et notre marketplace international Payvilus Store. Nos services sont disponibles aux États-Unis, Canada, France, Madagascar et s\'étendent progressivement au monde entier.'
        },
        {
            question: 'Dans quels pays Payvilus est-il disponible ?',
            answer: 'Payvilus est actuellement disponible dans 4 pays : 🇺🇸 États-Unis, 🇨🇦 Canada, 🇫🇷 France et 🇲🇬 Madagascar. Nos transactions PayPal supportent plusieurs devises (USD, CAD, EUR, MGA). Nous prévoyons une expansion vers le Royaume-Uni, l\'Allemagne, l\'Espagne, la Côte d\'Ivoire, le Sénégal, le Maroc et d\'autres pays d\'Europe, d\'Afrique et d\'Asie en 2025.'
        },
        {
            question: 'Comment fonctionnent les transactions PayPal internationales ?',
            answer: 'C\'est simple : 1) Créez un compte Payvilus gratuit, 2) Choisissez votre plan (Free, Standard ou Premium), 3) Indiquez le montant à transférer et vos coordonnées bancaires ou Mobile Money, 4) Nous traitons votre demande et vous recevez vos fonds en 5 à 120 minutes selon votre plan. Nous supportons les virements bancaires (USA, Canada, France) et Mobile Money pour Madagascar (Mvola, Orange Money, Airtel Money). Toutes les transactions sont sécurisées avec cryptage SSL 256-bit.'
        },
        {
            question: 'Quelles formations proposez-vous ?',
            answer: 'Notre académie Payvilus propose 50+ formations certifiées dans le digital : Freelancing (Fiverr, Upwork, créer son compte PayPal), E-commerce (Shopify, Amazon FBA, dropshipping), Marketing Digital (SEO, Facebook Ads, Google Ads, email marketing), Développement Web (HTML/CSS, JavaScript, React, WordPress), Design Graphique (Photoshop, Figma, Canva), Copywriting, Social Media Management, Data Analytics, et bien plus. Certaines formations sont gratuites pour tous, d\'autres payantes avec certification internationale reconnue.'
        },
        {
            question: 'Qu\'est-ce que les services de visibilité ?',
            answer: 'Nos services de visibilité digitale incluent : SEO international (référencement naturel sur Google), publicité payante (Google Ads, Facebook Ads, Instagram Ads, LinkedIn Ads), gestion professionnelle de réseaux sociaux (création de contenu, community management), email marketing et newsletters, stratégie de croissance digitale sur mesure. Nous aidons les entreprises, freelancers et créateurs de contenu à augmenter leur présence en ligne et atteindre leur audience cible partout dans le monde.'
        },
        {
            question: 'C\'est quoi Payvilus Store ?',
            answer: 'Payvilus Store (www.payvilus.store) est notre marketplace international où vous pouvez acheter et vendre des produits digitaux (templates, ebooks, logiciels, plugins, thèmes), services freelance (design, développement, rédaction, marketing), formations, et bien plus. C\'est comme Etsy ou Fiverr, mais avec l\'écosystème complet Payvilus : transactions simplifiées avec PayPal intégré, formations pour vendeurs, outils de visibilité inclus. Plateforme 100% sécurisée avec paiements protégés.'
        },
        {
            question: 'Qui est Waviloid Studio ?',
            answer: 'Waviloid Studio est la société mère qui propulse Payvilus. Fondée en 2024 et basée à Madagascar avec des bureaux virtuels aux États-Unis, Canada et France, Waviloid Studio est spécialisée dans l\'innovation digitale, le développement de plateformes technologiques et les solutions fintech. Notre équipe internationale de 50+ experts (développeurs, designers, marketeurs, formateurs) travaille 24/7 pour créer des outils qui démocratisent l\'accès à l\'économie numérique mondiale.'
        },
        {
            question: 'Payvilus est-il sécurisé ?',
            answer: 'Absolument. Nous utilisons un cryptage SSL de niveau bancaire (256-bit) pour toutes les communications. Nous sommes conformes au RGPD (Europe), PCI-DSS niveau 1 (paiements par carte), et aux régulations financières de chaque pays où nous opérons. Vos données personnelles et financières sont protégées par des protocoles de sécurité de classe mondiale. Nous ne partageons jamais vos informations avec des tiers. Nos transactions sont auditées régulièrement par des experts indépendants en cybersécurité.'
        },
        {
            question: 'Quels sont les tarifs ?',
            answer: 'Plan Free : 0$/mois avec commission de 15% par transaction. Plan Standard : 9.99$/mois (commission réduite à 5%, traitement prioritaire, accès formations basiques). Plan Premium : 19.99$/mois (zéro commission sur transactions, traitement ultra-rapide 5-15 min, support VIP 24/7, formations illimitées, réductions sur services de visibilité). Les tarifs s\'adaptent à votre pays : USD (USA), CAD (Canada), EUR (France), MGA (Madagascar). Essai gratuit 14 jours sur tous les plans payants.'
        },
        {
            question: 'Comment contacter le support ?',
            answer: 'Notre support client multilingue est disponible 24/7 : Email : support@payvilus.com (réponse sous 2-24h selon plan), Chat en direct sur notre site (heures ouvrables), Téléphone pour clients Premium (prise de RDV), Réseaux sociaux : Facebook, Twitter, Instagram. Support disponible en anglais, français et malgache. Pour les urgences sécurité : security@payvilus.com (réponse sous 1h).'
        }
    ]

    // Équipe
    const team = [
        {
            name: 'Équipe Innovation',
            role: 'R&D & Product Development',
            description: 'Ingénieurs et développeurs internationaux qui construisent les technologies de pointe de Payvilus.',
            icon: <RocketLaunch sx={{ fontSize: 40, color: '#16f98a' }} />
        },
        {
            name: 'Équipe Support Global',
            role: 'Service Client 24/7 Multilingue',
            description: 'Support disponible en anglais, français et malgache pour vous aider partout dans le monde.',
            icon: <Support sx={{ fontSize: 40, color: '#16f98a' }} />
        },
        {
            name: 'Équipe Finance',
            role: 'Transactions & Conformité',
            description: 'Spécialistes qui garantissent la sécurité et la conformité de toutes les transactions internationales.',
            icon: <Security sx={{ fontSize: 40, color: '#16f98a' }} />
        },
        {
            name: 'Équipe Éducation',
            role: 'Académie & Formations',
            description: 'Experts du digital qui créent des formations de qualité internationale reconnues.',
            icon: <School sx={{ fontSize: 40, color: '#16f98a' }} />
        },
        {
            name: 'Équipe Marketing',
            role: 'Visibilité & Croissance',
            description: 'Spécialistes SEO, publicité en ligne et stratégie digitale pour nos clients mondiaux.',
            icon: <Visibility sx={{ fontSize: 40, color: '#16f98a' }} />
        },
        {
            name: 'Équipe Marketplace',
            role: 'Payvilus Store',
            description: 'Développement et gestion de notre marketplace international pour connecter le monde.',
            icon: <Storefront sx={{ fontSize: 40, color: '#16f98a' }} />
        }
    ]

    return (
        <Box sx={{ bgcolor: '#f8fafc' }}>
            {/* Navbar */}
            <header className="landing-navbar" style={{ position: 'sticky', top: 0, zIndex: 1000, bgcolor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <div className="landing-navbar-content">
                    <Link to="/" className="landing-logo" style={{ cursor: 'pointer' }}>
                        <img
                            src="https://res.cloudinary.com/djillj6xt/image/upload/v1763394595/CL-B-3_sigqnz.png"
                            alt="Payvilus - Plateforme Digitale Internationale"
                        />
                    </Link>
                    <nav className="landing-nav">
                        <a href="/#pourquoi-nous">Services</a>
                        <a href="/#avis">Avis</a>
                        <Link to="/about" style={{ fontWeight: 700, color: '#16f98a' }}>À propos</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/blog">Blog</Link>
                    </nav>
                    <div className="landing-ctas">
                        <Link to="/login" className="btn-nav-secondary">Connexion</Link>
                        <Link to="/register" className="btn-nav-primary">S'inscrire</Link>
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
                                label="🌍 Plateforme Digitale Internationale"
                                sx={{
                                    bgcolor: 'rgba(22, 249, 138, 0.2)',
                                    color: '#16f98a',
                                    fontWeight: 700,
                                    mb: 3,
                                    fontSize: '1rem',
                                    px: 2,
                                    py: 0.5
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
                            <Typography variant="h5" sx={{ mb: 2, color: '#94a3b8', fontWeight: 400, lineHeight: 1.6 }}>
                                Plateforme digitale internationale propulsée par <strong style={{ color: '#16f98a' }}>Waviloid Studio</strong>
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 4, color: '#cbd5e1', fontWeight: 300, lineHeight: 1.6 }}>
                                Transactions PayPal • Formations Professionnelles • Visibilité Digitale • Marketplace Global
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                                <Chip label="🇺🇸 USA" sx={{ bgcolor: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', fontWeight: 600, fontSize: '0.9rem' }} />
                                <Chip label="🇨🇦 Canada" sx={{ bgcolor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', fontWeight: 600, fontSize: '0.9rem' }} />
                                <Chip label="🇫🇷 France" sx={{ bgcolor: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa', fontWeight: 600, fontSize: '0.9rem' }} />
                                <Chip label="🇲🇬 Madagascar" sx={{ bgcolor: 'rgba(22, 249, 138, 0.2)', color: '#16f98a', fontWeight: 600, fontSize: '0.9rem' }} />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => navigate('/register')}
                                    startIcon={<RocketLaunch />}
                                    sx={{
                                        bgcolor: '#16f98a',
                                        color: '#010F1B',
                                        fontWeight: 700,
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1rem',
                                        '&:hover': {
                                            bgcolor: '#13d67a',
                                            transform: 'scale(1.05)'
                                        }
                                    }}
                                >
                                    Créer un compte gratuit
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    href="#contact"
                                    startIcon={<Email />}
                                    sx={{
                                        borderColor: '#16f98a',
                                        color: '#16f98a',
                                        fontWeight: 700,
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1rem',
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
                            <Box sx={{ textAlign: 'center', position: 'relative' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=600&fit=crop"
                                    alt="Payvilus Global Platform"
                                    style={{
                                        width: '100%',
                                        maxWidth: '500px',
                                        borderRadius: '20px',
                                        boxShadow: '0 20px 60px rgba(22, 249, 138, 0.3)',
                                        animation: 'float 3s ease-in-out infinite'
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>

                <style>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-20px); }
                    }
                `}</style>
            </Box>

            {/* Statistiques */}
            <Container maxWidth="lg" sx={{ py: 8, mt: -6 }}>
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
                            Notre Mission : Démocratiser l'Économie Digitale Mondiale
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 900, mx: 'auto', lineHeight: 1.8 }}>
                            Payvilus est une <strong>plateforme digitale internationale</strong> propulsée par <strong>Waviloid Studio</strong>.
                            Tout comme META construit un écosystème global (Facebook, Instagram, WhatsApp), nous créons une suite complète
                            de solutions pour permettre à chacun de participer à l'économie numérique mondiale.
                        </Typography>
                    </Box>

                    <Grid container spacing={4} sx={{ mb: 4 }}>
                        <Grid item xs={12} md={6}>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop"
                                alt="Équipe internationale Payvilus"
                                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
                                <strong>Notre vision :</strong> Créer un monde où chaque individu, entrepreneur ou entreprise peut accéder
                                aux services digitaux essentiels sans barrières géographiques, linguistiques ou financières. Que vous soyez
                                aux États-Unis, au Canada, en France, à Madagascar ou ailleurs dans le monde, Payvilus vous offre les outils
                                pour réussir dans le digital.
                            </Typography>

                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8, fontSize: '1.1rem' }}>
                                <strong>Propulsé par Waviloid Studio :</strong> Notre société mère est un leader en innovation digitale avec
                                une équipe internationale de 50+ experts (développeurs, designers, marketeurs, formateurs) qui travaillent 24/7
                                pour vous offrir la meilleure expérience possible.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', textAlign: 'center' }}>
                        Nos Quatre Piliers de Services
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 3, bgcolor: '#f0fdf4', borderRadius: 2, borderLeft: '4px solid #16f98a', height: '100%' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Payment sx={{ color: '#16f98a' }} /> 1️⃣ Transactions PayPal Internationales
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    Convertissez vos fonds PayPal en devises locales (USD, CAD, EUR, MGA) et recevez-les sur votre
                                    compte bancaire ou Mobile Money en 5-120 minutes. Support multidevises et multi-pays.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 3, bgcolor: '#eff6ff', borderRadius: 2, borderLeft: '4px solid #3b82f6', height: '100%' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <School sx={{ color: '#3b82f6' }} /> 2️⃣ Formations Digitales Professionnelles
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    Académie avec 50+ formations certifiées internationalement : freelancing, e-commerce, marketing digital,
                                    développement, design. Apprenez les compétences du futur depuis n'importe où.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 3, bgcolor: '#fef3c7', borderRadius: 2, borderLeft: '4px solid #f59e0b', height: '100%' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Visibility sx={{ color: '#f59e0b' }} /> 3️⃣ Services de Visibilité Digitale
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    Boostez votre présence en ligne : SEO international, publicité Google/Facebook Ads, gestion de
                                    réseaux sociaux, email marketing. Solutions pour entreprises et créateurs de contenu.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ p: 3, bgcolor: '#fae8ff', borderRadius: 2, borderLeft: '4px solid #8b5cf6', height: '100%' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Storefront sx={{ color: '#8b5cf6' }} /> 4️⃣ Payvilus Store - Marketplace
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    Marketplace international pour acheter/vendre produits digitaux, services freelance, templates, formations.
                                    Découvrez sur <strong>www.payvilus.store</strong>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Services Principaux avec Images */}
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
                        Nos Services en Détail
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Une suite complète pour réussir dans l'économie digitale mondiale
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    border: '1px solid #e2e8f0',
                                    transition: 'all 0.3s',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        borderColor: '#16f98a',
                                        boxShadow: '0 12px 40px rgba(22, 249, 138, 0.2)'
                                    }
                                }}
                            >
                                <Box sx={{ position: 'relative', height: 250, overflow: 'hidden' }}>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            left: 16,
                                            bgcolor: 'rgba(22, 249, 138, 0.9)',
                                            borderRadius: 3,
                                            p: 2
                                        }}
                                    >
                                        {service.icon}
                                    </Box>
                                    {service.badge && (
                                        <Chip
                                            label={service.badge}
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                right: 16,
                                                bgcolor: '#fbbf24',
                                                color: '#010F1B',
                                                fontWeight: 700
                                            }}
                                        />
                                    )}
                                </Box>

                                <Box sx={{ p: 3 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#010F1B' }}>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                                        {service.description}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#9ca3af', fontStyle: 'italic', display: 'block', mb: 2 }}>
                                        SEO: {service.keywords}
                                    </Typography>

                                    {service.external ? (
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            href={service.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            startIcon={<Storefront />}
                                            sx={{
                                                bgcolor: '#8b5cf6',
                                                color: 'white',
                                                fontWeight: 700,
                                                py: 1.5,
                                                '&:hover': {
                                                    bgcolor: '#7c3aed',
                                                    transform: 'scale(1.02)'
                                                }
                                            }}
                                        >
                                            Découvrir Payvilus Store
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => navigate(service.link)}
                                            sx={{
                                                borderColor: '#16f98a',
                                                color: '#16f98a',
                                                fontWeight: 700,
                                                py: 1.5,
                                                '&:hover': {
                                                    borderColor: '#13d67a',
                                                    bgcolor: 'rgba(22, 249, 138, 0.1)',
                                                    transform: 'scale(1.02)'
                                                }
                                            }}
                                        >
                                            En savoir plus →
                                        </Button>
                                    )}
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Zones de Service */}
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
                            Présence Mondiale
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Disponible dans 4 pays avec expansion continue vers le monde entier
                        </Typography>
                    </Box>

                    <Grid container spacing={3} sx={{ mb: 6 }}>
                        {serviceZones.map((zone, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        p: 3,
                                        height: '100%',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        border: `2px solid ${zone.color}`,
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: `0 12px 40px ${zone.color}40`
                                        }
                                    }}
                                >
                                    <Typography variant="h1" sx={{ mb: 2 }}>
                                        {zone.flag}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B' }}>
                                        {zone.country}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6, minHeight: 60 }}>
                                        {zone.services}
                                    </Typography>
                                    <Chip
                                        label={`Devises: ${zone.currency}`}
                                        size="small"
                                        sx={{
                                            bgcolor: `${zone.color}20`,
                                            color: zone.color,
                                            fontWeight: 600,
                                            mb: 1
                                        }}
                                    />
                                    <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                                        Support: {zone.support}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Box sx={{ textAlign: 'center', p: 4, bgcolor: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', borderRadius: 3, border: '2px solid #16f98a' }}>
                        <Language sx={{ fontSize: 60, color: '#16f98a', mb: 2 }} />
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#010F1B' }}>
                            🌍 Expansion Mondiale en Cours
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mb: 3, lineHeight: 1.7 }}>
                            Nous travaillons activement à étendre nos services vers d'autres pays : 🇬🇧 Royaume-Uni, 🇩🇪 Allemagne,
                            🇪🇸 Espagne, 🇨🇮 Côte d'Ivoire, 🇸🇳 Sénégal, 🇲🇦 Maroc, et bien d'autres pays d'Europe, d'Afrique et d'Asie.
                            Si votre pays n'est pas encore listé, inscrivez-vous sur notre liste d'attente pour être informé dès notre arrivée.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/register')}
                            startIcon={<Public />}
                            sx={{
                                bgcolor: '#16f98a',
                                color: '#010F1B',
                                fontWeight: 700,
                                px: 4,
                                '&:hover': {
                                    bgcolor: '#13d67a'
                                }
                            }}
                        >
                            Rejoindre la Liste d'Attente
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Notre Histoire */}
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
                        Notre Histoire
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        De l'idée à une plateforme mondiale avec 50,000+ utilisateurs
                    </Typography>
                </Box>

                <Box sx={{ position: 'relative' }}>
                    {timeline.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                gap: 3,
                                mb: 4,
                                alignItems: 'flex-start',
                                position: 'relative'
                            }}
                        >
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    bgcolor: index === timeline.length - 1 ? '#16f98a' : '#f0fdf4',
                                    border: `3px solid ${index === timeline.length - 1 ? '#16f98a' : '#e2e8f0'}`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: index === timeline.length - 1 ? '0 4px 20px rgba(22, 249, 138, 0.4)' : 'none',
                                    zIndex: 1
                                }}
                            >
                                {item.icon}
                            </Box>
                            <Box sx={{ flex: 1, pt: 1 }}>
                                <Chip
                                    label={item.year}
                                    size="small"
                                    sx={{
                                        bgcolor: '#16f98a',
                                        color: '#010F1B',
                                        fontWeight: 700,
                                        mb: 1
                                    }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#010F1B' }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    {item.description}
                                </Typography>
                            </Box>
                            {index < timeline.length - 1 && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        left: 39,
                                        top: 80,
                                        width: 2,
                                        height: 'calc(100% + 16px)',
                                        bgcolor: '#e2e8f0'
                                    }}
                                />
                            )}
                        </Box>
                    ))}
                </Box>
            </Container>

            {/* Pourquoi Choisir Payvilus */}
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
                            Pourquoi Choisir Payvilus ?
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            10 raisons de nous faire confiance partout dans le monde
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
            </Box>

            {/* Notre Équipe */}
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
                        Notre Équipe Internationale
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        50+ experts du digital à votre service 24/7
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {team.map((member, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
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

            {/* FAQ */}
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
            </Box>

            {/* Contact */}
            <Container maxWidth="lg" sx={{ py: 8 }} id="contact">
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
                        Support multilingue disponible 24/7 partout dans le monde
                    </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <Card sx={{ textAlign: 'center', p: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                            <Box sx={{ bgcolor: '#f0fdf4', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                                <Email sx={{ fontSize: 40, color: '#16f98a' }} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Email</Typography>
                            <Typography variant="body1" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                                support@payvilus.com
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Réponse sous 2-24h selon plan
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ textAlign: 'center', p: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                            <Box sx={{ bgcolor: '#f0fdf4', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                                <Translate sx={{ fontSize: 40, color: '#16f98a' }} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Support Multilingue</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                Anglais • Français • Malgache
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Disponible 24/7
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ textAlign: 'center', p: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                            <Box sx={{ bgcolor: '#f0fdf4', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                                <AccessTime sx={{ fontSize: 40, color: '#16f98a' }} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Horaires</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                Support 24/7
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Tous fuseaux horaires
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

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
                        Rejoignez plus de 50,000 utilisateurs dans le monde qui utilisent Payvilus pour leurs
                        transactions, formations et croissance digitale
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/register')}
                            startIcon={<RocketLaunch />}
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
                            href="https://www.payvilus.store"
                            target="_blank"
                            rel="noopener noreferrer"
                            startIcon={<Storefront />}
                            sx={{
                                borderColor: '#8b5cf6',
                                color: '#8b5cf6',
                                fontWeight: 700,
                                px: 5,
                                py: 2,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    borderColor: '#7c3aed',
                                    bgcolor: 'rgba(139, 92, 246, 0.1)'
                                }
                            }}
                        >
                            Découvrir le Marketplace
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Footer commun */}
            <LandingFooter />
        </Box>
    )
}