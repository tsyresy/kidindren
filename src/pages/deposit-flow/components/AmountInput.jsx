// src/pages/deposit-flow/components/AmountInput.jsx - CORRECTION DU BUG
import { Box, TextField, MenuItem, Typography } from '@mui/material'

export default function AmountInput({ amount, setAmount, currency, setCurrency, mgaAmount, plan, error }) {
    const currencies = [
        { value: 'EUR', label: 'EUR (Euro)' },
        { value: 'USD', label: 'USD (Dollar US)' }
    ]

    const handleAmountChange = (e) => {
        const value = e.target.value
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setAmount(value)
        }
    }

    return (
        <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 3, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#010F1B' }}>
                Montant de la transaction
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
                <TextField
                    label="Montant"
                    type="text"
                    placeholder="0.00"
                    value={amount}
                    onChange={handleAmountChange}
                    error={!!error}
                    helperText={error}
                    required
                    fullWidth
                    InputProps={{ sx: { fontSize: '1.1rem' } }}
                />

                <TextField
                    select
                    label="Devise"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
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

            {amount && parseFloat(amount) > 0 && (
                <Box sx={{
                    bgcolor: '#f0fdf4',
                    border: '1px solid #16f98a',
                    borderRadius: 2,
                    p: 2
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Vous devez envoyer (MGA) :
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#16f98a' }}>
                            {mgaAmount.toLocaleString('fr-FR')} MGA
                        </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                        {/* ✅ CORRECTION ICI : || remplacé par ?? */}
                        Inclut commission de {plan?.commission_rate ?? 15}% • Plan {plan?.name || 'Free'}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}