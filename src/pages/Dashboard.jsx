// src/pages/Dashboard.jsx - NOUVEAU TABLEAU DE BORD COMPLET
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Carousel from '../components/Carousel'
import FeatureSection from '../components/FeatureSection'
import Testimonials from '../components/Testimonials'
import '../styles/Dashboard.css'

export default function Dashboard() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <Box component="main" sx={{ flex: 1 }}>
                <Hero />
                <Carousel />
                <FeatureSection />
                <Testimonials />
            </Box>

            <Box component="footer" sx={{
                background: '#010F1B',
                color: '#F8F8F8',
                padding: '3rem 2rem 1rem',
                borderTop: '2px solid #16f98a'
            }}>
                <div className="dashboard-footer">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>Payvilus</h3>
                            <p>Votre partenaire pour réussir dans le monde digital</p>
                        </div>
                        <div className="footer-section">
                            <h4>Services</h4>
                            <ul>
                                <li><a href="/paypal">Transactions PayPal</a></li>
                                <li><a href="/formation">Formations</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Support</h4>
                            <ul>
                                <li><a href="/about">À propos</a></li>
                                <li><a href="mailto:contact@payvilus.store">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2024 Payvilus. Tous droits réservés.</p>
                    </div>
                </div>
            </Box>
        </Box>
    )
}