// src/pages/withdrawal-flow/index.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Container, Button, Typography, Stepper, Step, StepLabel, Alert } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../context/AuthContext'
import { useSubscription } from '../../hooks/useSubscription'
import { supabase } from '../../config/supabaseClient'
import { generateReceipt, downloadReceipt } from '../../utils/receiptGenerator'
import PayPalAddressCard from './components/PayPalAddressCard'
import WithdrawalForm from './components/WithdrawalForm'
import TransactionSummary from './components/TransactionSummary'

export default function WithdrawalFlow() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { plan } = useSubscription(user?.id)
    const [profile, setProfile] = useState(null)
    const [currentStep, setCurrentStep] = useState(1)
    const [transactionData, setTransactionData] = useState(null)

    useEffect(() => {
        fetchProfile()
    }, [user])

    const fetchProfile = async () => {
        if (!user) return
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()
            if (error) throw error
            setProfile(data)
        } catch (err) {
            console.error('Erreur profil:', err)
        }
    }

    const handleFormSubmit = async (formData, calculatedMGA) => {
        console.log('=== DÉBUT SOUMISSION ===')
        console.log('FormData:', formData)
        console.log('CalculatedMGA:', calculatedMGA)
        console.log('Profile:', profile)
        console.log('User:', user)
        console.log('Plan:', plan)

        if (!profile) {
            toast.error('Profil non chargé. Veuillez rafraîchir la page.')
            return
        }

        if (!user) {
            toast.error('Utilisateur non connecté')
            return
        }

        try {
            const ticketNumber = `WTH-${Date.now()}-${Math.floor(Math.random() * 10000)}`
            const transactionDate = new Date().toISOString().split('T')[0]

            console.log('Ticket:', ticketNumber)
            console.log('Date:', transactionDate)

            // Créer transaction
            console.log('Insertion dans Supabase...')
            const { data: transaction, error } = await supabase
                .from('transactions')
                .insert({
                    user_id: user.id,
                    transaction_type: 'withdrawal',
                    status: 'pending',
                    original_amount: parseFloat(formData.amount),
                    currency: formData.currency,
                    commission_amount: (parseFloat(formData.amount) * (formData.currency === 'EUR' ? 4800 : 4500)) - calculatedMGA,
                    final_amount_mga: calculatedMGA,
                    exchange_rate: formData.currency === 'EUR' ? 4800 : 4500,
                    paypal_transaction_id: formData.paypalTransactionId,
                    mobile_money_operator: formData.mobileOperator,
                    mobile_money_account: formData.mobileNumber,
                    transaction_date: transactionDate
                })
                .select()
                .single()

            if (error) {
                console.error('Erreur Supabase:', error)
                throw error
            }

            console.log('Transaction créée:', transaction)

            // Générer PDF
            console.log('Génération PDF...')
            const pdf = await generateReceipt(
                {
                    transactionType: 'withdrawal',
                    amount: parseFloat(formData.amount),
                    currency: formData.currency,
                    finalAmount: calculatedMGA,
                    transactionId: formData.paypalTransactionId,
                    date: transactionDate,
                    ticketNumber: ticketNumber,
                    operator: formData.mobileOperator,
                    mobileMoneyAccount: formData.mobileNumber,
                    commissionRate: plan.commission_rate
                },
                {
                    fullName: `${profile.first_name} ${profile.last_name}`,
                    documentType: profile.id_document_type,
                    documentNumber: profile.id_document_number,
                    address: profile.address,
                    phone: profile.phone,
                    email: user.email || profile.email || 'Non renseigné'  // ✅ Utiliser user.email en priorité
                },
                plan
            )

            console.log('PDF généré')

            downloadReceipt(pdf, ticketNumber)
            console.log('PDF téléchargé')

            // Envoyer l'email avec le PDF
            console.log('=== DÉBUT ENVOI EMAIL ===')
            try {
                const pdfBlob = pdf.output('blob')
                console.log('Blob PDF créé:', pdfBlob.size, 'bytes')

                // Convertir en Base64
                const base64Promise = new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        const base64 = reader.result.split(',')[1]
                        console.log('PDF converti en Base64, taille:', base64.length, 'caractères')
                        resolve(base64)
                    }
                    reader.onerror = reject
                    reader.readAsDataURL(pdfBlob)
                })

                const pdfBase64 = await base64Promise

                console.log('Appel de la fonction bright-task...')
                const { data: emailData, error: emailError } = await supabase.functions.invoke('bright-task', {
                    body: {
                        to: 'apple.tsyresy@gmail.com',  // Votre email Resend vérifié
                        pdfBase64: pdfBase64,
                        ticketNumber: ticketNumber,
                        transactionData: {
                            type: 'withdrawal',
                            amount: parseFloat(formData.amount),
                            currency: formData.currency,
                            finalAmount: calculatedMGA
                        }
                    }
                })

                console.log('Réponse email:', emailData)
                console.log('Erreur email:', emailError)

                if (emailError) {
                    console.error('Erreur envoi email:', emailError)
                    toast.error('Transaction créée mais email non envoyé : ' + emailError.message)
                } else {
                    console.log('✅ Email envoyé avec succès !')
                    toast.success('Email de confirmation envoyé !')
                }
            } catch (emailErr) {
                console.error('Erreur préparation email:', emailErr)
                toast.error('Erreur envoi email : ' + emailErr.message)
            }
            console.log('=== FIN ENVOI EMAIL ===')

            setTransactionData({ ...formData, calculatedMGA, ticketNumber })
            setCurrentStep(2)
            toast.success('Demande de retrait soumise avec succès !')

            console.log('=== FIN SOUMISSION RÉUSSIE ===')

        } catch (error) {
            console.error('=== ERREUR SOUMISSION ===', error)
            toast.error('Erreur: ' + error.message)
        }
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
            <Toaster position="top-right" />
            <Navbar />

            <Container maxWidth="lg" sx={{ pt: 12, pb: 6 }}>
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/paypal')}
                        sx={{ mb: 2, color: '#16f98a' }}
                    >
                        Retour
                    </Button>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#010F1B', mb: 1 }}>
                        Retrait PayPal → Mobile Money
                    </Typography>
                    <Typography color="text.secondary">
                        Convertissez votre solde PayPal en Mobile Money
                    </Typography>
                </Box>

                {/* Progress Steps */}
                <Stepper activeStep={currentStep - 1} sx={{ mb: 4 }}>
                    <Step><StepLabel>Détails de paiement</StepLabel></Step>
                    <Step><StepLabel>Confirmation</StepLabel></Step>
                </Stepper>

                {currentStep === 1 ? (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
                        <PayPalAddressCard />
                        <WithdrawalForm onSubmit={handleFormSubmit} plan={plan} />
                    </Box>
                ) : (
                    /* Confirmation Step */
                    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                        <Box sx={{ bgcolor: 'white', borderRadius: 3, p: 6, boxShadow: 1, textAlign: 'center' }}>
                            <Box sx={{
                                width: 64,
                                height: 64,
                                bgcolor: '#4caf50',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 3
                            }}>
                                <CheckCircleIcon sx={{ fontSize: 40, color: 'white' }} />
                            </Box>

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                                Demande de retrait soumise
                            </Typography>

                            <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
                                Votre demande de retrait a été soumise avec succès. Vous recevrez votre Mobile Money dans un délai de 1 à 24 heures après vérification.
                            </Typography>

                            {transactionData && (
                                <Box sx={{ bgcolor: '#f8f9fa', borderRadius: 2, p: 3, mb: 4, textAlign: 'left' }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                                        Détails de la transaction
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Montant :</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {transactionData.amount} {transactionData.currency}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Vous recevrez :</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#4caf50' }}>
                                                {transactionData.calculatedMGA.toLocaleString('fr-FR')} MGA
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Numéro Mobile :</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                                                {transactionData.mobileNumber}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Ticket :</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '0.75rem' }}>
                                                {transactionData.ticketNumber}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            )}

                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => setCurrentStep(1)}
                                    sx={{ borderColor: '#16f98a', color: '#16f98a' }}
                                >
                                    Nouvelle transaction
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/paypal')}
                                    sx={{
                                        background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                                        color: '#010F1B',
                                        fontWeight: 700
                                    }}
                                >
                                    Retour au tableau de bord
                                </Button>
                            </Box>

                            <Alert severity="info" sx={{ mt: 4, textAlign: 'left' }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                    Prochaines étapes
                                </Typography>
                                <Box component="ul" sx={{ m: 0, pl: 2, fontSize: '0.875rem' }}>
                                    <li>Votre transaction est en cours de vérification manuelle</li>
                                    <li>Vous recevrez une confirmation par SMS une fois traitée</li>
                                    <li>Consultez votre historique pour les mises à jour</li>
                                </Box>
                            </Alert>
                        </Box>
                    </Box>
                )}
            </Container>
        </Box>
    )
}