// src/pages/admin/AdminTransactions.jsx - Gestion des transactions PayPal
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
    IconButton,
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
                .from('paypal_transactions')
                .select(`
                    *,
                    profiles!paypal_transactions_user_id_fkey (
                        full_name,
                        email
                    )
                `)
                .order('created_at', { ascending: false })

            if (error) throw error

            console.log('📊 Transactions chargées:', data)
            setTransactions(data || [])
        } catch (error) {
            console.error('Erreur chargement transactions:', error)
            toast.error('Erreur lors du chargement des transactions')
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateStatus = async (transactionId, newStatus) => {
        try {
            const { error } = await supabase
                .from('paypal_transactions')
                .update({ status: newStatus })
                .eq('id', transactionId)

            if (error) throw error

            toast.success(`Statut mis à jour : ${newStatus}`)
            fetchTransactions()
            setDialogOpen(false)
            setSelectedTransaction(null)
        } catch (error) {
            console.error('Erreur mise à jour statut:', error)
            toast.error('Erreur lors de la mise à jour')
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Terminé':
                return 'success'
            case 'En attente':
                return 'warning'
            case 'Non vérifié':
                return 'error'
            default:
                return 'default'
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Terminé':
                return <CheckCircleIcon sx={{ fontSize: 18 }} />
            case 'En attente':
                return <PendingIcon sx={{ fontSize: 18 }} />
            case 'Non vérifié':
                return <CancelIcon sx={{ fontSize: 18 }} />
            default:
                return null
        }
    }

    const filteredTransactions = transactions.filter(tx => {
        const matchStatus = filterStatus === 'all' || tx.status === filterStatus
        const matchSearch =
            tx.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.paypal_email?.toLowerCase().includes(searchTerm.toLowerCase())

        return matchStatus && matchSearch
    })

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress sx={{ color: '#16f98a' }} />
            </Box>
        )
    }

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                    Gestion des Transactions PayPal
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Gérez les statuts des transactions PayPal des utilisateurs
                </Typography>
            </Box>

            {/* Filtres et recherche */}
            <Paper sx={{ p: 3, mb: 3, bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                    <TextField
                        placeholder="Rechercher par email ou nom..."
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
                            <MenuItem value="all">Tous les statuts</MenuItem>
                            <MenuItem value="En attente">En attente</MenuItem>
                            <MenuItem value="Terminé">Terminé</MenuItem>
                            <MenuItem value="Non vérifié">Non vérifié</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="outlined"
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
                    >
                        Actualiser
                    </Button>
                </Box>
            </Paper>

            {/* Statistiques rapides */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                {[
                    { label: 'Total', count: transactions.length, color: '#16f98a' },
                    { label: 'En attente', count: transactions.filter(t => t.status === 'En attente').length, color: '#FFA726' },
                    { label: 'Terminé', count: transactions.filter(t => t.status === 'Terminé').length, color: '#66BB6A' },
                    { label: 'Non vérifié', count: transactions.filter(t => t.status === 'Non vérifié').length, color: '#EF5350' }
                ].map((stat) => (
                    <Paper
                        key={stat.label}
                        sx={{
                            p: 2,
                            flex: 1,
                            minWidth: 150,
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            borderLeft: `4px solid ${stat.color}`
                        }}
                    >
                        <Typography variant="h4" sx={{ color: stat.color, fontWeight: 700 }}>
                            {stat.count}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14 }}>
                            {stat.label}
                        </Typography>
                    </Paper>
                ))}
            </Box>

            {/* Table des transactions */}
            {filteredTransactions.length === 0 ? (
                <Alert severity="info" sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', color: '#fff' }}>
                    Aucune transaction trouvée
                </Alert>
            ) : (
                <TableContainer component={Paper} sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Date</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Utilisateur</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Type</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>PayPal Email</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Montant</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Statut</TableCell>
                                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTransactions.map((tx) => (
                                <TableRow
                                    key={tx.id}
                                    sx={{
                                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.02)' }
                                    }}
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
                                        <Box>
                                            <Typography sx={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>
                                                {tx.profiles?.full_name || 'N/A'}
                                            </Typography>
                                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}>
                                                {tx.profiles?.email}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={tx.transaction_type}
                                            size="small"
                                            sx={{
                                                bgcolor: tx.transaction_type === 'Dépôt' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                                                color: tx.transaction_type === 'Dépôt' ? '#4CAF50' : '#F44336',
                                                fontWeight: 600
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        {tx.paypal_email}
                                    </TableCell>
                                    <TableCell sx={{ color: '#16f98a', fontWeight: 600 }}>
                                        {tx.amount_mga?.toLocaleString()} MGA
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={getStatusIcon(tx.status)}
                                            label={tx.status}
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

            {/* Dialog de modification de statut */}
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
                                Transaction de {selectedTransaction.profiles?.full_name}
                            </Typography>
                            <Typography sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.5)', fontSize: 14 }}>
                                Montant: {selectedTransaction.amount_mga?.toLocaleString()} MGA
                                <br />
                                Type: {selectedTransaction.transaction_type}
                                <br />
                                Statut actuel: <strong>{selectedTransaction.status}</strong>
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    startIcon={<CheckCircleIcon />}
                                    onClick={() => handleUpdateStatus(selectedTransaction.id, 'Terminé')}
                                    disabled={selectedTransaction.status === 'Terminé'}
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
                                    onClick={() => handleUpdateStatus(selectedTransaction.id, 'En attente')}
                                    disabled={selectedTransaction.status === 'En attente'}
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
                                    onClick={() => handleUpdateStatus(selectedTransaction.id, 'Non vérifié')}
                                    disabled={selectedTransaction.status === 'Non vérifié'}
                                    sx={{
                                        bgcolor: '#EF5350',
                                        '&:hover': { bgcolor: '#E53935' },
                                        '&:disabled': { bgcolor: 'rgba(239, 83, 80, 0.3)' }
                                    }}
                                >
                                    Marquer comme Non vérifié
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