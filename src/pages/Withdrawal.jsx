// src/pages/Withdrawal.jsx
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box, Container, Typography, TextField, Select, MenuItem, FormControl,
    InputLabel, Button, Alert, Dialog, DialogTitle, DialogContent, DialogActions,
    Card, CardContent, Grid, Chip, InputAdornment
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import WarningIcon from '@mui/icons-material/Warning'
import InfoIcon from '@mui/icons-material/Info'
import ReCAPTCHA from 'react-google-recaptcha'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useSubscription } from '../hooks/useSubscription'
import { supabase } from '../config/supabaseClient'
import { generateReceipt, downloadReceipt } from '../utils/receiptGenerator'

export default function Withdrawal() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { plan, calculateCommission } = useSubscription(user?.id)
    const recaptchaRef = useRef()

    const [formData, setFormData] = useState({
        amount: '',
        currency: 'EUR',
        paypalTransactionId: '',
        operator: '',
        mobileAccount: ''
    })
    const [finalAmount, setFinalAmount] = useState(0)
    const [captchaVerified, setCaptchaVerified] = useState(false)
    const [termsOpen, setTermsOpen] = useState(false)
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [loading, setLoading] = useState(false)

    const RATES = {
        EUR: 4800,
        USD: 4500
    }

    const handleAmountChange = (e) => {
        const amount = parseFloat(e.target.value) || 0
        setFormData({ ...formData, amount: e.target.value })

        const rate = RATES[formData.currency]
        const baseAmount = amount * rate
        const commission = calculateCommission(baseAmount)
        setFinalAmount(baseAmount - commission)
    }

    const handleCurrencyChange = (e) => {
        const currency = e.target.value
        setFormData({ ...formData, currency })

        if (formData.amount) {
            const amount = parseFloat(formData.amount)
            const rate = RATES[currency]
            const baseAmount = amount * rate
            const commission = calculateCommission(baseAmount)
            setFinalAmount(baseAmount - commission)
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Copié !')
    }

    const isFormValid = () => {
        return (
            formData.amount &&
            parseFloat(formData.amount) > 0 &&
            formData.paypalTransactionId.trim() &&
            formData.operator &&
            formData.mobileAccount.trim() &&
            captchaVerified &&
            termsAccepted
        )
    }

    const handleSubmit = async () => {
        if (!isFormValid()) {
            toast.error('Veuillez remplir tous les champs')
            return
        }

        setLoading(true)

        try {
            // Récupérer les infos utilisateur
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            const ticketNumber = `PV${Date.now()}`
            const transactionDate = new Date().toISOString().split('T')[0]

            // Créer la transaction
            const { data: transaction, error: transError } = await supabase
                .from('transactions')
                .insert({
                    user_id: user.id,
                    transaction_type: 'withdrawal',
                    status: 'pending',
                    original_amount: parseFloat(formData.amount),
                    currency: formData.currency,
                    commission_amount: calculateCommission(parseFloat(formData.amount) * RATES[formData.currency]),
                    final_amount_mga: finalAmount,
                    exchange_rate: RATES[formData.currency],
                    paypal_transaction_id: formData.paypalTransactionId,
                    mobile_money_operator: formData.operator,
                    mobile_money_account: formData.mobileAccount,
                    ticket_number: ticketNumber,
                    transaction_date: transactionDate
                })
                .select()
                .single()

            if (transError) throw transError

            // Générer le reçu PDF
            const pdf = await generateReceipt(
                {
                    transactionType: 'withdrawal',
                    amount: parseFloat(formData.amount),
                    currency: formData.currency,
                    finalAmount: finalAmount,
                    transactionId: formData.paypalTransactionId,
                    date: transactionDate,
                    ticketNumber,
                    operator: formData.operator,
                    mobileMoneyAccount: formData.mobileAccount,
                    commissionRate: plan?.commission_rate || 15
                },
                {
                    fullName: `${profile.first_name} ${profile.last_name}`,
                    documentType: profile.id_document_type,
                    documentNumber: profile.id_document_number,
                    address: profile.address,
                    phone: profile.phone,
                    email: user.email
                },
                { name: plan?.name || 'Free' }
            )

            // Télécharger le PDF
            downloadReceipt(pdf, ticketNumber)

            toast.success('Transaction enregistrée ! Reçu téléchargé.')

            setTimeout(() => navigate('/paypal'), 2000)
        } catch (error) {
            console.error('Erreur:', error)
            toast.error('Erreur lors de la transaction')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #05220B 0%, #010F1B 100%)' }}>
            <Toaster position="top-right" />
            <Navbar />

            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" sx={{ color: '#F8F8F8', mb: 3, fontWeight: 700 }}>
                    📤 Retrait (PayPal → Mobile Money)
                </Typography>

                <Card>
                    <CardContent sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                            {/* Montant */}
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Montant"
                                    type="number"
                                    value={formData.amount}
                                    onChange={handleAmountChange}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">{formData.currency}</InputAdornment>
                                    }}
                                />
                            </Grid>

                            {/* Devise */}
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Devise</InputLabel>
                                    <Select
                                        value={formData.currency}
                                        onChange={handleCurrencyChange}
                                        label="Devise"
                                    >
                                        <MenuItem value="EUR">EUR (€)</MenuItem>
                                        <MenuItem value="USD">USD ($)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Montant final */}
                            {finalAmount > 0 && (
                                <Grid item xs={12}>
                                    <Alert severity="success" icon={<InfoIcon />}>
                                        <Typography variant="h6">
                                            Montant à recevoir : <strong>{finalAmount.toLocaleString('fr-FR')} MGA</strong>
                                        </Typography>
                                        <Typography variant="caption">
                                            Après commission de {plan?.commission_rate || 15}%
                                        </Typography>
                                    </Alert>
                                </Grid>
                            )}

                            {/* Adresse PayPal */}
                            <Grid item xs={12}>
                                <Card sx={{ background: 'linear-gradient(135deg, #3EF0D0 0%, #16f98a 100%)', color: '#010F1B' }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                                            💳 Adresse PayPal pour envoi
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                            <Chip
                                                label="mahaytsyresy.mahavonjy@hotmail.com"
                                                sx={{ fontWeight: 700, fontSize: '0.9rem' }}
                                            />
                                            <Button
                                                size="small"
                                                startIcon={<ContentCopyIcon />}
                                                onClick={() => copyToClipboard('mahaytsyresy.mahavonjy@hotmail.com')}
                                            >
                                                Copier
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Alertes */}
                            <Grid item xs={12}>
                                <Alert severity="warning" icon={<WarningIcon />} sx={{ mb: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        ⚠️ Si disponible, choisissez "Amis & Famille" au lieu de "Biens & Services" pour éviter les frais supplémentaires
                                    </Typography>
                                </Alert>
                                <Alert severity="info">
                                    <Typography variant="body2">
                                        ℹ️ Ne quittez pas cette page avant d'avoir terminé, puis collez la référence de transaction PayPal ci-dessous
                                    </Typography>
                                </Alert>
                            </Grid>

                            {/* ID Transaction PayPal */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="ID Transaction PayPal"
                                    value={formData.paypalTransactionId}
                                    onChange={(e) => setFormData({ ...formData, paypalTransactionId: e.target.value })}
                                    helperText="Collez la référence de votre transaction PayPal"
                                />
                            </Grid>

                            {/* Opérateur */}
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth required>
                                    <InputLabel>Opérateur Mobile Money</InputLabel>
                                    <Select
                                        value={formData.operator}
                                        onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                                        label="Opérateur Mobile Money"
                                    >
                                        <MenuItem value="Airtel Money">Airtel Money</MenuItem>
                                        <MenuItem value="MVola">MVola</MenuItem>
                                        <MenuItem value="Orange Money">Orange Money</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Compte Mobile Money */}
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Compte Mobile Money de réception"
                                    value={formData.mobileAccount}
                                    onChange={(e) => setFormData({ ...formData, mobileAccount: e.target.value })}
                                    helperText="Votre numéro de téléphone"
                                />
                            </Grid>

                            {/* Date */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Date"
                                    value={new Date().toLocaleDateString('fr-FR')}
                                    disabled
                                />
                            </Grid>

                            {/* CAPTCHA */}
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                        onChange={(value) => setCaptchaVerified(!!value)}
                                    />
                                </Box>
                            </Grid>

                            {/* Conditions */}
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => setTermsOpen(true)}
                                    >
                                        Lire les conditions
                                    </Button>
                                    <Button
                                        variant={termsAccepted ? 'contained' : 'outlined'}
                                        size="small"
                                        color={termsAccepted ? 'success' : 'inherit'}
                                        onClick={() => setTermsAccepted(!termsAccepted)}
                                    >
                                        {termsAccepted ? 'Conditions acceptées ✓' : 'Accepter les conditions'}
                                    </Button>
                                </Box>
                            </Grid>

                            {/* Bouton Soumettre */}
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={!isFormValid() || loading}
                                    onClick={handleSubmit}
                                    sx={{
                                        py: 2,
                                        background: 'linear-gradient(135deg, #3EF0D0, #16f98a)',
                                        color: '#010F1B',
                                        fontWeight: 700,
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {loading ? 'Traitement...' : 'Soumettre la demande'}
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>

            {/* Dialog Conditions */}
            <Dialog open={termsOpen} onClose={() => setTermsOpen(false)} maxWidth="md">
                <DialogTitle>Termes et Conditions</DialogTitle>
                <DialogContent>
                    <Typography paragraph>
                        En utilisant ce service, vous acceptez :
                    </Typography>
                    <Typography component="ul">
                        <li>De fournir des informations exactes et vérifiables</li>
                        <li>Que les transactions sont traitées selon votre plan d'abonnement</li>
                        <li>Les délais de traitement : {plan?.processing_time_min}-{plan?.processing_time_max} minutes</li>
                        <li>La commission de {plan?.commission_rate}% sur les transactions</li>
                        <li>Toute fraude entraînera la suspension immédiate du compte</li>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTermsOpen(false)}>Fermer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}