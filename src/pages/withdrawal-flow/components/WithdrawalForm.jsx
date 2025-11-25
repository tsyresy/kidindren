// src/pages/withdrawal-flow/components/WithdrawalForm.jsx - CORRECTION DU BUG
import { useState, useEffect } from 'react'
import { Box, TextField, MenuItem, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Alert, Checkbox, FormControlLabel } from '@mui/material'
import ReCAPTCHA from 'react-google-recaptcha'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import CalculateIcon from '@mui/icons-material/Calculate'
import ShieldIcon from '@mui/icons-material/Shield'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function WithdrawalForm({ onSubmit, plan }) {
    const [formData, setFormData] = useState({
        amount: '',
        currency: 'EUR',
        mobileOperator: '',
        mobileNumber: '',
        paypalTransactionId: '',
        captchaCompleted: false,
        termsAccepted: false
    })

    const [calculatedMGA, setCalculatedMGA] = useState(0)
    const [showTermsModal, setShowTermsModal] = useState(false)
    const [errors, setErrors] = useState({})
    const [isFormValid, setIsFormValid] = useState(false)

    const currencies = [
        { value: 'EUR', label: 'EUR (Euro)' },
        { value: 'USD', label: 'USD (Dollar US)' }
    ]

    const operators = [
        { value: 'Orange Money', label: 'Orange Money' },
        { value: 'Airtel Money', label: 'Airtel Money' },
        { value: 'MVola', label: 'MVola' }
    ]

    useEffect(() => {
        if (formData.amount && plan) {
            const amount = parseFloat(formData.amount)
            if (!isNaN(amount) && amount > 0) {
                const rate = formData.currency === 'EUR' ? 4800 : 4500
                const baseAmount = amount * rate
                // ✅ CORRECTION ICI : || remplacé par ??
                const commissionRate = (plan.commission_rate ?? 15) / 100
                const finalAmount = baseAmount * (1 - commissionRate)
                setCalculatedMGA(Math.round(finalAmount))
            } else {
                setCalculatedMGA(0)
            }
        } else {
            setCalculatedMGA(0)
        }
    }, [formData.amount, formData.currency, plan])

    useEffect(() => {
        const isValid =
            formData.amount &&
            parseFloat(formData.amount) > 0 &&
            formData.currency &&
            formData.mobileOperator &&
            formData.mobileNumber &&
            formData.paypalTransactionId &&
            formData.captchaCompleted &&
            formData.termsAccepted

        setIsFormValid(isValid)
    }, [formData])

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
    }

    const handleCaptcha = (token) => {
        setFormData(prev => ({ ...prev, captchaCompleted: !!token }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isFormValid) {
            onSubmit(formData, calculatedMGA)
        }
    }

    return (
        <>
            <Box sx={{ bgcolor: 'white', borderRadius: 3, p: 3, boxShadow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{
                        width: 40,
                        height: 40,
                        bgcolor: '#4caf50',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <ArrowUpwardIcon sx={{ color: 'white' }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#010F1B' }}>
                            Détails du retrait
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Échange PayPal vers Mobile Money
                        </Typography>
                    </Box>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Montant et devise */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                            <TextField
                                label="Montant"
                                type="number"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) => handleInputChange('amount', e.target.value)}
                                error={!!errors.amount}
                                helperText={errors.amount}
                                required
                                fullWidth
                                inputProps={{ min: 1, step: 0.01 }}
                            />
                            <TextField
                                select
                                label="Devise"
                                value={formData.currency}
                                onChange={(e) => handleInputChange('currency', e.target.value)}
                                required
                                fullWidth
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>

                        {/* Calcul MGA */}
                        {calculatedMGA > 0 && (
                            <Box sx={{
                                bgcolor: '#f0fdf4',
                                border: '1px solid #4caf50',
                                borderRadius: 2,
                                p: 2
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <CalculateIcon sx={{ fontSize: 18, color: '#4caf50' }} />
                                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#4caf50' }}>
                                        Montant calculé
                                    </Typography>
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#4caf50' }}>
                                    {calculatedMGA.toLocaleString('fr-FR')} MGA
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {/* ✅ CORRECTION ICI : || remplacé par ?? */}
                                    Après déduction de {plan?.commission_rate ?? 15}% • Taux: {formData.currency === 'EUR' ? '4 800' : '4 500'} MGA/{formData.currency}
                                </Typography>
                            </Box>
                        )}

                        {/* Détails Mobile Money */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                            <TextField
                                select
                                label="Opérateur Mobile Money"
                                value={formData.mobileOperator}
                                onChange={(e) => handleInputChange('mobileOperator', e.target.value)}
                                error={!!errors.mobileOperator}
                                helperText={errors.mobileOperator}
                                required
                                fullWidth
                            >
                                {operators.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Numéro Mobile"
                                type="tel"
                                placeholder="034 12 345 67"
                                value={formData.mobileNumber}
                                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                                error={!!errors.mobileNumber}
                                helperText={errors.mobileNumber || "Vérifiez que ce numéro est correct"}
                                required
                                fullWidth
                            />
                        </Box>

                        {/* ID Transaction PayPal */}
                        <TextField
                            label="ID de Transaction PayPal"
                            type="text"
                            placeholder="Ex: 1AB23456CD789012E"
                            value={formData.paypalTransactionId}
                            onChange={(e) => handleInputChange('paypalTransactionId', e.target.value)}
                            error={!!errors.paypalTransactionId}
                            helperText={errors.paypalTransactionId || "Trouvé dans votre historique PayPal"}
                            required
                            fullWidth
                        />

                        {/* CAPTCHA */}
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600 }}>
                                Vérification de sécurité
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                <ReCAPTCHA
                                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                    onChange={handleCaptcha}
                                    onExpired={() => handleCaptcha(null)}
                                />
                                {formData.captchaCompleted && (
                                    <Alert
                                        severity="success"
                                        icon={<CheckCircleIcon />}
                                        sx={{ width: '100%' }}
                                    >
                                        Vérification de sécurité complétée
                                    </Alert>
                                )}
                            </Box>
                        </Box>

                        {/* Conditions */}
                        <Box>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.termsAccepted}
                                        onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                                        sx={{
                                            color: '#16f98a',
                                            '&.Mui-checked': { color: '#16f98a' }
                                        }}
                                    />
                                }
                                label={
                                    <Typography variant="body2">
                                        J'accepte les Conditions Générales d'Utilisation
                                    </Typography>
                                }
                                required
                            />
                            <Button
                                variant="text"
                                size="small"
                                onClick={() => setShowTermsModal(true)}
                                sx={{ ml: 4, color: '#16f98a', textTransform: 'none' }}
                            >
                                Lire les conditions
                            </Button>
                        </Box>

                        {/* Submit */}
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={!isFormValid}
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
                            Traiter le retrait
                        </Button>
                    </Box>
                </form>
            </Box>

            {/* Terms Modal */}
            <Dialog open={showTermsModal} onClose={() => setShowTermsModal(false)} maxWidth="md" fullWidth>
                <DialogTitle>Conditions Générales d'Utilisation</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" paragraph>
                        <strong>1. Accord de Service:</strong> En utilisant Payvilus, vous acceptez toutes les conditions.
                    </Typography>
                    <Typography variant="body2" paragraph>
                        <strong>2. Traitement:</strong> Les transactions prennent 1-24 heures pour vérification manuelle.
                    </Typography>
                    <Typography variant="body2" paragraph>
                        {/* ✅ CORRECTION ICI : || remplacé par ?? */}
                        <strong>3. Frais:</strong> Des frais de {plan?.commission_rate ?? 15}% s'appliquent selon votre plan.
                    </Typography>
                    <Typography variant="body2" paragraph>
                        <strong>4. Conformité:</strong> Service conforme à la Loi malgache N° 2014-006.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowTermsModal(false)} sx={{ color: '#16f98a' }}>
                        J'ai compris
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}