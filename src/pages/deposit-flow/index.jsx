// src/pages/deposit-flow/index.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Container, Button, Typography, Stepper, Step, StepLabel } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../context/AuthContext'
import { useSubscription } from '../../hooks/useSubscription'
import { supabase } from '../../config/supabaseClient'
import { generateReceipt, downloadReceipt } from '../../utils/receiptGenerator'
import AmountInput from './components/AmountInput'
import PaymentInstructions from './components/PaymentInstructions'
import MobileMoneyForm from './components/MobileMoneyForm'
import CaptchaVerification from './components/CaptchaVerification'
import TransactionSummary from './components/TransactionSummary'
import TermsModal from './components/TermsModal'

export default function DepositFlow() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { plan } = useSubscription(user?.id)
    const [profile, setProfile] = useState(null)

    // Form state
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('EUR')
    const [operator, setOperator] = useState('')
    const [mobileAccount, setMobileAccount] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [transactionDate, setTransactionDate] = useState(new Date().toISOString().split('T')[0])
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
    const [isTermsAccepted, setIsTermsAccepted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        fetchProfile()
    }, [user])

    useEffect(() => {
        // ✅ CORRECTION : Validation SANS isTermsAccepted (vérifié dans le modal)
        const valid = amount &&
            parseFloat(amount) > 0 &&
            operator &&
            mobileAccount &&
            transactionId
        // ✅ PAS isTermsAccepted - c'est vérifié dans le modal après le clic !

        console.log('✅ Validation automatique dépôt:', {
            amount: !!amount,
            amountPositif: parseFloat(amount) > 0,
            operator: !!operator,
            mobileAccount: !!mobileAccount,
            transactionId: !!transactionId,
            BOUTON_ACTIF: valid
        })

        setIsFormValid(valid)
    }, [amount, operator, mobileAccount, transactionId]) // ✅ Retirer isTermsAccepted des dépendances

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

    // Calcul du montant MGA selon le plan
    const calculateMGAAmount = () => {
        if (!amount || !plan) return 0
        const amt = parseFloat(amount)
        if (isNaN(amt) || amt <= 0) return 0

        const rates = { EUR: 5450, USD: 4700 }
        const rate = rates[currency]
        const commissionRate = plan.commission_rate / 100
        const multiplier = 1 + commissionRate

        return Math.round(amt * rate * multiplier)
    }

    const mgaAmount = calculateMGAAmount()

    const validateForm = () => {
        const newErrors = {}
        if (!amount || parseFloat(amount) <= 0) newErrors.amount = 'Montant invalide'
        if (parseFloat(amount) < 1) newErrors.amount = 'Minimum 1 ' + currency
        if (!operator) newErrors.operator = 'Sélectionnez un opérateur'
        if (!mobileAccount) newErrors.mobileAccount = 'Numéro requis'
        if (!transactionId) newErrors.transactionId = 'ID transaction requis'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validateForm()) return
        setIsTermsModalOpen(true)
    }

    const handleTermsAccept = async () => {
        setIsSubmitting(true)
        try {
            const ticketNumber = `DEP-${Date.now()}-${Math.floor(Math.random() * 10000)}`

            // Créer transaction
            const { data: transaction, error } = await supabase
                .from('transactions')
                .insert({
                    user_id: user.id,
                    transaction_type: 'deposit',
                    status: 'pending',
                    original_amount: parseFloat(amount),
                    currency: currency,
                    commission_amount: mgaAmount - (parseFloat(amount) * (currency === 'EUR' ? 5450 : 4700)),
                    final_amount_mga: mgaAmount,
                    exchange_rate: currency === 'EUR' ? 5450 : 4700,
                    mobile_money_transaction_id: transactionId,
                    mobile_money_operator: operator,
                    mobile_money_account: mobileAccount,
                    transaction_date: transactionDate
                })
                .select()
                .single()

            if (error) throw error

            // Générer PDF
            const pdf = await generateReceipt(
                {
                    transactionType: 'deposit',
                    amount: parseFloat(amount),
                    currency: currency,
                    finalAmount: mgaAmount,
                    transactionId: transactionId,
                    date: transactionDate,
                    ticketNumber: ticketNumber,
                    operator: operator,
                    mobileMoneyAccount: mobileAccount,
                    commissionRate: plan.commission_rate
                },
                {
                    fullName: `${profile.first_name} ${profile.last_name}`,
                    documentType: profile.id_document_type,
                    documentNumber: profile.id_document_number,
                    address: profile.address,
                    phone: profile.phone,
                    email: user.email || profile.email || 'Non renseigné'
                },
                plan
            )

            // Télécharger le PDF
            downloadReceipt(pdf, ticketNumber)

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
                        to: 'apple.tsyresy@gmail.com',
                        pdfBase64: pdfBase64,
                        ticketNumber: ticketNumber,
                        transactionData: {
                            type: 'deposit',
                            amount: parseFloat(amount),
                            currency: currency,
                            finalAmount: mgaAmount
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

            toast.success('Transaction soumise avec succès !')
            setTimeout(() => navigate('/paypal'), 2000)

        } catch (error) {
            console.error('Erreur:', error)
            toast.error('Erreur lors de la soumission')
        } finally {
            setIsSubmitting(false)
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
                        Dépôt Mobile Money → PayPal
                    </Typography>
                    <Typography color="text.secondary">
                        Échangez votre Mobile Money contre PayPal
                    </Typography>
                </Box>

                {/* Progress Steps */}
                <Stepper activeStep={0} sx={{ mb: 4 }}>
                    <Step><StepLabel>Détails de transaction</StepLabel></Step>
                    <Step><StepLabel>Confirmation</StepLabel></Step>
                </Stepper>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
                    {/* Formulaire principal */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <AmountInput
                            amount={amount}
                            setAmount={setAmount}
                            currency={currency}
                            setCurrency={setCurrency}
                            mgaAmount={mgaAmount}
                            plan={plan}
                            error={errors.amount}
                        />

                        <PaymentInstructions
                            currency={currency}
                            amount={amount}
                            mgaAmount={mgaAmount}
                        />

                        <MobileMoneyForm
                            operator={operator}
                            setOperator={setOperator}
                            mobileAccount={mobileAccount}
                            setMobileAccount={setMobileAccount}
                            transactionId={transactionId}
                            setTransactionId={setTransactionId}
                            transactionDate={transactionDate}
                            setTransactionDate={setTransactionDate}
                            errors={errors}
                        />

                        <CaptchaVerification
                            onVerify={setIsCaptchaVerified}
                            error={errors.captcha}
                        />

                        {/* Submit Button */}
                        <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 3, boxShadow: 1 }}>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={!isFormValid || isSubmitting}
                                onClick={handleSubmit}
                                sx={{
                                    background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                                    color: '#010F1B',
                                    fontWeight: 700,
                                    py: 1.5,
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #3EF0D0, #16f98a)'
                                    }
                                }}
                            >
                                {isSubmitting ? 'Traitement...' : 'Soumettre la transaction'}
                            </Button>
                            <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2, color: 'text.secondary' }}>
                                En soumettant, vous acceptez nos conditions générales
                            </Typography>
                        </Box>
                    </Box>

                    {/* Sidebar Résumé */}
                    <Box>
                        <TransactionSummary
                            amount={amount}
                            currency={currency}
                            mgaAmount={mgaAmount}
                            plan={plan}
                            operator={operator}
                            transactionId={transactionId}
                        />
                    </Box>
                </Box>
            </Container>

            <TermsModal
                isOpen={isTermsModalOpen}
                onClose={() => setIsTermsModalOpen(false)}
                onAccept={handleTermsAccept}
                isAccepted={isTermsAccepted}
                setIsAccepted={setIsTermsAccepted}
                isSubmitting={isSubmitting}
            />
        </Box>
    )
}