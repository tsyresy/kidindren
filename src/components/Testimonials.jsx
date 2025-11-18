// src/components/Testimonials.jsx
import { useState, useEffect } from 'react'
import '../styles/Components.css'

export default function Testimonials() {
    const [visibleReviews, setVisibleReviews] = useState([0, 1, 2])

    const reviews = [
        {
            id: 1,
            name: 'Sarah Rakoto',
            role: 'Développeuse Web',
            rating: 5,
            comment: 'Payvilus a complètement changé ma façon de gérer mes paiements freelance. Les transactions sont rapides et le service client est au top !',
            date: 'Il y a 2 jours'
        },
        {
            id: 2,
            name: 'Jean Martin',
            role: 'Designer Graphique',
            rating: 5,
            comment: 'Les formations sont excellentes ! J\'ai pu apprendre le marketing digital et décrocher mes premiers clients en moins de 3 mois.',
            date: 'Il y a 1 semaine'
        },
        {
            id: 3,
            name: 'Marie Andriamahefa',
            role: 'Content Creator',
            rating: 4.5,
            comment: 'Service fiable et professionnel. J\'utilise Payvilus pour toutes mes transactions PayPal depuis 6 mois, aucun problème !',
            date: 'Il y a 2 semaines'
        },
        {
            id: 4,
            name: 'David Rasolofo',
            role: 'Entrepreneur Digital',
            rating: 5,
            comment: 'La plateforme est intuitive et les taux de change sont très compétitifs. Je recommande vivement Payvilus à tous les freelancers.',
            date: 'Il y a 3 semaines'
        },
        {
            id: 5,
            name: 'Fara Randria',
            role: 'Community Manager',
            rating: 5,
            comment: 'Grâce aux formations de Payvilus, j\'ai pu me reconvertir dans le digital. Aujourd\'hui je gagne 3x plus qu\'avant !',
            date: 'Il y a 1 mois'
        },
        {
            id: 6,
            name: 'Patrick Raharison',
            role: 'Consultant SEO',
            rating: 4.5,
            comment: 'Excellent service ! Les retraits PayPal sont traités en moins de 24h. C\'est exactement ce dont j\'avais besoin pour mon activité.',
            date: 'Il y a 1 mois'
        }
    ]

    // Animation de défilement des avis
    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleReviews(prev => {
                const next = prev.map(i => (i + 1) % reviews.length)
                return next
            })
        }, 4000) // Change toutes les 4 secondes

        return () => clearInterval(interval)
    }, [reviews.length])

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0
        const stars = []

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} className="star full">★</span>)
        }
        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">★</span>)
        }
        const emptyStars = 5 - Math.ceil(rating)
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">★</span>)
        }

        return stars
    }

    return (
        <section className="testimonials-section">
            <div className="testimonials-header">
                <img
                    src="https://res.cloudinary.com/djillj6xt/image/upload/v1753057220/trsustpilot_nr2ytg.png"
                    alt="Trustpilot"
                    className="trustpilot-logo"
                />
                <div className="testimonials-rating">
                    <div className="overall-rating">
                        <span className="rating-score">4.8</span>
                        <div className="rating-stars">
                            {renderStars(4.8)}
                        </div>
                    </div>
                    <p className="rating-text">Basé sur {reviews.length} avis vérifiés</p>
                </div>
            </div>

            <div className="testimonials-grid">
                {visibleReviews.map((index) => {
                    const review = reviews[index]
                    return (
                        <div key={review.id} className="testimonial-card">
                            <div className="testimonial-header">
                                <div className="reviewer-info">
                                    <div className="reviewer-avatar">
                                        {review.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h4 className="reviewer-name">{review.name}</h4>
                                        <p className="reviewer-role">{review.role}</p>
                                    </div>
                                </div>
                                <span className="review-date">{review.date}</span>
                            </div>

                            <div className="testimonial-rating">
                                {renderStars(review.rating)}
                            </div>

                            <p className="testimonial-comment">{review.comment}</p>

                            <div className="testimonial-verified">
                                <span className="verified-badge">✓</span>
                                Avis vérifié
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="testimonials-cta">
                <p>Rejoignez des centaines d'utilisateurs satisfaits</p>
                <a
                    href="https://www.trustpilot.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-trustpilot"
                >
                    Voir tous les avis sur Trustpilot
                </a>
            </div>
        </section>
    )
}