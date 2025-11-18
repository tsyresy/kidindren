// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Components.css'

export default function Navbar() {
    const { user, signOut } = useAuth()
    const location = useLocation()

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
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/dashboard" className="navbar-logo">
                    <img
                        src="https://res.cloudinary.com/djillj6xt/image/upload/v1763394595/CL-B-3_sigqnz.png"
                        alt="Payvilus Logo"
                        className="logo-image"
                    />
                </Link>

                {/* Menu Navigation */}
                <div className="navbar-menu">
                    <Link
                        to="/dashboard"
                        className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/paypal"
                        className={`nav-link ${isActive('/paypal') ? 'active' : ''}`}
                    >
                        PayPal
                    </Link>
                    <Link
                        to="/formation"
                        className={`nav-link ${isActive('/formation') ? 'active' : ''}`}
                    >
                        Formation
                    </Link>
                    <Link
                        to="/about"
                        className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                    >
                        À propos
                    </Link>
                </div>

                {/* Profil utilisateur */}
                <div className="navbar-profile">
                    <div className="profile-info">
                        <div className="profile-avatar-small">
                            {initials}
                        </div>
                        <span className="profile-name">{fullName}</span>
                    </div>
                    <button onClick={handleLogout} className="btn-logout-nav">
                        Déconnexion
                    </button>
                </div>
            </div>
        </nav>
    )
}