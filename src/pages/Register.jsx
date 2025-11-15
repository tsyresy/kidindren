// src/pages/Register.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Auth.css'

export default function Register() {
    const [formData, setFormData] = useState({
        // Informations personnelles
        firstName: '',
        lastName: '',
        birthDate: '',
        birthPlace: '',
        gender: '',
        nationality: '',

        // Coordonnées
        phone: '',
        address: '',

        // Document d'identité
        idDocumentType: 'CIN',
        idDocumentNumber: '',
        idDocumentIssueDate: '',
        idDocumentIssuePlace: '',

        // Professionnel
        profession: '',

        // Compte
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(false)

    const { signUp } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation des champs obligatoires
        const requiredFields = [
            'firstName', 'lastName', 'birthDate', 'gender', 'nationality',
            'phone', 'address', 'idDocumentType', 'idDocumentNumber',
            'idDocumentIssueDate', 'idDocumentIssuePlace', 'email', 'password', 'confirmPassword'
        ]

        const emptyFields = requiredFields.filter(field => !formData[field])

        if (emptyFields.length > 0) {
            setError('Veuillez remplir tous les champs obligatoires (*)')
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas')
            return
        }

        if (formData.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères')
            return
        }

        // Validation du numéro de document
        if (formData.idDocumentType === 'CIN' && formData.idDocumentNumber.length !== 12) {
            setError('Le numéro de CIN doit contenir exactement 12 chiffres')
            return
        }

        try {
            setError('')
            setLoading(true)

            const userData = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                birth_date: formData.birthDate,
                birth_place: formData.birthPlace,
                gender: formData.gender,
                nationality: formData.nationality,
                phone: formData.phone,
                address: formData.address,
                id_document_type: formData.idDocumentType,
                id_document_number: formData.idDocumentNumber,
                id_document_issue_date: formData.idDocumentIssueDate,
                id_document_issue_place: formData.idDocumentIssuePlace,
                profession: formData.profession
            }

            const { data, error } = await signUp(formData.email, formData.password, userData)

            if (error) {
                if (error.message.includes('already registered')) {
                    setError('Cet email est déjà utilisé')
                } else if (error.message.includes('duplicate key')) {
                    setError('Ce numéro de document est déjà enregistré')
                } else {
                    setError(error.message)
                }
            } else {
                setSuccess(true)
                if (data?.user && !data.session) {
                    setEmailConfirmationRequired(true)
                } else {
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                }
            }
        } catch (err) {
            console.error('Erreur inscription:', err)
            setError('Une erreur est survenue lors de l\'inscription')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <div className="success-message">
                        <h2>✓ Inscription réussie !</h2>
                        {emailConfirmationRequired ? (
                            <>
                                <p>Un email de confirmation a été envoyé à <strong>{formData.email}</strong></p>
                                <p>Veuillez vérifier votre boîte de réception et cliquer sur le lien de confirmation avant de vous connecter.</p>
                                <div style={{ marginTop: '20px' }}>
                                    <Link to="/login" className="btn-link">Aller à la page de connexion</Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>Votre compte a été créé avec succès !</p>
                                <p>Redirection vers la page de connexion...</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="auth-container">
            <div className="auth-card register-card-large">
                <h1>Inscription</h1>
                <p className="subtitle">Veuillez remplir tous les champs pour créer votre compte</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Section: Informations personnelles */}
                    <div className="form-section">
                        <h3 className="section-title">📋 Informations personnelles</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">Prénom *</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Jean"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Nom *</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Dupont"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="birthDate">Date de naissance *</label>
                                <input
                                    id="birthDate"
                                    name="birthDate"
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    max={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="birthPlace">Lieu de naissance</label>
                                <input
                                    id="birthPlace"
                                    name="birthPlace"
                                    type="text"
                                    value={formData.birthPlace}
                                    onChange={handleChange}
                                    placeholder="Antananarivo"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="gender">Sexe *</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionner</option>
                                    <option value="Masculin">Masculin</option>
                                    <option value="Féminin">Féminin</option>
                                    <option value="Autre">Autre</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="nationality">Nationalité *</label>
                                <input
                                    id="nationality"
                                    name="nationality"
                                    type="text"
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    placeholder="Malgache"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section: Document d'identité */}
                    <div className="form-section">
                        <h3 className="section-title">🪪 Document d'identité</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="idDocumentType">Type de document *</label>
                                <select
                                    id="idDocumentType"
                                    name="idDocumentType"
                                    value={formData.idDocumentType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="CIN">Carte d'Identité Nationale (CIN)</option>
                                    <option value="Passeport">Passeport</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="idDocumentNumber">
                                    Numéro de {formData.idDocumentType} *
                                </label>
                                <input
                                    id="idDocumentNumber"
                                    name="idDocumentNumber"
                                    type="text"
                                    value={formData.idDocumentNumber}
                                    onChange={handleChange}
                                    placeholder={formData.idDocumentType === 'CIN' ? '123456789012' : 'N1234567'}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="idDocumentIssueDate">Date de délivrance *</label>
                                <input
                                    id="idDocumentIssueDate"
                                    name="idDocumentIssueDate"
                                    type="date"
                                    value={formData.idDocumentIssueDate}
                                    onChange={handleChange}
                                    max={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="idDocumentIssuePlace">Lieu de délivrance *</label>
                                <input
                                    id="idDocumentIssuePlace"
                                    name="idDocumentIssuePlace"
                                    type="text"
                                    value={formData.idDocumentIssuePlace}
                                    onChange={handleChange}
                                    placeholder="Antananarivo"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section: Coordonnées */}
                    <div className="form-section">
                        <h3 className="section-title">📞 Coordonnées</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="phone">Téléphone *</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+261 34 00 000 00"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="profession">Profession</label>
                                <input
                                    id="profession"
                                    name="profession"
                                    type="text"
                                    value={formData.profession}
                                    onChange={handleChange}
                                    placeholder="Développeur, Enseignant..."
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Adresse complète *</label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Lot II B 123, Quartier XXX, Ville"
                                required
                            />
                        </div>
                    </div>

                    {/* Section: Compte */}
                    <div className="form-section">
                        <h3 className="section-title">🔐 Informations de compte</h3>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="votre@email.com"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="password">Mot de passe *</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    minLength="6"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirmer mot de passe *</label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                    </button>
                </form>

                <div className="auth-links">
                    <Link to="/login">Déjà un compte ? Se connecter</Link>
                </div>
            </div>
        </div>
    )
}