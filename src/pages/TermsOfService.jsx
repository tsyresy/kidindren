// src/pages/TermsOfService.jsx - CONDITIONS D'UTILISATION COMPLÈTES
import { Box, Container, Typography, Divider, Accordion, AccordionSummary, AccordionDetails, Alert, Chip } from '@mui/material'
import { ExpandMore, Gavel, Shield, Info, Warning, CheckCircle } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import '../styles/Landing.css'

export default function TermsOfService() {
  const navigate = useNavigate()

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Navbar */}
      <header className="landing-navbar" style={{ position: 'sticky', top: 0, zIndex: 1000, bgcolor: 'white' }}>
        <div className="landing-navbar-content">
          <div className="landing-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img
              src="https://res.cloudinary.com/djillj6xt/image/upload/v1763394595/CL-B-3_sigqnz.png"
              alt="Payvilus - Conditions d'utilisation"
            />
          </div>
          <nav className="landing-nav">
            <a href="/#pourquoi-nous">Services</a>
            <a href="/#avis">Avis</a>
            <a href="/about">À propos</a>
          </nav>
          <div className="landing-ctas">
            <a href="/login" className="btn-nav-secondary">Connexion</a>
            <a href="/register" className="btn-nav-primary">S'inscrire</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #010F1B 0%, #0a1929 100%)',
          color: 'white',
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Gavel sx={{ fontSize: 50, color: '#16f98a' }} />
            <Typography variant="h2" sx={{ fontWeight: 800 }}>
              Conditions d'Utilisation
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: '#94a3b8', mb: 2 }}>
            Payvilus - Plateforme de transactions PayPal et formations digitales
          </Typography>
          <Chip
            label="Dernière mise à jour : 6 décembre 2024"
            sx={{ bgcolor: 'rgba(22, 249, 138, 0.2)', color: '#16f98a', fontWeight: 600 }}
          />
        </Container>
      </Box>

      {/* Contenu */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Avertissement important */}
        <Alert
          severity="warning"
          icon={<Warning />}
          sx={{ mb: 4, fontSize: '1rem', fontWeight: 600 }}
        >
          En utilisant les services de Payvilus, vous acceptez l'intégralité des présentes conditions d'utilisation.
          Veuillez les lire attentivement avant de créer un compte ou d'effectuer une transaction.
        </Alert>

        {/* Article 1 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle sx={{ color: '#16f98a' }} />
            Article 1 - Définitions
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              <strong>• Payvilus :</strong> Désigne la plateforme web accessible à l'adresse payvilus.store, éditée par Waviloid Studio,
              société malgache basée à Antananarivo, Madagascar.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              <strong>• Utilisateur :</strong> Toute personne physique ou morale ayant créé un compte sur la plateforme Payvilus.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              <strong>• Services :</strong> Ensemble des fonctionnalités proposées par Payvilus, notamment :
              <br/>- Conversion de fonds PayPal en Ariary malgache (MGA)
              <br/>- Transfert vers comptes Mobile Money (Mvola, Orange Money, Airtel Money)
              <br/>- Accès aux formations digitales pour freelancers
              <br/>- Support client et assistance technique
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              <strong>• Transaction :</strong> Opération de dépôt ou de retrait effectuée par l'Utilisateur via la plateforme.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              <strong>• Plan d'abonnement :</strong> Formule tarifaire choisie par l'Utilisateur (Free, Standard ou Premium).
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              <strong>• Mobile Money :</strong> Services de paiement mobile opérés par Telma (Mvola), Orange Madagascar (Orange Money)
              et Airtel Madagascar (Airtel Money).
            </Typography>
          </Box>
        </Box>

        {/* Article 2 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle sx={{ color: '#16f98a' }} />
            Article 2 - Objet
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions
              d'utilisation des services proposés par Payvilus, ainsi que les droits et obligations des parties dans ce cadre.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Elles constituent un contrat juridiquement contraignant entre l'Utilisateur et Payvilus dès l'acceptation
              lors de la création du compte.
            </Typography>
          </Box>
        </Box>

        {/* Article 3 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle sx={{ color: '#16f98a' }} />
            Article 3 - Accès aux Services
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B' }}>
              3.1 Conditions d'accès
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Les services Payvilus sont accessibles à toute personne remplissant les conditions suivantes :
              <br/>• Être âgé de 18 ans minimum ou majeur selon la législation malgache
              <br/>• Posséder un compte PayPal actif et vérifié
              <br/>• Posséder un compte Mobile Money actif (Mvola, Orange Money ou Airtel Money)
              <br/>• Disposer d'une adresse email valide
              <br/>• Accepter les présentes CGU sans réserve
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              3.2 Création de compte
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Pour utiliser Payvilus, l'Utilisateur doit créer un compte en fournissant des informations exactes,
              complètes et à jour. L'Utilisateur s'engage à :
              <br/>• Fournir des informations véridiques lors de l'inscription
              <br/>• Maintenir la confidentialité de ses identifiants de connexion
              <br/>• Ne pas partager son compte avec des tiers
              <br/>• Informer immédiatement Payvilus en cas d'utilisation non autorisée de son compte
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              3.3 Vérification d'identité
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Payvilus se réserve le droit de demander une vérification d'identité à tout moment, notamment :
              <br/>• Pour les transactions supérieures à 500,000 MGA
              <br/>• En cas de suspicion d'activité frauduleuse
              <br/>• Pour se conformer aux obligations légales anti-blanchiment (AML/KYC)
            </Typography>
          </Box>
        </Box>

        {/* Article 4 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle sx={{ color: '#16f98a' }} />
            Article 4 - Plans d'Abonnement et Tarification
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B' }}>
              4.1 Plan FREE (Gratuit)
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              • <strong>Tarif mensuel :</strong> 0 MGA (gratuit)
              <br/>• <strong>Commission par transaction :</strong> 15% du montant converti
              <br/>• <strong>Délai de traitement :</strong> 20 à 120 minutes
              <br/>• <strong>Accès formations :</strong> Formations gratuites uniquement
              <br/>• <strong>Support :</strong> Standard via email
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              4.2 Plan STANDARD
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              • <strong>Tarif mensuel :</strong> 39,000 MGA (facturation mensuelle)
              <br/>• <strong>Commission par transaction :</strong> 5% du montant converti
              <br/>• <strong>Délai de traitement :</strong> 10 à 30 minutes
              <br/>• <strong>Réduction formations :</strong> -20% sur toutes les formations payantes
              <br/>• <strong>Support :</strong> Prioritaire via email et chat
              <br/>• <strong>Traitement rapide :</strong> File de traitement prioritaire
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              4.3 Plan PREMIUM
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              • <strong>Tarif mensuel :</strong> 79,000 MGA (facturation mensuelle)
              <br/>• <strong>Commission par transaction :</strong> 0% (zéro commission)
              <br/>• <strong>Délai de traitement :</strong> 5 à 15 minutes (ultra-rapide)
              <br/>• <strong>Réduction formations :</strong> -40% sur toutes les formations payantes
              <br/>• <strong>Support :</strong> VIP 24/7 via email, chat et téléphone
              <br/>• <strong>Traitement prioritaire :</strong> File VIP (traitement en premier)
              <br/>• <strong>Conseiller dédié :</strong> Accompagnement personnalisé
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B' }}>
              4.4 Modalités de paiement des abonnements
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              • Les abonnements Standard et Premium sont facturés mensuellement via Stripe (paiement par carte bancaire)
              <br/>• Le paiement est automatiquement prélevé le même jour chaque mois
              <br/>• En cas d'échec de paiement, l'Utilisateur dispose de 7 jours pour régulariser
              <br/>• Passé ce délai, le compte est automatiquement rétrogradé au plan Free
              <br/>• Aucun remboursement n'est effectué en cas de résiliation en cours de mois
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              4.5 Changement de plan
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              • L'Utilisateur peut changer de plan à tout moment depuis son tableau de bord
              <br/>• Le passage à un plan supérieur est effectif immédiatement (prorata appliqué)
              <br/>• Le passage à un plan inférieur prend effet à la fin de la période d'abonnement en cours
              <br/>• La résiliation d'un abonnement prend effet à la fin de la période payée
            </Typography>
          </Box>
        </Box>

        {/* Article 5 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle sx={{ color: '#16f98a' }} />
            Article 5 - Transactions et Délais
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B' }}>
              5.1 Dépôt PayPal vers Mobile Money
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              • L'Utilisateur initie une demande de dépôt en spécifiant le montant et son numéro Mobile Money
              <br/>• Payvilus traite la demande dans les délais indiqués selon le plan
              <br/>• Le taux de change appliqué est celui en vigueur au moment du traitement
              <br/>• Une notification est envoyée par email à chaque étape (en attente, en cours, complété)
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              5.2 Retrait Mobile Money vers PayPal
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              • L'Utilisateur envoie le montant en Ariary vers le compte Mobile Money de Payvilus
              <br/>• Après confirmation de réception, Payvilus transfère l'équivalent en EUR/USD vers le compte PayPal de l'Utilisateur
              <br/>• Le traitement suit les mêmes délais que les dépôts selon le plan
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              5.3 Limites de transaction
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              • <strong>Montant minimum par transaction :</strong> 10,000 MGA
              <br/>• <strong>Montant maximum par transaction :</strong>
              <br/>&nbsp;&nbsp;- Plan Free : 500,000 MGA
              <br/>&nbsp;&nbsp;- Plan Standard : 2,000,000 MGA
              <br/>&nbsp;&nbsp;- Plan Premium : 10,000,000 MGA
              <br/>• Ces limites peuvent être augmentées sur demande après vérification d'identité
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              5.4 Annulation de transaction
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              • Une transaction peut être annulée par l'Utilisateur tant qu'elle est en statut "En attente"
              <br/>• Une fois le traitement démarré, l'annulation n'est plus possible
              <br/>• En cas de problème, contacter le support dans les 24h
            </Typography>
          </Box>
        </Box>

        {/* Article 6 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Shield sx={{ color: '#16f98a' }} />
            Article 6 - Sécurité et Protection des Données (RGPD)
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B' }}>
              6.1 Collecte des données personnelles
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Payvilus collecte les données suivantes :
              <br/>• <strong>Données d'identification :</strong> Nom, prénom, adresse email, numéro de téléphone
              <br/>• <strong>Données de connexion :</strong> Adresse IP, logs de connexion, cookies
              <br/>• <strong>Données de transaction :</strong> Montants, dates, numéros de compte Mobile Money
              <br/>• <strong>Données de paiement :</strong> Informations de carte bancaire (stockées par Stripe, pas par Payvilus)
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              6.2 Utilisation des données
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Les données collectées sont utilisées exclusivement pour :
              <br/>• Fournir les services de Payvilus
              <br/>• Traiter les transactions de l'Utilisateur
              <br/>• Communiquer avec l'Utilisateur (support, notifications)
              <br/>• Améliorer les services et l'expérience utilisateur
              <br/>• Se conformer aux obligations légales (AML/KYC)
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              6.3 Protection et stockage
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              • Toutes les données sont stockées sur des serveurs sécurisés avec cryptage SSL
              <br/>• Les mots de passe sont hachés et jamais stockés en clair
              <br/>• Les données de paiement sont gérées par Stripe (certifié PCI-DSS)
              <br/>• Accès aux données strictement limité aux employés autorisés
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              6.4 Droits des utilisateurs (RGPD)
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Conformément au RGPD, l'Utilisateur dispose des droits suivants :
              <br/>• <strong>Droit d'accès :</strong> Demander une copie de vos données personnelles
              <br/>• <strong>Droit de rectification :</strong> Corriger des données inexactes
              <br/>• <strong>Droit à l'effacement :</strong> Demander la suppression de vos données
              <br/>• <strong>Droit à la portabilité :</strong> Recevoir vos données dans un format exploitable
              <br/>• <strong>Droit d'opposition :</strong> S'opposer au traitement de vos données
              <br/><br/>
              Pour exercer ces droits, contactez : <strong>support@payvilus.com</strong>
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              6.5 Conservation des données
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              • Les données de compte sont conservées tant que le compte est actif
              <br/>• Après suppression du compte, les données sont conservées 3 ans pour obligations légales
              <br/>• Les données de transaction sont conservées 10 ans (obligation légale comptable)
            </Typography>
          </Box>
        </Box>

        {/* Article 7 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Warning sx={{ color: '#16f98a' }} />
            Article 7 - Responsabilités et Limitations
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B' }}>
              7.1 Obligations de l'Utilisateur
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              L'Utilisateur s'engage à :
              <br/>• Utiliser les services conformément à la loi et aux présentes CGU
              <br/>• Ne pas utiliser Payvilus à des fins illégales (blanchiment, fraude, etc.)
              <br/>• Fournir des informations exactes et à jour
              <br/>• Vérifier les montants et taux de change avant de valider une transaction
              <br/>• Ne pas tenter de contourner les systèmes de sécurité
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              7.2 Responsabilité de Payvilus
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Payvilus s'engage à :
              <br/>• Mettre en œuvre tous les moyens pour assurer la sécurité des transactions
              <br/>• Traiter les demandes dans les délais annoncés
              <br/>• Fournir un support client réactif
              <br/>• Respecter la confidentialité des données
              <br/><br/>
              Toutefois, Payvilus ne peut être tenu responsable :
              <br/>• Des variations de taux de change entre PayPal et Mobile Money
              <br/>• Des interruptions de service dues à des cas de force majeure
              <br/>• Des délais dus aux opérateurs Mobile Money ou PayPal
              <br/>• Des erreurs commises par l'Utilisateur (mauvais numéro, montant incorrect)
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              7.3 Limitation de responsabilité
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              La responsabilité de Payvilus est limitée au montant de la transaction concernée.
              Payvilus ne peut être tenu responsable de dommages indirects, pertes de revenus ou préjudices moraux.
            </Typography>
          </Box>
        </Box>

        {/* Article 8 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Info sx={{ color: '#16f98a' }} />
            Article 8 - Formations Digitales
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              • Les formations digitales proposées par Payvilus sont des contenus pédagogiques créés par des experts freelancers
              <br/>• Certaines formations sont gratuites, d'autres sont payantes
              <br/>• L'accès aux formations payantes nécessite un paiement préalable (pas de remboursement après accès au contenu)
              <br/>• Les Utilisateurs des plans Standard et Premium bénéficient de réductions (-20% et -40%)
              <br/>• Le contenu des formations est protégé par le droit d'auteur et ne peut être redistribué
              <br/>• Payvilus se réserve le droit de modifier ou retirer des formations sans préavis
            </Typography>
          </Box>
        </Box>

        {/* Article 9 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle sx={{ color: '#16f98a' }} />
            Article 9 - Suspension et Résiliation
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B' }}>
              9.1 Suspension par Payvilus
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Payvilus se réserve le droit de suspendre ou de fermer un compte utilisateur en cas de :
              <br/>• Non-respect des présentes CGU
              <br/>• Suspicion d'activité frauduleuse ou illégale
              <br/>• Défaut de paiement de l'abonnement (après 7 jours)
              <br/>• Comportement abusif envers le support client
              <br/>• Tentative de manipulation du système
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              9.2 Résiliation par l'Utilisateur
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              • L'Utilisateur peut résilier son compte à tout moment depuis son tableau de bord
              <br/>• Les abonnements en cours restent actifs jusqu'à la fin de la période payée
              <br/>• Aucun remboursement n'est effectué pour les périodes non utilisées
              <br/>• Les formations achetées restent accessibles pendant 30 jours après résiliation
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#010F1B', mt: 3 }}>
              9.3 Effets de la résiliation
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Après résiliation :
              <br/>• L'accès au compte est immédiatement bloqué
              <br/>• Les données personnelles sont conservées selon l'Article 6.5
              <br/>• Les transactions en cours sont traitées normalement
              <br/>• Aucune nouvelle transaction ne peut être initiée
            </Typography>
          </Box>
        </Box>

        {/* Article 10 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle sx={{ color: '#16f98a' }} />
            Article 10 - Modifications des CGU
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Payvilus se réserve le droit de modifier les présentes CGU à tout moment. Les modifications seront :
              <br/>• Publiées sur cette page avec la nouvelle date de mise à jour
              <br/>• Notifiées aux Utilisateurs par email au moins 30 jours avant leur entrée en vigueur
              <br/>• Considérées comme acceptées si l'Utilisateur continue d'utiliser les services après notification
              <br/><br/>
              En cas de désaccord avec les nouvelles CGU, l'Utilisateur peut résilier son compte avant leur entrée en vigueur.
            </Typography>
          </Box>
        </Box>

        {/* Article 11 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle sx={{ color: '#16f98a' }} />
            Article 11 - Propriété Intellectuelle
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              • L'ensemble du contenu de la plateforme Payvilus (textes, images, logos, vidéos, code source) est protégé par le droit d'auteur
              <br/>• La marque "Payvilus" et le logo sont la propriété exclusive de Waviloid Studio
              <br/>• Toute reproduction, distribution ou utilisation sans autorisation est interdite
              <br/>• Les contenus créés par les Utilisateurs (commentaires, avis) restent leur propriété mais Payvilus dispose d'une licence d'utilisation
            </Typography>
          </Box>
        </Box>

        {/* Article 12 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle sx={{ color: '#16f98a' }} />
            Article 12 - Droit Applicable et Juridiction
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              <strong>12.1 Droit applicable</strong>
              <br/>Les présentes CGU sont régies par le droit malgache. En cas de conflit de lois, la loi malgache s'applique.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              <strong>12.2 Résolution des litiges</strong>
              <br/>En cas de litige, l'Utilisateur doit d'abord contacter le support Payvilus (support@payvilus.com) pour tenter
              une résolution amiable. Si aucun accord n'est trouvé dans un délai de 30 jours, le litige sera soumis aux tribunaux
              compétents d'Antananarivo, Madagascar.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              <strong>12.3 Médiation</strong>
              <br/>Conformément à la législation malgache, l'Utilisateur peut recourir à un médiateur agréé avant toute action judiciaire.
            </Typography>
          </Box>
        </Box>

        {/* Article 13 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#010F1B', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle sx={{ color: '#16f98a' }} />
            Article 13 - Contact et Support
          </Typography>
          <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Pour toute question concernant les présentes CGU ou l'utilisation de Payvilus :
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, fontWeight: 600 }}>
              <strong>Email :</strong> support@payvilus.com
              <br/><strong>Site web :</strong> payvilus.store
              <br/><strong>Adresse :</strong> Waviloid Studio, Antananarivo, Madagascar
              <br/><strong>Horaires support :</strong> Lundi - Vendredi, 8h00 - 18h00 (GMT+3)
            </Typography>
          </Box>
        </Box>

        {/* Acceptation */}
        <Alert severity="success" sx={{ mt: 6, fontSize: '1rem' }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            ✅ Acceptation des Conditions
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
            En créant un compte sur Payvilus, vous reconnaissez avoir lu, compris et accepté l'intégralité des présentes
            Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
          </Typography>
        </Alert>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: '#010F1B', color: 'white', py: 6, mt: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ textAlign: 'center', color: '#94a3b8' }}>
            © {new Date().getFullYear()} Payvilus - Waviloid Studio. Tous droits réservés. | Made with ❤️ in Madagascar
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <a href="/about" style={{ color: '#16f98a', textDecoration: 'none', marginRight: 20 }}>À propos</a>
            <a href="/terms" style={{ color: '#16f98a', textDecoration: 'none', marginRight: 20 }}>Conditions d'utilisation</a>
            <a href="/about#contact" style={{ color: '#16f98a', textDecoration: 'none' }}>Contact</a>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}