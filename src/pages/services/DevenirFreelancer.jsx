// src/pages/services/DevenirFreelancer.jsx - GUIDE DEVENIR FREELANCER
import { Link } from 'react-router-dom'
import LandingFooter from '../../components/LandingFooter'
import '../../styles/LegalPages.css'

export default function DevenirFreelancer() {
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
                    <h1>Devenir Freelancer Rentable avec Payvilus</h1>
                    <p className="legal-intro">
                        Le <strong>freelancing</strong> est aujourd'hui l'une des meilleures opportunités pour les Malgaches de
                        gagner des revenus en dollars/euros depuis chez eux. Mais par où commencer ? Comment réussir dans un
                        marché international compétitif ? <strong>Payvilus vous accompagne de A à Z.</strong>
                    </p>

                    {/* Image Hero */}
                    <div className="legal-image">
                        <img
                            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=400&fit=crop"
                            alt="Devenir freelancer digital Madagascar"
                        />
                    </div>

                    {/* Section 1 : Qu'est-ce que le Freelancing */}
                    <section className="legal-section highlight-section">
                        <h2>🤔 Qu'est-ce que le Freelancing ?</h2>
                        <p>
                            Le <strong>freelancing</strong> (ou travail indépendant) consiste à offrir vos compétences à des clients
                            du monde entier, sans être employé par une entreprise. Vous êtes votre propre patron, vous choisissez
                            vos projets, vos tarifs et vos horaires.
                        </p>

                        <h3>Les Avantages du Freelancing</h3>
                        <div className="advantages-grid">
                            <div className="advantage-card">
                                <h4>💰 Revenus en Devises Fortes</h4>
                                <p>
                                    Vous êtes payé en USD ou EUR (50 à 200 USD/heure selon votre expertise).
                                    Avec le taux de change avantageux, vos revenus explosent en Ariary.
                                </p>
                            </div>
                            <div className="advantage-card">
                                <h4>🏠 Travaillez de N'importe Où</h4>
                                <p>
                                    Tout ce dont vous avez besoin : un ordinateur et une connexion internet.
                                    Travaillez depuis chez vous, un café, ou même en voyage.
                                </p>
                            </div>
                            <div className="advantage-card">
                                <h4>⏰ Liberté Totale d'Horaires</h4>
                                <p>
                                    Vous décidez quand vous travaillez. Besoin d'une pause ? Prenez-la.
                                    Envie de travailler la nuit ? Aucun problème.
                                </p>
                            </div>
                            <div className="advantage-card">
                                <h4>📈 Potentiel de Croissance Illimité</h4>
                                <p>
                                    Contrairement à un salaire fixe, vos revenus peuvent doubler, tripler,
                                    ou même décupler en quelques mois si vous vous y prenez bien.
                                </p>
                            </div>
                            <div className="advantage-card">
                                <h4>🌍 Clients du Monde Entier</h4>
                                <p>
                                    Travaillez avec des entreprises américaines, européennes, australiennes.
                                    Pas de limite géographique, le monde entier est votre marché.
                                </p>
                            </div>
                            <div className="advantage-card">
                                <h4>🎯 Choisissez Vos Projets</h4>
                                <p>
                                    Vous n'aimez pas un client ou un projet ? Refusez-le. Vous travaillez
                                    uniquement sur ce qui vous passionne et vous motive.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 : Les Défis du Freelancing */}
                    <section className="legal-section">
                        <h2>⚠️ Les Défis à Connaître (et Comment les Surmonter)</h2>
                        <p>
                            Le freelancing n'est pas facile, surtout au début. Voici les défis les plus courants
                            et comment Payvilus vous aide à les surmonter :
                        </p>

                        <div className="challenges-list">
                            <div className="challenge-item">
                                <h4>🚧 Défi 1 : Trouver les Premiers Clients</h4>
                                <p className="challenge-desc">
                                    Le plus difficile est de décrocher vos 5 premières ventes. Sans avis ni portfolio,
                                    les clients hésitent à vous faire confiance.
                                </p>
                                <p className="challenge-solution">
                                    <strong>Solution Payvilus :</strong> Nos formations vous donnent des stratégies éprouvées
                                    pour obtenir vos premières ventes en 2-4 semaines (tarifs agressifs au début, prospection
                                    active, optimisation SEO).
                                </p>
                            </div>

                            <div className="challenge-item">
                                <h4>🚧 Défi 2 : Accès à PayPal et Retrait des Fonds</h4>
                                <p className="challenge-desc">
                                    La plupart des plateformes freelance (Fiverr, Upwork) paient via PayPal. Mais retirer
                                    cet argent à Madagascar est un cauchemar.
                                </p>
                                <p className="challenge-solution">
                                    <strong>Solution Payvilus :</strong> Nous convertissons vos fonds PayPal en Ariary sur
                                    Mobile Money en 5-120 minutes. Plus besoin d'intermédiaires douteux.
                                </p>
                            </div>

                            <div className="challenge-item">
                                <h4>🚧 Défi 3 : Barrière de la Langue</h4>
                                <p className="challenge-desc">
                                    La majorité des clients sont anglophones. Si votre anglais est faible, vous perdez
                                    80% des opportunités.
                                </p>
                                <p className="challenge-solution">
                                    <strong>Solution Payvilus :</strong> Nos formations incluent des templates en anglais
                                    (messages, propositions, descriptions). Copiez-collez et adaptez. Pas besoin d'être bilingue.
                                </p>
                            </div>

                            <div className="challenge-item">
                                <h4>🚧 Défi 4 : Concurrence Mondiale</h4>
                                <p className="challenge-desc">
                                    Vous êtes en compétition avec des freelancers indiens, pakistanais, bangladais qui
                                    travaillent pour 2-5 USD/heure.
                                </p>
                                <p className="challenge-solution">
                                    <strong>Solution Payvilus :</strong> Nous vous apprenons à vous différencier par la QUALITÉ,
                                    pas le prix. Avec les bonnes techniques, vous pouvez facturer 30-100 USD/heure.
                                </p>
                            </div>

                            <div className="challenge-item">
                                <h4>🚧 Défi 5 : Gestion du Temps et Motivation</h4>
                                <p className="challenge-desc">
                                    Travailler seul depuis chez soi demande une discipline de fer. Beaucoup abandonnent
                                    après 2-3 mois sans résultats.
                                </p>
                                <p className="challenge-solution">
                                    <strong>Solution Payvilus :</strong> Notre communauté de freelancers vous soutient.
                                    Groupes d'entraide, sessions de co-working virtuel, accountability partners.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 : Les 7 Étapes pour Réussir */}
                    <section className="legal-section highlight-section">
                        <h2>🚀 Les 7 Étapes pour Devenir Freelancer Rentable</h2>
                        <p>
                            Voici le plan exact que nous recommandons à tous nos étudiants. Suivez ces étapes dans l'ordre
                            et vous aurez vos premiers revenus en 30-60 jours.
                        </p>

                        <div className="roadmap-container">
                            <div className="roadmap-step">
                                <div className="roadmap-number">ÉTAPE 1</div>
                                <h3>Choisir Votre Niche et Compétence</h3>
                                <p>
                                    Ne vous lancez pas dans le freelancing "en général". Choisissez UNE compétence précise
                                    et devenez excellent dans ce domaine.
                                </p>
                                <h4>Top 10 des Niches les Plus Rentables en 2025</h4>
                                <ul>
                                    <li><strong>Copywriting :</strong> 50-200 USD/heure (rédaction de pages de vente, emails)</li>
                                    <li><strong>Design Graphique :</strong> 30-100 USD/heure (logos, identité visuelle, UI/UX)</li>
                                    <li><strong>Social Media Management :</strong> 500-2000 USD/mois par client</li>
                                    <li><strong>Développement Web :</strong> 40-150 USD/heure (WordPress, React, Shopify)</li>
                                    <li><strong>SEO / Marketing Digital :</strong> 50-200 USD/heure</li>
                                    <li><strong>Traduction :</strong> 0.08-0.20 USD/mot (français ↔ anglais très demandé)</li>
                                    <li><strong>Video Editing :</strong> 30-100 USD/heure (YouTube, publicités)</li>
                                    <li><strong>Transcription :</strong> 15-40 USD/heure audio</li>
                                    <li><strong>Voice Over :</strong> 100-500 USD par projet</li>
                                    <li><strong>Consulting / Coaching :</strong> 100-300 USD/heure (si vous avez une expertise)</li>
                                </ul>
                                <p className="roadmap-tip">
                                    💡 <strong>Notre conseil :</strong> Choisissez une niche qui correspond à vos compétences ACTUELLES
                                    ou à ce que vous pouvez apprendre en 1-3 mois. Ne visez pas trop haut au début.
                                </p>
                            </div>

                            <div className="roadmap-step">
                                <div className="roadmap-number">ÉTAPE 2</div>
                                <h3>Se Former Rapidement (1-3 Mois Max)</h3>
                                <p>
                                    Vous n'avez pas besoin d'être un expert pour commencer. 80% de compétence suffit pour
                                    vos premiers clients. Apprenez juste assez pour délivrer de la valeur.
                                </p>
                                <h4>Ressources d'Apprentissage</h4>
                                <ul>
                                    <li>
                                        <strong>Formations Payvilus :</strong> Consultez notre catalogue de
                                        <Link to="/services/formations-digitales"> formations digitales</Link>
                                    </li>
                                    <li><strong>YouTube :</strong> Des milliers de tutoriels gratuits (Canva, Photoshop, WordPress, etc.)</li>
                                    <li><strong>Udemy / Coursera :</strong> Formations payantes mais souvent en promo (10-15 USD)</li>
                                    <li><strong>Pratique :</strong> Le plus important ! Créez 3-5 projets pour votre portfolio</li>
                                </ul>
                                <p className="roadmap-tip">
                                    💡 <strong>Notre conseil :</strong> Ne passez pas 6 mois à "vous former". Apprenez les bases
                                    en 1 mois, créez votre profil, et apprenez en faisant avec vos premiers clients.
                                </p>
                            </div>

                            <div className="roadmap-step">
                                <div className="roadmap-number">ÉTAPE 3</div>
                                <h3>Créer Votre Compte PayPal</h3>
                                <p>
                                    PayPal est ESSENTIEL pour recevoir des paiements internationaux. Sans PayPal, vous ne pouvez
                                    pas utiliser Fiverr, Upwork, ou la plupart des plateformes.
                                </p>
                                <h4>Comment Créer et Sécuriser Votre PayPal</h4>
                                <ol>
                                    <li>Allez sur <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer">PayPal.com</a></li>
                                    <li>Cliquez sur "S'inscrire" → Choisissez "Compte Professionnel"</li>
                                    <li>Remplissez vos informations (nom, email, adresse à Madagascar)</li>
                                    <li>Vérifiez votre email en cliquant sur le lien de confirmation</li>
                                    <li>
                                        <strong>Ajoutez une carte bancaire</strong> (même virtuelle, genre Neteller ou Payoneer)
                                        pour lever les limites
                                    </li>
                                    <li>Activez l'<strong>authentification à 2 facteurs</strong> pour éviter le blocage de compte</li>
                                </ol>
                                <p className="roadmap-warning">
                                    ⚠️ <strong>Attention :</strong> PayPal bloque souvent les comptes malgaches s'ils détectent
                                    une "activité inhabituelle". Pour éviter cela : vérifiez votre compte, ajoutez une carte,
                                    et ne recevez pas trop d'argent trop vite au début (max 500 USD les 2 premiers mois).
                                </p>
                                <p className="roadmap-tip">
                                    💡 <strong>Formation gratuite :</strong> Consultez notre guide
                                    <Link to="/services/formations-digitales"> "Comment Créer un Compte PayPal à Madagascar"</Link>
                                </p>
                            </div>

                            <div className="roadmap-step">
                                <div className="roadmap-number">ÉTAPE 4</div>
                                <h3>Créer Votre Profil sur Fiverr ou Upwork</h3>
                                <p>
                                    Fiverr et Upwork sont les 2 plateformes freelance les plus populaires. Nous recommandons
                                    de commencer par <strong>Fiverr</strong> (plus facile pour débutants).
                                </p>
                                <h4>Pourquoi Fiverr pour Commencer ?</h4>
                                <ul>
                                    <li>✅ <strong>Pas besoin de postuler :</strong> Vous créez votre "gig" et les clients viennent à vous</li>
                                    <li>✅ <strong>Tarification simple :</strong> Vous fixez vos prix (Basic, Standard, Premium)</li>
                                    <li>✅ <strong>Plus facile pour débutants :</strong> Moins de concurrence qu'Upwork</li>
                                    <li>✅ <strong>Paiement sécurisé :</strong> L'argent est retenu par Fiverr jusqu'à livraison</li>
                                </ul>
                                <h4>Éléments Essentiels d'un Bon Profil Fiverr</h4>
                                <ol>
                                    <li><strong>Photo professionnelle :</strong> Souriez, fond neutre, éclairage correct</li>
                                    <li><strong>Titre accrocheur :</strong> "I will design a professional logo in 24h" (pas "I am a designer")</li>
                                    <li><strong>Description détaillée :</strong> Expliquez CE QUE VOUS FAITES, pas qui vous êtes</li>
                                    <li><strong>Portfolio de 3-5 projets :</strong> Même si ce sont des projets personnels, montrez votre travail</li>
                                    <li><strong>Prix compétitifs au début :</strong> 5-15 USD pour vos premières ventes, augmentez après</li>
                                </ol>
                                <p className="roadmap-tip">
                                    💡 <strong>Formation complète :</strong>
                                    <Link to="/services/formations-digitales"> Fiverr Masterclass : De 0 à 1000 USD/Mois</Link>
                                </p>
                            </div>

                            <div className="roadmap-step">
                                <div className="roadmap-number">ÉTAPE 5</div>
                                <h3>Décrocher Vos 5 Premières Ventes</h3>
                                <p>
                                    C'est l'étape la plus difficile. Sans avis ni historique, les clients hésitent.
                                    Voici des stratégies qui fonctionnent :
                                </p>
                                <h4>Stratégies pour Vos Premières Ventes</h4>
                                <ul>
                                    <li>
                                        <strong>Prix cassés :</strong> Vendez à 5-10 USD au lieu de 50 USD. L'objectif est d'avoir
                                        des avis 5 étoiles, pas de gagner de l'argent tout de suite.
                                    </li>
                                    <li>
                                        <strong>Livraison ultra-rapide :</strong> Promettez 24h au lieu de 3-7 jours. Impressionnez vos clients.
                                    </li>
                                    <li>
                                        <strong>Offrez un bonus :</strong> "Achetez ce logo, obtenez 2 révisions gratuites + fichier source"
                                    </li>
                                    <li>
                                        <strong>SEO Fiverr :</strong> Utilisez les bons mots-clés dans votre titre et description pour apparaître en recherche
                                    </li>
                                    <li>
                                        <strong>Partagez sur les réseaux sociaux :</strong> Postez votre gig sur Facebook, LinkedIn, Twitter
                                    </li>
                                    <li>
                                        <strong>Demandez à vos amis/famille :</strong> Vos premières ventes peuvent venir de votre entourage (payant, pour avoir un vrai avis)
                                    </li>
                                </ul>
                                <p className="roadmap-warning">
                                    ⚠️ <strong>Important :</strong> Ne proposez JAMAIS de vendre des avis faux ou d'échanger des avis
                                    avec d'autres freelancers. Fiverr détecte ça et bannit votre compte définitivement.
                                </p>
                            </div>

                            <div className="roadmap-step">
                                <div className="roadmap-number">ÉTAPE 6</div>
                                <h3>Scaler : Passer de 100 à 1000+ USD/Mois</h3>
                                <p>
                                    Une fois que vous avez 5-10 ventes et des avis positifs, il est temps de passer à la vitesse supérieure.
                                </p>
                                <h4>Comment Multiplier Vos Revenus</h4>
                                <ul>
                                    <li>
                                        <strong>Augmentez vos prix :</strong> Passez de 10 USD à 25 USD, puis 50 USD, puis 100 USD.
                                        Testez jusqu'où vos clients sont prêts à payer.
                                    </li>
                                    <li>
                                        <strong>Créez plusieurs gigs :</strong> Fiverr autorise 7 gigs actifs. Diversifiez vos offres
                                        (ex: Logo basique, Logo premium, Logo + Identité complète)
                                    </li>
                                    <li>
                                        <strong>Prospection active :</strong> Ne comptez pas uniquement sur Fiverr. Contactez des entreprises
                                        directement par email/LinkedIn
                                    </li>
                                    <li>
                                        <strong>Fidélisez vos clients :</strong> Un client qui revient vaut 10x plus qu'un nouveau.
                                        Surlivrez toujours, soyez pro, réactif.
                                    </li>
                                    <li>
                                        <strong>Sous-traitez :</strong> Une fois à 1000 USD/mois, embauchez d'autres freelancers pour
                                        gérer le surplus de demandes. Gardez la marge.
                                    </li>
                                </ul>
                                <p className="roadmap-tip">
                                    💡 <strong>Objectif réaliste :</strong> Mois 1-2 : 100-200 USD | Mois 3-4 : 300-500 USD |
                                    Mois 5-6 : 500-1000 USD | Mois 12+ : 1500-3000 USD
                                </p>
                            </div>

                            <div className="roadmap-step">
                                <div className="roadmap-number">ÉTAPE 7</div>
                                <h3>Retirer Vos Gains avec Payvilus</h3>
                                <p>
                                    Félicitations ! Vous avez vos premiers gains sur PayPal. Maintenant, comment les convertir
                                    en Ariary sur votre Mobile Money ?
                                </p>
                                <h4>Processus de Retrait (5 Minutes)</h4>
                                <ol>
                                    <li>Connectez-vous à votre compte Payvilus</li>
                                    <li>Allez dans "Dépôt PayPal → Mobile Money"</li>
                                    <li>Indiquez le montant en EUR/USD que vous voulez convertir</li>
                                    <li>Choisissez votre opérateur (Mvola, Orange Money, Airtel Money)</li>
                                    <li>Transférez vos fonds PayPal vers notre compte</li>
                                    <li>Recevez vos Ariary sur Mobile Money en 5-120 minutes (selon votre plan)</li>
                                </ol>
                                <p className="roadmap-tip">
                                    💡 <strong>Astuce :</strong> Si vous faites plus de 3 retraits par mois, le plan Standard
                                    (39,000 MGA/mois, commission 5%) est déjà rentabilisé comparé au plan Free (commission 15%).
                                </p>
                                <Link to="/services/transactions-paypal" className="roadmap-link">
                                    En savoir plus sur les transactions PayPal →
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 : Témoignages de Réussite */}
                    <section className="legal-section">
                        <h2>💬 Histoires de Réussite : Ils l'Ont Fait, Vous Aussi</h2>

                        <div className="success-stories">
                            <div className="story-card">
                                <div className="story-header">
                                    <h4>Rakoto M. - Graphiste Freelance</h4>
                                    <p className="story-income">800 USD/mois</p>
                                </div>
                                <p className="story-text">
                                    "J'ai commencé avec la formation Fiverr de Payvilus. En 2 semaines, j'avais mes 5 premières ventes.
                                    Aujourd'hui (6 mois plus tard), je gagne 800 USD/mois en créant des logos et identités visuelles.
                                    J'ai quitté mon travail de bureau (200,000 MGA/mois) pour me consacrer 100% au freelancing."
                                </p>
                            </div>

                            <div className="story-card">
                                <div className="story-header">
                                    <h4>Nivo R. - Développeur WordPress</h4>
                                    <p className="story-income">2,500 USD/mois</p>
                                </div>
                                <p className="story-text">
                                    "Avant Payvilus, je ne savais même pas qu'on pouvait gagner de l'argent en ligne à Madagascar.
                                    J'ai suivi la formation Upwork Pro, appliqué les stratégies de proposal, et décroché un contrat
                                    long-terme à 60 USD/heure. Mon client me paie désormais 2,500 USD/mois pour gérer son site e-commerce."
                                </p>
                            </div>

                            <div className="story-card">
                                <div className="story-header">
                                    <h4>Hery T. - Copywriter</h4>
                                    <p className="story-income">1,200 USD/mois</p>
                                </div>
                                <p className="story-text">
                                    "Le copywriting était complètement nouveau pour moi. J'ai acheté la formation Copywriting avec
                                    le plan Premium (-40%). En 3 mois, j'ai décroché 5 clients réguliers à 200-300 USD par page de vente.
                                    La formation s'est payée en 1 semaine. Maintenant je facture 500 USD par projet."
                                </p>
                            </div>
                        </div>

                        <div className="legal-image">
                            <img
                                src="https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=400&fit=crop"
                                alt="Success stories freelancers Madagascar"
                            />
                        </div>
                    </section>

                    {/* Section 5 : Outils et Ressources */}
                    <section className="legal-section highlight-section">
                        <h2>🛠️ Outils Essentiels pour Freelancers</h2>
                        <p>
                            Voici les outils que nous recommandons pour maximiser votre productivité et professionnalisme :
                        </p>

                        <div className="tools-grid">
                            <div className="tool-card">
                                <h4>Communication</h4>
                                <ul>
                                    <li><strong>Zoom :</strong> Appels vidéo avec clients (gratuit jusqu'à 40 min)</li>
                                    <li><strong>Slack :</strong> Chat professionnel pour projets d'équipe</li>
                                    <li><strong>Gmail :</strong> Email professionnel (créez prenom.nom@gmail.com)</li>
                                </ul>
                            </div>

                            <div className="tool-card">
                                <h4>Design & Créativité</h4>
                                <ul>
                                    <li><strong>Canva :</strong> Design graphique sans Photoshop (gratuit)</li>
                                    <li><strong>Figma :</strong> UI/UX design et prototypage (gratuit)</li>
                                    <li><strong>Remove.bg :</strong> Supprimer arrière-plans d'images</li>
                                </ul>
                            </div>

                            <div className="tool-card">
                                <h4>Productivité</h4>
                                <ul>
                                    <li><strong>Trello :</strong> Gestion de projets et tâches</li>
                                    <li><strong>Toggl :</strong> Suivi du temps de travail</li>
                                    <li><strong>Grammarly :</strong> Correction anglais (essentiel !)</li>
                                </ul>
                            </div>

                            <div className="tool-card">
                                <h4>Paiements</h4>
                                <ul>
                                    <li><strong>PayPal :</strong> Recevoir paiements internationaux</li>
                                    <li><strong>Payvilus :</strong> Convertir PayPal → Mobile Money</li>
                                    <li><strong>Wise :</strong> Alternative PayPal (tarifs bas)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 6 : FAQ */}
                    <section className="legal-section">
                        <h2>❓ Questions Fréquentes</h2>

                        <div className="faq-item">
                            <h4>Combien de temps avant de gagner de l'argent ?</h4>
                            <p>
                                Si vous suivez notre plan, vous pouvez décrocher vos premières ventes en <strong>2-4 semaines</strong>.
                                Atteindre 500 USD/mois prend généralement 3-6 mois. Atteindre 1500+ USD/mois prend 6-12 mois.
                                C'est un marathon, pas un sprint.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4>Ai-je besoin d'un diplôme ou de certifications ?</h4>
                            <p>
                                <strong>Non.</strong> Sur Fiverr et Upwork, les clients se fichent de vos diplômes. Ce qui compte :
                                votre portfolio, vos avis clients, et votre capacité à délivrer de la valeur. Un bon portfolio vaut
                                mieux qu'un master.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4>Puis-je faire du freelancing en parallèle de mon travail ?</h4>
                            <p>
                                <strong>Absolument !</strong> C'est même recommandé au début. Gardez votre emploi, et consacrez
                                2-3h par jour au freelancing (soir ou weekend). Une fois que vos revenus freelance dépassent votre
                                salaire, vous pouvez envisager de passer à temps plein.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4>Quel est le meilleur moment pour commencer ?</h4>
                            <p>
                                <strong>MAINTENANT.</strong> Chaque jour que vous attendez est un jour de revenus perdu.
                                Vous n'êtes jamais "prêt à 100%". Lancez-vous avec 70% de compétence et apprenez en faisant.
                            </p>
                        </div>
                    </section>

                    {/* Bannière CTA Finale */}
                    <div className="legal-final-banner">
                        <h3>Prêt à Changer Votre Vie ?</h3>
                        <p>
                            Rejoignez Payvilus aujourd'hui. Accédez à nos formations gratuites, convertissez vos gains PayPal,
                            et transformez votre passion en revenus en dollars.
                        </p>
                        <Link to="/register" className="cta-button">
                            Commencer Mon Parcours Freelance
                        </Link>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </div>
    )
}