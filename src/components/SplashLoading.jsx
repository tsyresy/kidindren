// src/components/SplashLoading.jsx
import { useState, useEffect } from 'react'
import '../styles/Splash.css'

export default function SplashLoading({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            onComplete()
        }, 3000) // 3 secondes

        return () => clearTimeout(timer)
    }, [onComplete])

    if (!isVisible) return null

    return (
        <div className="splash-container">
            <div className="splash-content">
                <div className="splash-logo-wrapper">
                    <img
                        src="https://res.cloudinary.com/djillj6xt/image/upload/v1763394596/Pv-1_mpl8kc.png"
                        alt="Payvilus Logo"
                        className="splash-logo"
                    />
                </div>
                <div className="splash-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p className="splash-text">Payvilus</p>
            </div>
        </div>
    )
}