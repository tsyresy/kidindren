// src/components/Carousel.jsx
import { useState, useEffect } from 'react'
import '../styles/Components.css'

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0)

    // Images publicitaires (placeholder - à remplacer par vos vraies images)
    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=675&fit=crop',
            title: 'Transactions PayPal Sécurisées',
            description: 'Échangez facilement entre PayPal et Mobile Money'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=675&fit=crop',
            title: 'Formations Certifiantes',
            description: 'Développez vos compétences digitales avec nos experts'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop',
            title: 'Accompagnement Personnalisé',
            description: 'Un support dédié pour tous vos projets'
        },{
            id: 3,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop',
            title: 'Accompagnement Personnalisé',
            description: 'Un support dédié pour tous vos projets'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=675&fit=crop',
            title: 'Rejoignez Notre Communauté',
            description: 'Plus de 1000 freelancers nous font confiance'
        }
    ]

    // Auto-play du carrousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000) // Change toutes les 5 secondes

        return () => clearInterval(interval)
    }, [slides.length])

    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    return (
        <section className="carousel-section">
            <h2 className="section-title">Actualités & Promotions</h2>

            <div className="carousel-container">
                <div className="carousel-wrapper">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{
                                transform: `translateX(${(index - currentSlide) * 100}%)`,
                            }}
                        >
                            <img src={slide.image} alt={slide.title} className="carousel-image" />
                            <div className="carousel-overlay">
                                <h3>{slide.title}</h3>
                                <p>{slide.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Boutons navigation */}
                <button onClick={prevSlide} className="carousel-btn carousel-btn-prev">
                    ‹
                </button>
                <button onClick={nextSlide} className="carousel-btn carousel-btn-next">
                    ›
                </button>

                {/* Indicateurs */}
                <div className="carousel-indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                            aria-label={`Aller à la slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}