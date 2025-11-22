// src/pages/deposit-flow/components/TermsModal.jsx
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Checkbox, FormControlLabel } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function TermsModal({ isOpen, onClose, onAccept, isAccepted, setIsAccepted, isSubmitting }) {
    const handleAccept = () => {
        if (isAccepted && !isSubmitting) {
            onAccept()
        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3 }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Conditions Générales d'Utilisation
                </Typography>
                <Button
                    onClick={onClose}
                    sx={{ minWidth: 'auto', p: 1 }}
                    disabled={isSubmitting}
                >
                    <CloseIcon />
                </Button>
            </DialogTitle>

            <DialogContent sx={{ maxHeight: 400, overflowY: 'auto', py: 3 }}>
                <Box sx={{ '& > div': { mb: 3 } }}>
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            1. Description du service
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Payvilus fournit des services d'échange de devises entre Mobile Money (MGA) et PayPal (EUR/USD).
                            Toutes les transactions sont soumises à vérification et aux frais de traitement.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            2. Frais de transaction
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Des frais de service sont appliqués selon votre plan d'abonnement. Les taux de change sont :
                            <br />• EUR : 1 EUR = 5 450 MGA (avant frais)
                            <br />• USD : 1 USD = 4 700 MGA (avant frais)
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            3. Temps de traitement
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Les transactions sont traitées selon votre plan d'abonnement après vérification réussie.
                            Le traitement peut prendre plus de temps pendant les heures de pointe.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            4. Exigences de vérification
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Toutes les transactions nécessitent un ID de transaction Mobile Money valide et une vérification du compte.
                            Les fausses informations peuvent entraîner le rejet de la transaction et la suspension du compte.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            5. Politique de remboursement
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Les remboursements sont traités uniquement en cas d'erreurs système ou de transactions échouées.
                            Les frais de service ne sont pas remboursables pour les transactions complétées.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            6. Conformité légale
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Ce service opère conformément à la Loi malgache sur la Cybercriminalité N° 2014-006
                            et aux réglementations financières internationales.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            7. Responsabilité
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Payvilus n'est pas responsable des retards, pertes ou dommages résultant de systèmes de paiement tiers,
                            de problèmes de réseau ou d'erreurs utilisateur.
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3, borderTop: '1px solid #e0e0e0', bgcolor: '#f8f9fa', flexDirection: 'column', alignItems: 'stretch', gap: 2 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isAccepted}
                            onChange={(e) => setIsAccepted(e.target.checked)}
                            disabled={isSubmitting}
                            sx={{
                                color: '#16f98a',
                                '&.Mui-checked': {
                                    color: '#16f98a'
                                }
                            }}
                        />
                    }
                    label={
                        <Typography variant="body2">
                            J'ai lu et j'accepte les Conditions Générales d'Utilisation et je comprends les frais de service
                            et les exigences de traitement.
                        </Typography>
                    }
                />

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleAccept}
                        disabled={!isAccepted || isSubmitting}
                        sx={{
                            background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                            color: '#010F1B',
                            fontWeight: 700,
                            '&:hover': {
                                background: 'linear-gradient(135deg, #3EF0D0, #16f98a)'
                            }
                        }}
                    >
                        {isSubmitting ? 'Traitement...' : 'Accepter et continuer'}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}