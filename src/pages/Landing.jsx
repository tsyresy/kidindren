// src/pages/Landing.jsx
import { useState } from 'react'
import SplashLoading from '../components/SplashLoading'
import LandingHero from '../components/LandingHero'
import LandingCTA from '../components/LandingCTA'
import ExchangeRate from '../components/ExchangeRate'
import WhyUs from '../components/WhyUs'
import LandingAbout from '../components/LandingAbout'
import Testimonials from '../components/Testimonials'
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
                    <header className="landing-navbar">
                        <div className="landing-navbar-content">
                            <div className="landing-logo">
                                <img
                                    src="https://res.cloudinary.com/djillj6xt/image/upload/v1763394595/CL-B-3_sigqnz.png"
                                    alt="Payvilus"
                                />
                            </div>
                            <nav className="landing-nav">
                                <a href="#pourquoi-nous">Services</a>
                                <a href="#avis">Avis</a>
                            </nav>
                            <div className="landing-ctas">
                                <a href="/login" className="btn-nav-secondary">Connexion</a>
                                <a href="/register" className="btn-nav-primary">S'inscrire</a>
                            </div>
                        </div>
                    </header>

                    <main className="landing-main">
                        <LandingHero />
                        <LandingCTA />
                        <ExchangeRate />
                        <WhyUs />
                        <LandingAbout />
                        <section id="avis">
                            <Testimonials />
                        </section>
                    </main>

                    <footer className="landing-footer">
                        <div className="footer-content">
                            <div className="footer-section">
                                <h3>Payvilus</h3>
                                <p>Plateforme complète pour freelancers digitaux</p>
                                <p className="footer-meta">Propulsée par Waviloid Studio | 2025</p>
                            </div>
                            <div className="footer-section">
                                <h4>Services</h4>
                                <ul>
                                    <li><a href="#paypal">Transactions PayPal</a></li>
                                    <li><a href="#formation">Formations Digitales</a></li>
                                    <li><a href="#freelance">Devenir Freelancer</a></li>
                                </ul>
                            </div>
                            <div className="footer-section">
                                <h4>Ressources</h4>
                                <ul>
                                    <li><a href="#about">À propos</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                    <li><a href="#blog">Blog</a></li>
                                </ul>
                            </div>
                            <div className="footer-section">
                                <h4>Légal</h4>
                                <ul>
                                    <li><a href="#privacy">Confidentialité</a></li>
                                    <li><a href="#terms">Conditions d'utilisation</a></li>
                                    <li><a href="#security">Sécurité</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <p>© 2025 Payvilus. Tous droits réservés. | Made with ❤️ by Waviloid Studio</p>
                        </div>
                    </footer>
                </>
            )}
        </div>
    )
}