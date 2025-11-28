// src/pages/Formation.jsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient'
import { useAuth } from '../context/AuthContext'
import CourseModal from '../components/CourseModal'
import { useSubscription } from '../hooks/useSubscription'

export default function Formation() {
    const { user } = useAuth()
    const { plan } = useSubscription(user?.id)
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

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

    const calculatePrice = (basePrice, isFree) => {
        if (isFree) return 0
        const discount = plan?.course_discount ?? 0
        const finalPrice = basePrice - (basePrice * discount / 100)
        return Math.round(finalPrice)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#16f98a] to-[#3EF0D0] py-16 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <p className="text-red-600 font-bold text-sm tracking-wider mb-4">
                        🔥 OFFRE SPÉCIALE POUR LES UTILISATEURS
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#010F1B] mb-4">
                        Explorez <span className="text-red-600">gratuitement</span> un monde de +1 000 cours créatifs
                    </h1>
                    {plan && plan.course_discount > 0 && (
                        <div className="mt-6">
              <span className="inline-block bg-yellow-400 text-[#010F1B] font-bold text-lg px-6 py-3 rounded-full">
                ⭐ RÉDUCTION {plan.course_discount}% - Plan {plan.name}
              </span>
                        </div>
                    )}
                    <p className="text-lg mt-4 text-[#010F1B] opacity-90">
                        Profitez de formations de qualité créées par des experts
                    </p>
                </div>
            </div>

            {/* Liste des cours */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16f98a]"></div>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                        <p className="text-blue-800">Aucun cours disponible pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => {
                            const finalPrice = calculatePrice(course.base_price, course.is_free)
                            const originalPrice = course.base_price
                            const hasDiscount = plan?.course_discount > 0 && !course.is_free

                            return (
                                <div
                                    key={course.id}
                                    onClick={() => handleOpenCourse(course)}
                                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 bg-gray-200 flex-shrink-0">
                                        {course.featured && (
                                            <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full z-10">
                        TOP-VENTES
                      </span>
                                        )}
                                        {course.is_free && (
                                            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                        GRATUIT
                      </span>
                                        )}
                                        <img
                                            src={course.thumbnail_url || 'https://via.placeholder.com/400x300?text=Cours'}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        {/* Badges */}
                                        <div className="flex gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {course.category || 'Général'}
                      </span>
                                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        {course.level || 'Tous niveaux'}
                      </span>
                                        </div>

                                        {/* Titre */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                                            {course.title}
                                        </h3>

                                        {/* Tagline */}
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
                                            {course.tagline}
                                        </p>

                                        {/* Instructeur */}
                                        {course.instructor_name && (
                                            <p className="text-sm text-gray-500 mb-3">
                                                Par {course.instructor_name}
                                            </p>
                                        )}

                                        {/* Stats */}
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 mt-auto">
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                                </svg>
                                                <span>{course.students_count?.toLocaleString() || 0}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                </svg>
                                                <span>{course.duration_hours}h</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                                </svg>
                                                <span>{course.lessons_count} leçons</span>
                                            </div>
                                        </div>

                                        {/* Prix */}
                                        <div className="border-t pt-4 mt-auto">
                                            {course.is_free ? (
                                                <p className="text-xl font-bold text-green-600">GRATUIT</p>
                                            ) : (
                                                <div>
                                                    {hasDiscount ? (
                                                        <div className="flex items-center gap-2">
                              <span className="text-gray-400 line-through text-sm">
                                {originalPrice?.toLocaleString()} MGA
                              </span>
                                                            <span className="text-xl font-bold text-red-600">
                                {finalPrice.toLocaleString()} MGA
                              </span>
                                                        </div>
                                                    ) : (
                                                        <p className="text-xl font-bold text-gray-900">
                                                            {originalPrice?.toLocaleString()} MGA
                                                        </p>
                                                    )}
                                                    {hasDiscount && (
                                                        <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mt-2">
                              -{plan.course_discount}%
                            </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedCourse && (
                <CourseModal
                    open={modalOpen}
                    onClose={handleCloseCourse}
                    course={selectedCourse}
                    plan={plan}
                />
            )}
        </div>
    )
}