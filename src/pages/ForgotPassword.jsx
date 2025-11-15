// src/pages/ForgotPassword.jsx - CODE COMPLET
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const { resetPassword } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) {
            setError('Veuillez entrer votre email')
            return
        }

        try {
            setError('')
            setMessage('')
            setLoading(true)

            const { error } = await resetPassword(email)

            if (error) {
                setError('Une erreur est survenue. Vérifiez votre email.')
            } else {
                setMessage('Un email de réinitialisation a été envoyé à votre adresse. Cliquez sur le lien dans l\'email pour créer un nouveau mot de passe. Le lien est valide pendant 1 heure.')
            }
        } catch (err) {
            setError('Une erreur est survenue')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Mot de passe oublié</h1>
                <p className="subtitle">Entrez votre email pour recevoir un lien de réinitialisation</p>

                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="votre@email.com"
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
                    </button>
                </form>

                <div className="auth-links">
                    <Link to="/login">Retour à la connexion</Link>
                    <Link to="/register">Créer un compte</Link>
                </div>
            </div>
        </div>
    )
}