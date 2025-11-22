// src/pages/deposit-flow/components/TransactionSummary.jsx
import { Box, Typography, Divider, Alert } from '@mui/material'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function TransactionSummary({ amount, currency, mgaAmount, plan, operator, transactionId }) {
    if (!amount || parseFloat(amount) <= 0) return null

    const rate = currency === 'EUR' ? 5450 : 4700
    const baseAmount = parseFloat(amount) * rate
    const serviceFee = baseAmount * (plan?.commission_rate || 15) / 100

    return (
        <Box sx={{
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(22, 249, 138, 0.05))',
            border: '1px solid rgba(76, 175, 80, 0.2)',
            borderRadius: 3,
            p: 3
        }}>
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
                    <ReceiptLongIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#010F1B' }}>
                        Résumé
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Détails de votre transaction
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="body2" color="text.secondary">
                        Montant échange
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {amount} {currency}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="body2" color="text.secondary">
                        Taux de change
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        1 {currency} = {rate.toLocaleString('fr-FR')} MGA
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="body2" color="text.secondary">
                        Montant de base
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {baseAmount.toLocaleString('fr-FR')} MGA
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #e0e0e0' }}>
                    <Typography variant="body2" color="text.secondary">
                        Frais ({plan?.commission_rate || 15}%)
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        +{serviceFee.toLocaleString('fr-FR')} MGA
                    </Typography>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 2,
                    bgcolor: 'rgba(22, 249, 138, 0.1)',
                    borderRadius: 2,
                    px: 2
                }}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        Total à payer
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#16f98a' }}>
                        {mgaAmount.toLocaleString('fr-FR')} MGA
                    </Typography>
                </Box>

                {operator && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                            Opérateur
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {operator}
                        </Typography>
                    </Box>
                )}

                {transactionId && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                            ID Transaction
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                            {transactionId}
                        </Typography>
                    </Box>
                )}
            </Box>

            <Alert
                severity="info"
                icon={<AccessTimeIcon />}
                sx={{ mt: 3, bgcolor: 'rgba(255, 152, 0, 0.1)' }}
            >
                <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                    Temps de traitement
                </Typography>
                <Typography variant="caption">
                    Votre PayPal sera crédité dans {plan?.processing_time_min || 20}-{plan?.processing_time_max || 120} minutes après vérification.
                </Typography>
            </Alert>
        </Box>
    )
}