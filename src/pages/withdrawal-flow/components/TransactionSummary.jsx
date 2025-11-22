// src/pages/withdrawal-flow/components/TransactionSummary.jsx
import { Box, Typography, Alert } from '@mui/material'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function TransactionSummary({ formData, calculatedMGA, plan }) {
    if (!formData || !formData.amount) return null

    const amount = parseFloat(formData.amount)
    const rate = formData.currency === 'EUR' ? 4800 : 4500
    const baseAmount = amount * rate
    const serviceFee = baseAmount - calculatedMGA

    return (
        <Box sx={{
            bgcolor: 'white',
            borderRadius: 3,
            p: 3,
            boxShadow: 1,
            position: 'sticky',
            top: 100
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#2196f3',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ReceiptLongIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#010F1B' }}>
                        Résumé de transaction
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Vérifiez les détails
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Montant retrait */}
                <Box sx={{ bgcolor: '#f8f9fa', borderRadius: 2, p: 2 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Montant retrait
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {amount} {formData.currency}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Vous recevrez
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#4caf50' }}>
                                {calculatedMGA.toLocaleString('fr-FR')} MGA
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Détails Mobile Money */}
                {formData.mobileOperator && (
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1.5 }}>
                            Détails Mobile Money
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                            <Box sx={{ bgcolor: '#f8f9fa', borderRadius: 1.5, p: 1.5 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Opérateur
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {formData.mobileOperator}
                                </Typography>
                            </Box>
                            <Box sx={{ bgcolor: '#f8f9fa', borderRadius: 1.5, p: 1.5 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Numéro
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                                    {formData.mobileNumber}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}

                {/* ID Transaction */}
                {formData.paypalTransactionId && (
                    <Box sx={{ bgcolor: '#f8f9fa', borderRadius: 2, p: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                            ID Transaction PayPal
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', wordBreak: 'break-all', fontSize: '0.75rem' }}>
                            {formData.paypalTransactionId}
                        </Typography>
                    </Box>
                )}

                {/* Détails des frais */}
                <Box sx={{ borderTop: '1px solid #e0e0e0', pt: 2 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1.5 }}>
                        Détails des frais
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: '0.875rem' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">
                                Montant de base :
                            </Typography>
                            <Typography variant="body2">
                                {baseAmount.toLocaleString('fr-FR')} MGA
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">
                                Frais ({plan?.commission_rate || 15}%) :
                            </Typography>
                            <Typography variant="body2">
                                -{serviceFee.toLocaleString('fr-FR')} MGA
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderTop: '1px solid #e0e0e0',
                            pt: 1.5,
                            mt: 0.5
                        }}>
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                Total :
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: '#4caf50' }}>
                                {calculatedMGA.toLocaleString('fr-FR')} MGA
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Avertissement temps de traitement */}
            <Alert
                severity="info"
                icon={<AccessTimeIcon />}
                sx={{ mt: 3, bgcolor: 'rgba(255, 152, 0, 0.1)' }}
            >
                <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                    Temps de traitement
                </Typography>
                <Typography variant="caption">
                    Vous recevrez votre Mobile Money dans 1-24h après vérification manuelle.
                </Typography>
            </Alert>
        </Box>
    )
}