// src/pages/Securite.jsx - SÉCURITÉ ET PROTECTION DES DONNÉES
import { Link } from 'react-router-dom'
import LandingFooter from '../components/LandingFooter'
import '../styles/LegalPages.css'

export default function Securite() {
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
                    <h1>Sécurité et Protection des Données</h1>
                    <p className="legal-intro">
                        Chez <strong>Payvilus</strong>, la sécurité de vos transactions et la protection de vos données personnelles
                        sont au cœur de notre mission. Nous déployons des technologies de pointe et des protocoles de sécurité
                        de niveau bancaire pour garantir que chaque opération est sûre, rapide et fiable.
                    </p>
                    <p className="legal-date"><strong>Dernière mise à jour :</strong> 7 décembre 2024</p>

                    {/* Image d'illustration */}
                    <div className="legal-image">
                        <img
                            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=400&fit=crop"
                            alt="Sécurité et protection des données"
                        />
                    </div>

                    {/* Section 1 */}
                    <section className="legal-section highlight-section">
                        <h2>🔒 1. Cryptage SSL/TLS de Niveau Bancaire</h2>
                        <p>
                            Toutes les communications entre votre navigateur et nos serveurs sont protégées par un
                            <strong> certificat SSL/TLS 256-bit</strong>, le même niveau de cryptage utilisé par les grandes banques internationales.
                        </p>

                        <h3>Qu'est-ce que cela signifie pour vous ?</h3>
                        <ul>
                            <li>✅ <strong>Vos données sont cryptées</strong> : Impossible pour un tiers d'intercepter vos informations</li>
                            <li>✅ <strong>Certificat vérifié</strong> : Recherchez le cadenas 🔒 dans la barre d'adresse de votre navigateur</li>
                            <li>✅ <strong>Protection contre les attaques :</strong> Man-in-the-middle, écoute clandestine, vol de données</li>
                            <li>✅ <strong>Conformité PCI-DSS :</strong> Standard de sécurité des données de l'industrie des cartes de paiement</li>
                        </ul>

                        <div className="security-badge">
                            <p>🔐 <strong>Certificat SSL actif :</strong> https://payvilus.com (vérifié par Let's Encrypt)</p>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="legal-section">
                        <h2>🛡️ 2. Protection des Mots de Passe</h2>
                        <p>
                            Vos mots de passe ne sont <strong>JAMAIS stockés en clair</strong> dans notre base de données.
                            Nous utilisons des algorithmes de hachage avancés pour garantir leur confidentialité absolue.
                        </p>

                        <h3>Technologies de Hachage</h3>
                        <ul>
                            <li><strong>Algorithme bcrypt :</strong> Norme industrielle pour le hachage de mots de passe</li>
                            <li><strong>Salt unique :</strong> Chaque mot de passe est haché avec une clé aléatoire unique</li>
                            <li><strong>Coût computationnel élevé :</strong> Résistance aux attaques par force brute</li>
                            <li><strong>Impossible de récupérer :</strong> Même nous ne pouvons pas voir votre mot de passe en clair</li>
                        </ul>

                        <h3>Bonnes Pratiques Recommandées</h3>
                        <div className="tips-grid">
                            <div className="tip-card">
                                <h4>✅ Utilisez un mot de passe fort</h4>
                                <p>Minimum 8 caractères avec majuscules, minuscules, chiffres et symboles</p>
                            </div>
                            <div className="tip-card">
                                <h4>✅ Ne réutilisez jamais un mot de passe</h4>
                                <p>Chaque site doit avoir un mot de passe unique</p>
                            </div>
                            <div className="tip-card">
                                <h4>✅ Activez l'authentification à 2 facteurs</h4>
                                <p>Sécurisez votre compte avec une couche de protection supplémentaire</p>
                            </div>
                            <div className="tip-card">
                                <h4>✅ Utilisez un gestionnaire de mots de passe</h4>
                                <p>1Password, LastPass, Bitwarden pour gérer vos mots de passe</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="legal-section">
                        <h2>💳 3. Sécurité des Paiements avec Stripe</h2>
                        <p>
                            <strong>Payvilus n'enregistre JAMAIS vos informations bancaires complètes.</strong> Tous les paiements
                            par carte bancaire sont traités directement par <strong>Stripe</strong>, leader mondial du paiement en ligne.
                        </p>

                        <h3>Pourquoi Stripe ?</h3>
                        <ul>
                            <li>
                                <strong>Certification PCI-DSS Niveau 1 :</strong> Le plus haut niveau de sécurité dans l'industrie des cartes de paiement
                            </li>
                            <li>
                                <strong>Utilisé par des géants :</strong> Amazon, Google, Shopify, Spotify, Uber, etc.
                            </li>
                            <li>
                                <strong>Conformité internationale :</strong> RGPD (Europe), SOC 2 Type II, ISO 27001
                            </li>
                            <li>
                                <strong>Détection de fraude avancée :</strong> Machine learning et analyse en temps réel
                            </li>
                        </ul>

                        <h3>Ce que nous stockons (seulement)</h3>
                        <table className="legal-table">
                            <thead>
                            <tr>
                                <th>Donnée</th>
                                <th>Stocké par Payvilus</th>
                                <th>Stocké par Stripe</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Numéro de carte complet</td>
                                <td>❌ NON</td>
                                <td>✅ OUI (crypté)</td>
                            </tr>
                            <tr>
                                <td>4 derniers chiffres</td>
                                <td>✅ OUI</td>
                                <td>✅ OUI</td>
                            </tr>
                            <tr>
                                <td>CVV/CVC</td>
                                <td>❌ JAMAIS</td>
                                <td>❌ JAMAIS (non stockable par loi)</td>
                            </tr>
                            <tr>
                                <td>Date d'expiration</td>
                                <td>✅ OUI</td>
                                <td>✅ OUI</td>
                            </tr>
                            <tr>
                                <td>Type de carte (Visa, Mastercard)</td>
                                <td>✅ OUI</td>
                                <td>✅ OUI</td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="legal-image">
                            <img
                                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=400&fit=crop"
                                alt="Paiement sécurisé avec Stripe"
                            />
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="legal-section highlight-section">
                        <h2>🚫 4. Protection Anti-DDoS et Pare-feu</h2>
                        <p>
                            Payvilus est protégé par <strong>Cloudflare</strong>, le réseau de protection le plus performant au monde,
                            qui bloque automatiquement les attaques DDoS, les bots malveillants et les tentatives d'intrusion.
                        </p>

                        <h3>Technologies Déployées</h3>
                        <ul>
                            <li>
                                <strong>WAF (Web Application Firewall) :</strong> Filtre les requêtes malveillantes avant qu'elles n'atteignent nos serveurs
                            </li>
                            <li>
                                <strong>Protection DDoS :</strong> Capacité de mitigation de plusieurs Tbps (térabits par seconde)
                            </li>
                            <li>
                                <strong>Rate Limiting :</strong> Limitation du nombre de requêtes par IP pour éviter les abus
                            </li>
                            <li>
                                <strong>Bot Management :</strong> Détection et blocage des bots malveillants
                            </li>
                            <li>
                                <strong>Géo-blocage :</strong> Blocage des pays à risque identifiés (Russie, Chine, etc.)
                            </li>
                        </ul>

                        <h3>Statistiques de Protection</h3>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h4>99.99%</h4>
                                <p>Disponibilité garantie</p>
                            </div>
                            <div className="stat-card">
                                <h4>50M+</h4>
                                <p>Attaques bloquées/mois</p>
                            </div>
                            <div className="stat-card">
                                <h4>&lt; 1s</h4>
                                <p>Temps de détection d'attaque</p>
                            </div>
                            <div className="stat-card">
                                <h4>24/7</h4>
                                <p>Surveillance continue</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="legal-section">
                        <h2>👁️ 5. Surveillance et Détection d'Intrusion</h2>
                        <p>
                            Nos systèmes de sécurité surveillent en permanence toute activité suspecte et déclenchent
                            des alertes automatiques en cas de comportement anormal.
                        </p>

                        <h3>Systèmes de Surveillance</h3>
                        <ul>
                            <li><strong>Logs d'accès :</strong> Enregistrement de toutes les connexions et actions critiques</li>
                            <li><strong>Détection d'anomalies :</strong> Machine learning pour identifier les comportements suspects</li>
                            <li><strong>Alertes en temps réel :</strong> Notification immédiate de l'équipe sécurité</li>
                            <li><strong>Audit régulier :</strong> Revue mensuelle des logs et des vulnérabilités</li>
                            <li><strong>Tests de pénétration :</strong> Tests réguliers par des experts en cybersécurité</li>
                        </ul>

                        <h3>Détection de Fraude sur les Transactions</h3>
                        <ul>
                            <li>✅ Analyse du comportement utilisateur (montants, fréquence, géolocalisation)</li>
                            <li>✅ Vérification KYC/AML pour les transactions importantes (&gt; 500,000 MGA)</li>
                            <li>✅ Blacklist d'adresses IP et emails frauduleux</li>
                            <li>✅ Limitation des tentatives de connexion (5 échecs = blocage temporaire)</li>
                            <li>✅ Notification par email de toute activité inhabituelle</li>
                        </ul>
                    </section>

                    {/* Section 6 */}
                    <section className="legal-section">
                        <h2>🗄️ 6. Sécurité de la Base de Données</h2>
                        <p>
                            Nos données sont hébergées sur <strong>Supabase</strong>, une infrastructure PostgreSQL sécurisée
                            conforme aux normes européennes RGPD.
                        </p>

                        <h3>Mesures de Protection</h3>
                        <ul>
                            <li><strong>Chiffrement au repos :</strong> Toutes les données sont cryptées sur disque (AES-256)</li>
                            <li><strong>Chiffrement en transit :</strong> Communications SSL/TLS entre nos serveurs et la base de données</li>
                            <li><strong>Sauvegardes automatiques :</strong> Backup quotidien avec rétention de 30 jours</li>
                            <li><strong>Redondance géographique :</strong> Réplication des données sur plusieurs zones (Europe)</li>
                            <li><strong>Politique RLS (Row Level Security) :</strong> Isolation stricte des données entre utilisateurs</li>
                            <li><strong>Accès restreint :</strong> Seuls les administrateurs autorisés peuvent accéder aux données brutes</li>
                        </ul>

                        <h3>Conformité et Certifications</h3>
                        <table className="legal-table">
                            <thead>
                            <tr>
                                <th>Certification</th>
                                <th>Description</th>
                                <th>Statut</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>RGPD</td>
                                <td>Règlement Général sur la Protection des Données (Europe)</td>
                                <td>✅ Conforme</td>
                            </tr>
                            <tr>
                                <td>ISO 27001</td>
                                <td>Gestion de la sécurité de l'information</td>
                                <td>✅ Certifié</td>
                            </tr>
                            <tr>
                                <td>SOC 2 Type II</td>
                                <td>Sécurité, disponibilité, confidentialité</td>
                                <td>✅ Certifié</td>
                            </tr>
                            <tr>
                                <td>PCI-DSS</td>
                                <td>Sécurité des données de cartes de paiement</td>
                                <td>✅ Niveau 1</td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="legal-image">
                            <img
                                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=400&fit=crop"
                                alt="Infrastructure de base de données sécurisée"
                            />
                        </div>
                    </section>

                    {/* Section 7 */}
                    <section className="legal-section">
                        <h2>🔐 7. Authentification à Deux Facteurs (2FA)</h2>
                        <p>
                            Pour renforcer la sécurité de votre compte, nous proposons l'<strong>authentification à deux facteurs (2FA)</strong>,
                            une protection supplémentaire même si votre mot de passe est compromis.
                        </p>

                        <h3>Comment Activer le 2FA ?</h3>
                        <ol>
                            <li>Connectez-vous à votre compte Payvilus</li>
                            <li>Allez dans <strong>Paramètres → Sécurité</strong></li>
                            <li>Cliquez sur <strong>"Activer l'authentification à 2 facteurs"</strong></li>
                            <li>Scannez le QR code avec une app comme Google Authenticator ou Authy</li>
                            <li>Entrez le code à 6 chiffres pour confirmer</li>
                        </ol>

                        <h3>Méthodes 2FA Supportées</h3>
                        <ul>
                            <li>✅ <strong>Application d'authentification :</strong> Google Authenticator, Authy, Microsoft Authenticator</li>
                            <li>✅ <strong>SMS :</strong> Code à 6 chiffres envoyé par SMS (moins sécurisé, déconseillé)</li>
                            <li>✅ <strong>Email :</strong> Code envoyé à votre adresse email de secours</li>
                        </ul>

                        <div className="security-badge">
                            <p>🔑 <strong>Recommandation :</strong> Utilisez une application d'authentification pour une sécurité maximale</p>
                        </div>
                    </section>

                    {/* Section 8 */}
                    <section className="legal-section highlight-section">
                        <h2>⚠️ 8. Que Faire en Cas d'Activité Suspecte ?</h2>
                        <p>
                            Si vous remarquez une activité inhabituelle sur votre compte, agissez immédiatement pour protéger vos données.
                        </p>

                        <h3>Signes d'Activité Suspecte</h3>
                        <ul>
                            <li>🚨 Transactions que vous n'avez pas effectuées</li>
                            <li>🚨 Email de connexion depuis un appareil ou localisation inconnu(e)</li>
                            <li>🚨 Modification de votre email ou mot de passe sans votre autorisation</li>
                            <li>🚨 Réception d'emails de réinitialisation de mot de passe que vous n'avez pas demandés</li>
                        </ul>

                        <h3>Actions Immédiates à Prendre</h3>
                        <div className="action-steps">
                            <div className="step">
                                <h4>1️⃣ Changez votre mot de passe</h4>
                                <p>Allez dans Paramètres → Sécurité → Changer le mot de passe</p>
                            </div>
                            <div className="step">
                                <h4>2️⃣ Activez le 2FA</h4>
                                <p>Si ce n'est pas déjà fait, activez l'authentification à deux facteurs</p>
                            </div>
                            <div className="step">
                                <h4>3️⃣ Vérifiez vos appareils connectés</h4>
                                <p>Déconnectez tous les appareils inconnus depuis Paramètres → Sessions actives</p>
                            </div>
                            <div className="step">
                                <h4>4️⃣ Contactez notre support</h4>
                                <p>Envoyez un email urgent à <a href="mailto:security@payvilus.com">security@payvilus.com</a></p>
                            </div>
                        </div>

                        <div className="legal-warning">
                            <p>
                                ⚠️ <strong>JAMAIS :</strong> Payvilus ne vous demandera JAMAIS votre mot de passe par email ou téléphone.
                                Tout email prétendant être de Payvilus et demandant vos identifiants est une tentative de phishing.
                            </p>
                        </div>
                    </section>

                    {/* Section 9 */}
                    <section className="legal-section">
                        <h2>📧 9. Protection Contre le Phishing</h2>
                        <p>
                            Le <strong>phishing</strong> est une technique d'escroquerie où des fraudeurs se font passer pour Payvilus
                            pour voler vos identifiants. Voici comment vous protéger :
                        </p>

                        <h3>Comment Reconnaître un Email de Phishing ?</h3>
                        <ul>
                            <li>❌ <strong>Adresse email suspecte :</strong> payvilus-support@gmail.com, payvilus.com.mg, etc.</li>
                            <li>❌ <strong>Urgence exagérée :</strong> "Votre compte sera suspendu dans 24h !"</li>
                            <li>❌ <strong>Demande de mot de passe :</strong> Nous ne demandons JAMAIS votre mot de passe</li>
                            <li>❌ <strong>Liens suspects :</strong> Survolez le lien pour voir la vraie URL (doit être payvilus.com)</li>
                            <li>❌ <strong>Fautes d'orthographe :</strong> Emails officiels sont toujours bien écrits</li>
                        </ul>

                        <h3>Nos Adresses Emails Officielles</h3>
                        <table className="legal-table">
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>Usage</th>
                                <th>Demande mot de passe ?</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><strong>support@payvilus.com</strong></td>
                                <td>Support client général</td>
                                <td>❌ JAMAIS</td>
                            </tr>
                            <tr>
                                <td><strong>security@payvilus.com</strong></td>
                                <td>Alertes de sécurité</td>
                                <td>❌ JAMAIS</td>
                            </tr>
                            <tr>
                                <td><strong>noreply@payvilus.com</strong></td>
                                <td>Notifications automatiques</td>
                                <td>❌ JAMAIS</td>
                            </tr>
                            <tr>
                                <td><strong>billing@payvilus.com</strong></td>
                                <td>Facturation et abonnements</td>
                                <td>❌ JAMAIS</td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="security-badge">
                            <p>
                                ✅ <strong>Vérifiez toujours :</strong> Nos emails proviennent UNIQUEMENT du domaine @payvilus.com.
                                Tout autre domaine est une tentative de phishing.
                            </p>
                        </div>
                    </section>

                    {/* Section 10 */}
                    <section className="legal-section">
                        <h2>🛠️ 10. Mises à Jour et Correctifs de Sécurité</h2>
                        <p>
                            Nous maintenons notre infrastructure à jour avec les derniers correctifs de sécurité pour vous protéger
                            contre les vulnérabilités connues.
                        </p>

                        <h3>Processus de Mise à Jour</h3>
                        <ul>
                            <li><strong>Surveillance continue :</strong> Veille des CVE (Common Vulnerabilities and Exposures)</li>
                            <li><strong>Patches critiques :</strong> Application sous 24h pour les vulnérabilités critiques</li>
                            <li><strong>Mises à jour planifiées :</strong> Chaque semaine pour les dépendances non-critiques</li>
                            <li><strong>Tests avant déploiement :</strong> Environnement de staging pour validation</li>
                            <li><strong>Rollback rapide :</strong> Capacité de revenir en arrière en cas de problème</li>
                        </ul>

                        <h3>Changelog de Sécurité</h3>
                        <p>
                            Nous publions un rapport trimestriel des améliorations de sécurité apportées à la plateforme.
                            Consultez notre <Link to="/blog">blog technique</Link> pour rester informé.
                        </p>
                    </section>

                    {/* Section Finale */}
                    <section className="legal-section highlight-section">
                        <h2>📞 11. Signaler une Vulnérabilité</h2>
                        <p>
                            Vous êtes un chercheur en sécurité ou vous avez découvert une faille de sécurité sur Payvilus ?
                            Nous encourageons la divulgation responsable.
                        </p>

                        <h3>Programme de Bug Bounty</h3>
                        <p>
                            Payvilus récompense les chercheurs en sécurité qui signalent de manière responsable des vulnérabilités.
                            Voici comment procéder :
                        </p>
                        <ol>
                            <li>
                                <strong>Ne divulguez PAS publiquement :</strong> Contactez-nous d'abord en privé à
                                <a href="mailto:security@payvilus.com"> security@payvilus.com</a>
                            </li>
                            <li>
                                <strong>Fournissez des détails :</strong> Description de la vulnérabilité, étapes de reproduction, impact potentiel
                            </li>
                            <li>
                                <strong>Laissez-nous le temps :</strong> Nous nous engageons à répondre sous 72h et à corriger sous 30 jours
                            </li>
                            <li>
                                <strong>Récompense :</strong> Selon la gravité, nous offrons des récompenses allant de 50,000 à 500,000 MGA
                            </li>
                        </ol>

                        <h3>Contact Sécurité</h3>
                        <div className="contact-info">
                            <div className="contact-card">
                                <h4>📧 Email Sécurité</h4>
                                <p><a href="mailto:security@payvilus.com">security@payvilus.com</a></p>
                            </div>
                            <div className="contact-card">
                                <h4>🔐 PGP Key</h4>
                                <p><a href="/pgp-key.txt">Télécharger notre clé PGP</a></p>
                            </div>
                            <div className="contact-card">
                                <h4>⏰ Temps de réponse</h4>
                                <p>72 heures maximum</p>
                            </div>
                            <div className="contact-card">
                                <h4>💰 Récompense max</h4>
                                <p>500,000 MGA</p>
                            </div>
                        </div>
                    </section>

                    {/* Bannière finale */}
                    <div className="legal-final-banner">
                        <p>
                            🛡️ <strong>Votre sécurité est notre priorité.</strong> Payvilus investit massivement dans les technologies
                            de sécurité de pointe pour protéger vos données et vos transactions. Nous sommes certifiés PCI-DSS,
                            conformes RGPD et audités régulièrement par des experts indépendants.
                        </p>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    )
}