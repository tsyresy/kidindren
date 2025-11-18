// src/pages/Paypal.jsx
import Navbar from '../components/Navbar'
import '../styles/Components.css'

export default function Paypal() {
    return (
        <div className="dashboard-layout">
            <Navbar />
            <main className="dashboard-main" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', color: '#010F1B', marginBottom: '1rem' }}>
                    Transactions <span className="text-gradient">PayPal</span>
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
                    Page en construction... 🚧
                </p>
                <p style={{ color: '#666' }}>
                    Cette page permettra de gérer vos transactions PayPal
                </p>
            </main>
        </div>
    )
}