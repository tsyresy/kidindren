// src/pages/Landing.jsx - VERSION INTERNATIONALE COMPLÈTE AVEC VISION GLOBALE
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SplashLoading from '../components/SplashLoading'
import LandingHero from '../components/LandingHero'
import LandingCTA from '../components/LandingCTA'
import ExchangeRate from '../components/ExchangeRate'
import CoursesPreview from '../components/CoursesPreview'
import WhyUs from '../components/WhyUs'
import LandingAbout from '../components/LandingAbout'
import Testimonials from '../components/Testimonials'
import LandingFooter from '../components/LandingFooter'
import '../styles/Landing.css'

export default function Landing() {
    const [showSplash, setShowSplash] = useState(true)

    const handleSplashComplete = () => {
        setShowSplash(false)
    }

    return (
        <div className="landing-wrapper">
            {showSplash && <SplashLoading onComplete={handleSplashComplete} />}

            {!showSplash && (
                <>
                    {/* ============================================ */}
                    {/* NAVBAR AVEC VISION INTERNATIONALE */}
                    {/* ============================================ */}
                    <header className="landing-navbar">
                        <div className="landing-navbar-content">
                            <Link to="/" className="landing-logo">
                                <img
                                    src="https://res.cloudinary.com/djillj6xt/image/upload/v1763394595/CL-B-3_sigqnz.png"
                                    alt="Payvilus - Plateforme Digitale Internationale"
                                    title="Payvilus - Transactions PayPal, Formations, Visibilité, Marketplace"
                                />
                            </Link>
                            <nav className="landing-nav">
                                <a href="#services" title="Nos services internationaux">Services</a>
                                <a href="#pourquoi-nous" title="Pourquoi choisir Payvilus">Avantages</a>
                                <a href="#formations" title="Formations digitales professionnelles">Formations</a>
                                <a href="#avis" title="Témoignages clients">Avis</a>
                                <Link to="/about" title="À propos de Payvilus">À propos</Link>
                                <Link to="/contact" title="Contactez-nous">Contact</Link>
                                <Link to="/blog" title="Blog Payvilus">Blog</Link>
                            </nav>
                            <div className="landing-ctas">
                                <Link to="/login" className="btn-nav-secondary" title="Se connecter à Payvilus">
                                    Connexion
                                </Link>
                                <Link to="/register" className="btn-nav-primary" title="Créer un compte gratuit">
                                    S'inscrire
                                </Link>
                            </div>
                        </div>
                    </header>

                    {/* ============================================ */}
                    {/* MAIN CONTENT */}
                    {/* ============================================ */}
                    <main className="landing-main">
                        {/* Hero Section - Composant existant */}
                        <LandingHero />

                        {/* Bannière Vision Internationale */}
                        <section className="global-vision-banner">
                            <div className="vision-container">
                                <div className="vision-content">
                                    <h2 className="vision-title">
                                        🌍 Plateforme Digitale Internationale
                                    </h2>
                                    <p className="vision-subtitle">
                                        Propulsée par <strong>Waviloid Studio</strong> • Disponible dans le monde entier
                                    </p>
                                    <div className="vision-countries">
                                        <span className="country-flag" title="États-Unis">🇺🇸 USA</span>
                                        <span className="country-flag" title="Canada">🇨🇦 Canada</span>
                                        <span className="country-flag" title="France">🇫🇷 France</span>
                                        <span className="country-flag" title="Madagascar">🇲🇬 Madagascar</span>
                                        <span className="country-flag-more" title="Et bientôt partout dans le monde">+ Worldwide</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Services Principaux avec SEO */}
                        <section id="services" className="services-section">
                            <div className="section-container">
                                <div className="section-header-center">
                                    <h2 className="section-title">Nos Solutions Digitales Complètes</h2>
                                    <p className="section-description">
                                        Une suite de services professionnels pour réussir dans l'économie numérique mondiale
                                    </p>
                                </div>

                                <div className="services-grid">
                                    {/* Service 1 : Transactions */}
                                    <div className="service-card">
                                        <div className="service-icon transactions">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                                            </svg>
                                        </div>
                                        <h3 className="service-title">Transactions PayPal Internationales</h3>
                                        <p className="service-description">
                                            Convertissez vos fonds PayPal en devises locales (USD, CAD, EUR, MGA) et recevez-les
                                            sur votre compte bancaire ou Mobile Money en quelques minutes. Services disponibles aux
                                            États-Unis, Canada, France, Madagascar et bientôt partout dans le monde.
                                        </p>
                                        <ul className="service-features">
                                            <li>✓ Transactions sécurisées SSL 256-bit</li>
                                            <li>✓ Support multidevises (USD, CAD, EUR, MGA)</li>
                                            <li>✓ Traitement ultra-rapide (5-120 min)</li>
                                            <li>✓ Virements bancaires + Mobile Money</li>
                                        </ul>
                                        <Link to="/services/transactions-paypal" className="service-btn">
                                            En savoir plus →
                                        </Link>
                                        <p className="service-seo-keywords">
                                            Transactions PayPal internationales, conversion PayPal USD EUR CAD MGA,
                                            retrait PayPal USA Canada France Madagascar, virement bancaire PayPal, Mobile Money
                                        </p>
                                    </div>

                                    {/* Service 2 : Formations */}
                                    <div className="service-card">
                                        <div className="service-icon formations">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                                            </svg>
                                        </div>
                                        <h3 className="service-title">Formations Digitales Professionnelles</h3>
                                        <p className="service-description">
                                            Accédez à notre académie internationale avec 50+ formations certifiées : freelancing,
                                            e-commerce, marketing digital, développement web, design graphique, SEO. Apprenez les
                                            compétences du futur depuis n'importe où dans le monde.
                                        </p>
                                        <ul className="service-features">
                                            <li>✓ 50+ formations certifiées internationalement</li>
                                            <li>✓ Cours gratuits et premium disponibles</li>
                                            <li>✓ Certificats reconnus mondialement</li>
                                            <li>✓ Support en anglais, français, malgache</li>
                                        </ul>
                                        <Link to="/services/formations-digitales" className="service-btn">
                                            Découvrir les formations →
                                        </Link>
                                        <p className="service-seo-keywords">
                                            Formation freelance en ligne, cours e-commerce, formation marketing digital,
                                            e-learning certifié, formation Fiverr Upwork, cours développement web, formation SEO
                                        </p>
                                    </div>

                                    {/* Service 3 : Visibilité */}
                                    <div className="service-card">
                                        <div className="service-icon visibility">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                                            </svg>
                                        </div>
                                        <h3 className="service-title">Services de Visibilité Digitale</h3>
                                        <p className="service-description">
                                            Boostez votre présence en ligne avec nos services professionnels : SEO international,
                                            publicité Google Ads et Facebook Ads, gestion de réseaux sociaux, email marketing,
                                            stratégie de croissance. Solutions pour entreprises et créateurs de contenu du monde entier.
                                        </p>
                                        <ul className="service-features">
                                            <li>✓ SEO et référencement international</li>
                                            <li>✓ Publicité Google Ads, Facebook Ads</li>
                                            <li>✓ Gestion réseaux sociaux professionnelle</li>
                                            <li>✓ Stratégie de croissance sur mesure</li>
                                        </ul>
                                        <Link to="/contact" className="service-btn">
                                            Demander un devis →
                                        </Link>
                                        <p className="service-seo-keywords">
                                            Services marketing digital, SEO international, publicité en ligne, gestion réseaux sociaux,
                                            Google Ads, Facebook Ads, croissance digitale, stratégie marketing
                                        </p>
                                    </div>

                                    {/* Service 4 : Marketplace */}
                                    <div className="service-card marketplace-card">
                                        <div className="marketplace-badge">🚀 Découvrez</div>
                                        <div className="service-icon marketplace">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/>
                                            </svg>
                                        </div>
                                        <h3 className="service-title">Payvilus Store - Marketplace International</h3>
                                        <p className="service-description">
                                            Notre marketplace mondial pour acheter et vendre des produits digitaux, services freelance,
                                            templates, ebooks, logiciels, formations. Connectez-vous avec des clients et prestataires
                                            du monde entier. Plateforme e-commerce complète avec paiements sécurisés.
                                        </p>
                                        <ul className="service-features">
                                            <li>✓ Marketplace international 24/7</li>
                                            <li>✓ Achat/vente produits et services digitaux</li>
                                            <li>✓ Paiements sécurisés multidevises</li>
                                            <li>✓ Commission compétitive pour vendeurs</li>
                                        </ul>
                                        <a
                                            href="https://www.payvilus.store"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="service-btn marketplace-btn"
                                        >
                                            Visiter Payvilus Store →
                                        </a>
                                        <p className="service-seo-keywords">
                                            Marketplace international, e-commerce global, vente en ligne, produits digitaux,
                                            services freelance, plateforme vente, Payvilus Store, marketplace digital
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* CTA Section - Composant existant */}
                        <LandingCTA />

                        {/* Exchange Rate Animation - Composant existant */}
                        <ExchangeRate />

                        {/* Section Présence Mondiale */}
                        <section className="worldwide-presence">
                            <div className="section-container">
                                <div className="section-header-center">
                                    <h2 className="section-title">🌍 Présence Mondiale</h2>
                                    <p className="section-description">
                                        Des services disponibles dans 4 pays avec expansion continue vers le monde entier
                                    </p>
                                </div>

                                <div className="countries-grid">
                                    <div className="country-card usa">
                                        <div className="country-flag-large">🇺🇸</div>
                                        <h3 className="country-name">États-Unis</h3>
                                        <p className="country-services">
                                            Transactions PayPal, Formations, Visibilité, Marketplace
                                        </p>
                                        <div className="country-details">
                                            <span className="detail-item">💵 USD</span>
                                            <span className="detail-item">🗣️ English</span>
                                        </div>
                                    </div>

                                    <div className="country-card canada">
                                        <div className="country-flag-large">🇨🇦</div>
                                        <h3 className="country-name">Canada</h3>
                                        <p className="country-services">
                                            Transactions PayPal, Formations, Visibilité, Marketplace
                                        </p>
                                        <div className="country-details">
                                            <span className="detail-item">💵 CAD, USD</span>
                                            <span className="detail-item">🗣️ English, Français</span>
                                        </div>
                                    </div>

                                    <div className="country-card france">
                                        <div className="country-flag-large">🇫🇷</div>
                                        <h3 className="country-name">France</h3>
                                        <p className="country-services">
                                            Transactions PayPal, Formations, Visibilité, Marketplace
                                        </p>
                                        <div className="country-details">
                                            <span className="detail-item">💶 EUR</span>
                                            <span className="detail-item">🗣️ Français</span>
                                        </div>
                                    </div>

                                    <div className="country-card madagascar">
                                        <div className="country-flag-large">🇲🇬</div>
                                        <h3 className="country-name">Madagascar</h3>
                                        <p className="country-services">
                                            Transactions PayPal + Mobile Money, Formations, Visibilité, Marketplace
                                        </p>
                                        <div className="country-details">
                                            <span className="detail-item">💵 MGA, USD, EUR</span>
                                            <span className="detail-item">🗣️ Français, Malagasy</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="expansion-notice">
                                    <p className="expansion-text">
                                        🚀 <strong>Expansion en cours</strong> : Prochainement disponible au Royaume-Uni 🇬🇧,
                                        Allemagne 🇩🇪, Espagne 🇪🇸, Côte d'Ivoire 🇨🇮, Sénégal 🇸🇳, Maroc 🇲🇦 et bien d'autres pays.
                                    </p>
                                    <Link to="/register" className="expansion-btn">
                                        Rejoindre la liste d'attente →
                                    </Link>
                                </div>
                            </div>
                        </section>

                        {/* Aperçu des Cours - Composant existant */}
                        <section id="formations">
                            <CoursesPreview />
                        </section>

                        {/* Pourquoi Nous - Composant existant */}
                        <section id="pourquoi-nous">
                            <WhyUs />
                        </section>

                        {/* À Propos - Composant existant avec SEO */}
                        <LandingAbout />

                        {/* Témoignages - Composant existant */}
                        <section id="avis">
                            <Testimonials />
                        </section>

                        {/* Section Waviloid Studio */}
                        <section className="waviloid-section">
                            <div className="section-container">
                                <div className="waviloid-content">
                                    <div className="waviloid-text">
                                        <h2 className="waviloid-title">
                                            Propulsé par <span className="highlight">Waviloid Studio</span>
                                        </h2>
                                        <p className="waviloid-description">
                                            Waviloid Studio est la société mère qui propulse Payvilus. Leader en innovation digitale,
                                            nous sommes spécialisés dans le développement de plateformes technologiques de pointe et
                                            les solutions fintech internationales.
                                        </p>
                                        <p className="waviloid-description">
                                            Notre équipe internationale de 50+ experts (développeurs, designers, marketeurs, formateurs)
                                            travaille 24/7 pour créer des outils qui démocratisent l'accès à l'économie numérique mondiale.
                                        </p>
                                        <div className="waviloid-stats">
                                            <div className="stat-item">
                                                <span className="stat-number">50+</span>
                                                <span className="stat-label">Experts</span>
                                            </div>
                                            <div className="stat-item">
                                                <span className="stat-number">4</span>
                                                <span className="stat-label">Pays</span>
                                            </div>
                                            <div className="stat-item">
                                                <span className="stat-number">24/7</span>
                                                <span className="stat-label">Support</span>
                                            </div>
                                            <div className="stat-item">
                                                <span className="stat-number">50K+</span>
                                                <span className="stat-label">Utilisateurs</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="waviloid-image">
                                        <img
                                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                                            alt="Équipe Waviloid Studio - Innovation digitale"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* CTA Final */}
                        <section className="final-cta">
                            <div className="cta-container">
                                <h2 className="cta-title">Prêt à Transformer Votre Vie Digitale ?</h2>
                                <p className="cta-description">
                                    Rejoignez plus de 50,000 utilisateurs dans le monde qui utilisent Payvilus pour leurs
                                    transactions PayPal, formations professionnelles et croissance digitale.
                                </p>
                                <div className="cta-buttons">
                                    <Link to="/register" className="cta-btn primary">
                                        <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                                        </svg>
                                        Créer mon compte gratuit
                                    </Link>
                                    <a
                                        href="https://www.payvilus.store"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cta-btn secondary"
                                    >
                                        <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/>
                                        </svg>
                                        Découvrir le Marketplace
                                    </a>
                                </div>
                            </div>
                        </section>
                    </main>

                    {/* Footer commun */}
                    <LandingFooter />
                </>
            )}
        </div>
    )
}