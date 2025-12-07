// src/pages/services/FormationsDigitales.jsx - FORMATIONS DIGITALES
import { Link } from 'react-router-dom'
import LandingFooter from '../../components/LandingFooter'
import '../../styles/LegalPages.css'

export default function FormationsDigitales() {
    return (
        <div className="legal-page-wrapper">
            {/* Navbar */}
            <header className="landing-navbar">
                <div className="landing-navbar-content">
                    <Link to="/" className="landing-logo">
                        <img
                            src="https://res.cloudinary.com/djillj6xt/image/upload/v1763394595/CL-B-3_sigqnz.png"
                            alt="Payvilus"
                        />
                    </Link>
                    <nav className="landing-nav">
                        <Link to="/">Accueil</Link>
                        <Link to="/about">À propos</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                    <div className="landing-ctas">
                        <Link to="/login" className="btn-nav-secondary">Connexion</Link>
                        <Link to="/register" className="btn-nav-primary">S'inscrire</Link>
                    </div>
                </div>
            </header>

            {/* Contenu Principal */}
            <main className="legal-content">
                <div className="legal-container">
                    <h1>Formations Digitales pour Freelancers</h1>
                    <p className="legal-intro">
                        Chez <strong>Payvilus</strong>, nous ne nous contentons pas de faciliter vos transactions PayPal.
                        Nous vous accompagnons dans votre parcours de freelancer avec des <strong>formations complètes et pratiques</strong>
                        créées par des experts qui ont réussi dans le digital.
                    </p>

                    {/* Image Hero */}
                    <div className="legal-image">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop"
                            alt="Formations digitales freelance Madagascar"
                        />
                    </div>

                    {/* Section 1 : Pourquoi Nos Formations */}
                    <section className="legal-section highlight-section">
                        <h2>🎓 Pourquoi Nos Formations Sont Différentes</h2>
                        <p>
                            Le marché malgache est saturé de formations "théoriques" qui ne vous apprennent rien de concret.
                            Chez Payvilus, nos formations sont :
                        </p>

                        <div className="features-grid">
                            <div className="feature-card">
                                <h4>✅ 100% Pratiques</h4>
                                <p>
                                    Zéro blabla. Chaque formation inclut des exercices concrets, des templates, des scripts,
                                    et des études de cas réels. Vous appliquez immédiatement ce que vous apprenez.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h4>✅ Créées par des Experts qui Gagnent Réellement</h4>
                                <p>
                                    Nos formateurs sont des freelancers qui gagnent entre 500 USD et 5000 USD/mois sur Fiverr,
                                    Upwork, et d'autres plateformes. Ils partagent leurs stratégies réelles.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h4>✅ Adaptées au Contexte Malgache</h4>
                                <p>
                                    Pas de formations génériques importées. Nous comprenons les défis spécifiques des Malgaches
                                    (langue, fuseaux horaires, accès PayPal, etc.).
                                </p>
                            </div>
                            <div className="feature-card">
                                <h4>✅ Gratuites et Payantes</h4>
                                <p>
                                    De nombreuses formations de base sont <strong>100% gratuites</strong>. Les formations avancées
                                    sont payantes mais accessibles avec des réductions jusqu'à -40% pour nos abonnés.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h4>✅ Mises à Jour Régulièrement</h4>
                                <p>
                                    Le digital évolue vite. Nous mettons à jour nos contenus chaque trimestre pour refléter
                                    les dernières tendances et changements des plateformes.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h4>✅ Accès à Vie</h4>
                                <p>
                                    Une fois que vous achetez une formation, elle est à vous pour toujours. Revenez-y
                                    autant de fois que nécessaire, sans limite de temps.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 : Catalogue de Formations */}
                    <section className="legal-section">
                        <h2>📚 Notre Catalogue de Formations</h2>
                        <p>
                            Plus de <strong>50+ heures de contenu vidéo</strong>, des PDF téléchargeables, des templates,
                            et des ressources pour vous transformer en freelancer rentable.
                        </p>

                        <h3>Formations Gratuites (Pour Démarrer)</h3>
                        <div className="courses-list">
                            <div className="course-item">
                                <div className="course-badge free">GRATUIT</div>
                                <h4>Comment Créer un Compte PayPal à Madagascar</h4>
                                <p>
                                    <strong>Durée :</strong> 45 min | <strong>Niveau :</strong> Débutant
                                </p>
                                <p>
                                    Apprenez à créer, vérifier et sécuriser votre compte PayPal même sans carte bancaire.
                                    Évitez les erreurs qui mènent au blocage de compte.
                                </p>
                                <ul>
                                    <li>✅ Inscription étape par étape</li>
                                    <li>✅ Vérification sans carte (astuce)</li>
                                    <li>✅ Comment éviter les blocages PayPal</li>
                                    <li>✅ Paramètres de sécurité essentiels</li>
                                </ul>
                            </div>

                            <div className="course-item">
                                <div className="course-badge free">GRATUIT</div>
                                <h4>Introduction au Freelancing : Par Où Commencer ?</h4>
                                <p>
                                    <strong>Durée :</strong> 1h 30min | <strong>Niveau :</strong> Débutant
                                </p>
                                <p>
                                    Découvrez ce qu'est le freelancing, comment ça fonctionne, et si c'est fait pour vous.
                                    Choisissez la bonne niche selon vos compétences.
                                </p>
                                <ul>
                                    <li>✅ Qu'est-ce que le freelancing ?</li>
                                    <li>✅ Les 10 métiers les plus demandés</li>
                                    <li>✅ Évaluer vos compétences actuelles</li>
                                    <li>✅ Choisir votre niche rentable</li>
                                    <li>✅ Fixer vos tarifs (ne sous-estimez pas !)</li>
                                </ul>
                            </div>

                            <div className="course-item">
                                <div className="course-badge free">GRATUIT</div>
                                <h4>Fiverr pour Débutants : Créer un Profil Qui Convertit</h4>
                                <p>
                                    <strong>Durée :</strong> 1h | <strong>Niveau :</strong> Débutant
                                </p>
                                <p>
                                    Créez un profil Fiverr optimisé qui attire les clients dès le premier jour.
                                    Template de gig inclus.
                                </p>
                                <ul>
                                    <li>✅ Inscription et vérification du compte</li>
                                    <li>✅ Créer un profil qui se démarque</li>
                                    <li>✅ Rédiger une description de gig gagnante</li>
                                    <li>✅ Définir vos packages (Basic, Standard, Premium)</li>
                                    <li>✅ Template de gig prêt à l'emploi</li>
                                </ul>
                            </div>
                        </div>

                        <h3>Formations Payantes (Pour Se Professionnaliser)</h3>
                        <div className="courses-list">
                            <div className="course-item premium">
                                <div className="course-badge">29,000 MGA</div>
                                <div className="discount-badge">-20% Standard | -40% Premium</div>
                                <h4>Fiverr Masterclass : De 0 à 1000 USD/Mois</h4>
                                <p>
                                    <strong>Durée :</strong> 6h | <strong>Niveau :</strong> Intermédiaire
                                </p>
                                <p>
                                    Formation complète pour construire un business Fiverr rentable. Stratégies avancées
                                    de ranking, prospection, et fidélisation client.
                                </p>
                                <ul>
                                    <li>✅ Stratégie SEO Fiverr (apparaître en 1ère page)</li>
                                    <li>✅ Comment obtenir vos 10 premières ventes</li>
                                    <li>✅ Prospection active : trouver des clients hors Fiverr</li>
                                    <li>✅ Gérer les clients difficiles</li>
                                    <li>✅ Augmenter vos tarifs sans perdre de clients</li>
                                    <li>✅ Automatiser votre workflow (templates, outils)</li>
                                </ul>
                            </div>

                            <div className="course-item premium">
                                <div className="course-badge">49,000 MGA</div>
                                <div className="discount-badge">-20% Standard | -40% Premium</div>
                                <h4>Upwork Pro : Décrocher des Contrats à 50-100 USD/Heure</h4>
                                <p>
                                    <strong>Durée :</strong> 8h | <strong>Niveau :</strong> Avancé
                                </p>
                                <p>
                                    Upwork est plus difficile que Fiverr, mais les tarifs sont 5-10x plus élevés.
                                    Apprenez à postuler, négocier et décrocher des contrats premium.
                                </p>
                                <ul>
                                    <li>✅ Créer un profil Top Rated (stratégie complète)</li>
                                    <li>✅ Rédiger des proposals qui convertissent à 30%+</li>
                                    <li>✅ Template de 10 proposals gagnantes</li>
                                    <li>✅ Négociation de tarifs (comment demander 100 USD/h)</li>
                                    <li>✅ Construire une relation long-terme avec clients</li>
                                    <li>✅ Protéger vos revenus (contrats, escrow, disputes)</li>
                                </ul>
                            </div>

                            <div className="course-item premium">
                                <div className="course-badge">39,000 MGA</div>
                                <div className="discount-badge">-20% Standard | -40% Premium</div>
                                <h4>Copywriting pour Freelancers : Écrire pour Vendre</h4>
                                <p>
                                    <strong>Durée :</strong> 5h | <strong>Niveau :</strong> Tous niveaux
                                </p>
                                <p>
                                    Le copywriting est la compétence la plus rentable du digital (500-5000 USD par projet).
                                    Apprenez à écrire des textes qui convertissent.
                                </p>
                                <ul>
                                    <li>✅ Les bases du copywriting persuasif</li>
                                    <li>✅ Frameworks AIDA, PAS, FAB</li>
                                    <li>✅ Rédiger des pages de vente qui convertissent</li>
                                    <li>✅ Email marketing et séquences automatisées</li>
                                    <li>✅ Copywriting pour publicités (Facebook, Google)</li>
                                    <li>✅ 20+ templates de copy prêts à l'emploi</li>
                                </ul>
                            </div>

                            <div className="course-item premium">
                                <div className="course-badge">59,000 MGA</div>
                                <div className="discount-badge">-20% Standard | -40% Premium</div>
                                <h4>Design Graphique avec Canva : Créer Sans Être Designer</h4>
                                <p>
                                    <strong>Durée :</strong> 7h | <strong>Niveau :</strong> Débutant
                                </p>
                                <p>
                                    Vous n'avez pas besoin de Photoshop ou Illustrator. Canva suffit pour créer des designs
                                    professionnels et vendre vos services sur Fiverr/Upwork.
                                </p>
                                <ul>
                                    <li>✅ Maîtriser Canva de A à Z (interface, outils)</li>
                                    <li>✅ Créer des logos professionnels</li>
                                    <li>✅ Designs pour réseaux sociaux (posts, stories, banners)</li>
                                    <li>✅ Présentations PowerPoint/Keynote impactantes</li>
                                    <li>✅ Infographies et visuels marketing</li>
                                    <li>✅ 100+ templates Canva inclus</li>
                                </ul>
                            </div>

                            <div className="course-item premium">
                                <div className="course-badge">79,000 MGA</div>
                                <div className="discount-badge">-20% Standard | -40% Premium</div>
                                <h4>Social Media Management : Gérer des Comptes et Être Payé</h4>
                                <p>
                                    <strong>Durée :</strong> 10h | <strong>Niveau :</strong> Intermédiaire
                                </p>
                                <p>
                                    Les entreprises paient 500-2000 USD/mois pour gérer leurs réseaux sociaux.
                                    Apprenez à devenir Social Media Manager freelance.
                                </p>
                                <ul>
                                    <li>✅ Stratégie de contenu (calendrier éditorial)</li>
                                    <li>✅ Création de contenu engageant (posts, reels, stories)</li>
                                    <li>✅ Community management (répondre aux commentaires)</li>
                                    <li>✅ Analyse de performance (Instagram Insights, Facebook Analytics)</li>
                                    <li>✅ Publicités Facebook/Instagram (Facebook Ads Manager)</li>
                                    <li>✅ Prospection de clients (comment trouver vos premiers clients)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="legal-image">
                            <img
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop"
                                alt="Formations en ligne freelance"
                            />
                        </div>
                    </section>

                    {/* Section 3 : Avantages Abonnés */}
                    <section className="legal-section highlight-section">
                        <h2>💎 Réductions Exclusives pour Nos Abonnés</h2>
                        <p>
                            En vous abonnant à Payvilus (Plan Standard ou Premium), vous bénéficiez de réductions automatiques
                            sur toutes nos formations payantes.
                        </p>

                        <table className="legal-table">
                            <thead>
                            <tr>
                                <th>Formation</th>
                                <th>Prix Normal</th>
                                <th>Standard (-20%)</th>
                                <th>Premium (-40%)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Fiverr Masterclass</td>
                                <td>29,000 MGA</td>
                                <td><strong>23,200 MGA</strong></td>
                                <td><strong className="highlight-text">17,400 MGA</strong></td>
                            </tr>
                            <tr>
                                <td>Upwork Pro</td>
                                <td>49,000 MGA</td>
                                <td><strong>39,200 MGA</strong></td>
                                <td><strong className="highlight-text">29,400 MGA</strong></td>
                            </tr>
                            <tr>
                                <td>Copywriting</td>
                                <td>39,000 MGA</td>
                                <td><strong>31,200 MGA</strong></td>
                                <td><strong className="highlight-text">23,400 MGA</strong></td>
                            </tr>
                            <tr>
                                <td>Design Canva</td>
                                <td>59,000 MGA</td>
                                <td><strong>47,200 MGA</strong></td>
                                <td><strong className="highlight-text">35,400 MGA</strong></td>
                            </tr>
                            <tr>
                                <td>Social Media</td>
                                <td>79,000 MGA</td>
                                <td><strong>63,200 MGA</strong></td>
                                <td><strong className="highlight-text">47,400 MGA</strong></td>
                            </tr>
                            </tbody>
                        </table>

                        <p className="legal-note">
                            💡 <strong>Astuce :</strong> Si vous prévoyez d'acheter 2-3 formations, le plan Premium est déjà rentabilisé
                            grâce aux réductions de 40%.
                        </p>
                    </section>

                    {/* Section 4 : Méthodologie */}
                    <section className="legal-section">
                        <h2>🎯 Notre Méthodologie d'Apprentissage</h2>
                        <p>
                            Nos formations suivent une méthodologie éprouvée basée sur <strong>l'apprentissage actif</strong>
                            et la <strong>mise en pratique immédiate</strong>.
                        </p>

                        <div className="methodology-steps">
                            <div className="method-step">
                                <div className="step-number">1</div>
                                <h4>Théorie Condensée (20%)</h4>
                                <p>
                                    Vidéos courtes et directes. Pas de remplissage. Seulement ce que vous devez savoir
                                    pour agir immédiatement.
                                </p>
                            </div>
                            <div className="method-step">
                                <div className="step-number">2</div>
                                <h4>Pratique Guidée (50%)</h4>
                                <p>
                                    Exercices concrets à faire pendant la formation. Vous créez votre profil, votre gig,
                                    votre première proposition pendant que vous apprenez.
                                </p>
                            </div>
                            <div className="method-step">
                                <div className="step-number">3</div>
                                <h4>Ressources Téléchargeables (20%)</h4>
                                <p>
                                    Templates, checklists, scripts, swipe files. Tout ce dont vous avez besoin pour
                                    appliquer sans réinventer la roue.
                                </p>
                            </div>
                            <div className="method-step">
                                <div className="step-number">4</div>
                                <h4>Projet Final (10%)</h4>
                                <p>
                                    Chaque formation se termine par un projet concret : créer votre premier gig,
                                    envoyer vos 10 premières propositions, etc.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5 : Témoignages */}
                    <section className="legal-section">
                        <h2>💬 Ce Que Disent Nos Étudiants</h2>

                        <div className="testimonials-grid">
                            <div className="testimonial-card">
                                <p className="testimonial-text">
                                    "La formation Fiverr m'a permis de décrocher mes 5 premières ventes en 2 semaines.
                                    Les stratégies SEO fonctionnent vraiment. Aujourd'hui je suis à 800 USD/mois !"
                                </p>
                                <p className="testimonial-author">— Rakoto M., Graphiste</p>
                            </div>
                            <div className="testimonial-card">
                                <p className="testimonial-text">
                                    "J'ai acheté la formation Upwork Pro avec le plan Premium (-40%). Résultat :
                                    j'ai décroché un contrat long-terme à 60 USD/heure. La formation s'est payée en 1 semaine !"
                                </p>
                                <p className="testimonial-author">— Nivo R., Développeur Web</p>
                            </div>
                            <div className="testimonial-card">
                                <p className="testimonial-text">
                                    "Les templates de copywriting sont une mine d'or. Je les utilise pour tous mes clients.
                                    Je facture maintenant 500 USD par page de vente."
                                </p>
                                <p className="testimonial-author">— Hery T., Copywriter</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 6 : Comment Accéder */}
                    <section className="legal-section highlight-section">
                        <h2>🚀 Comment Accéder aux Formations ?</h2>

                        <div className="access-steps">
                            <div className="access-step">
                                <h4>Étape 1 : Créez Votre Compte</h4>
                                <p>
                                    Inscrivez-vous gratuitement sur Payvilus. Accès immédiat aux formations gratuites.
                                </p>
                                <Link to="/register" className="step-btn">Créer Mon Compte</Link>
                            </div>
                            <div className="access-step">
                                <h4>Étape 2 : Explorez le Catalogue</h4>
                                <p>
                                    Allez dans la section "Formation" de votre dashboard. Parcourez les cours gratuits et payants.
                                </p>
                            </div>
                            <div className="access-step">
                                <h4>Étape 3 : Choisissez Votre Formation</h4>
                                <p>
                                    Cliquez sur une formation pour voir le détail (contenu, durée, avis).
                                    Les formations gratuites s'ouvrent immédiatement.
                                </p>
                            </div>
                            <div className="access-step">
                                <h4>Étape 4 : Payez en 1 Clic (Formations Payantes)</h4>
                                <p>
                                    Pour les formations payantes, payez par carte bancaire (Stripe sécurisé).
                                    Accès instantané après paiement.
                                </p>
                            </div>
                            <div className="access-step">
                                <h4>Étape 5 : Apprenez et Appliquez</h4>
                                <p>
                                    Suivez les vidéos, téléchargez les ressources, faites les exercices.
                                    Accès à vie, revenez autant de fois que vous voulez.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 7 : FAQ */}
                    <section className="legal-section">
                        <h2>❓ Questions Fréquentes</h2>

                        <div className="faq-item">
                            <h4>Les formations sont-elles en français ou en malgache ?</h4>
                            <p>
                                La plupart de nos formations sont en <strong>français</strong> avec des sous-titres en malgache.
                                Quelques formations spécifiques sont 100% en malgache. C'est indiqué dans la description de chaque cours.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4>Puis-je télécharger les vidéos ?</h4>
                            <p>
                                Non, pour des raisons de droits d'auteur, les vidéos ne sont pas téléchargeables.
                                Cependant, vous avez un <strong>accès à vie en streaming</strong> depuis votre compte Payvilus.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4>Y a-t-il un certificat à la fin ?</h4>
                            <p>
                                Oui ! Chaque formation payante inclut un <strong>certificat de complétion</strong> que vous pouvez
                                télécharger en PDF et ajouter à votre profil LinkedIn ou portfolio.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4>Puis-je demander un remboursement ?</h4>
                            <p>
                                Les formations gratuites ne sont pas remboursables (car gratuites). Pour les formations payantes,
                                nous offrons une <strong>garantie "satisfait ou remboursé" de 7 jours</strong>. Si vous n'êtes pas
                                satisfait, contactez-nous et nous vous remboursons intégralement, sans question.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4>Les formations sont-elles mises à jour ?</h4>
                            <p>
                                Oui ! Les plateformes comme Fiverr et Upwork changent régulièrement leurs algorithmes.
                                Nous mettons à jour nos formations <strong>tous les 3-6 mois</strong> pour refléter les derniers changements.
                                Les mises à jour sont gratuites pour tous ceux qui ont acheté la formation.
                            </p>
                        </div>
                    </section>

                    {/* Bannière CTA */}
                    <div className="legal-final-banner">
                        <h3>Transformez Vos Compétences en Revenus</h3>
                        <p>
                            Rejoignez les centaines de Malgaches qui ont transformé leur vie grâce à nos formations freelance.
                        </p>
                        <Link to="/register" className="cta-button">
                            Accéder aux Formations Gratuites
                        </Link>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    )
}