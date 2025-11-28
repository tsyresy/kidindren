// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react'
import { supabase } from '../config/supabaseClient'
import { useAuth } from '../context/AuthContext'

export default function PaymentSuccess() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { user } = useAuth()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)

    const courseId = searchParams.get('course_id')

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }

        if (courseId) {
            fetchCourse()
        }
    }, [user, courseId])

    const fetchCourse = async () => {
        try {
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('id', courseId)
                .single()

            if (error) throw error
            setCourse(data)
        } catch (error) {
            console.error('Erreur chargement cours:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAccessCourse = () => {
        if (course?.destination_url) {
            window.open(course.destination_url, '_blank')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16f98a]"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 rounded-full p-4">
                        <CheckCircle className="w-16 h-16 text-green-600" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
                    Paiement réussi ! 🎉
                </h1>

                <p className="text-center text-gray-600 mb-8">
                    Merci pour votre achat. Vous avez maintenant accès à votre cours.
                </p>

                {/* Course Info */}
                {course && (
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                        <h2 className="font-bold text-xl text-gray-900 mb-4">
                            {course.title}
                        </h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">Instructeur</p>
                                <p className="font-semibold">{course.instructor_name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Durée</p>
                                <p className="font-semibold">{course.duration_hours}h</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Leçons</p>
                                <p className="font-semibold">{course.lessons_count}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Niveau</p>
                                <p className="font-semibold">{course.level || 'Tous niveaux'}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Email confirmation */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                        📧 Un email de confirmation avec les détails de votre achat vous sera envoyé sous peu.
                    </p>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button
                        onClick={handleAccessCourse}
                        className="w-full bg-gradient-to-r from-[#16f98a] to-[#3EF0D0] hover:from-[#14d97a] hover:to-[#3BE0C0] text-[#010F1B] font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                        <ExternalLink size={20} />
                        Accéder au cours maintenant
                    </button>

                    <button
                        onClick={() => navigate('/formation')}
                        className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        Retour aux formations
                    </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Vous pouvez retrouver ce cours dans votre bibliothèque à tout moment.
                </p>
            </div>
        </div>
    )
}