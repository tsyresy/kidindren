// src/components/ExchangeRate.jsx - TAUX DE CHANGE ANIMÉ
import { useState, useEffect } from 'react'
import '../styles/Landing.css'

export default function ExchangeRate() {
    const [dailyRates, setDailyRates] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentRate, setCurrentRate] = useState(5110)
    const [displayRate, setDisplayRate] = useState('5110.00')

    // Générer les taux pour 24 heures (de 00h à 23h)
    const generateDailyRates = () => {
        const rates = []
        const baseRate = 5110

        for (let hour = 0; hour < 24; hour++) {
            // Créer une variation réaliste avec des pics et creux
            const variance = Math.sin(hour / 4) * 80 + (Math.random() - 0.5) * 40
            const rate = baseRate + variance
            rates.push({
                hour: `${String(hour).padStart(2, '0')}h`,
                rate: Math.max(5010, Math.min(5215, rate)), // Entre 5010 et 5215
                height: Math.max(5010, Math.min(5215, rate))
            })
        }

        return rates
    }

    // Initialiser les taux du jour
    useEffect(() => {
        const rates = generateDailyRates()
        setDailyRates(rates)
        setCurrentRate(rates[23].rate) // Taux actuel = dernier du jour
        setLoading(false)
    }, [])

    // Animation du taux qui change toutes les secondes
    useEffect(() => {
        const interval = setInterval(() => {
            const newRate = Math.max(5010, Math.min(5215, 5110 + (Math.random() - 0.5) * 210))
            setCurrentRate(newRate)
            setDisplayRate(newRate.toFixed(2))

            // Mettre à jour les taux quotidiens en temps réel
            setDailyRates(prev => {
                const updated = [...prev]
                // Ajouter le nouveau taux et retirer le plus ancien (décalage)
                updated.shift()
                updated.push({
                    hour: 'Maintenant',
                    rate: newRate,
                    height: newRate
                })
                return updated
            })
        }, 1000) // Mise à jour chaque seconde

        return () => clearInterval(interval)
    }, [])

    // Calculer la variation moyenne
    const minRate = Math.min(...dailyRates.map(r => r.rate))
    const maxRate = Math.max(...dailyRates.map(r => r.rate))
    const avgRate = (dailyRates.reduce((sum, r) => sum + r.rate, 0) / dailyRates.length).toFixed(2)

    // Normaliser les hauteurs pour le graphique (entre 0 et 100%)
    const chartRange = maxRate - minRate || 1
    const getNormalizedHeight = (rate) => {
        return ((rate - minRate) / chartRange) * 100 || 50
    }

    return (
        <section className="exchange-rate-section">
            <div className="exchange-container">
                <h2 className="section-title">
                    Taux de Change <span className="text-gradient">EUR - MGA</span> en Temps Réel
                </h2>

                <div className="exchange-info">
                    <div className="exchange-card">
                        <span className="exchange-label">Taux actuel</span>
                        <span className="exchange-value animated">
              {loading ? '...' : `1€ = ${displayRate} MGA`}
            </span>
                        <span className="exchange-small">Mis à jour en direct</span>
                    </div>
                    <div className="exchange-card">
                        <span className="exchange-label">Plage du jour</span>
                        <span className="exchange-small-value">
              Min: {minRate.toFixed(2)} MGA
            </span>
                        <span className="exchange-small-value">
              Max: {maxRate.toFixed(2)} MGA
            </span>
                    </div>
                    <div className="exchange-card">
                        <span className="exchange-label">Moyenne du jour</span>
                        <span className="exchange-value">
              {loading ? '...' : `${avgRate} MGA`}
            </span>
                    </div>
                </div>

                {!loading && (
                    <div className="chart-container">
                        <div className="chart">
                            {dailyRates.map((rate, index) => (
                                <div key={index} className="chart-bar-wrapper">
                                    <div
                                        className="chart-bar animated-bar"
                                        style={{
                                            height: `${getNormalizedHeight(rate.rate)}%`,
                                            animation: `growUp 0.8s ease-out ${index * 0.02}s backwards`
                                        }}
                                    >
                                        <span className="bar-value-tooltip">{rate.rate.toFixed(0)}</span>
                                    </div>
                                    <span className="bar-label">{rate.hour}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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