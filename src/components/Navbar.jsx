// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, AppBar, Toolbar, Container, Stack, IconButton, Tooltip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { useAuth } from '../context/AuthContext'
import { useAdmin } from '../hooks/useAdmin'
import MembershipBadge from './MembershipBadge'
import '../styles/Components.css'

export default function Navbar() {
    const { user, signOut } = useAuth()
    const { isAdmin } = useAdmin(user?.id)
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut()
    }

    // Récupérer les informations du profil depuis les métadonnées
    const firstName = user?.user_metadata?.first_name || ''
    const lastName = user?.user_metadata?.last_name || ''
    const fullName = `${firstName} ${lastName}`.trim() || 'Utilisateur'
    const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'U'

    const isActive = (path) => location.pathname === path

    return (
        <AppBar
            position="sticky"
            sx={{
                background: 'white',
                boxShadow: '0 2px 10px rgba(22, 249, 138, 0.1)',
                borderBottom: '2px solid #16f98a'
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
                    {/* Logo */}
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <img
                            src="https://res.cloudinary.com/djillj6xt/image/upload/v1763394595/CL-B-3_sigqnz.png"
                            alt="Payvilus Logo"
                            style={{ height: '50px', width: 'auto', cursor: 'pointer' }}
                        />
                    </Link>

                    {/* Menu Navigation */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            component={Link}
                            to="/dashboard"
                            sx={{
                                color: isActive('/dashboard') ? '#16f98a' : '#010F1B',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'capitalize',
                                borderBottom: isActive('/dashboard') ? '2px solid #16f98a' : 'none',
                                pb: 0.5,
                                '&:hover': { color: '#16f98a' }
                            }}
                        >
                            Dashboard
                        </Button>
                        <Button
                            component={Link}
                            to="/paypal"
                            sx={{
                                color: isActive('/paypal') ? '#16f98a' : '#010F1B',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'capitalize',
                                borderBottom: isActive('/paypal') ? '2px solid #16f98a' : 'none',
                                pb: 0.5,
                                '&:hover': { color: '#16f98a' }
                            }}
                        >
                            PayPal
                        </Button>
                        <Button
                            component={Link}
                            to="/formation"
                            sx={{
                                color: isActive('/formation') ? '#16f98a' : '#010F1B',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'capitalize',
                                borderBottom: isActive('/formation') ? '2px solid #16f98a' : 'none',
                                pb: 0.5,
                                '&:hover': { color: '#16f98a' }
                            }}
                        >
                            Formation
                        </Button>
                        <Button
                            component={Link}
                            to="/about"
                            sx={{
                                color: isActive('/about') ? '#16f98a' : '#010F1B',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'capitalize',
                                borderBottom: isActive('/about') ? '2px solid #16f98a' : 'none',
                                pb: 0.5,
                                '&:hover': { color: '#16f98a' }
                            }}
                        >
                            À propos
                        </Button>
                        <Button
                            component={Link}
                            to="/support"
                            sx={{
                                color: isActive('/support') ? '#16f98a' : '#010F1B',
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'capitalize',
                                borderBottom: isActive('/support') ? '2px solid #16f98a' : 'none',
                                pb: 0.5,
                                '&:hover': { color: '#16f98a' }
                            }}
                        >
                            Support
                        </Button>
                    </Box>

                    {/* Profil utilisateur */}
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        {/* Badge Membership */}
                        <MembershipBadge />

                        {/* Icône Admin */}
                        {isAdmin && (
                            <Tooltip title="Panel Admin" arrow>
                                <IconButton
                                    onClick={() => navigate('/admin')}
                                    sx={{
                                        color: isActive('/admin') || location.pathname.startsWith('/admin') ? '#FFD700' : '#16f98a',
                                        bgcolor: isActive('/admin') || location.pathname.startsWith('/admin') ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                                        '&:hover': {
                                            bgcolor: 'rgba(22, 249, 138, 0.1)',
                                            transform: 'scale(1.1)'
                                        },
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <AdminPanelSettingsIcon sx={{ fontSize: 28 }} />
                                </IconButton>
                            </Tooltip>
                        )}

                        {/* Avatar et Nom */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.75
                            }}
                        >
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                                    color: '#010F1B',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '14px'
                                }}
                            >
                                {initials}
                            </Box>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Box sx={{
                                    color: '#010F1B',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    lineHeight: 1.2
                                }}>
                                    {fullName}
                                </Box>
                            </Box>
                        </Box>

                        {/* Bouton Déconnexion */}
                        <Button
                            onClick={handleLogout}
                            variant="outlined"
                            size="small"
                            startIcon={<LogoutIcon />}
                            sx={{
                                borderColor: '#dc3545',
                                color: '#dc3545',
                                fontWeight: 600,
                                fontSize: '0.85rem',
                                '&:hover': {
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    borderColor: '#dc3545'
                                }
                            }}
                        >
                            Déconnexion
                        </Button>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}