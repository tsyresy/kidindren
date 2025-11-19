// src/components/LandingCTA.jsx
import { Link } from 'react-router-dom'
import '../styles/Landing.css'

export default function LandingCTA() {
    return (
        <section className="landing-cta-section">
            <div className="cta-container">
                <h1 className="cta-title">
                    Maîtrisez le Digital, <span className="text-gradient">Réussissez Financièrement</span>
                </h1>

                <p className="cta-subtitle">
                    Payvilus vous offre une solution complète pour réussir en tant que freelancer digital :
                </p>

                <ul className="cta-features">
                    <li>💳 Transactions PayPal sécurisées et instantanées</li>
                    <li>📱 Conversion PayPal ↔ Mobile Money sans frais cachés</li>
                    <li>🎓 Formations certifiantes aux métiers du digital</li>
                    <li>👥 Communauté de freelancers pour vous accompagner</li>
                    <li>🚀 Outils professionnels pour développer votre activité</li>
                </ul>

                <div className="cta-buttons">
                    <Link to="/login" className="btn-cta-primary">
                        Commencer maintenant
                    </Link>
                    <a href="#pourquoi-nous" className="btn-cta-secondary">
                        En savoir plus
                    </a>
                </div>

                <p className="cta-trust">
                    ⭐ Plus de 500 freelancers nous font confiance | 95% de satisfaction
                </p>
            </div>
        </section>
    )
}