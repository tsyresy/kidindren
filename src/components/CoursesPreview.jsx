// src/components/CoursesPreview.jsx - SANS AFFICHAGE DES PRIX
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../config/supabaseClient'
import '../styles/Landing.css'

export default function CoursesPreview() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const scrollContainerRef = useRef(null)

    useEffect(() => {
        fetchCourses()
    }, [])

    // Auto-scroll effect
    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container || courses.length === 0) return

        let scrollAmount = 0
        const scrollSpeed = 1
        const scrollInterval = setInterval(() => {
            if (container) {
                scrollAmount += scrollSpeed
                container.scrollLeft = scrollAmount

                if (scrollAmount >= container.scrollWidth - container.clientWidth) {
                    scrollAmount = 0
                }
            }
        }, 30)

        return () => clearInterval(scrollInterval)
    }, [courses])

    const fetchCourses = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('status', 'published')
                .order('featured', { ascending: false })
                .order('created_at', { ascending: false })
                .limit(12)

            if (error) throw error
            setCourses(data || [])
        } catch (error) {
            console.error('Erreur chargement cours:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <section className="courses-preview-section">
                <div className="courses-preview-container">
                    <div className="section-header">
                        <h2 className="section-title">
                            Explorez nos <span className="text-gradient">formations</span>
                        </h2>
                        <p className="section-subtitle">
                            Développez vos compétences avec nos cours créés par des experts
                        </p>
                    </div>
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <div className="loading-spinner"></div>
                    </div>
                </div>
            </section>
        )
    }

    if (courses.length === 0) return null

    return (
        <section className="courses-preview-section">
            <div className="courses-preview-container">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">
                            Explorez nos <span className="text-gradient">formations</span>
                        </h2>
                        <p className="section-subtitle">
                            Développez vos compétences digitales avec nos cours créés par des experts
                        </p>
                    </div>
                    <a href="/register" className="btn-view-all">
                        Voir toutes les formations
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>

                <div className="courses-scroll-container" ref={scrollContainerRef}>
                    <div className="courses-scroll-track">
                        {/* Premier set de cours */}
                        {courses.map((course) => (
                            <div key={`course-${course.id}`} className="course-preview-card">
                                <div className="course-preview-thumbnail">
                                    {course.featured && (
                                        <span className="course-preview-badge featured">⭐ TOP</span>
                                    )}
                                    {course.is_free && (
                                        <span className="course-preview-badge free">GRATUIT</span>
                                    )}
                                    <img
                                        src={course.thumbnail_url || 'https://via.placeholder.com/400x300?text=Cours'}
                                        alt={course.title}
                                        loading="lazy"
                                    />
                                    <div className="course-preview-overlay">
                                        <svg className="play-icon" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="course-preview-content">
                                    <div className="course-preview-badges">
                                        <span className="badge-category">
                                            {course.category || 'Général'}
                                        </span>
                                        <span className="badge-level">
                                            {course.level || 'Tous niveaux'}
                                        </span>
                                    </div>

                                    <h3 className="course-preview-title">{course.title}</h3>

                                    {course.instructor_name && (
                                        <p className="course-preview-instructor">
                                            Par {course.instructor_name}
                                        </p>
                                    )}

                                    <div className="course-preview-stats">
                                        <div className="stat">
                                            <svg fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                            </svg>
                                            <span>{course.students_count?.toLocaleString() || 0}</span>
                                        </div>
                                        <div className="stat">
                                            <svg fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            <span>{course.duration_hours}h</span>
                                        </div>
                                        <div className="stat">
                                            <svg fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                                            </svg>
                                            <span>{course.lessons_count} leçons</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Duplication pour scroll infini seamless */}
                        {courses.map((course) => (
                            <div key={`course-dup-${course.id}`} className="course-preview-card">
                                <div className="course-preview-thumbnail">
                                    {course.featured && (
                                        <span className="course-preview-badge featured">⭐ TOP</span>
                                    )}
                                    {course.is_free && (
                                        <span className="course-preview-badge free">GRATUIT</span>
                                    )}
                                    <img
                                        src={course.thumbnail_url || 'https://via.placeholder.com/400x300?text=Cours'}
                                        alt={course.title}
                                        loading="lazy"
                                    />
                                    <div className="course-preview-overlay">
                                        <svg className="play-icon" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="course-preview-content">
                                    <div className="course-preview-badges">
                                        <span className="badge-category">
                                            {course.category || 'Général'}
                                        </span>
                                        <span className="badge-level">
                                            {course.level || 'Tous niveaux'}
                                        </span>
                                    </div>

                                    <h3 className="course-preview-title">{course.title}</h3>

                                    {course.instructor_name && (
                                        <p className="course-preview-instructor">
                                            Par {course.instructor_name}
                                        </p>
                                    )}

                                    <div className="course-preview-stats">
                                        <div className="stat">
                                            <svg fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                            </svg>
                                            <span>{course.students_count?.toLocaleString() || 0}</span>
                                        </div>
                                        <div className="stat">
                                            <svg fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            <span>{course.duration_hours}h</span>
                                        </div>
                                        <div className="stat">
                                            <svg fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                                            </svg>
                                            <span>{course.lessons_count} leçons</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="courses-preview-cta">
                    <p>🎓 Plus de 1000+ cours disponibles pour booster votre carrière digitale</p>
                    <a href="/register" className="btn-cta-large">
                        Créer un compte gratuit
                    </a>
                </div>
            </div>
        </section>
    )
}