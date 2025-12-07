// src/pages/services/TransactionsPaypal.jsx - SERVICE TRANSACTIONS PAYPAL
import { Link } from 'react-router-dom'
import LandingFooter from '../../components/LandingFooter'
import '../../styles/LegalPages.css'

export default function TransactionsPaypal() {
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
                    <h1>Transactions PayPal ↔ Mobile Money</h1>
                    <p className="legal-intro">
                        Chez <strong>Payvilus</strong>, nous résolvons le problème n°1 des freelancers et entrepreneurs malgaches :
                        <strong> accéder à leurs fonds PayPal facilement et rapidement</strong>. Dépôt ou retrait, nous transformons
                        vos dollars/euros en Ariary directement sur votre Mobile Money en quelques minutes.
                    </p>

                    {/* Image Hero */}
                    <div className="legal-image">
                        <img
                            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=400&fit=crop"
                            alt="Transactions PayPal Mobile Money Madagascar"
                        />
                    </div>

                    {/* Section 1 : Le Problème */}
                    <section className="legal-section highlight-section">
                        <h2>😰 Le Problème que Vous Rencontrez Actuellement</h2>
                        <p>
                            Si vous êtes freelancer, vendeur en ligne ou entrepreneur digital à Madagascar, vous connaissez certainement
                            ces difficultés avec PayPal :
                        </p>

                        <div className="problem-grid">
                            <div className="problem-card">
                                <h4>🏦 Impossible de retirer vers les banques malgaches</h4>
                                <p>
                                    PayPal ne supporte AUCUNE banque malgache (BNI, BFV, BOA, etc.). Vous ne pouvez pas transférer
                                    vos fonds vers votre compte bancaire local.
                                </p>
                            </div>
                            <div className="problem-card">
                                <h4>💳 Pas de carte bancaire internationale</h4>
                                <p>
                                    Pour utiliser PayPal, vous avez besoin d'une carte Visa/Mastercard internationale. Très difficile
                                    à obtenir à Madagascar (frais élevés, conditions strictes).
                                </p>
                            </div>
                            <div className="problem-card">
                                <h4>⏰ Délais interminables avec les intermédiaires</h4>
                                <p>
                                    Les solutions existantes prennent 3-7 jours, avec des frais cachés et des taux de change désavantageux.
                                    Certains intermédiaires ne sont même pas fiables.
                                </p>
                            </div>
                            <div className="problem-card">
                                <h4>💸 Commissions exorbitantes</h4>
                                <p>
                                    Les services de conversion PayPal prennent jusqu'à 20-30% de commission, sans compter les frais cachés.
                                    Vous perdez une partie importante de vos revenus.
                                </p>
                            </div>
                            <div className="problem-card">
                                <h4>📧 Manque de transparence</h4>
                                <p>
                                    Vous ne savez jamais combien vous allez recevoir réellement. Le taux de change change sans préavis,
                                    et vous découvrez les frais seulement après la transaction.
                                </p>
                            </div>
                            <div className="problem-card">
                                <h4>🚫 Comptes PayPal bloqués</h4>
                                <p>
                                    PayPal bloque fréquemment les comptes malgaches pour "activité suspecte", surtout si vous recevez
                                    des paiements réguliers de l'étranger.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 : Notre Solution */}
                    <section className="legal-section">
                        <h2>✅ La Solution Payvilus : Simple, Rapide, Transparent</h2>
                        <p>
                            Payvilus élimine tous ces problèmes en vous permettant de <strong>convertir vos fonds PayPal en Ariary</strong>
                            et de les recevoir directement sur votre <strong>Mobile Money</strong> (Mvola, Orange Money, Airtel Money).
                        </p>

                        <h3>Comment Ça Marche ?</h3>
                        <div className="steps-container">
                            <div className="step-item">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h4>Créez votre compte gratuit</h4>
                                    <p>Inscription en 2 minutes avec votre email. Aucune carte bancaire requise pour démarrer.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h4>Choisissez votre service</h4>
                                    <p><strong>Dépôt :</strong> PayPal → Mobile Money | <strong>Retrait :</strong> Mobile Money → PayPal</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h4>Indiquez le montant et votre numéro</h4>
                                    <p>Entrez le montant à convertir et votre numéro Mobile Money (Mvola, Orange Money, Airtel Money)</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number">4</div>
                                <div className="step-content">
                                    <h4>Recevez vos fonds en quelques minutes</h4>
                                    <p>5 à 120 minutes selon votre plan. Notification par email + SMS dès réception.</p>
                                </div>
                            </div>
                        </div>

                        <div className="legal-image">
                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop"
                                alt="Processus de transaction Payvilus"
                            />
                        </div>
                    </section>

                    {/* Section 3 : Dépôt PayPal → Mobile Money */}
                    <section className="legal-section">
                        <h2>💰 Dépôt : PayPal → Mobile Money</h2>
                        <p>
                            Vous avez reçu un paiement sur PayPal et vous voulez le convertir en Ariary sur votre Mobile Money ?
                            C'est notre service le plus populaire.
                        </p>

                        <h3>Étapes Détaillées</h3>
                        <ol>
                            <li>
                                <strong>Connectez-vous à votre compte Payvilus</strong>
                                <p>Allez sur votre dashboard et cliquez sur "Dépôt PayPal"</p>
                            </li>
                            <li>
                                <strong>Remplissez le formulaire de dépôt</strong>
                                <ul>
                                    <li>Montant en EUR ou USD (minimum 10 EUR/USD)</li>
                                    <li>Devise de départ (EUR ou USD)</li>
                                    <li>Opérateur Mobile Money (Mvola, Orange Money, Airtel Money)</li>
                                    <li>Votre numéro Mobile Money (034 XX XXX XX)</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Envoyez vos fonds PayPal</strong>
                                <p>
                                    Transférez le montant exact vers notre compte PayPal professionnel :
                                    <strong> payments@payvilus.com</strong>. Notez bien l'ID de transaction PayPal.
                                </p>
                            </li>
                            <li>
                                <strong>Confirmez la transaction</strong>
                                <p>
                                    Collez votre ID de transaction PayPal dans le formulaire Payvilus et validez.
                                    Notre système vérifie automatiquement le paiement.
                                </p>
                            </li>
                            <li>
                                <strong>Recevez vos Ariary sur Mobile Money</strong>
                                <p>
                                    Selon votre plan :
                                    <ul>
                                        <li><strong>Plan Premium :</strong> 5-15 minutes</li>
                                        <li><strong>Plan Standard :</strong> 10-30 minutes</li>
                                        <li><strong>Plan Free :</strong> 20-120 minutes</li>
                                    </ul>
                                </p>
                            </li>
                        </ol>

                        <h3>Taux de Change en Temps Réel</h3>
                        <p>
                            Payvilus utilise le taux de change du marché avec une marge minime. Vous voyez le montant exact en MGA
                            AVANT de valider votre transaction. Aucune surprise, aucun frais caché.
                        </p>
                        <table className="legal-table">
                            <thead>
                            <tr>
                                <th>Devise</th>
                                <th>Taux Payvilus</th>
                                <th>Taux du Marché</th>
                                <th>Marge</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1 EUR</td>
                                <td>4,800 MGA</td>
                                <td>4,900 MGA</td>
                                <td>~2%</td>
                            </tr>
                            <tr>
                                <td>1 USD</td>
                                <td>4,500 MGA</td>
                                <td>4,600 MGA</td>
                                <td>~2%</td>
                            </tr>
                            </tbody>
                        </table>
                        <p className="legal-note">
                            <em>Taux indicatifs mis à jour quotidiennement. Le taux final est calculé au moment de la transaction.</em>
                        </p>
                    </section>

                    {/* Section 4 : Retrait Mobile Money → PayPal */}
                    <section className="legal-section highlight-section">
                        <h2>💸 Retrait : Mobile Money → PayPal</h2>
                        <p>
                            Vous voulez approvisionner votre compte PayPal avec de l'argent depuis votre Mobile Money ?
                            Payvilus le fait pour vous en sens inverse.
                        </p>

                        <h3>Cas d'Usage</h3>
                        <ul>
                            <li>✅ Payer vos abonnements internationaux (Netflix, Spotify, Adobe, etc.)</li>
                            <li>✅ Acheter sur des sites e-commerce étrangers (Amazon, eBay, AliExpress)</li>
                            <li>✅ Payer vos fournisseurs ou sous-traitants à l'étranger</li>
                            <li>✅ Investir dans des services en ligne (publicité Facebook/Google, formations, logiciels)</li>
                        </ul>

                        <h3>Processus de Retrait</h3>
                        <ol>
                            <li>
                                <strong>Demandez un retrait sur Payvilus</strong>
                                <p>Indiquez le montant en EUR/USD que vous voulez recevoir sur PayPal</p>
                            </li>
                            <li>
                                <strong>Calculez le montant en MGA</strong>
                                <p>
                                    Notre système calcule automatiquement combien vous devez envoyer en Ariary
                                    (montant + commission selon votre plan)
                                </p>
                            </li>
                            <li>
                                <strong>Envoyez vos Ariary via Mobile Money</strong>
                                <p>
                                    Transférez le montant exact vers notre numéro Mobile Money dédié
                                    (fourni dans votre dashboard)
                                </p>
                            </li>
                            <li>
                                <strong>Recevez vos EUR/USD sur PayPal</strong>
                                <p>
                                    Nous transférons le montant sur votre compte PayPal dans les 10-60 minutes
                                    (selon votre plan)
                                </p>
                            </li>
                        </ol>

                        <div className="legal-warning">
                            <p>
                                ⚠️ <strong>Montant minimum :</strong> 10 EUR/USD par retrait pour couvrir les frais de transfert PayPal.
                            </p>
                        </div>
                    </section>

                    {/* Section 5 : Tarification */}
                    <section className="legal-section">
                        <h2>💳 Tarification Transparente</h2>
                        <p>
                            Payvilus propose 3 plans adaptés à vos besoins, du freelancer occasionnel à l'entrepreneur confirmé.
                        </p>

                        <div className="pricing-grid">
                            <div className="pricing-card">
                                <h3>Plan FREE</h3>
                                <div className="price">0 MGA<span>/mois</span></div>
                                <ul>
                                    <li>✅ Commission : <strong>15%</strong></li>
                                    <li>✅ Délai : 20-120 min</li>
                                    <li>✅ Limite : 500,000 MGA/transaction</li>
                                    <li>✅ Support : Standard (email)</li>
                                    <li>✅ Formations gratuites</li>
                                </ul>
                                <Link to="/register" className="pricing-btn">Commencer</Link>
                            </div>

                            <div className="pricing-card featured">
                                <div className="badge">POPULAIRE</div>
                                <h3>Plan STANDARD</h3>
                                <div className="price">39,000 MGA<span>/mois</span></div>
                                <ul>
                                    <li>✅ Commission : <strong>5%</strong> (3x moins cher)</li>
                                    <li>✅ Délai : 10-30 min (rapide)</li>
                                    <li>✅ Limite : 2,000,000 MGA/transaction</li>
                                    <li>✅ Support : Prioritaire</li>
                                    <li>✅ Formations : -20%</li>
                                </ul>
                                <Link to="/register" className="pricing-btn primary">Choisir Standard</Link>
                            </div>

                            <div className="pricing-card">
                                <h3>Plan PREMIUM</h3>
                                <div className="price">79,000 MGA<span>/mois</span></div>
                                <ul>
                                    <li>✅ Commission : <strong>0%</strong> (GRATUIT)</li>
                                    <li>✅ Délai : 5-15 min (ultra-rapide)</li>
                                    <li>✅ Limite : 10,000,000 MGA/transaction</li>
                                    <li>✅ Support : VIP 24/7</li>
                                    <li>✅ Formations : -40%</li>
                                    <li>✅ Conseiller dédié</li>
                                </ul>
                                <Link to="/register" className="pricing-btn">Choisir Premium</Link>
                            </div>
                        </div>

                        <h3>Exemple de Calcul</h3>
                        <p>Vous voulez convertir <strong>100 EUR</strong> en Ariary sur votre Mvola :</p>
                        <table className="legal-table">
                            <thead>
                            <tr>
                                <th>Plan</th>
                                <th>Taux (EUR → MGA)</th>
                                <th>Commission</th>
                                <th>Montant Reçu</th>
                                <th>Économie vs Free</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><strong>FREE</strong></td>
                                <td>4,800 MGA</td>
                                <td>15% (72,000 MGA)</td>
                                <td><strong>408,000 MGA</strong></td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td><strong>STANDARD</strong></td>
                                <td>4,800 MGA</td>
                                <td>5% (24,000 MGA)</td>
                                <td><strong>456,000 MGA</strong></td>
                                <td>+48,000 MGA</td>
                            </tr>
                            <tr className="highlight-row">
                                <td><strong>PREMIUM</strong></td>
                                <td>4,800 MGA</td>
                                <td>0% (0 MGA)</td>
                                <td><strong>480,000 MGA</strong></td>
                                <td>+72,000 MGA</td>
                            </tr>
                            </tbody>
                        </table>
                        <p className="legal-note">
                            💡 <strong>Astuce :</strong> Si vous faites plus de 3 transactions par mois, le plan Standard est déjà
                            rentabilisé. Au-delà de 10 transactions/mois, le Premium devient le plus économique.
                        </p>
                    </section>

                    {/* Section 6 : Opérateurs Supportés */}
                    <section className="legal-section">
                        <h2>📱 Opérateurs Mobile Money Supportés</h2>
                        <p>
                            Payvilus fonctionne avec <strong>tous les opérateurs Mobile Money de Madagascar</strong> :
                        </p>

                        <div className="operators-grid">
                            <div className="operator-card">
                                <h4>Mvola (Telma)</h4>
                                <p>✅ Dépôt et retrait</p>
                                <p>✅ Délai : Instantané</p>
                                <p>✅ Numéros : 034 XX XXX XX</p>
                            </div>
                            <div className="operator-card">
                                <h4>Orange Money</h4>
                                <p>✅ Dépôt et retrait</p>
                                <p>✅ Délai : 1-5 minutes</p>
                                <p>✅ Numéros : 032 XX XXX XX</p>
                            </div>
                            <div className="operator-card">
                                <h4>Airtel Money</h4>
                                <p>✅ Dépôt et retrait</p>
                                <p>✅ Délai : 1-5 minutes</p>
                                <p>✅ Numéros : 033 XX XXX XX</p>
                            </div>
                        </div>

                        <div className="legal-warning">
                            <p>
                                ⚠️ <strong>Important :</strong> Assurez-vous que votre compte Mobile Money est bien actif et que
                                le numéro que vous fournissez est correct. Payvilus ne peut pas annuler un transfert vers un mauvais numéro.
                            </p>
                        </div>
                    </section>

                    {/* Section 7 : Sécurité */}
                    <section className="legal-section highlight-section">
                        <h2>🔒 Sécurité et Conformité</h2>
                        <p>
                            Toutes nos transactions sont sécurisées et conformes aux régulations malgaches et internationales.
                        </p>

                        <h3>Mesures de Sécurité</h3>
                        <ul>
                            <li>🔐 <strong>Cryptage SSL 256-bit :</strong> Toutes les données sont cryptées</li>
                            <li>🔐 <strong>Vérification KYC/AML :</strong> Pour les transactions &gt; 500,000 MGA</li>
                            <li>🔐 <strong>Détection de fraude :</strong> Système automatique de détection d'activité suspecte</li>
                            <li>🔐 <strong>Conservation des preuves :</strong> Tous les ID de transaction sont archivés pendant 10 ans</li>
                            <li>🔐 <strong>Conformité légale :</strong> Respect de la loi malgache N° 2014-006 sur les services financiers</li>
                        </ul>

                        <h3>Garanties Payvilus</h3>
                        <ul>
                            <li>✅ <strong>Remboursement garanti</strong> si la transaction échoue de notre côté</li>
                            <li>✅ <strong>Support réactif</strong> en cas de problème (réponse sous 2h en moyenne)</li>
                            <li>✅ <strong>Traçabilité totale</strong> : chaque transaction a un ID unique consultable</li>
                            <li>✅ <strong>Transparence :</strong> Vous voyez le montant exact avant de valider</li>
                        </ul>
                    </section>

                    {/* Section 8 : FAQ */}
                    <section className="legal-section">
                        <h2>❓ Questions Fréquentes</h2>

                        <div className="faq-item">
                            <h4>Combien de temps prend une transaction ?</h4>
                            <p>
                                Cela dépend de votre plan :
                                <ul>
                                    <li><strong>Premium :</strong> 5-15 minutes</li>
                                    <li><strong>Standard :</strong> 10-30 minutes</li>
                                    <li><strong>Free :</strong> 20-120 minutes (jusqu'à 2h)</li>
                                </ul>
                                En général, 90% des transactions sont traitées en moins de 30 minutes.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4>Quel est le montant minimum et maximum ?</h4>
                            <p>
                                <ul>
                                    <li><strong>Minimum :</strong> 10 EUR/USD (environ 48,000 MGA)</li>
                                    <li><strong>Maximum :</strong> Selon votre plan
                                        <ul>
                                            <li>Free : 500,000 MGA par transaction</li>
                                            <li>Standard : 2,000,000 MGA par transaction</li>
                                            <li>Premium : 10,000,000 MGA par transaction</li>
                                        </ul>
                                    </li>
                                </ul>
                                Pour des montants supérieurs, contactez notre support pour une solution sur-mesure.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4>Puis-je annuler une transaction ?</h4>
                            <p>
                                Oui, mais uniquement si la transaction est encore en statut "En attente" et n'a pas été traitée.
                                Une fois que nous avons envoyé les fonds sur votre Mobile Money, il est impossible de l'annuler.
                                Vérifiez toujours vos informations avant de valider.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4>Que faire si je n'ai pas reçu mes fonds ?</h4>
                            <p>
                                Ne paniquez pas ! Voici les étapes :
                                <ol>
                                    <li>Vérifiez le statut de votre transaction dans votre dashboard Payvilus</li>
                                    <li>Vérifiez votre compte Mobile Money (parfois il y a un délai de notification)</li>
                                    <li>Si après 2h vous n'avez toujours rien reçu, contactez notre support à
                                        <a href="mailto:support@payvilus.com"> support@payvilus.com</a> avec votre ID de transaction
                                    </li>
                                    <li>Nous enquêterons et résoudrons le problème sous 24h maximum</li>
                                </ol>
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4>Dois-je avoir un compte PayPal vérifié ?</h4>
                            <p>
                                <strong>Oui, fortement recommandé.</strong> PayPal peut bloquer ou limiter votre compte si vous
                                recevez des paiements réguliers sans l'avoir vérifié. Pour vérifier votre compte PayPal :
                                <ol>
                                    <li>Ajoutez une carte bancaire (même virtuelle)</li>
                                    <li>Confirmez votre adresse email</li>
                                    <li>Ajoutez une pièce d'identité si demandé</li>
                                </ol>
                                Consultez nos <Link to="/services/formations-digitales">formations gratuites</Link> pour apprendre
                                à créer et vérifier votre compte PayPal.
                            </p>
                        </div>
                    </section>

                    {/* Bannière CTA */}
                    <div className="legal-final-banner">
                        <h3>Prêt à Accéder à Vos Fonds PayPal ?</h3>
                        <p>
                            Rejoignez les milliers de freelancers et entrepreneurs malgaches qui utilisent Payvilus pour leurs transactions PayPal.
                        </p>
                        <Link to="/register" className="cta-button">
                            Créer Mon Compte Gratuit
                        </Link>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    )
}