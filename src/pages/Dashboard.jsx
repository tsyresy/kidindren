// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../config/supabaseClient'
import '../styles/Dashboard.css'

export default function Dashboard() {
    const { user, signOut } = useAuth()
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchProfile()
        }
    }, [user])

    const fetchProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (error) {
                console.error('Erreur lors de la récupération du profil:', error)
            } else {
                setProfile(data)
            }
        } catch (error) {
            console.error('Erreur:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await signOut()
            navigate('/login')
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error)
        }
    }

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement de votre profil...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Tableau de bord</h1>
                <button onClick={handleLogout} className="btn-logout">
                    Déconnexion
                </button>
            </div>

            <div className="dashboard-content">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            {profile?.first_name?.[0]?.toUpperCase() || 'U'}
                            {profile?.last_name?.[0]?.toUpperCase() || ''}
                        </div>
                        <h2>
                            {profile?.first_name} {profile?.last_name}
                        </h2>
                        <p className="profile-email">{user?.email}</p>
                    </div>

                    <div className="profile-info">
                        {/* Section: Informations personnelles */}
                        <div className="info-section">
                            <h3>📋 Informations personnelles</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Prénom</span>
                                    <span className="info-value">{profile?.first_name}</span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">Nom</span>
                                    <span className="info-value">{profile?.last_name}</span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">Date de naissance</span>
                                    <span className="info-value">
                    {profile?.birth_date ? new Date(profile.birth_date).toLocaleDateString('fr-FR') : '-'}
                  </span>
                                </div>

                                {profile?.birth_place && (
                                    <div className="info-item">
                                        <span className="info-label">Lieu de naissance</span>
                                        <span className="info-value">{profile.birth_place}</span>
                                    </div>
                                )}

                                <div className="info-item">
                                    <span className="info-label">Sexe</span>
                                    <span className="info-value">{profile?.gender || '-'}</span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">Nationalité</span>
                                    <span className="info-value">{profile?.nationality || '-'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Section: Document d'identité */}
                        <div className="info-section">
                            <h3>🪪 Document d'identité</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Type de document</span>
                                    <span className="info-value">{profile?.id_document_type || '-'}</span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">Numéro</span>
                                    <span className="info-value">{profile?.id_document_number || '-'}</span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">Date de délivrance</span>
                                    <span className="info-value">
                    {profile?.id_document_issue_date
                        ? new Date(profile.id_document_issue_date).toLocaleDateString('fr-FR')
                        : '-'}
                  </span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">Lieu de délivrance</span>
                                    <span className="info-value">{profile?.id_document_issue_place || '-'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Section: Coordonnées */}
                        <div className="info-section">
                            <h3>📞 Coordonnées</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Email</span>
                                    <span className="info-value">{user?.email}</span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">Téléphone</span>
                                    <span className="info-value">{profile?.phone || '-'}</span>
                                </div>

                                {profile?.profession && (
                                    <div className="info-item">
                                        <span className="info-label">Profession</span>
                                        <span className="info-value">{profile.profession}</span>
                                    </div>
                                )}

                                <div className="info-item full-width">
                                    <span className="info-label">Adresse</span>
                                    <span className="info-value">{profile?.address || '-'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Section: Informations de compte */}
                        <div className="info-section">
                            <h3>⚙️ Informations de compte</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Compte créé le</span>
                                    <span className="info-value">
                    {new Date(user?.created_at).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                  </span>
                                </div>

                                <div className="info-item">
                                    <span className="info-label">Dernière connexion</span>
                                    <span className="info-value">
                    {new Date(user?.last_sign_in_at).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}