// src/pages/admin/AdminDashboard.jsx - Dashboard principal admin
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip
} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import SchoolIcon from '@mui/icons-material/School'
import PaymentIcon from '@mui/icons-material/Payment'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { supabase } from '../../config/supabaseClient'

export default function AdminDashboard() {
    const navigate = useNavigate()
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCourses: 0,
        publishedCourses: 0,
        totalTransactions: 0,
        pendingTransactions: 0,
        totalRevenue: 0
    })
    const [recentTransactions, setRecentTransactions] = useState([])
    const [recentCourses, setRecentCourses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)

            // Récupérer les utilisateurs
            const { count: usersCount } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })

            // Récupérer les cours
            const { data: courses } = await supabase
                .from('courses')
                .select('*')

            // Récupérer les transactions
            const { data: transactions } = await supabase
                .from('paypal_transactions')
                .select(`
                    *,
                    profiles!paypal_transactions_user_id_fkey (
                        full_name,
                        email
                    )
                `)
                .order('created_at', { ascending: false })
                .limit(10)

            setStats({
                totalUsers: usersCount || 0,
                totalCourses: courses?.length || 0,
                publishedCourses: courses?.filter(c => c.status === 'published').length || 0,
                totalTransactions: transactions?.length || 0,
                pendingTransactions: transactions?.filter(t => t.status === 'En attente').length || 0,
                totalRevenue: transactions?.reduce((sum, t) => sum + (t.amount_mga || 0), 0) || 0
            })

            setRecentTransactions(transactions || [])
            setRecentCourses(courses?.slice(0, 5) || [])
        } catch (error) {
            console.error('Erreur chargement dashboard:', error)
        } finally {
            setLoading(false)
        }
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
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                    Dashboard Administration
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Vue d'ensemble de votre plateforme Payvilus
                </Typography>
            </Box>

            {/* Cartes statistiques */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {[
                    {
                        title: 'Utilisateurs',
                        value: stats.totalUsers,
                        icon: <PeopleIcon sx={{ fontSize: 40 }} />,
                        color: '#16f98a',
                        bgGradient: 'linear-gradient(135deg, rgba(22, 249, 138, 0.2), rgba(62, 240, 208, 0.2))'
                    },
                    {
                        title: 'Cours Publiés',
                        value: `${stats.publishedCourses}/${stats.totalCourses}`,
                        icon: <SchoolIcon sx={{ fontSize: 40 }} />,
                        color: '#3EF0D0',
                        bgGradient: 'linear-gradient(135deg, rgba(62, 240, 208, 0.2), rgba(22, 249, 138, 0.2))'
                    },
                    {
                        title: 'Transactions',
                        value: stats.totalTransactions,
                        subtitle: `${stats.pendingTransactions} en attente`,
                        icon: <PaymentIcon sx={{ fontSize: 40 }} />,
                        color: '#FFA726',
                        bgGradient: 'linear-gradient(135deg, rgba(255, 167, 38, 0.2), rgba(251, 140, 0, 0.2))'
                    },
                    {
                        title: 'Revenu Total',
                        value: `${stats.totalRevenue.toLocaleString()} MGA`,
                        icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
                        color: '#FFD700',
                        bgGradient: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 193, 7, 0.2))'
                    }
                ].map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{
                            background: stat.bgGradient,
                            backdropFilter: 'blur(10px)',
                            height: '100%',
                            border: `1px solid ${stat.color}20`
                        }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{ color: stat.color }}>
                                        {stat.icon}
                                    </Box>
                                </Box>
                                <Typography variant="h4" sx={{ color: stat.color, fontWeight: 700, mb: 0.5 }}>
                                    {stat.value}
                                </Typography>
                                <Typography sx={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>
                                    {stat.title}
                                </Typography>
                                {stat.subtitle && (
                                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 12, mt: 0.5 }}>
                                        {stat.subtitle}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Transactions récentes */}
            <Paper sx={{ p: 3, mb: 3, bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                        Transactions Récentes
                    </Typography>
                    <Typography
                        sx={{
                            color: '#16f98a',
                            cursor: 'pointer',
                            fontSize: 14,
                            '&:hover': { textDecoration: 'underline' }
                        }}
                        onClick={() => navigate('/admin/transactions')}
                    >
                        Voir tout →
                    </Typography>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
                                <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Date</TableCell>
                                <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Utilisateur</TableCell>
                                <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Type</TableCell>
                                <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Montant</TableCell>
                                <TableCell sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600 }}>Statut</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentTransactions.slice(0, 5).map((tx) => (
                                <TableRow key={tx.id} sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.02)' } }}>
                                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14 }}>
                                        {new Date(tx.created_at).toLocaleDateString('fr-FR')}
                                    </TableCell>
                                    <TableCell sx={{ color: '#fff', fontSize: 14 }}>
                                        {tx.profiles?.full_name || 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={tx.transaction_type}
                                            size="small"
                                            sx={{
                                                bgcolor: tx.transaction_type === 'Dépôt' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                                                color: tx.transaction_type === 'Dépôt' ? '#4CAF50' : '#F44336'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: '#16f98a', fontWeight: 600, fontSize: 14 }}>
                                        {tx.amount_mga?.toLocaleString()} MGA
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={tx.status}
                                            size="small"
                                            color={
                                                tx.status === 'Terminé' ? 'success' :
                                                    tx.status === 'En attente' ? 'warning' : 'error'
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Cours récents */}
            <Paper sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                        Cours Récents
                    </Typography>
                    <Typography
                        sx={{
                            color: '#16f98a',
                            cursor: 'pointer',
                            fontSize: 14,
                            '&:hover': { textDecoration: 'underline' }
                        }}
                        onClick={() => navigate('/admin/courses')}
                    >
                        Voir tout →
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {recentCourses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                            <Card sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.03)',
                                cursor: 'pointer',
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.2s ease'
                                }
                            }}
                                  onClick={() => navigate('/admin/courses')}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                        <Chip
                                            label={course.status}
                                            size="small"
                                            color={course.status === 'published' ? 'success' : 'warning'}
                                        />
                                        {course.featured && (
                                            <Chip
                                                label="Vedette"
                                                size="small"
                                                sx={{ bgcolor: '#FFD700', color: '#000' }}
                                            />
                                        )}
                                    </Box>
                                    <Typography sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                                        {course.title}
                                    </Typography>
                                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 12 }}>
                                        {course.category} • {course.lessons_count} leçons
                                    </Typography>
                                    <Typography sx={{ color: '#16f98a', fontWeight: 700, mt: 1 }}>
                                        {course.is_free ? 'GRATUIT' : `${course.base_price?.toLocaleString()} MGA`}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Box>
    )
}