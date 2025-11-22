// src/pages/withdrawal-flow/components/PayPalAddressCard.jsx
import { useState } from 'react'
import { Box, Typography, Button, Alert } from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import InfoIcon from '@mui/icons-material/Info'

export default function PayPalAddressCard() {
    const [copied, setCopied] = useState(false)
    const paypalAddress = "mahaytsyresy.mahavonjy@hotmail.com"

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(paypalAddress)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Erreur copie:', err)
        }
    }

    return (
        <Box sx={{ bgcolor: 'white', borderRadius: 3, p: 3, boxShadow: 1, height: 'fit-content', position: 'sticky', top: 100 }}>
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
                    <CreditCardIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#010F1B' }}>
                        Adresse PayPal
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Envoyez votre paiement ici
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ bgcolor: '#f8f9fa', borderRadius: 2, p: 2.5, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            Email PayPal
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, wordBreak: 'break-all' }}>
                            {paypalAddress}
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
                            flexShrink: 0,
                            '&:hover': {
                                borderColor: '#16f98a',
                                bgcolor: 'rgba(22, 249, 138, 0.1)'
                            }
                        }}
                    >
                        {copied ? 'Copié' : 'Copier'}
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Alert
                    severity="warning"
                    icon={<WarningAmberIcon />}
                    sx={{ bgcolor: 'rgba(255, 152, 0, 0.1)' }}
                >
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                        Instructions importantes
                    </Typography>
                    <Typography variant="caption">
                        Veuillez envoyer le paiement en tant que <strong>Amis et Famille</strong> pour éviter des frais supplémentaires.
                    </Typography>
                </Alert>

                <Alert
                    severity="info"
                    icon={<InfoIcon />}
                    sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)' }}
                >
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                        Avertissement de persistance
                    </Typography>
                    <Typography variant="caption">
                        Ne fermez pas et n'actualisez pas cette page tant que votre transaction n'est pas terminée.
                    </Typography>
                </Alert>
            </Box>
        </Box>
    )
}