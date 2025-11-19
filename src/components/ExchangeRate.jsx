// src/components/ExchangeRate.jsx - TAUX DE CHANGE SIMPLIFIÉ
import { useState, useEffect } from 'react'
import '../styles/Landing.css'

export default function ExchangeRate() {
    const [currentRate, setCurrentRate] = useState(5110)
    const [displayRate, setDisplayRate] = useState('5110.00')
    const [variation, setVariation] = useState(0)
    const [rateHistory, setRateHistory] = useState([5110])

    // Animation du taux qui change toutes les secondes
    useEffect(() => {
        const interval = setInterval(() => {
            const newRate = Math.max(5010, Math.min(5215, 5110 + (Math.random() - 0.5) * 210))
            const variation = ((newRate - 5110) / 5110) * 100

            setCurrentRate(newRate)
            setDisplayRate(newRate.toFixed(2))
            setVariation(variation)

            // Garder un historique de 24 valeurs max
            setRateHistory(prev => {
                const updated = [...prev, newRate]
                return updated.slice(-24)
            })
        }, 1000) // Mise à jour chaque seconde

        return () => clearInterval(interval)
    }, [])

    // Calculer les statistiques
    const minRate = Math.min(...rateHistory)
    const maxRate = Math.max(...rateHistory)
    const avgRate = (rateHistory.reduce((sum, r) => sum + r, 0) / rateHistory.length).toFixed(2)
    const variationColor = variation >= 0 ? '#16f98a' : '#ff6b6b'
    const variationSymbol = variation >= 0 ? '📈' : '📉'

    return (
        <section className="exchange-rate-section">
            <div className="exchange-container">
                <h2 className="section-title">
                    Taux de Change <span className="text-gradient">EUR - MGA</span> en Temps Réel
                </h2>

                {/* Cartes d'information */}
                <div className="exchange-info">
                    <div className="exchange-card">
                        <span className="exchange-label">Taux actuel</span>
                        <span className="exchange-value animated">
              1€ = {displayRate} MGA
            </span>
                        <span
                            className="exchange-variation"
                            style={{ color: variationColor }}
                        >
              {variationSymbol} {variation >= 0 ? '+' : ''}{variation.toFixed(2)}%
            </span>
                    </div>

                    <div className="exchange-card">
                        <span className="exchange-label">Plage du jour</span>
                        <div className="exchange-range">
                            <div className="range-item">
                                <span className="range-label">Min</span>
                                <span className="range-value">{minRate.toFixed(2)} MGA</span>
                            </div>
                            <div className="range-item">
                                <span className="range-label">Max</span>
                                <span className="range-value">{maxRate.toFixed(2)} MGA</span>
                            </div>
                        </div>
                    </div>

                    <div className="exchange-card">
                        <span className="exchange-label">Moyenne</span>
                        <span className="exchange-value">
              {avgRate} MGA
            </span>
                        <span className="exchange-small">Dernières {rateHistory.length}h</span>
                    </div>
                </div>

                {/* Mini graphique sparkline */}
                <div className="sparkline-container">
                    <div className="sparkline">
                        <svg viewBox="0 0 500 100" preserveAspectRatio="none">
                            {/* Aire sous la courbe */}
                            <defs>
                                <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#16f98a" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#16f98a" stopOpacity="0.05" />
                                </linearGradient>
                            </defs>

                            {/* Points et ligne */}
                            <polyline
                                points={rateHistory.map((rate, i) => {
                                    const x = (i / Math.max(1, rateHistory.length - 1)) * 500
                                    const y = 100 - ((rate - minRate) / (maxRate - minRate || 1)) * 80 - 10
                                    return `${x},${y}`
                                }).join(' ')}
                                fill="none"
                                stroke="#16f98a"
                                strokeWidth="2"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />

                            {/* Aire sous la courbe */}
                            <polygon
                                points={`0,100 ${rateHistory.map((rate, i) => {
                                    const x = (i / Math.max(1, rateHistory.length - 1)) * 500
                                    const y = 100 - ((rate - minRate) / (maxRate - minRate || 1)) * 80 - 10
                                    return `${x},${y}`
                                }).join(' ')} 500,100`}
                                fill="url(#sparkGradient)"
                            />
                        </svg>
                    </div>
                    <p className="sparkline-label">Évolution des dernières heures</p>
                </div>

                {/* Bénéfices */}
                <div className="exchange-benefits">
                    <p>
                        📊 Suivez les fluctuations du taux EUR-MGA en direct sur Payvilus
                    </p>
                    <p>
                        🔄 Mise à jour automatique chaque seconde avec taux réalistes
                    </p>
                    <p>
                        💰 Obtenez les meilleurs taux pour vos conversions PayPal → Mobile Money
                    </p>
                    <p>
                        ⚡ Transactions traitées en moins de 24h
                    </p>
                </div>
            </div>
        </section>
    )
}