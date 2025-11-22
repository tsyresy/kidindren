// src/pages/deposit-flow/components/PaymentInstructions.jsx
import { useState } from 'react'
import { Box, Typography, Button, Alert } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

export default function PaymentInstructions({ currency, amount, mgaAmount }) {
    const [copied, setCopied] = useState(false)
    const orangeNumber = "037 69 504 76"
    const recipientName = "Mahay Tsy Resy"

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(orangeNumber.replace(/\s/g, ''))
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Erreur copie:', err)
        }
    }

    if (!amount || parseFloat(amount) <= 0) return null

    return (
        <Box sx={{
            background: 'linear-gradient(135deg, rgba(22, 249, 138, 0.05), rgba(62, 240, 208, 0.05))',
            border: '1px solid rgba(22, 249, 138, 0.2)',
            borderRadius: 3,
            p: 3
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#16f98a',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <PhoneAndroidIcon sx={{ color: 'white' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#010F1B' }}>
                    Instructions de paiement
                </Typography>
            </Box>

            <Box sx={{ bgcolor: 'white', borderRadius: 2, p: 3, mb: 2, border: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#010F1B' }}>
                    Envoyez le paiement Mobile Money à :
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Numéro Orange Money
                            </Typography>
                            <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                                {orangeNumber}
                            </Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                            onClick={handleCopy}
                            sx={{
                                borderColor: '#16f98a',
                                color: '#16f98a',
                                '&:hover': {
                                    borderColor: '#16f98a',
                                    bgcolor: 'rgba(22, 249, 138, 0.1)'
                                }
                            }}
                        >
                            {copied ? 'Copié !' : 'Copier'}
                        </Button>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Nom du destinataire
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {recipientName}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Montant à envoyer
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#16f98a' }}>
                            {mgaAmount.toLocaleString('fr-FR')} MGA
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Alert
                severity="warning"
                icon={<WarningAmberIcon />}
                sx={{
                    bgcolor: 'rgba(255, 152, 0, 0.1)',
                    border: '1px solid rgba(255, 152, 0, 0.3)'
                }}
            >
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Instructions importantes :
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2, fontSize: '0.875rem' }}>
                    <li>Envoyez exactement {mgaAmount.toLocaleString('fr-FR')} MGA</li>
                    <li>Conservez votre reçu Mobile Money</li>
                    <li>Entrez l'ID de transaction ci-dessous</li>
                    <li>Traitement : 5-15 minutes après vérification</li>
                </Box>
            </Alert>
        </Box>
    )
}