// src/components/Hero.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Components.css'

export default function Hero() {
    const { user } = useAuth()
    const firstName = user?.user_metadata?.first_name || 'cher utilisateur'

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    Bienvenue sur <span className="text-gradient">Payvilus</span>, {firstName} ! 👋
                </h1>

                <p className="hero-subtitle">
                    Votre plateforme tout-en-un pour maîtriser le monde digital
                </p>

                <p className="hero-description">
                    Que vous soyez freelancer, entrepreneur ou passionné du digital,
                    Payvilus vous offre les outils essentiels pour réussir :
                    <strong> transactions PayPal sécurisées</strong> et
                    <strong> formations certifiantes</strong> pour développer vos compétences.
                </p>

                <div className="hero-features">
                    <div className="hero-feature">
                        <span className="feature-icon">💸</span>
                        <span>Transactions rapides et sécurisées</span>
                    </div>
                    <div className="hero-feature">
                        <span className="feature-icon">🎓</span>
                        <span>Formations certifiées</span>
                    </div>
                    <div className="hero-feature">
                        <span className="feature-icon">🚀</span>
                        <span>Accompagnement personnalisé</span>
                    </div>
                </div>

                <div className="hero-cta">
                    <Link to="/paypal" className="btn-primary-hero">
                        <span className="btn-icon">💳</span>
                        Transactions PayPal
                    </Link>
                    <Link to="/formation" className="btn-secondary-hero">
                        <span className="btn-icon">📚</span>
                        Apprendre le digital
                    </Link>
                </div>
            </div>
        </section>
    )
}