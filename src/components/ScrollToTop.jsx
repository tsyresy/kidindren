// src/components/ScrollToTop.jsx - VERSION AVEC ANIMATION SMOOTH
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth' // ✅ Animation douce au lieu de 'instant'
        })
    }, [pathname])

    return null
}