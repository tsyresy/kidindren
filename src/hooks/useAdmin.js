// src/hooks/useAdmin.js - Hook pour vérifier le rôle admin
import { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient'

export function useAdmin(userId) {
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAdminRole()
    }, [userId])

    const checkAdminRole = async () => {
        if (!userId) {
            setIsAdmin(false)
            setLoading(false)
            return
        }

        try {
            setLoading(true)

            const { data, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .single()

            if (error) {
                console.error('Erreur vérification admin:', error)
                setIsAdmin(false)
            } else {
                const adminRole = data?.role === 'admin'
                setIsAdmin(adminRole)
                console.log('🔐 Rôle utilisateur:', data?.role, '| Admin:', adminRole)
            }
        } catch (err) {
            console.error('Erreur useAdmin:', err)
            setIsAdmin(false)
        } finally {
            setLoading(false)
        }
    }

    return { isAdmin, loading }
}