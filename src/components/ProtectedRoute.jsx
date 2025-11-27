// src/components/ProtectedRoute.jsx - VERSION MISE À JOUR
import { Navigate } from 'react-router-dom'
import { Box, Typography, CircularProgress } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { useAuth } from '../context/AuthContext'
import { useAdmin } from '../hooks/useAdmin'

export default function ProtectedRoute({ children, requireAdmin = false }) {
    const { user, loading: authLoading } = useAuth()
    const { isAdmin, loading: adminLoading } = useAdmin(user?.id)

    // Attendre le chargement de l'authentification
    if (authLoading || (requireAdmin && adminLoading)) {
        return (
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #05220B 0%, #010F1B 100%)'
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress sx={{ color: '#16f98a', mb: 2 }} />
                    <Typography sx={{ color: '#fff' }}>
                        {requireAdmin ? 'Vérification des permissions...' : 'Chargement...'}
                    </Typography>
                </Box>
            </Box>
        )
    }

    // Si non connecté
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // Si la route nécessite admin mais l'utilisateur n'est pas admin
    if (requireAdmin && !isAdmin) {
        return (
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #05220B 0%, #010F1B 100%)'
            }}>
                <Box sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    p: 6,
                    textAlign: 'center',
                    maxWidth: 500
                }}>
                    <LockIcon sx={{ fontSize: 64, color: '#ff6b6b', mb: 2 }} />
                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
                        Accès refusé
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 4 }}>
                        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
                        Seuls les administrateurs peuvent y accéder.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <a href="/dashboard" style={{ textDecoration: 'none' }}>
                            <Typography sx={{
                                color: '#16f98a',
                                cursor: 'pointer',
                                fontWeight: 600,
                                '&:hover': { textDecoration: 'underline' }
                            }}>
                                Retour au Dashboard
                            </Typography>
                        </a>
                    </Box>
                </Box>
            </Box>
        )
    }

    // Si tout est OK, afficher le contenu
    return children
}