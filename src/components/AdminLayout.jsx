// src/components/AdminLayout.jsx - Layout pour les pages admin
import { useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,
    Toolbar,
    Divider,
    useMediaQuery,
    useTheme
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PaymentIcon from '@mui/icons-material/Payment'
import SchoolIcon from '@mui/icons-material/School'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

const drawerWidth = 260

export default function AdminLayout() {
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
        { text: 'Transactions PayPal', icon: <PaymentIcon />, path: '/admin/transactions' },
        { text: 'Cours & Formations', icon: <SchoolIcon />, path: '/admin/courses' },
        { text: 'Utilisateurs', icon: <PeopleIcon />, path: '/admin/users' },
        { text: 'Paramètres', icon: <SettingsIcon />, path: '/admin/settings' }
    ]

    const drawer = (
        <Box sx={{ height: '100%', background: 'linear-gradient(180deg, #05220B 0%, #010F1B 100%)' }}>
            {/* Header Sidebar */}
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <AdminPanelSettingsIcon sx={{ fontSize: 48, color: '#FFD700', mb: 1 }} />
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                    Panel Admin
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Payvilus Administration
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

            {/* Menu Items */}
            <List sx={{ px: 2, py: 2 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => {
                                    navigate(item.path)
                                    if (isMobile) setMobileOpen(false)
                                }}
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: isActive ? 'rgba(22, 249, 138, 0.1)' : 'transparent',
                                    color: isActive ? '#16f98a' : 'rgba(255, 255, 255, 0.7)',
                                    '&:hover': {
                                        bgcolor: 'rgba(22, 249, 138, 0.05)',
                                        color: '#16f98a'
                                    },
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: 14,
                                        fontWeight: isActive ? 700 : 500
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mt: 'auto' }} />

            {/* Retour au site */}
            <Box sx={{ p: 2 }}>
                <ListItemButton
                    onClick={() => navigate('/dashboard')}
                    sx={{
                        borderRadius: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            color: '#fff'
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                        <ChevronLeftIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary="Retour au site"
                        primaryTypographyProps={{ fontSize: 14 }}
                    />
                </ListItemButton>
            </Box>
        </Box>
    )

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0a0f1a' }}>
            {/* Mobile Toolbar */}
            {isMobile && (
                <Toolbar
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bgcolor: '#05220B',
                        zIndex: 1200,
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ color: '#16f98a' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: '#fff', ml: 2 }}>
                        Panel Admin
                    </Typography>
                </Toolbar>
            )}

            {/* Sidebar Desktop */}
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        border: 'none',
                        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)'
                    }
                }}
            >
                {drawer}
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: isMobile ? 8 : 0,
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #0a0f1a 0%, #05220B 100%)'
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}