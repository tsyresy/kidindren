// src/pages/deposit-flow/components/CaptchaVerification.jsx
import { useRef } from 'react'
import { Box, Typography, Alert } from '@mui/material'
import ReCAPTCHA from 'react-google-recaptcha'
import ShieldIcon from '@mui/icons-material/Shield'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function CaptchaVerification({ onVerify, error }) {
    const recaptchaRef = useRef()

    const handleCaptcha = (token) => {
        console.log('CAPTCHA validé:', !!token)
        onVerify(!!token)
    }

    const handleExpired = () => {
        console.log('CAPTCHA expiré')
        onVerify(false)
    }

    return (
        <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 3, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#010F1B' }}>
                Vérification de sécurité
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={handleCaptcha}
                    onExpired={handleExpired}
                    theme="light"
                />

                {error && (
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                )}

                <Alert
                    severity="info"
                    icon={<ShieldIcon />}
                    sx={{ width: '100%', bgcolor: 'rgba(25, 118, 210, 0.1)' }}
                >
                    <Typography variant="caption">
                        Cette vérification protège votre transaction contre la fraude et les tentatives automatisées.
                    </Typography>
                </Alert>
            </Box>
        </Box>
    )
}