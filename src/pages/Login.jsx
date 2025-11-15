// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { signIn } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            setError('Veuillez remplir tous les champs')
            return
        }

        try {
            setError('')
            setLoading(true)
            const { data, error } = await signIn(email, password)

            if (error) {
                console.error('Erreur de connexion:', error)

                // Messages d'erreur plus détaillés
                if (error.message.includes('Invalid login credentials')) {
                    setError('Email ou mot de passe incorrect. Vérifiez vos identifiants.')
                } else if (error.message.includes('Email not confirmed')) {
                    setError('Veuillez confirmer votre email avant de vous connecter. Vérifiez votre boîte de réception.')
                } else if (error.message.includes('User not found')) {
                    setError('Aucun compte trouvé avec cet email. Veuillez vous inscrire.')
                } else {
                    setError(`Erreur de connexion : ${error.message}`)
                }
            } else {
                // Connexion réussie
                console.log('Connexion réussie:', data)
                navigate('/dashboard')
            }
        } catch (err) {
            console.error('Erreur inattendue:', err)
            setError('Une erreur est survenue. Veuillez réessayer.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Connexion</h1>

                {error && <div className="error-message">{error}</div>}

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
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <div className="auth-links">
                    <Link to="/forgot-password">Mot de passe oublié ?</Link>
                    <Link to="/register">Créer un compte</Link>
                </div>
            </div>
        </div>
    )
}