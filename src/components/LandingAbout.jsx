// src/components/LandingAbout.jsx
import '../styles/Landing.css'

export default function LandingAbout() {
    return (
        <section className="landing-about-section">
            <div className="about-container">
                <div className="about-content">
                    <div className="about-image">
                        <img
                            src="https://res.cloudinary.com/djillj6xt/image/upload/v1763394561/pdp_bbebi4.jpg"
                            alt="Payvilus - Plateforme d'innovation digitale"
                        />
                    </div>

                    <div className="about-text">
                        <h2>À Propos de <span className="text-gradient">Payvilus</span></h2>

                        <p>
                            <strong>Payvilus</strong> est une plateforme innovante lancée en <strong>2025</strong>,
                            conçue pour révolutionner la façon dont les freelancers digitaux gèrent leurs finances
                            et développent leurs compétences. Propulsée par <strong>Waviloid Studio</strong>,
                            leader en solutions digitales, Payvilus combine sécurité bancaire et formation professionnelle.
                        </p>

                        <h3>Notre Mission</h3>
                        <p>
                            Démocratiser l'accès au monde du digital professionnel en offrant aux entrepreneurs,
                            freelancers et passionnés une plateforme complète pour :
                        </p>
                        <ul className="about-list">
                            <li>🎓 Se former aux métiers du digital avec des formations certifiantes</li>
                            <li>💰 Gérer leurs transactions financières de manière sécurisée</li>
                            <li>🤝 Rejoindre une communauté de professionnels du digital</li>
                            <li>📈 Développer une activité freelance rentable et stable</li>
                        </ul>

                        <h3>Pourquoi Payvilus ?</h3>
                        <p>
                            Dans un monde en constante évolution numérique, les <strong>freelancers digital</strong>
                            sont les acteurs clés du marché du travail moderne. Payvilus reconnaît cette réalité
                            et propose une solution intégrée pour :
                        </p>

                        <div className="keywords-list">
                            <span className="keyword">Formation digital</span>
                            <span className="keyword">Freelancer en ligne</span>
                            <span className="keyword">Transactions PayPal Madagascar</span>
                            <span className="keyword">Échange PayPal Mobile Money</span>
                            <span className="keyword">Métiers du digital</span>
                            <span className="keyword">Marketing digital freelance</span>
                            <span className="keyword">Développement web Madagascar</span>
                            <span className="keyword">SEO et contenu digital</span>
                            <span className="keyword">Plateforme freelance sécurisée</span>
                            <span className="keyword">Conversion devise en ligne</span>
                            <span className="keyword">Certification professionnelle digital</span>
                            <span className="keyword">Community freelancers Madagascar</span>
                        </div>

                        <h3>Nos Valeurs</h3>
                        <ul className="values-list">
                            <li><strong>Sécurité :</strong> Protection maximale de vos données et transactions</li>
                            <li><strong>Transparence :</strong> Pas de frais cachés, taux de change réels</li>
                            <li><strong>Excellence :</strong> Formation de qualité par des experts du digital</li>
                            <li><strong>Innovation :</strong> Solutions adaptées aux défis du marché moderne</li>
                            <li><strong>Communauté :</strong> Entraide et partage entre freelancers</li>
                        </ul>

                        <p className="cta-text">
                            Rejoignez Payvilus aujourd'hui et transformez votre passion pour le digital
                            en carrière rentable et stable.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}