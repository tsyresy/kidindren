// src/pages/Contact.jsx - PAGE CONTACT
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LandingFooter from '../components/LandingFooter'
import '../styles/LegalPages.css'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [formStatus, setFormStatus] = useState(null) // 'success', 'error', null

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation basique
        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus('error')
            return
        }

        try {
            // TODO: Intégrer avec votre backend ou service d'email (ex: EmailJS, SendGrid)
            // Pour l'instant, on simule un envoi réussi
            console.log('Formulaire soumis:', formData)

            // Simuler un délai d'envoi
            await new Promise(resolve => setTimeout(resolve, 1000))

            setFormStatus('success')
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            setFormStatus('error')
        }
    }

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
                    <h1>Contactez-Nous</h1>
                    <p className="legal-intro">
                        Vous avez une question, un problème technique, ou vous souhaitez en savoir plus sur nos services ?
                        Notre équipe <strong>Payvilus</strong> est là pour vous aider. Nous nous engageons à répondre à tous
                        les messages sous <strong>24 heures</strong> (jours ouvrables).
                    </p>

                    {/* Image Hero */}
                    <div className="legal-image">
                        <img
                            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=400&fit=crop"
                            alt="Contact Payvilus Support"
                        />
                    </div>

                    {/* Section 1 : Moyens de Contact */}
                    <section className="legal-section highlight-section">
                        <h2>📞 Nos Coordonnées</h2>
                        <p>
                            Plusieurs moyens de nous joindre selon votre préférence et l'urgence de votre demande :
                        </p>

                        <div className="contact-methods-grid">
                            <div className="contact-method-card">
                                <div className="contact-icon">📧</div>
                                <h3>Email</h3>
                                <p className="contact-detail">
                                    <a href="mailto:support@payvilus.com">support@payvilus.com</a>
                                </p>
                                <p className="contact-desc">
                                    Pour toutes les questions générales, problèmes techniques, ou demandes d'assistance.
                                    Réponse sous 24h (jours ouvrables).
                                </p>
                            </div>

                            <div className="contact-method-card">
                                <div className="contact-icon">🔒</div>
                                <h3>Email Sécurité</h3>
                                <p className="contact-detail">
                                    <a href="mailto:security@payvilus.com">security@payvilus.com</a>
                                </p>
                                <p className="contact-desc">
                                    Pour signaler une activité suspecte sur votre compte, une faille de sécurité,
                                    ou toute urgence liée à la sécurité. Réponse prioritaire sous 2h.
                                </p>
                            </div>

                            <div className="contact-method-card">
                                <div className="contact-icon">💳</div>
                                <h3>Email Facturation</h3>
                                <p className="contact-detail">
                                    <a href="mailto:billing@payvilus.com">billing@payvilus.com</a>
                                </p>
                                <p className="contact-desc">
                                    Pour les questions relatives aux abonnements, factures, paiements,
                                    ou remboursements. Réponse sous 24h.
                                </p>
                            </div>

                            <div className="contact-method-card">
                                <div className="contact-icon">🏢</div>
                                <h3>Adresse Postale</h3>
                                <p className="contact-detail">
                                    Waviloid Studio<br/>
                                    Antananarivo, Madagascar
                                </p>
                                <p className="contact-desc">
                                    Nos bureaux sont situés à Antananarivo. Pour les envois postaux uniquement
                                    (nous privilégions la communication par email pour plus de rapidité).
                                </p>
                            </div>

                            <div className="contact-method-card">
                                <div className="contact-icon">⏰</div>
                                <h3>Horaires d'Ouverture</h3>
                                <p className="contact-detail">
                                    <strong>Lun-Ven :</strong> 8h00 - 18h00<br/>
                                    <strong>Sam :</strong> 9h00 - 13h00<br/>
                                    <strong>Dim :</strong> Fermé
                                </p>
                                <p className="contact-desc">
                                    Fuseau horaire : GMT+3 (heure de Madagascar). Support par email disponible 24/7,
                                    traitement des demandes pendant les heures d'ouverture.
                                </p>
                            </div>

                            <div className="contact-method-card">
                                <div className="contact-icon">💬</div>
                                <h3>Support en Ligne</h3>
                                <p className="contact-detail">
                                    <Link to="/support">Chat en direct</Link>
                                </p>
                                <p className="contact-desc">
                                    Pour les utilisateurs connectés : accédez à notre chatbot intelligent disponible 24/7
                                    pour répondre à vos questions instantanément.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 : Formulaire de Contact */}
                    <section className="legal-section">
                        <h2>📝 Formulaire de Contact</h2>
                        <p>
                            Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                            Tous les champs marqués d'un astérisque (*) sont obligatoires.
                        </p>

                        <div className="contact-form-container">
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Nom complet *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Votre nom et prénom"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="votre.email@exemple.com"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Sujet</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    >
                                        <option value="">-- Sélectionnez un sujet --</option>
                                        <option value="transaction">Question sur une transaction</option>
                                        <option value="paypal">Problème PayPal</option>
                                        <option value="subscription">Abonnement et facturation</option>
                                        <option value="formation">Formations et cours</option>
                                        <option value="technique">Problème technique</option>
                                        <option value="securite">Sécurité du compte</option>
                                        <option value="partenariat">Partenariat / Collaboration</option>
                                        <option value="autre">Autre</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Décrivez votre question ou problème en détail..."
                                        rows="6"
                                        required
                                    ></textarea>
                                </div>

                                {formStatus === 'success' && (
                                    <div className="form-success">
                                        ✅ <strong>Message envoyé avec succès !</strong> Nous vous répondrons sous 24 heures.
                                    </div>
                                )}

                                {formStatus === 'error' && (
                                    <div className="form-error">
                                        ❌ <strong>Erreur :</strong> Veuillez remplir tous les champs obligatoires.
                                    </div>
                                )}

                                <button type="submit" className="contact-submit-btn">
                                    Envoyer le Message
                                </button>
                            </form>

                            <div className="contact-form-info">
                                <h4>💡 Conseils pour une Réponse Rapide</h4>
                                <ul>
                                    <li>✅ <strong>Soyez précis :</strong> Plus votre description est détaillée, plus nous pourrons vous aider rapidement</li>
                                    <li>✅ <strong>Joignez des captures d'écran :</strong> Si c'est un problème technique, envoyez des screenshots</li>
                                    <li>✅ <strong>Indiquez votre ID de transaction :</strong> Pour les questions liées aux transactions</li>
                                    <li>✅ <strong>Vérifiez vos spams :</strong> Notre réponse pourrait atterrir dans vos courriers indésirables</li>
                                </ul>

                                <h4>⚡ Temps de Réponse Moyen</h4>
                                <ul>
                                    <li><strong>Questions simples :</strong> 2-6 heures</li>
                                    <li><strong>Questions techniques :</strong> 12-24 heures</li>
                                    <li><strong>Urgences sécurité :</strong> 1-2 heures</li>
                                    <li><strong>Demandes complexes :</strong> 24-48 heures</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 : FAQ Rapide */}
                    <section className="legal-section highlight-section">
                        <h2>❓ Questions Fréquentes (Réponse Instantanée)</h2>
                        <p>
                            Avant de nous contacter, consultez ces questions fréquentes. Vous trouverez peut-être
                            votre réponse immédiatement :
                        </p>

                        <div className="quick-faq">
                            <div className="faq-item">
                                <h4>Comment retirer mes fonds PayPal ?</h4>
                                <p>
                                    Connectez-vous à votre compte Payvilus → Allez dans "Dépôt PayPal" → Remplissez le formulaire
                                    → Transférez vos fonds PayPal → Recevez vos Ariary sur Mobile Money en 5-120 minutes.
                                </p>
                                <Link to="/services/transactions-paypal" className="faq-link">Guide complet →</Link>
                            </div>

                            <div className="faq-item">
                                <h4>Combien coûte Payvilus ?</h4>
                                <p>
                                    <strong>Plan FREE :</strong> 0 MGA/mois, commission 15%<br/>
                                    <strong>Plan STANDARD :</strong> 39,000 MGA/mois, commission 5%<br/>
                                    <strong>Plan PREMIUM :</strong> 79,000 MGA/mois, commission 0%
                                </p>
                                <Link to="/subscription" className="faq-link">Voir les détails →</Link>
                            </div>

                            <div className="faq-item">
                                <h4>Ma transaction est bloquée, que faire ?</h4>
                                <p>
                                    Vérifiez le statut dans votre dashboard. Si "En attente" depuis plus de 2h, contactez-nous
                                    à <a href="mailto:support@payvilus.com">support@payvilus.com</a> avec votre ID de transaction.
                                </p>
                            </div>

                            <div className="faq-item">
                                <h4>Comment créer un compte PayPal à Madagascar ?</h4>
                                <p>
                                    Consultez notre formation gratuite "Comment Créer un Compte PayPal à Madagascar" dans la section Formation.
                                </p>
                                <Link to="/services/formations-digitales" className="faq-link">Accéder à la formation →</Link>
                            </div>

                            <div className="faq-item">
                                <h4>Puis-je annuler mon abonnement ?</h4>
                                <p>
                                    Oui, à tout moment. Allez dans Paramètres → Abonnement → Annuler. Aucun frais d'annulation.
                                    Vous gardez l'accès jusqu'à la fin de la période payée.
                                </p>
                            </div>

                            <div className="faq-item">
                                <h4>Mes données sont-elles sécurisées ?</h4>
                                <p>
                                    Absolument. Nous utilisons le cryptage SSL 256-bit, la certification PCI-DSS, et des serveurs
                                    conformes RGPD. Vos données ne sont jamais vendues à des tiers.
                                </p>
                                <Link to="/securite" className="faq-link">En savoir plus sur la sécurité →</Link>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 : Localisation */}
                    <section className="legal-section">
                        <h2>📍 Notre Localisation</h2>
                        <p>
                            Payvilus est une plateforme 100% malgache, créée par <strong>Waviloid Studio</strong>
                            et basée à <strong>Antananarivo, Madagascar</strong>.
                        </p>

                        <div className="location-info">
                            <div className="location-card">
                                <h4>🏢 Siège Social</h4>
                                <p>
                                    <strong>Waviloid Studio</strong><br/>
                                    Antananarivo<br/>
                                    Madagascar
                                </p>
                            </div>

                            <div className="location-card">
                                <h4>🌍 Zone de Service</h4>
                                <p>
                                    Nous servons tous les freelancers et entrepreneurs à Madagascar,
                                    avec support pour Mvola, Orange Money et Airtel Money dans tout le pays.
                                </p>
                            </div>

                            <div className="location-card">
                                <h4>🕐 Fuseau Horaire</h4>
                                <p>
                                    <strong>GMT+3</strong> (EAT - East Africa Time)<br/>
                                    Même fuseau que Nairobi, Dar es Salaam, Kampala
                                </p>
                            </div>
                        </div>

                        {/* Google Maps Placeholder */}
                        <div className="map-container">
                            <p className="map-note">
                                📌 <strong>Note :</strong> Pour des raisons de confidentialité, nous ne publions pas notre adresse
                                exacte en ligne. Si vous avez besoin de nous rencontrer en personne, contactez-nous par email
                                pour prendre rendez-vous.
                            </p>
                        </div>
                    </section>

                    {/* Section 5 : Support Dédié par Plan */}
                    <section className="legal-section highlight-section">
                        <h2>💎 Support Selon Votre Plan</h2>
                        <p>
                            Le niveau de support que vous recevez dépend de votre plan d'abonnement Payvilus :
                        </p>

                        <table className="legal-table">
                            <thead>
                            <tr>
                                <th>Fonctionnalité</th>
                                <th>Plan FREE</th>
                                <th>Plan STANDARD</th>
                                <th>Plan PREMIUM</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Support par Email</td>
                                <td>✅ Oui (48h)</td>
                                <td>✅ Oui (24h)</td>
                                <td>✅ Oui (12h)</td>
                            </tr>
                            <tr>
                                <td>Chat en Direct</td>
                                <td>✅ Chatbot uniquement</td>
                                <td>✅ Chatbot + Agent (heures ouvrables)</td>
                                <td>✅ Prioritaire 24/7</td>
                            </tr>
                            <tr>
                                <td>Support Téléphonique</td>
                                <td>❌ Non</td>
                                <td>❌ Non</td>
                                <td>✅ Oui (sur RDV)</td>
                            </tr>
                            <tr>
                                <td>Conseiller Dédié</td>
                                <td>❌ Non</td>
                                <td>❌ Non</td>
                                <td>✅ Oui</td>
                            </tr>
                            <tr>
                                <td>Priorité des Tickets</td>
                                <td>Standard</td>
                                <td>Moyenne</td>
                                <td>Haute</td>
                            </tr>
                            <tr>
                                <td>Résolution de Problèmes Complexes</td>
                                <td>Support communautaire</td>
                                <td>✅ Assistance complète</td>
                                <td>✅ Assistance VIP</td>
                            </tr>
                            </tbody>
                        </table>

                        <p className="legal-note">
                            💡 <strong>Astuce :</strong> Si vous avez des questions complexes ou urgentes, le plan Standard
                            ou Premium vous garantit une réponse plus rapide et un support plus personnalisé.
                        </p>
                    </section>

                    {/* Section 6 : Réseaux Sociaux */}
                    <section className="legal-section">
                        <h2>🌐 Suivez-Nous sur les Réseaux Sociaux</h2>
                        <p>
                            Restez connecté avec Payvilus pour recevoir les dernières actualités, astuces freelance,
                            et offres spéciales :
                        </p>

                        <div className="social-links">
                            <a href="https://www.facebook.com/payvilus" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                                <span className="social-icon">📘</span>
                                <div>
                                    <h4>Facebook</h4>
                                    <p>Rejoignez notre communauté de 5000+ freelancers</p>
                                </div>
                            </a>

                            <a href="https://twitter.com/payvilus" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                                <span className="social-icon">🐦</span>
                                <div>
                                    <h4>Twitter</h4>
                                    <p>Conseils quotidiens et actualités du digital</p>
                                </div>
                            </a>

                            <a href="https://www.linkedin.com/company/payvilus" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                                <span className="social-icon">💼</span>
                                <div>
                                    <h4>LinkedIn</h4>
                                    <p>Networking professionnel et opportunités</p>
                                </div>
                            </a>

                            <a href="https://www.instagram.com/payvilus" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                                <span className="social-icon">📸</span>
                                <div>
                                    <h4>Instagram</h4>
                                    <p>Success stories et inspiration quotidienne</p>
                                </div>
                            </a>
                        </div>
                    </section>

                    {/* Section 7 : Partenariats et Presse */}
                    <section className="legal-section">
                        <h2>🤝 Partenariats et Demandes Presse</h2>
                        <p>
                            Vous êtes journaliste, blogueur, ou vous souhaitez établir un partenariat avec Payvilus ?
                        </p>

                        <div className="partnership-info">
                            <div className="partnership-card">
                                <h4>📰 Demandes Presse</h4>
                                <p>
                                    Pour les interviews, articles, ou demandes de renseignements médiatiques,
                                    contactez notre équipe communication :
                                </p>
                                <p><strong>Email :</strong> <a href="mailto:press@payvilus.com">press@payvilus.com</a></p>
                            </div>

                            <div className="partnership-card">
                                <h4>🤝 Partenariats B2B</h4>
                                <p>
                                    Vous êtes une entreprise, une école, ou une organisation et souhaitez collaborer
                                    avec Payvilus ? Nous sommes ouverts aux partenariats gagnant-gagnant.
                                </p>
                                <p><strong>Email :</strong> <a href="mailto:partnerships@payvilus.com">partnerships@payvilus.com</a></p>
                            </div>

                            <div className="partnership-card">
                                <h4>💼 Programme d'Affiliation</h4>
                                <p>
                                    Vous avez une audience de freelancers ou entrepreneurs ? Rejoignez notre programme
                                    d'affiliation et gagnez jusqu'à 30% de commission sur chaque vente.
                                </p>
                                <p><strong>Email :</strong> <a href="mailto:affiliate@payvilus.com">affiliate@payvilus.com</a></p>
                            </div>
                        </div>
                    </section>

                    {/* Bannière Finale */}
                    <div className="legal-final-banner">
                        <h3>Une Question ? Nous Sommes Là Pour Vous</h3>
                        <p>
                            Notre équipe support est disponible 6 jours sur 7 pour répondre à toutes vos questions.
                            N'hésitez pas à nous contacter par email, formulaire, ou chat en direct.
                        </p>
                        <a href="mailto:support@payvilus.com" className="cta-button">
                            Nous Envoyer un Email
                        </a>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    )
}