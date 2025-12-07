// src/pages/Confidentialite.jsx - POLITIQUE DE CONFIDENTIALITÉ
import { Link } from 'react-router-dom'
import LandingFooter from '../components/LandingFooter'
import '../styles/LegalPages.css'

export default function Confidentialite() {
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
                    <h1>Politique de Confidentialité</h1>
                    <p className="legal-intro">
                        Chez <strong>Payvilus</strong>, la protection de vos données personnelles est notre priorité absolue.
                        Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons
                        vos informations lorsque vous utilisez notre plateforme.
                    </p>
                    <p className="legal-date"><strong>Dernière mise à jour :</strong> 7 décembre 2024</p>

                    {/* Image d'illustration */}
                    <div className="legal-image">
                        <img
                            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=400&fit=crop"
                            alt="Protection des données et confidentialité"
                        />
                    </div>

                    {/* Article 1 */}
                    <section className="legal-section">
                        <h2>1. Responsable du Traitement des Données</h2>
                        <p>
                            Le responsable du traitement de vos données personnelles est <strong>Waviloid Studio</strong>,
                            éditeur de la plateforme Payvilus, située à <strong>Antananarivo, Madagascar</strong>.
                        </p>
                        <ul>
                            <li><strong>Nom commercial :</strong> Payvilus</li>
                            <li><strong>Email :</strong> <a href="mailto:support@payvilus.com">support@payvilus.com</a></li>
                            <li><strong>Site web :</strong> <a href="https://payvilus.com">https://payvilus.com</a></li>
                        </ul>
                    </section>

                    {/* Article 2 */}
                    <section className="legal-section">
                        <h2>2. Données Personnelles Collectées</h2>
                        <p>
                            Nous collectons différentes catégories de données personnelles selon votre utilisation de nos services :
                        </p>

                        <h3>2.1. Données d'Inscription</h3>
                        <ul>
                            <li>Nom et prénom</li>
                            <li>Adresse email</li>
                            <li>Mot de passe (crypté)</li>
                            <li>Date de création du compte</li>
                        </ul>

                        <h3>2.2. Données de Transaction</h3>
                        <ul>
                            <li>Numéros de téléphone Mobile Money (Mvola, Orange Money, Airtel Money)</li>
                            <li>Identifiants de transaction PayPal</li>
                            <li>Montants des transactions</li>
                            <li>Dates et heures des opérations</li>
                            <li>Statut des transactions</li>
                        </ul>

                        <h3>2.3. Données de Paiement (via Stripe)</h3>
                        <p>
                            <strong>Important :</strong> Payvilus n'enregistre JAMAIS vos informations bancaires complètes.
                            Tous les paiements par carte bancaire sont traités de manière sécurisée par <strong>Stripe</strong>,
                            certifié PCI-DSS niveau 1 (le plus haut niveau de sécurité bancaire).
                        </p>
                        <ul>
                            <li>4 derniers chiffres de votre carte (pour identification)</li>
                            <li>Type de carte (Visa, Mastercard, etc.)</li>
                            <li>Date d'expiration</li>
                        </ul>

                        <h3>2.4. Données de Navigation</h3>
                        <ul>
                            <li>Adresse IP</li>
                            <li>Type de navigateur et système d'exploitation</li>
                            <li>Pages visitées et durée de visite</li>
                            <li>Référent (site d'où vous venez)</li>
                            <li>Cookies et technologies similaires</li>
                        </ul>
                    </section>

                    {/* Article 3 - GOOGLE ADSENSE */}
                    <section className="legal-section highlight-section">
                        <h2>3. Utilisation de Google AdSense et Services Tiers</h2>
                        <p>
                            <strong>Payvilus utilise Google AdSense</strong> pour afficher des publicités personnalisées sur notre site.
                            Voici comment cela fonctionne :
                        </p>

                        <h3>3.1. Qu'est-ce que Google AdSense ?</h3>
                        <p>
                            Google AdSense est un service publicitaire de <strong>Google LLC</strong> qui nous permet de monétiser
                            notre contenu en affichant des annonces pertinentes pour vous. Google utilise des cookies et d'autres
                            technologies de suivi pour :
                        </p>
                        <ul>
                            <li>Afficher des publicités adaptées à vos intérêts</li>
                            <li>Mesurer l'efficacité des campagnes publicitaires</li>
                            <li>Limiter le nombre de fois où vous voyez une même annonce</li>
                        </ul>

                        <h3>3.2. Cookies Publicitaires</h3>
                        <p>
                            Google et ses partenaires publicitaires utilisent des cookies pour :
                        </p>
                        <ul>
                            <li><strong>Ciblage publicitaire :</strong> Afficher des annonces basées sur vos visites antérieures sur notre site et d'autres sites web</li>
                            <li><strong>Remarketing :</strong> Vous montrer des publicités pertinentes lorsque vous naviguez sur d'autres sites</li>
                            <li><strong>Mesure d'audience :</strong> Comprendre comment vous interagissez avec les publicités</li>
                        </ul>

                        <h3>3.3. Vos Choix et Contrôles</h3>
                        <p>Vous pouvez contrôler et limiter l'utilisation de vos données par Google AdSense :</p>
                        <ul>
                            <li>
                                <strong>Gérer vos préférences publicitaires :</strong>
                                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"> Paramètres des annonces Google</a>
                            </li>
                            <li>
                                <strong>Désactiver la personnalisation des annonces :</strong>
                                <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer"> NAI Opt-Out</a>
                            </li>
                            <li>
                                <strong>Bloquer les cookies tiers :</strong> Configurez votre navigateur pour refuser les cookies tiers
                            </li>
                        </ul>

                        <h3>3.4. Autres Services Tiers Utilisés</h3>
                        <ul>
                            <li><strong>Google Analytics :</strong> Analyse de trafic et comportement utilisateur</li>
                            <li><strong>Google Tag Manager :</strong> Gestion des balises marketing</li>
                            <li><strong>Stripe :</strong> Traitement sécurisé des paiements</li>
                            <li><strong>Supabase :</strong> Hébergement et gestion de base de données</li>
                            <li><strong>Cloudflare :</strong> Protection DDoS et CDN</li>
                        </ul>

                        <div className="legal-image">
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop"
                                alt="Analytics et suivi des données"
                            />
                        </div>
                    </section>

                    {/* Article 4 */}
                    <section className="legal-section">
                        <h2>4. Finalités du Traitement des Données</h2>
                        <p>Nous utilisons vos données personnelles pour :</p>
                        <ul>
                            <li><strong>Fournir nos services :</strong> Traiter vos transactions PayPal ↔ Mobile Money</li>
                            <li><strong>Gérer votre compte :</strong> Authentification, gestion de profil, plans d'abonnement</li>
                            <li><strong>Traiter les paiements :</strong> Facturation, abonnements, historique des transactions</li>
                            <li><strong>Améliorer nos services :</strong> Analyse d'utilisation, détection de bugs, optimisation</li>
                            <li><strong>Communiquer avec vous :</strong> Notifications de transaction, support client, newsletters (optionnel)</li>
                            <li><strong>Sécurité et prévention de la fraude :</strong> Détection d'activités suspectes, conformité AML/KYC</li>
                            <li><strong>Conformité légale :</strong> Respect des obligations légales et fiscales malgaches</li>
                            <li><strong>Publicité personnalisée :</strong> Via Google AdSense (voir Article 3)</li>
                        </ul>
                    </section>

                    {/* Article 5 */}
                    <section className="legal-section">
                        <h2>5. Base Légale du Traitement (RGPD)</h2>
                        <p>Conformément au Règlement Général sur la Protection des Données (RGPD), nous traitons vos données sur les bases suivantes :</p>
                        <ul>
                            <li><strong>Exécution d'un contrat :</strong> Traitement de vos transactions (Art. 6.1.b RGPD)</li>
                            <li><strong>Consentement :</strong> Cookies publicitaires et newsletters (Art. 6.1.a RGPD)</li>
                            <li><strong>Obligation légale :</strong> Conservation des données de transaction pour conformité fiscale (Art. 6.1.c RGPD)</li>
                            <li><strong>Intérêt légitime :</strong> Sécurité, prévention de la fraude, amélioration des services (Art. 6.1.f RGPD)</li>
                        </ul>
                    </section>

                    {/* Article 6 */}
                    <section className="legal-section">
                        <h2>6. Partage de Vos Données</h2>
                        <p><strong>Payvilus ne vend JAMAIS vos données personnelles à des tiers.</strong> Nous partageons vos données uniquement dans les cas suivants :</p>

                        <h3>6.1. Partenaires Techniques Essentiels</h3>
                        <ul>
                            <li><strong>Stripe :</strong> Traitement sécurisé des paiements par carte bancaire</li>
                            <li><strong>Supabase :</strong> Hébergement sécurisé de notre base de données (serveurs conformes RGPD)</li>
                            <li><strong>Cloudflare :</strong> Protection DDoS et accélération du site</li>
                        </ul>

                        <h3>6.2. Services Marketing et Analytiques</h3>
                        <ul>
                            <li><strong>Google AdSense :</strong> Affichage de publicités personnalisées</li>
                            <li><strong>Google Analytics :</strong> Analyse de trafic anonymisée</li>
                        </ul>

                        <h3>6.3. Obligations Légales</h3>
                        <p>Nous pouvons divulguer vos données si la loi l'exige (ordonnance judiciaire, autorités fiscales, lutte contre la fraude).</p>
                    </section>

                    {/* Article 7 */}
                    <section className="legal-section">
                        <h2>7. Durée de Conservation des Données</h2>
                        <table className="legal-table">
                            <thead>
                            <tr>
                                <th>Type de Données</th>
                                <th>Durée de Conservation</th>
                                <th>Raison</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Données de compte</td>
                                <td>Tant que votre compte est actif</td>
                                <td>Fournir le service</td>
                            </tr>
                            <tr>
                                <td>Données après suppression compte</td>
                                <td>3 ans</td>
                                <td>Obligations légales et fiscales</td>
                            </tr>
                            <tr>
                                <td>Historique des transactions</td>
                                <td>10 ans</td>
                                <td>Conformité comptable malgache</td>
                            </tr>
                            <tr>
                                <td>Logs de sécurité</td>
                                <td>1 an</td>
                                <td>Détection de fraude</td>
                            </tr>
                            <tr>
                                <td>Cookies publicitaires</td>
                                <td>13 mois maximum</td>
                                <td>Directive ePrivacy</td>
                            </tr>
                            </tbody>
                        </table>
                    </section>

                    {/* Article 8 - VOS DROITS */}
                    <section className="legal-section highlight-section">
                        <h2>8. Vos Droits sur Vos Données Personnelles</h2>
                        <p>Conformément au RGPD et à la loi malgache, vous disposez des droits suivants :</p>

                        <div className="rights-grid">
                            <div className="right-card">
                                <h4>✅ Droit d'Accès</h4>
                                <p>Obtenir une copie de toutes vos données personnelles que nous détenons</p>
                            </div>
                            <div className="right-card">
                                <h4>✏️ Droit de Rectification</h4>
                                <p>Corriger vos données inexactes ou incomplètes</p>
                            </div>
                            <div className="right-card">
                                <h4>🗑️ Droit à l'Effacement</h4>
                                <p>Demander la suppression de vos données (sauf obligations légales)</p>
                            </div>
                            <div className="right-card">
                                <h4>📦 Droit à la Portabilité</h4>
                                <p>Recevoir vos données dans un format structuré et lisible</p>
                            </div>
                            <div className="right-card">
                                <h4>🚫 Droit d'Opposition</h4>
                                <p>Vous opposer au traitement de vos données (marketing, publicité)</p>
                            </div>
                            <div className="right-card">
                                <h4>⏸️ Droit à la Limitation</h4>
                                <p>Restreindre temporairement le traitement de vos données</p>
                            </div>
                        </div>

                        <h3>Comment Exercer Vos Droits ?</h3>
                        <p>Pour exercer l'un de ces droits, contactez-nous :</p>
                        <ul>
                            <li><strong>Email :</strong> <a href="mailto:support@payvilus.com">support@payvilus.com</a></li>
                            <li><strong>Objet :</strong> "Demande RGPD - [Votre Droit]"</li>
                            <li><strong>Délai de réponse :</strong> Maximum 30 jours</li>
                        </ul>
                        <p>Nous pourrons vous demander une pièce d'identité pour vérifier votre identité avant de traiter votre demande.</p>
                    </section>

                    {/* Article 9 */}
                    <section className="legal-section">
                        <h2>9. Sécurité de Vos Données</h2>
                        <p>Nous mettons en œuvre des mesures techniques et organisationnelles avancées pour protéger vos données :</p>

                        <h3>9.1. Mesures Techniques</h3>
                        <ul>
                            <li><strong>Cryptage SSL/TLS :</strong> Toutes les communications sont cryptées avec un certificat SSL 256-bit</li>
                            <li><strong>Hachage des mots de passe :</strong> Algorithme bcrypt avec salt (impossible de récupérer votre mot de passe en clair)</li>
                            <li><strong>Protection DDoS :</strong> Pare-feu Cloudflare et détection d'attaques</li>
                            <li><strong>Authentification à deux facteurs :</strong> Disponible pour sécuriser votre compte</li>
                            <li><strong>Surveillance 24/7 :</strong> Logs de sécurité et détection d'intrusion</li>
                        </ul>

                        <h3>9.2. Mesures Organisationnelles</h3>
                        <ul>
                            <li>Accès aux données limité aux employés autorisés uniquement</li>
                            <li>Formation du personnel sur la protection des données</li>
                            <li>Audits de sécurité réguliers</li>
                            <li>Politique de mots de passe stricts</li>
                        </ul>

                        <div className="legal-image">
                            <img
                                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=400&fit=crop"
                                alt="Sécurité et cryptage des données"
                            />
                        </div>
                    </section>

                    {/* Article 10 */}
                    <section className="legal-section">
                        <h2>10. Cookies et Technologies de Suivi</h2>
                        <p>Payvilus utilise des cookies pour améliorer votre expérience et fournir nos services :</p>

                        <h3>10.1. Types de Cookies Utilisés</h3>
                        <table className="legal-table">
                            <thead>
                            <tr>
                                <th>Type</th>
                                <th>Finalité</th>
                                <th>Durée</th>
                                <th>Consentement</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><strong>Cookies Essentiels</strong></td>
                                <td>Authentification, sécurité, panier</td>
                                <td>Session</td>
                                <td>❌ Non requis</td>
                            </tr>
                            <tr>
                                <td><strong>Cookies Analytiques</strong></td>
                                <td>Google Analytics, statistiques de visite</td>
                                <td>13 mois</td>
                                <td>✅ Requis</td>
                            </tr>
                            <tr>
                                <td><strong>Cookies Publicitaires</strong></td>
                                <td>Google AdSense, publicités personnalisées</td>
                                <td>13 mois</td>
                                <td>✅ Requis</td>
                            </tr>
                            <tr>
                                <td><strong>Cookies de Performance</strong></td>
                                <td>Optimisation du site, tests A/B</td>
                                <td>6 mois</td>
                                <td>✅ Requis</td>
                            </tr>
                            </tbody>
                        </table>

                        <h3>10.2. Gérer Vos Cookies</h3>
                        <p>Vous pouvez gérer vos préférences de cookies à tout moment :</p>
                        <ul>
                            <li><strong>Paramètres du navigateur :</strong> Bloquez ou supprimez les cookies depuis votre navigateur</li>
                            <li><strong>Opt-out Google :</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Extension Google Analytics Opt-out</a></li>
                            <li><strong>Do Not Track (DNT) :</strong> Nous respectons le signal DNT de votre navigateur</li>
                        </ul>

                        <p className="legal-warning">
                            ⚠️ <strong>Attention :</strong> Désactiver certains cookies peut limiter votre expérience sur Payvilus
                            (par exemple, impossibilité de rester connecté).
                        </p>
                    </section>

                    {/* Article 11 */}
                    <section className="legal-section">
                        <h2>11. Transferts Internationaux de Données</h2>
                        <p>
                            Certaines de nos données sont hébergées en dehors de Madagascar, notamment sur des serveurs
                            situés dans l'Union Européenne et aux États-Unis :
                        </p>
                        <ul>
                            <li><strong>Supabase :</strong> Serveurs en Europe (conformes RGPD)</li>
                            <li><strong>Google (AdSense, Analytics) :</strong> Transfert vers les USA avec clauses contractuelles types</li>
                            <li><strong>Stripe :</strong> Données de paiement traitées aux USA (certification PCI-DSS)</li>
                        </ul>
                        <p>
                            Nous nous assurons que tous nos sous-traitants offrent un niveau de protection adéquat,
                            conformément au RGPD (clauses contractuelles types, Privacy Shield, etc.).
                        </p>
                    </section>

                    {/* Article 12 */}
                    <section className="legal-section">
                        <h2>12. Mineurs</h2>
                        <p>
                            Payvilus est destiné aux personnes âgées de <strong>18 ans et plus</strong>. Nous ne collectons
                            pas sciemment de données personnelles auprès de mineurs. Si vous êtes un parent et que vous découvrez
                            que votre enfant nous a fourni des données, contactez-nous immédiatement à
                            <a href="mailto:support@payvilus.com"> support@payvilus.com</a> pour que nous puissions supprimer ces informations.
                        </p>
                    </section>

                    {/* Article 13 */}
                    <section className="legal-section">
                        <h2>13. Modifications de Cette Politique</h2>
                        <p>
                            Nous pouvons mettre à jour cette politique de confidentialité de temps en temps pour refléter
                            les changements dans nos pratiques ou dans la législation. Nous vous informerons de toute
                            modification substantielle par :
                        </p>
                        <ul>
                            <li>Email à l'adresse enregistrée sur votre compte</li>
                            <li>Notification sur notre site web</li>
                            <li>Mise à jour de la date "Dernière mise à jour" en haut de cette page</li>
                        </ul>
                        <p>
                            Nous vous encourageons à consulter régulièrement cette page pour rester informé sur la façon
                            dont nous protégeons vos données.
                        </p>
                    </section>

                    {/* Article 14 - CONTACT */}
                    <section className="legal-section highlight-section">
                        <h2>14. Nous Contacter</h2>
                        <p>
                            Pour toute question concernant cette politique de confidentialité, l'utilisation de vos données,
                            ou pour exercer vos droits, contactez-nous :
                        </p>

                        <div className="contact-info">
                            <div className="contact-card">
                                <h4>📧 Email</h4>
                                <p><a href="mailto:support@payvilus.com">support@payvilus.com</a></p>
                            </div>
                            <div className="contact-card">
                                <h4>🏢 Adresse</h4>
                                <p>Waviloid Studio<br/>Antananarivo, Madagascar</p>
                            </div>
                            <div className="contact-card">
                                <h4>🌐 Site Web</h4>
                                <p><a href="https://payvilus.com">https://payvilus.com</a></p>
                            </div>
                            <div className="contact-card">
                                <h4>⏰ Horaires Support</h4>
                                <p>Lun-Ven : 8h-18h GMT+3</p>
                            </div>
                        </div>

                        <p className="legal-footer-text">
                            <strong>Délégué à la Protection des Données (DPO) :</strong> Pour les demandes RGPD spécifiques,
                            écrivez à <a href="mailto:dpo@payvilus.com">dpo@payvilus.com</a>
                        </p>
                    </section>

                    {/* Bannière finale */}
                    <div className="legal-final-banner">
                        <p>
                            ✅ <strong>Payvilus s'engage à respecter votre vie privée.</strong> Vos données sont protégées
                            par les normes les plus strictes (RGPD, PCI-DSS, SSL). Nous ne vendons jamais vos informations
                            personnelles à des tiers.
                        </p>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    )
}