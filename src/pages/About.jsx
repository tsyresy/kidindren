// src/pages/About.jsx - CODE COMPLET
import { Box, Container, Typography } from '@mui/material'
import Navbar from '../components/Navbar'

export default function About() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center', flex: 1 }}>
                <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: '#010F1B' }}>
                    À propos de{' '}
                    <span
                        style={{
                            background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
            Payvilus
          </span>
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    Page en construction... 🚧
                </Typography>
                <Typography color="text.secondary">
                    Découvrez notre mission et notre équipe
                </Typography>
            </Container>
        </Box>
    )
}