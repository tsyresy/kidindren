// src/pages/admin/AdminTransactions.jsx
import { useState, useEffect } from 'react'
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Alert,
    InputAdornment
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import PendingIcon from '@mui/icons-material/Pending'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
import { supabase } from '../../config/supabaseClient'
import toast from 'react-hot-toast'

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedTransaction, setSelectedTransaction] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        fetchTransactions()
    }, [])

    const fetchTransactions = async () => {
        try {
            setLoading(true)

            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            console.log('Transactions chargées:', data?.length || 0)
            setTransactions(data || [])
        } catch (error) {
            console.error('Erreur chargement transactions:', error)
            toast.error('Erreur lors du chargement')
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateStatus = async (transactionId, newStatus) => {
        try {
            const { error } = await supabase
                .from('transactions')
                .update({ status: newStatus })
                .eq('id', transactionId)

            if (error) throw error

            toast.success('Statut mis à jour')
            fetchTransactions()
            setDialogOpen(false)
            setSelectedTransaction(null)
        } catch (error) {
            console.error('Erreur mise à jour:', error)
            toast.error('Erreur lors de la mise à jour')
        }
    }

    const getStatusColor = (status) => {
        const colors = {
            'completed': 'success',
            'pending': 'warning',
            'processing': 'info',
            'failed': 'error',
            'cancelled': 'default'
        }
        return colors[status] || 'default'
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Terminé':
                return <CheckCircleIcon sx={{ fontSize: 18 }} />
            case 'En attente':
                return <PendingIcon sx={{ fontSize: 18 }} />
            case 'Échoué':
                return <CancelIcon sx={{ fontSize: 18 }} />
            default:
                return null
        }
    }

    const getTypeLabel = (type) => {
        return type === 'deposit' ? 'Dépôt' : type === 'withdrawal' ? 'Retrait' : type
    }

    const getStatusLabel = (status) => {
        const labels = {
            'pending': 'En attente',
            'processing': 'En cours',
            'completed': 'Terminé',
            'failed': 'Échoué',
            'cancelled': 'Annulé'
        }
        return labels[status] || status
    }

    const filteredTransactions = transactions.filter(tx => {
        const matchStatus = filterStatus === 'all' || tx.status === filterStatus
        const matchSearch = !searchTerm || (tx.paypal_email && tx.paypal_email.toLowerCase().includes(searchTerm.toLowerCase()))

        return matchStatus && matchSearch
    })

    const stats = {
        total: transactions.length,
        pending: transactions.filter(t => t.status === 'pending').length,
        completed: transactions.filter(t => t.status === 'completed').length,
        failed: transactions.filter(t => t.status === 'failed').length
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress sx={{ color: '#16f98a' }} />
            </Box>
        )
    }

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                    Gestion des Transactions PayPal
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Gérez les statuts des transactions PayPal des utilisateurs
                </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
                <Paper sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, mb: 1 }}>
                        Total
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                        {stats.total}
                    </Typography>
                </Paper>
                <Paper sx={{ p: 3, bgcolor: 'rgba(255, 152, 0, 0.1)' }}>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, mb: 1 }}>
                        En attente
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#FFA726', fontWeight: 700 }}>
                        {stats.pending}
                    </Typography>
                </Paper>
                <Paper sx={{ p: 3, bgcolor: 'rgba(76, 175, 80, 0.1)' }}>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, mb: 1 }}>
                        Terminé
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 700 }}>
                        {stats.completed}
                    </Typography>
                </Paper>
                <Paper sx={{ p: 3, bgcolor: 'rgba(239, 83, 80, 0.1)' }}>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, mb: 1 }}>
                        Échoué
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#EF5350', fontWeight: 700 }}>
                        {stats.failed}
                    </Typography>
                </Paper>
            </Box>

            <Paper sx={{ p: 3, mb: 3, bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                    <TextField
                        placeholder="Rechercher par email PayPal..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            flex: 1,
                            minWidth: 300,
                            '& .MuiOutlinedInput-root': {
                                color: '#fff',
                                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                </InputAdornment>
                            )
                        }}
                    />

                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Statut</InputLabel>
                        <Select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            sx={{
                                color: '#fff',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(255, 255, 255, 0.2)'
                                }
                            }}
                        >
                            <MenuItem value="all">Tous</MenuItem>
                            <MenuItem value="pending">En attente</MenuItem>
                            <MenuItem value="completed">Terminé</MenuItem>
                            <MenuItem value="failed">Échoué</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        startIcon={<RefreshIcon />}
                        onClick={fetchTransactions}
                        sx={{
                            color: '#16f98a',
                            borderColor: '#16f98a',
                            '&:hover': {
                                borderColor: '#16f98a',
                                bgcolor: 'rgba(22, 249, 138, 0.1)'
                            }
                        }}
                        variant="outlined"
                    >
                        Actualiser
                    </Button>
                </Box>
            </Paper>

            {filteredTransactions.length === 0 ? (
                <Alert severity="info" sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', color: '#fff' }}>
                    Aucune transaction trouvée ({transactions.length} transaction(s) au total)
                </Alert>
            ) : (
                <TableContainer component={Paper} sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Date</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Type</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>PayPal Email</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Montant</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Opérateur</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Statut</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTransactions.map((tx) => (
                                <TableRow
                                    key={tx.id}
                                    sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.02)' } }}
                                >
                                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        {new Date(tx.created_at).toLocaleDateString('fr-FR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={getTypeLabel(tx.transaction_type)}
                                            size="small"
                                            sx={{
                                                bgcolor: tx.transaction_type === 'deposit' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                                                color: tx.transaction_type === 'deposit' ? '#4CAF50' : '#F44336',
                                                fontWeight: 600
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        {tx.paypal_email || 'N/A'}
                                    </TableCell>
                                    <TableCell sx={{ color: '#16f98a', fontWeight: 600 }}>
                                        {tx.original_amount?.toLocaleString()} {tx.currency || 'EUR'}
                                    </TableCell>
                                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        {tx.mobile_money_operator || 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={getStatusIcon(getStatusLabel(tx.status))}
                                            label={getStatusLabel(tx.status)}
                                            color={getStatusColor(tx.status)}
                                            size="small"
                                            sx={{ fontWeight: 600 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => {
                                                setSelectedTransaction(tx)
                                                setDialogOpen(true)
                                            }}
                                            sx={{
                                                color: '#16f98a',
                                                borderColor: '#16f98a',
                                                '&:hover': {
                                                    borderColor: '#16f98a',
                                                    bgcolor: 'rgba(22, 249, 138, 0.1)'
                                                }
                                            }}
                                        >
                                            Modifier
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                PaperProps={{
                    sx: {
                        bgcolor: '#1a1a1a',
                        color: '#fff',
                        minWidth: 400
                    }
                }}
            >
                <DialogTitle>
                    Modifier le statut de la transaction
                </DialogTitle>
                <DialogContent>
                    {selectedTransaction && (
                        <Box sx={{ pt: 2 }}>
                            <Typography sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
                                Email PayPal: {selectedTransaction.paypal_email || 'N/A'}
                            </Typography>
                            <Typography sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.5)', fontSize: 14 }}>
                                Montant: {selectedTransaction.original_amount?.toLocaleString()} {selectedTransaction.currency || 'EUR'}
                                <br />
                                Type: {getTypeLabel(selectedTransaction.transaction_type)}
                                <br />
                                Statut actuel: <strong>{getStatusLabel(selectedTransaction.status)}</strong>
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    startIcon={<CheckCircleIcon />}
                                    onClick={() => handleUpdateStatus(selectedTransaction.id, 'completed')}
                                    disabled={selectedTransaction.status === 'completed'}
                                    sx={{
                                        bgcolor: '#4CAF50',
                                        '&:hover': { bgcolor: '#45a049' },
                                        '&:disabled': { bgcolor: 'rgba(76, 175, 80, 0.3)' }
                                    }}
                                >
                                    Marquer comme Terminé
                                </Button>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    startIcon={<PendingIcon />}
                                    onClick={() => handleUpdateStatus(selectedTransaction.id, 'pending')}
                                    disabled={selectedTransaction.status === 'pending'}
                                    sx={{
                                        bgcolor: '#FFA726',
                                        '&:hover': { bgcolor: '#FB8C00' },
                                        '&:disabled': { bgcolor: 'rgba(255, 167, 38, 0.3)' }
                                    }}
                                >
                                    Marquer comme En attente
                                </Button>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    startIcon={<CancelIcon />}
                                    onClick={() => handleUpdateStatus(selectedTransaction.id, 'failed')}
                                    disabled={selectedTransaction.status === 'failed'}
                                    sx={{
                                        bgcolor: '#EF5350',
                                        '&:hover': { bgcolor: '#E53935' },
                                        '&:disabled': { bgcolor: 'rgba(239, 83, 80, 0.3)' }
                                    }}
                                >
                                    Marquer comme Échoué
                                </Button>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} sx={{ color: '#fff' }}>
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}