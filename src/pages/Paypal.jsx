// src/pages/Paypal.jsx - CORRECTION DU BUG commission_rate: 0
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Alert,
    AlertTitle
} from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import SendIcon from '@mui/icons-material/Send'
import GetAppIcon from '@mui/icons-material/GetApp'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useSubscription } from '../hooks/useSubscription'
import { supabase } from '../config/supabaseClient'
import '../styles/Membership.css'

export default function Paypal() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { plan } = useSubscription(user?.id)
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchTransactions()
    }, [user])

    const fetchTransactions = async () => {
        if (!user) return

        try {
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(10)

            if (error) throw error
            setTransactions(data || [])
        } catch (err) {
            console.error('Erreur récupération transactions:', err)
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        const colors = {
            pending: 'warning',
            processing: 'info',
            completed: 'success',
            failed: 'error',
            cancelled: 'default'
        }
        return colors[status] || 'default'
    }

    const getStatusLabel = (status) => {
        const labels = {
            pending: 'En attente',
            processing: 'En cours',
            completed: 'Complété',
            failed: 'Échoué',
            cancelled: 'Annulé'
        }
        return labels[status] || status
    }

    const getTypeLabel = (type) => {
        return type === 'deposit' ? 'Dépôt' : 'Retrait'
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: '#010F1B' }}>
                    Transactions PayPal
                </Typography>

                {/* Boutons principaux */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                height: '100%',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 24px rgba(22, 249, 138, 0.2)'
                                }
                            }}
                            onClick={() => navigate('/paypal/deposit')}
                        >
                            <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                <GetAppIcon sx={{ fontSize: 60, color: '#16f98a', mb: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                    Dépôt
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Mobile Money → PayPal
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        mt: 2,
                                        background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                                        color: '#010F1B',
                                        fontWeight: 700
                                    }}
                                >
                                    Effectuer un dépôt
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                height: '100%',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 24px rgba(62, 240, 208, 0.2)'
                                }
                            }}
                            onClick={() => navigate('/paypal/withdrawal')}
                        >
                            <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                <SendIcon sx={{ fontSize: 60, color: '#3EF0D0', mb: 2 }} />
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                    Retrait
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    PayPal → Mobile Money
                                </Typography>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        mt: 2,
                                        borderColor: '#3EF0D0',
                                        color: '#3EF0D0',
                                        fontWeight: 700,
                                        '&:hover': {
                                            borderColor: '#16f98a',
                                            backgroundColor: 'rgba(62, 240, 208, 0.1)'
                                        }
                                    }}
                                >
                                    Effectuer un retrait
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Historique des transactions */}
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                            Historique des transactions
                        </Typography>

                        {loading ? (
                            <Typography>Chargement...</Typography>
                        ) : transactions.length === 0 ? (
                            <Alert severity="info">
                                <AlertTitle>Aucune transaction</AlertTitle>
                                Vous n'avez pas encore effectué de transaction.
                            </Alert>
                        ) : (
                            <TableContainer component={Paper} variant="outlined">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Date</strong></TableCell>
                                            <TableCell><strong>Type</strong></TableCell>
                                            <TableCell><strong>Montant</strong></TableCell>
                                            <TableCell><strong>Statut</strong></TableCell>
                                            <TableCell><strong>Opérateur</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {transactions.map((transaction) => (
                                            <TableRow key={transaction.id}>
                                                <TableCell>
                                                    {new Date(transaction.transaction_date).toLocaleDateString('fr-FR')}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={getTypeLabel(transaction.transaction_type)}
                                                        size="small"
                                                        color={transaction.transaction_type === 'deposit' ? 'success' : 'primary'}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {transaction.original_amount} {transaction.currency}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={getStatusLabel(transaction.status)}
                                                        size="small"
                                                        color={getStatusColor(transaction.status)}
                                                    />
                                                </TableCell>
                                                <TableCell>{transaction.mobile_money_operator || '-'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </CardContent>
                </Card>

                {/* Informations sur les plans */}
                <Card sx={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccountBalanceWalletIcon />
                            Conditions générales
                        </Typography>

                        <Typography variant="body2" paragraph>
                            <strong>Votre plan actuel : {plan?.name || 'Free'}</strong>
                        </Typography>

                        <Typography variant="body2" paragraph>
                            {/* ✅ CORRECTION ICI : || remplacé par ?? */}
                            • Commission : {plan?.commission_rate ?? 15}%<br />
                            • Temps de traitement : {plan?.processing_time_min ?? 20}-{plan?.processing_time_max ?? 120} minutes<br />
                            • Réduction formations : {plan?.course_discount ?? 0}%
                        </Typography>

                        <Alert severity="success" sx={{ mb: 2 }}>
                            <AlertTitle>Avantages de l'abonnement Premium</AlertTitle>
                            • <strong>0% de commission</strong> sur toutes les transactions<br />
                            • Traitement prioritaire en moins de 15 minutes<br />
                            • 40% de réduction sur les formations certifiantes<br />
                            • Support client dédié 24/7
                        </Alert>

                        <Button
                            variant="contained"
                            startIcon={<AccountBalanceWalletIcon />}
                            onClick={() => navigate('/subscription')}
                            sx={{
                                background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                                color: '#010F1B',
                                fontWeight: 700
                            }}
                        >
                            Améliorer mon plan
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}