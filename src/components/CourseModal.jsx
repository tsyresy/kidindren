// src/components/CourseModal.jsx
import React, { useState } from 'react'
import { X, Users, Clock, BookOpen, PlayCircle, ExternalLink, CreditCard } from 'lucide-react'
import { supabase } from '../config/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'
import { loadStripe } from '@stripe/stripe-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

export default function CourseModal({ open, onClose, course, plan }) {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [processingPayment, setProcessingPayment] = useState(false)
    const [isPurchased, setIsPurchased] = useState(false)

    React.useEffect(() => {
        if (open && user) {
            checkIfPurchased()
        }
    }, [open, user])

    const checkIfPurchased = async () => {
        try {
            const { data, error } = await supabase
                .from('user_courses')
                .select('*')
                .eq('user_id', user.id)
                .eq('course_id', course.id)
                .single()

            if (data) {
                setIsPurchased(true)
            }
        } catch (error) {
            setIsPurchased(false)
        }
    }

    const discount = plan?.course_discount ?? 0
    const finalPrice = course.is_free ? 0 : Math.round(course.base_price - (course.base_price * discount / 100))

    const handleAddFree = async () => {
        try {
            setLoading(true)

            const { error } = await supabase
                .from('user_courses')
                .insert({
                    user_id: user.id,
                    course_id: course.id,
                    price_paid: 0,
                    discount_applied: 0
                })

            if (error) throw error

            toast.success('Cours ajouté à votre bibliothèque !')
            setIsPurchased(true)

            if (course.destination_url) {
                window.open(course.destination_url, '_blank')
            }
        } catch (error) {
            console.error('Erreur ajout cours:', error)
            toast.error('Erreur lors de l\'ajout du cours')
        } finally {
            setLoading(false)
        }
    }

    const handlePurchase = async () => {
        try {
            setProcessingPayment(true)
            console.log('💳 Création Payment Intent Stripe...')

            const { data: { session: { access_token } } } = await supabase.auth.getSession()

            const response = await fetch(`${SUPABASE_URL}/functions/v1/super-task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                body: JSON.stringify({
                    courseId: course.id,
                    userId: user.id,
                    amount: Math.round(finalPrice),
                    discount: discount
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Erreur création Payment Intent')
            }

            console.log('✅ Payment Intent créé:', data.paymentIntentId)
            console.log('🔑 Client Secret:', data.clientSecret)

            const stripe = await stripePromise

            console.log('🚀 Redirection vers Stripe Checkout...')

            const { error } = await stripe.confirmPayment({
                clientSecret: data.clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success?course_id=${course.id}`,
                },
            })

            if (error) {
                throw error
            }
        } catch (error) {
            console.error('❌ Erreur paiement:', error)
            toast.error(error.message || 'Erreur lors du paiement')
            setProcessingPayment(false)
        }
    }

    const handleAccessCourse = () => {
        if (course.destination_url) {
            window.open(course.destination_url, '_blank')
        }
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

                <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* Video */}
                    {course.video_url && (
                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                            <iframe
                                src={`${course.video_url}?autoplay=1&mute=1`}
                                className="absolute top-0 left-0 w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}

                    <div className="p-8">
                        {/* Badges */}
                        <div className="flex gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                {course.category || 'Général'}
              </span>
                            <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">
                {course.level || 'Tous niveaux'}
              </span>
                            {course.featured && (
                                <span className="bg-yellow-400 text-black text-sm px-3 py-1 rounded-full font-bold">
                  ⭐ TOP-VENTES
                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {course.title}
                        </h2>

                        {/* Tagline */}
                        <p className="text-lg text-gray-600 mb-6">
                            {course.tagline}
                        </p>

                        {/* Instructor */}
                        {course.instructor_name && (
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-[#16f98a] to-[#3EF0D0] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {course.instructor_name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Créé par</p>
                                    <p className="font-semibold text-gray-900">{course.instructor_name}</p>
                                </div>
                            </div>
                        )}

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <Users size={20} className="text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Étudiants</p>
                                    <p className="font-semibold">{course.students_count?.toLocaleString() || 0}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={20} className="text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Durée</p>
                                    <p className="font-semibold">{course.duration_hours}h</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen size={20} className="text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Leçons</p>
                                    <p className="font-semibold">{course.lessons_count}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <PlayCircle size={20} className="text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Niveau</p>
                                    <p className="font-semibold">{course.level || 'Tous'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {course.description && (
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-3">À propos de ce cours</h3>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {course.description}
                                </p>
                            </div>
                        )}

                        {/* Price & CTA */}
                        <div className="border-t pt-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    {course.is_free ? (
                                        <p className="text-3xl font-bold text-green-600">GRATUIT</p>
                                    ) : (
                                        <div>
                                            {discount > 0 ? (
                                                <>
                                                    <div className="flex items-center gap-3">
                            <span className="text-gray-400 line-through text-lg">
                              {course.base_price?.toLocaleString()} MGA
                            </span>
                                                        <span className="text-3xl font-bold text-red-600">
                              {finalPrice.toLocaleString()} MGA
                            </span>
                                                    </div>
                                                    <span className="inline-block bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full mt-2">
                            -{discount}% avec {plan?.name}
                          </span>
                                                </>
                                            ) : (
                                                <p className="text-3xl font-bold text-gray-900">
                                                    {course.base_price?.toLocaleString()} MGA
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {isPurchased ? (
                                    <button
                                        onClick={handleAccessCourse}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <ExternalLink size={20} />
                                        Accéder au cours
                                    </button>
                                ) : course.is_free ? (
                                    <button
                                        onClick={handleAddFree}
                                        disabled={loading}
                                        className="flex-1 bg-gradient-to-r from-[#16f98a] to-[#3EF0D0] hover:from-[#14d97a] hover:to-[#3BE0C0] disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-[#010F1B] font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                Ajout en cours...
                                            </>
                                        ) : (
                                            <>
                                                <BookOpen size={20} />
                                                Ajouter à ma bibliothèque
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePurchase}
                                        disabled={processingPayment}
                                        className="flex-1 bg-gradient-to-r from-[#16f98a] to-[#3EF0D0] hover:from-[#14d97a] hover:to-[#3BE0C0] disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-[#010F1B] font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                    >
                                        {processingPayment ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                Préparation du paiement...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard size={20} />
                                                Acheter maintenant
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}