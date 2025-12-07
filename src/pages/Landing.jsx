// src/pages/Landing.jsx - AVEC CONTACT ET BLOG DANS LA NAVBAR
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
                    <header className="landing-navbar">
                        <div className="landing-navbar-content">
                            <Link to="/" className="landing-logo">
                                <img
                                    src="https://res.cloudinary.com/djillj6xt/image/upload/v1763394595/CL-B-3_sigqnz.png"
                                    alt="Payvilus"
                                />
                            </Link>
                            <nav className="landing-nav">
                                <a href="#pourquoi-nous">Services</a>
                                <a href="#avis">Avis</a>
                                <Link to="/about">À propos</Link>
                                <Link to="/contact">Contact</Link>
                                <Link to="/blog">Blog</Link>
                            </nav>
                            <div className="landing-ctas">
                                <Link to="/login" className="btn-nav-secondary">Connexion</Link>
                                <Link to="/register" className="btn-nav-primary">S'inscrire</Link>
                            </div>
                        </div>
                    </header>

                    <main className="landing-main">
                        <LandingHero />
                        <LandingCTA />
                        <ExchangeRate />
                        <CoursesPreview />
                        <WhyUs />
                        <LandingAbout />
                        <section id="avis">
                            <Testimonials />
                        </section>
                    </main>

                    <LandingFooter />
                </>
            )}
        </div>
    )
}