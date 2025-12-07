// src/components/LandingFooter.jsx - FOOTER UNIVERSEL RÉUTILISABLE
import { Link } from 'react-router-dom'
import '../styles/Landing.css'

export default function LandingFooter() {
    return (
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
                        <li><Link to="/services/transactions-paypal">Transactions PayPal</Link></li>
                        <li><Link to="/services/formations-digitales">Formations Digitales</Link></li>
                        <li><Link to="/services/devenir-freelancer">Devenir Freelancer</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Ressources</h4>
                    <ul>
                        <li><Link to="/about">À propos</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Légal</h4>
                    <ul>
                        <li><Link to="/confidentialite">Confidentialité</Link></li>
                        <li><Link to="/terms">Conditions d'utilisation</Link></li>
                        <li><Link to="/securite">Sécurité</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2025 Payvilus. Tous droits réservés. | Made with ❤️ by Waviloid Studio</p>
            </div>
        </footer>
    )
}