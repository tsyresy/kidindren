// src/pages/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react'
import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import SchoolIcon from '@mui/icons-material/School'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { supabase } from '../../config/supabaseClient'

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCourses: 0,
        totalTransactions: 0,
        pendingTransactions: 0
    })

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const { data: users } = await supabase
                .from('profiles')
                .select('*', { count: 'exact' })

            const { data: courses } = await supabase
                .from('courses')
                .select('*')

            const { data: transactions } = await supabase
                .from('transactions')
                .select('*')
                .order('created_at', { ascending: false })

            setStats({
                totalUsers: users?.length || 0,
                totalCourses: courses?.length || 0,
                totalTransactions: transactions?.length || 0,
                pendingTransactions: transactions?.filter(t => t.status === 'pending').length || 0
            })
        } catch (error) {
            console.error('Erreur chargement stats:', error)
        }
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 4 }}>
                Tableau de bord Admin
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PeopleIcon sx={{ fontSize: 40, color: '#16f98a', mr: 2 }} />
                                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                                    {stats.totalUsers}
                                </Typography>
                            </Box>
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Utilisateurs
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <SchoolIcon sx={{ fontSize: 40, color: '#3EF0D0', mr: 2 }} />
                                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                                    {stats.totalCourses}
                                </Typography>
                            </Box>
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Cours
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AccountBalanceWalletIcon sx={{ fontSize: 40, color: '#FFA726', mr: 2 }} />
                                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                                    {stats.totalTransactions}
                                </Typography>
                            </Box>
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Transactions
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <TrendingUpIcon sx={{ fontSize: 40, color: '#EF5350', mr: 2 }} />
                                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
                                    {stats.pendingTransactions}
                                </Typography>
                            </Box>
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                En attente
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}