// src/pages/deposit-flow/components/MobileMoneyForm.jsx
import { Box, TextField, MenuItem, Typography, Alert } from '@mui/material'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'

export default function MobileMoneyForm({
                                            operator, setOperator, mobileAccount, setMobileAccount,
                                            transactionId, setTransactionId, transactionDate, setTransactionDate, errors
                                        }) {
    const operators = [
        { value: 'Orange Money', label: 'Orange Money' },
        { value: 'Airtel Money', label: 'Airtel Money' },
        { value: 'MVola', label: 'MVola' }
    ]

    return (
        <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 3, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#010F1B' }}>
                Détails Mobile Money
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    select
                    label="Opérateur Mobile Money"
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    error={!!errors.operator}
                    helperText={errors.operator || "Sélectionnez l'opérateur utilisé"}
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
                    label="Numéro Mobile Money"
                    type="tel"
                    placeholder="034 12 345 67"
                    value={mobileAccount}
                    onChange={(e) => setMobileAccount(e.target.value)}
                    error={!!errors.mobileAccount}
                    helperText={errors.mobileAccount || "Numéro du compte d'envoi"}
                    required
                    fullWidth
                />

                <TextField
                    label="ID Transaction Mobile Money"
                    type="text"
                    placeholder="Ex: MP210515.1234.C12345"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    error={!!errors.transactionId}
                    helperText={errors.transactionId || "Trouvé dans votre SMS de confirmation"}
                    required
                    fullWidth
                />

                <TextField
                    label="Date de transaction"
                    type="date"
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                    error={!!errors.transactionDate}
                    helperText={errors.transactionDate}
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
            </Box>

            <Alert
                severity="success"
                icon={<VerifiedUserIcon />}
                sx={{ mt: 3, bgcolor: 'rgba(76, 175, 80, 0.1)' }}
            >
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Vérification du compte
                </Typography>
                <Typography variant="caption">
                    Votre compte Mobile Money sera vérifié avec vos informations de profil pour des raisons de sécurité.
                </Typography>
            </Alert>
        </Box>
    )
}