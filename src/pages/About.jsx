// src/pages/About.jsx
import Navbar from '../components/Navbar'
import '../styles/Components.css'


export function About() {
    return (
        <div className="dashboard-layout">
            <Navbar />
            <main className="dashboard-main" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', color: '#010F1B', marginBottom: '1rem' }}>
                    À propos de <span className="text-gradient">Payvilus</span>
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
                    Page en construction... 🚧
                </p>
                <p style={{ color: '#666' }}>
                    Découvrez notre mission et notre équipe
                </p>
            </main>
        </div>
    )
}