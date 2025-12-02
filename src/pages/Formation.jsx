// src/pages/Formation.jsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient'
import { useAuth } from '../context/AuthContext'
import CourseModal from '../components/CourseModal'
import CoursePaymentModal from '../components/CoursePaymentModal'
import { useSubscription } from '../hooks/useSubscription'
import Navbar from '../components/Navbar'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import '../styles/formation.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export default function Formation() {
    const { user } = useAuth()
    const { plan } = useSubscription(user?.id)
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [paymentModalOpen, setPaymentModalOpen] = useState(false)
    const [courseForPayment, setCourseForPayment] = useState(null)

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('status', 'published')
                .order('featured', { ascending: false })
                .order('created_at', { ascending: false })

            if (error) throw error
            setCourses(data || [])
        } catch (error) {
            console.error('Erreur chargement cours:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleOpenCourse = (course) => {
        setSelectedCourse(course)
        setModalOpen(true)
    }

    const handleCloseCourse = () => {
        setModalOpen(false)
        setSelectedCourse(null)
    }

    const handlePurchaseClick = (course) => {
        // Double vérification - ne jamais ouvrir modal pour cours gratuits
        const discount = plan?.course_discount ?? 0
        const finalPrice = course.base_price - (course.base_price * discount / 100)

        if (course.is_free || finalPrice === 0) {
            console.log('Cours gratuit détecté - pas de modal de paiement')
            return
        }

        setModalOpen(false)
        setCourseForPayment(course)
        setPaymentModalOpen(true)
    }

    const handlePaymentModalClose = (success) => {
        setPaymentModalOpen(false)
        setCourseForPayment(null)
        if (success) {
            setSelectedCourse(null)
        }
    }

    const calculatePrice = (basePrice, isFree) => {
        if (isFree) return 0
        const discount = plan?.course_discount ?? 0
        const finalPrice = basePrice - (basePrice * discount / 100)
        return Math.round(finalPrice)
    }

    return (
        <>
            <Navbar />
            <div className="formation-page">
                {/* Hero */}
                <div style={{
                    background: 'linear-gradient(135deg, #16f98a 0%, #3EF0D0 100%)',
                    padding: '48px 20px',
                    textAlign: 'center'
                }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <p style={{ color: '#dc2626', fontWeight: 700, fontSize: '11px', letterSpacing: '0.05em', marginBottom: '12px' }}>
                            🔥 OFFRE SPÉCIALE POUR LES UTILISATEURS
                        </p>
                        <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#010F1B', marginBottom: '12px' }}>
                            Explorez <span style={{ color: '#dc2626' }}>gratuitement</span> un monde de +1 000 cours créatifs
                        </h1>
                        {plan && plan.course_discount > 0 && (
                            <div style={{ marginTop: '16px' }}>
                                <span style={{
                                    display: 'inline-block',
                                    background: '#fbbf24',
                                    color: '#010F1B',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    padding: '8px 16px',
                                    borderRadius: '20px'
                                }}>
                                    ⭐ RÉDUCTION {plan.course_discount}% - Plan {plan.name}
                                </span>
                            </div>
                        )}
                        <p style={{ fontSize: '15px', marginTop: '12px', color: '#010F1B', opacity: 0.9 }}>
                            Profitez de formations de qualité créées par des experts
                        </p>
                    </div>
                </div>

                {/* Grille des cours */}
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 20px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            border: '4px solid #e5e7eb',
                            borderTopColor: '#16f98a',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                    </div>
                ) : courses.length === 0 ? (
                    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                        <p style={{ color: '#6b7280' }}>Aucun cours disponible pour le moment.</p>
                    </div>
                ) : (
                    <div className="formation-grid">
                        {courses.map((course) => {
                            const finalPrice = calculatePrice(course.base_price, course.is_free)
                            const originalPrice = course.base_price
                            const hasDiscount = plan?.course_discount > 0 && !course.is_free

                            return (
                                <div
                                    key={course.id}
                                    className="course-card"
                                    onClick={() => handleOpenCourse(course)}
                                >
                                    <div className="course-thumbnail">
                                        {course.featured && (
                                            <span className="course-badge featured">TOP-VENTES</span>
                                        )}
                                        {course.is_free && (
                                            <span className="course-badge free">GRATUIT</span>
                                        )}
                                        <img
                                            src={course.thumbnail_url || 'https://via.placeholder.com/400x300?text=Cours'}
                                            alt={course.title}
                                        />
                                        <div className="play-overlay">
                                            <svg className="play-icon" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="course-content">
                                        <div className="course-badges">
                                            <span className="category-badge category">
                                                {course.category || 'Général'}
                                            </span>
                                            <span className="category-badge level">
                                                {course.level || 'Tous niveaux'}
                                            </span>
                                        </div>

                                        <h3 className="course-title">{course.title}</h3>
                                        <p className="course-tagline">{course.tagline}</p>

                                        {course.instructor_name && (
                                            <p className="course-instructor">Par {course.instructor_name}</p>
                                        )}

                                        <div className="course-stats">
                                            <div className="stat-item">
                                                <svg fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                                </svg>
                                                <span>{course.students_count?.toLocaleString() || 0}</span>
                                            </div>
                                            <div className="stat-item">
                                                <svg fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                </svg>
                                                <span>{course.duration_hours}h</span>
                                            </div>
                                            <div className="stat-item">
                                                <svg fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                                                </svg>
                                                <span>{course.lessons_count} leçons</span>
                                            </div>
                                        </div>

                                        <div className="course-price">
                                            {course.is_free || finalPrice === 0 ? (
                                                <p className="price-free">GRATUIT</p>
                                            ) : hasDiscount ? (
                                                <div>
                                                    <div className="price-wrapper">
                                                        <span className="price-original">
                                                            {originalPrice?.toLocaleString()} MGA
                                                        </span>
                                                        <span className="price-final">
                                                            {finalPrice.toLocaleString()} MGA
                                                        </span>
                                                    </div>
                                                    <span className="price-discount">
                                                        -{plan.course_discount}%
                                                    </span>
                                                </div>
                                            ) : (
                                                <p className="price-final">
                                                    {originalPrice?.toLocaleString()} MGA
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Modal info cours */}
                {selectedCourse && (
                    <CourseModal
                        open={modalOpen}
                        onClose={handleCloseCourse}
                        course={selectedCourse}
                        plan={plan}
                        onPurchaseClick={handlePurchaseClick}
                    />
                )}

                {/* Modal paiement avec Stripe */}
                {courseForPayment && (
                    <Elements stripe={stripePromise}>
                        <CoursePaymentModal
                            isOpen={paymentModalOpen}
                            onClose={handlePaymentModalClose}
                            course={courseForPayment}
                            user={user}
                            plan={plan}
                        />
                    </Elements>
                )}
            </div>
        </>
    )
}