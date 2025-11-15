// src/pages/UpdatePassword.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../config/supabaseClient'
import '../styles/Auth.css'

export default function UpdatePassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [isValidSession, setIsValidSession] = useState(false)

    const { updatePassword } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        // Vérifier si l'utilisateur vient d'un lien de réinitialisation
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (session) {
                setIsValidSession(true)
            } else {
                setError('Session invalide ou expirée. Veuillez redemander un lien de réinitialisation.')
            }
        }

        checkSession()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!password || !confirmPassword) {
            setError('Veuillez remplir tous les champs')
            return
        }

        if (password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères')
            return
        }

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas')
            return
        }

        try {
            setError('')
            setLoading(true)

            const { error } = await updatePassword(password)

            if (error) {
                setError('Erreur lors de la mise à jour du mot de passe')
            } else {
                setSuccess(true)
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
            }
        } catch (err) {
            setError('Une erreur est survenue')
        } finally {
            setLoading(false)
        }
    }

    if (!isValidSession && !error) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <div className="loading-container-inline">
                        <div className="loading-spinner-small"></div>
                        <p>Vérification de votre session...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <div className="success-message">
                        <h2>✓ Mot de passe mis à jour !</h2>
                        <p>Votre mot de passe a été changé avec succès.</p>
                        <p>Redirection vers la page de connexion...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Nouveau mot de passe</h1>
                <p className="subtitle">Choisissez un nouveau mot de passe sécurisé</p>

                {error && <div className="error-message">{error}</div>}

                {isValidSession ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="password">Nouveau mot de passe</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                minLength="6"
                                required
                                autoComplete="new-password"
                            />
                            <small className="input-hint">Minimum 6 caractères</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary">
                            {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
                        </button>
                    </form>
                ) : (
                    <div className="auth-links">
                        <a href="/forgot-password">Redemander un lien de réinitialisation</a>
                        <a href="/login">Retour à la connexion</a>
                    </div>
                )}
            </div>
        </div>
    )
}