// src/context/AuthContext.jsx - CODE COMPLET MIS À JOUR
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../config/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Vérifier la session active
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Écouter les changements d'authentification
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    // Inscription
    const signUp = async (email, password, userData) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: userData,
                    emailRedirectTo: `${window.location.origin}/dashboard`
                }
            })
            return { data, error }
        } catch (error) {
            console.error('Erreur signup:', error)
            return { data: null, error }
        }
    }

    // Connexion
    const signIn = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            return { data, error }
        } catch (error) {
            console.error('Erreur signin:', error)
            return { data: null, error }
        }
    }

    // Déconnexion
    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            return { error }
        } catch (error) {
            console.error('Erreur signout:', error)
            return { error }
        }
    }

    // Réinitialisation du mot de passe
    const resetPassword = async (email) => {
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/update-password`
            })

            if (error) {
                console.error('Erreur reset password:', error)
            } else {
                console.log('Email de réinitialisation envoyé avec succès')
            }

            return { data, error }
        } catch (error) {
            console.error('Erreur reset password:', error)
            return { data: null, error }
        }
    }

    // Mettre à jour le mot de passe
    const updatePassword = async (newPassword) => {
        try {
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword
            })

            if (error) {
                console.error('Erreur update password:', error)
            } else {
                console.log('Mot de passe mis à jour avec succès')
            }

            return { data, error }
        } catch (error) {
            console.error('Erreur update password:', error)
            return { data: null, error }
        }
    }

    const value = {
        user,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}