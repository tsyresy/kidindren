// src/components/FeatureSection.jsx
import { Link } from 'react-router-dom'
import '../styles/Components.css'

export default function FeatureSection() {
    return (
        <div className="features-container">
            {/* Section PayPal */}
            <section className="feature-section">
                <div className="feature-content">
                    <div className="feature-text">
                        <h2 className="feature-title">
                            Transactions PayPal <span className="text-gradient">Sécurisées</span>
                        </h2>
                        <p className="feature-description">
                            Effectuez vos transactions en toute confiance avec Payvilus. Notre plateforme vous permet de :
                        </p>
                        <ul className="feature-list">
                            <li>💰 Retrait et dépôt PayPal instantanés</li>
                            <li>📱 Conversion PayPal vers Mobile Money (et inversement)</li>
                            <li>🔒 Transactions 100% sécurisées et cryptées</li>
                            <li>⚡ Traitement rapide en moins de 24h</li>
                            <li>💵 Taux de change compétitifs</li>
                            <li>📞 Support client disponible 7j/7</li>
                        </ul>
                        <Link to="/paypal" className="feature-cta">
                            Commencer mes transactions →
                        </Link>
                    </div>
                    <div className="feature-image">
                        <img
                            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop"
                            alt="Transactions PayPal sécurisées"
                        />
                    </div>
                </div>
            </section>

            {/* Section Formation */}
            <section className="feature-section reverse">
                <div className="feature-content">
                    <div className="feature-image">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                            alt="Formations digitales"
                        />
                    </div>
                    <div className="feature-text">
                        <h2 className="feature-title">
                            Maîtrisez les <span className="text-gradient">Métiers du Digital</span>
                        </h2>
                        <p className="feature-description">
                            Le digital a transformé la vie de milliers de personnes. Rejoignez-les et développez des compétences recherchées :
                        </p>
                        <ul className="feature-list">
                            <li>🎓 Formations certifiantes reconnues</li>
                            <li>👨‍🏫 Formateurs experts du secteur</li>
                            <li>📚 Contenu mis à jour régulièrement</li>
                            <li>🎯 Parcours adaptés à tous les niveaux</li>
                            <li>💼 Accès à des opportunités de freelance</li>
                            <li>🏆 Certificat de réussite délivré</li>
                        </ul>
                        <div className="feature-stats">
                            <div className="stat-item">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">Étudiants formés</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">95%</span>
                                <span className="stat-label">Taux de satisfaction</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">20+</span>
                                <span className="stat-label">Formations disponibles</span>
                            </div>
                        </div>
                        <Link to="/formation" className="feature-cta">
                            Découvrir les formations →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}