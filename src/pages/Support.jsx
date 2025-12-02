// src/pages/Support.jsx
import React, { useState } from 'react'
import {
    Box,
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper,
    Divider
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import ChatIcon from '@mui/icons-material/Chat'
import Navbar from '../components/Navbar'
import ChatBot from '../components/ChatBot'

const faqs = [
    {
        question: "Comment créer un compte Payvilus ?",
        answer: "Pour créer un compte, cliquez sur 'Inscription' en haut à droite. Remplissez le formulaire avec vos informations (nom, prénom, email, mot de passe). Vous recevrez un email de confirmation pour activer votre compte."
    },
    {
        question: "Quels sont les délais de traitement des transactions ?",
        answer: "Les délais varient selon votre plan d'abonnement : Plan Free (20-120 min), Plan Standard (10-60 min), Plan Premium (5-15 min). Les transactions sont traitées 7j/7 pendant les heures ouvrables."
    },
    {
        question: "Comment effectuer un dépôt sur mon compte PayPal ?",
        answer: "Rendez-vous dans la section 'PayPal', cliquez sur 'Dépôt', entrez le montant souhaité, et suivez les instructions de paiement Mobile Money (Mvola, Orange Money, Airtel Money). Une fois le paiement effectué, envoyez la preuve de paiement et nous créditerons votre compte PayPal."
    },
    {
        question: "Comment effectuer un retrait de mon compte PayPal ?",
        answer: "Allez dans 'PayPal', cliquez sur 'Retrait', connectez votre compte PayPal, entrez le montant à retirer et choisissez votre mode de réception (Mobile Money). Nous traiterons votre demande selon les délais de votre plan."
    },
    {
        question: "Quels sont les frais de commission ?",
        answer: "Les commissions dépendent de votre plan : Plan Free (15%), Plan Standard (10%), Plan Premium (0%). Aucun frais caché, vous voyez toujours le montant exact avant de valider."
    },
    {
        question: "Comment accéder aux formations gratuites ?",
        answer: "Rendez-vous dans la section 'Formation', parcourez les cours disponibles. Les cours gratuits sont marqués d'un badge 'GRATUIT'. Cliquez simplement sur 'Commencer gratuitement' pour y accéder immédiatement."
    },
    {
        question: "Comment bénéficier de réductions sur les formations ?",
        answer: "Les abonnés Standard bénéficient de 20% de réduction, et les abonnés Premium de 40% de réduction sur tous les cours payants. La réduction s'applique automatiquement lors de l'achat."
    },
    {
        question: "Comment changer mon plan d'abonnement ?",
        answer: "Allez dans 'Choisissez votre plan', sélectionnez le plan souhaité et cliquez sur 'Choisir ce plan'. Vous pouvez upgrader à tout moment. Pour downgrader vers Free, contactez le support."
    },
    {
        question: "Comment contacter le support technique ?",
        answer: "Utilisez le chat en direct ci-dessous pour obtenir une réponse immédiate à vos questions. Notre assistant virtuel est disponible 24/7. Pour des questions complexes, vous pouvez également nous écrire à support@payvilus.com."
    },
    {
        question: "Mes données sont-elles sécurisées ?",
        answer: "Absolument ! Nous utilisons le chiffrement SSL/TLS pour toutes les communications, vos paiements sont sécurisés par Stripe, et vos données personnelles sont stockées de manière confidentielle. Nous ne partageons jamais vos informations avec des tiers."
    }
]

export default function Support() {
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <>
            <Navbar />
            <Box sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
                py: 6
            }}>
                <Container maxWidth="lg">
                    {/* En-tête */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <HelpOutlineIcon sx={{ fontSize: 60, color: '#16f98a', mb: 2 }} />
                        <Typography variant="h3" sx={{ fontWeight: 800, color: '#010F1B', mb: 2 }}>
                            Centre d'Aide
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#6b7280', fontWeight: 400 }}>
                            Trouvez rapidement des réponses à vos questions
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4 }}>
                        {/* Section FAQ */}
                        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <HelpOutlineIcon sx={{ fontSize: 32, color: '#16f98a' }} />
                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#010F1B' }}>
                                    Questions Fréquentes
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 3 }} />

                            {faqs.map((faq, index) => (
                                <Accordion
                                    key={index}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}
                                    sx={{
                                        mb: 2,
                                        '&:before': { display: 'none' },
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        borderRadius: '8px !important',
                                        '&.Mui-expanded': {
                                            boxShadow: '0 4px 12px rgba(22, 249, 138, 0.15)'
                                        }
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{
                                            '& .MuiAccordionSummary-content': {
                                                my: 2
                                            }
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: 600, color: '#010F1B' }}>
                                            {faq.question}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                                        <Typography sx={{ color: '#6b7280', lineHeight: 1.8 }}>
                                            {faq.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Paper>

                        {/* Section Chat */}
                        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, position: 'sticky', top: 100, height: 'fit-content' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <ChatIcon sx={{ fontSize: 32, color: '#16f98a' }} />
                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#010F1B' }}>
                                    Chat en Direct
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 3 }} />

                            <ChatBot />
                        </Paper>
                    </Box>

                    {/* Bloc contact supplémentaire */}
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mt: 4, textAlign: 'center', background: 'linear-gradient(135deg, #16f98a 0%, #3EF0D0 100%)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#010F1B', mb: 2 }}>
                            Besoin d'une assistance personnalisée ?
                        </Typography>
                        <Typography sx={{ color: '#05220B', mb: 3 }}>
                            Notre équipe est disponible par email à <strong>support@payvilus.com</strong>
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#05220B' }}>
                            Temps de réponse moyen : 2-4 heures pendant les heures ouvrables (8h-18h GMT+3)
                        </Typography>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}