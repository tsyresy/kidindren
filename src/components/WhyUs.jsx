// src/components/WhyUs.jsx
import '../styles/Landing.css'

export default function WhyUs() {
    return (
        <section className="why-us-section" id="pourquoi-nous">
            <div className="why-us-container">
                <h2 className="section-title">
                    Pourquoi Choisir <span className="text-gradient">Payvilus</span>
                </h2>

                {/* Section PayPal */}
                <div className="why-us-content">
                    <div className="why-us-text">
                        <h3>Transactions PayPal Sécurisées et Fiables</h3>
                        <p>
                            En tant que freelancer digital ou entrepreneur, gérer vos paiements est crucial.
                            Payvilus vous propose une solution de confiance pour :
                        </p>
                        <ul className="benefits-list">
                            <li>✅ Retrait et dépôt PayPal instantanés</li>
                            <li>✅ Conversion PayPal vers Mobile Money (et inversement)</li>
                            <li>✅ Taux de change compétitifs sans frais cachés</li>
                            <li>✅ Transactions 100% sécurisées et cryptées</li>
                            <li>✅ Support client 24/7 en français</li>
                            <li>✅ Paiements traités en moins de 24h</li>
                        </ul>
                        <p className="highlight">
                            🔒 Conformité totale aux normes internationales de sécurité bancaire
                        </p>
                    </div>
                    <div className="why-us-image">
                        <img
                            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop"
                            alt="Transactions PayPal sécurisées"
                        />
                    </div>
                </div>

                {/* Section Digital & Freelance */}
                <div className="why-us-content reverse">
                    <div className="why-us-image">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                            alt="Métiers du digital et freelance"
                        />
                    </div>
                    <div className="why-us-text">
                        <h3>Devenir Freelancer Digital Rentable & Stable</h3>
                        <p>
                            Le digital a transformé le marché du travail. Les freelancers digitaux gagnent en moyenne
                            <strong> 3 à 5 fois plus</strong> qu'un salarié traditionnel. Avec Payvilus, maîtrisez :
                        </p>
                        <ul className="benefits-list">
                            <li>💼 Marketing digital et SEO</li>
                            <li>🎨 Design graphique et web</li>
                            <li>💻 Développement web et mobile</li>
                            <li>📝 Content création et copywriting</li>
                            <li>📊 Gestion de réseaux sociaux</li>
                            <li>🎓 Certification professionnelle reconnue</li>
                        </ul>
                        <div className="stats-grid">
                            <div className="stat">
                                <strong>500+</strong>
                                <span>Freelancers formés</span>
                            </div>
                            <div className="stat">
                                <strong>95%</strong>
                                <span>Taux d'employabilité</span>
                            </div>
                            <div className="stat">
                                <strong>20+</strong>
                                <span>Métiers maîtrisables</span>
                            </div>
                        </div>
                        <p className="highlight">
                            🚀 Accompagnement personnalisé pour lancer votre activité de freelancer
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}