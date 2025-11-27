// src/pages/Formation.jsx - Page Formation style Domestika
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Chip,
    CircularProgress,
    Alert
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StarIcon from '@mui/icons-material/Star'
import PeopleIcon from '@mui/icons-material/People'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SchoolIcon from '@mui/icons-material/School'
import Navbar from '../components/Navbar'
import CourseModal from '../components/CourseModal'
import { supabase } from '../config/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useSubscription } from '../hooks/useSubscription'

export default function Formation() {
    const { user } = useAuth()
    const { plan } = useSubscription(user?.id)
    const navigate = useNavigate()

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

    // Calculer le prix avec réduction
    const calculatePrice = (basePrice, isFree) => {
        if (isFree) return 0

        const discount = plan?.course_discount ?? 0
        const finalPrice = basePrice - (basePrice * discount / 100)
        return Math.round(finalPrice)
    }

    return (
        <>
            <Navbar />
            <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', pb: 6 }}>
                {/* Hero Section - Offre spéciale */}
                <Box sx={{
                    background: 'linear-gradient(135deg, #16f98a 0%, #3EF0D0 100%)',
                    py: 6,
                    textAlign: 'center',
                    color: '#010F1B'
                }}>
                    <Container maxWidth="md">
                        <Typography
                            variant="overline"
                            sx={{
                                color: '#dc3545',
                                fontWeight: 700,
                                fontSize: '14px',
                                letterSpacing: '1px',
                                mb: 2,
                                display: 'block'
                            }}
                        >
                            🔥 OFFRE SPÉCIALE POUR LES UTILISATEURS
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                mb: 2,
                                lineHeight: 1.2
                            }}
                        >
                            Explorez <Box component="span" sx={{ color: '#dc3545' }}>gratuitement</Box> un monde de +1 000 cours créatifs
                        </Typography>

                        {/* Afficher la réduction selon le plan */}
                        {plan && plan.course_discount > 0 && (
                            <Box sx={{ mt: 3, mb: 2 }}>
                                <Chip
                                    label={`RÉDUCTION ${plan.course_discount}% - Plan ${plan.name}`}
                                    sx={{
                                        bgcolor: '#FFD700',
                                        color: '#010F1B',
                                        fontWeight: 700,
                                        fontSize: '16px',
                                        px: 3,
                                        py: 2.5,
                                        height: 'auto'
                                    }}
                                    icon={<StarIcon sx={{ color: '#010F1B' }} />}
                                />
                            </Box>
                        )}

                        <Typography sx={{ fontSize: '1.1rem', mb: 3, opacity: 0.9 }}>
                            Profitez de formations de qualité créées par des experts
                        </Typography>
                    </Container>
                </Box>

                {/* Liste des cours */}
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                            <CircularProgress sx={{ color: '#16f98a' }} />
                        </Box>
                    ) : courses.length === 0 ? (
                        <Alert severity="info" sx={{ my: 4 }}>
                            Aucun cours disponible pour le moment.
                        </Alert>
                    ) : (
                        <Grid container spacing={3}>
                            {courses.map((course) => {
                                const finalPrice = calculatePrice(course.base_price, course.is_free)
                                const originalPrice = course.base_price
                                const hasDiscount = plan?.course_discount > 0 && !course.is_free

                                return (
                                    <Grid item xs={12} sm={6} md={4} key={course.id}>
                                        <Card
                                            sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-8px)',
                                                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                                                }
                                            }}
                                            onClick={() => handleOpenCourse(course)}
                                        >
                                            {/* Image avec badge TOP-VENTES */}
                                            <Box sx={{ position: 'relative' }}>
                                                {course.featured && (
                                                    <Chip
                                                        label="TOP-VENTES"
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 12,
                                                            left: 12,
                                                            bgcolor: '#FFC107',
                                                            color: '#000',
                                                            fontWeight: 700,
                                                            fontSize: '11px',
                                                            height: '24px',
                                                            zIndex: 1
                                                        }}
                                                    />
                                                )}
                                                {course.is_free && (
                                                    <Chip
                                                        label="GRATUIT AVEC PLUS"
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 12,
                                                            right: 12,
                                                            bgcolor: '#dc3545',
                                                            color: '#fff',
                                                            fontWeight: 700,
                                                            fontSize: '11px',
                                                            height: '24px',
                                                            zIndex: 1
                                                        }}
                                                    />
                                                )}
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={course.thumbnail_url || 'https://via.placeholder.com/400x300?text=Cours'}
                                                    alt={course.title}
                                                    sx={{
                                                        objectFit: 'cover',
                                                        bgcolor: '#f0f0f0'
                                                    }}
                                                />
                                                {/* Overlay Play */}
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        bgcolor: 'rgba(0,0,0,0.3)',
                                                        opacity: 0,
                                                        transition: 'opacity 0.3s ease',
                                                        '&:hover': {
                                                            opacity: 1
                                                        }
                                                    }}
                                                >
                                                    <PlayArrowIcon sx={{ fontSize: 60, color: '#fff' }} />
                                                </Box>
                                            </Box>

                                            <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                                                {/* Catégorie et niveau */}
                                                <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                                                    <Chip
                                                        label={course.category || 'Général'}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: '#e3f2fd',
                                                            color: '#1976d2',
                                                            fontSize: '11px',
                                                            height: '22px'
                                                        }}
                                                    />
                                                    <Chip
                                                        label={course.level || 'Tous niveaux'}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: '#f3e5f5',
                                                            color: '#7b1fa2',
                                                            fontSize: '11px',
                                                            height: '22px'
                                                        }}
                                                    />
                                                </Box>

                                                {/* Titre */}
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontSize: '1.1rem',
                                                        lineHeight: 1.3,
                                                        mb: 1,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    {course.title}
                                                </Typography>

                                                {/* Tagline */}
                                                <Typography
                                                    sx={{
                                                        color: 'text.secondary',
                                                        fontSize: '0.9rem',
                                                        mb: 2,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    {course.tagline}
                                                </Typography>

                                                {/* Instructeur */}
                                                {course.instructor_name && (
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.85rem',
                                                            color: 'text.secondary',
                                                            mb: 1.5
                                                        }}
                                                    >
                                                        Par {course.instructor_name}
                                                    </Typography>
                                                )}

                                                {/* Stats */}
                                                <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <PeopleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                        <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                                                            {course.students_count?.toLocaleString() || 0}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                        <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                                                            {course.duration_hours}h
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <SchoolIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                        <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                                                            {course.lessons_count} leçons
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                {/* Prix */}
                                                <Box>
                                                    {course.is_free ? (
                                                        <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 700 }}>
                                                            GRATUIT
                                                        </Typography>
                                                    ) : (
                                                        <Box>
                                                            {hasDiscount ? (
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                    <Typography
                                                                        sx={{
                                                                            textDecoration: 'line-through',
                                                                            color: 'text.secondary',
                                                                            fontSize: '0.9rem'
                                                                        }}
                                                                    >
                                                                        {originalPrice?.toLocaleString()} MGA
                                                                    </Typography>
                                                                    <Typography variant="h6" sx={{ color: '#dc3545', fontWeight: 700 }}>
                                                                        {finalPrice.toLocaleString()} MGA
                                                                    </Typography>
                                                                </Box>
                                                            ) : (
                                                                <Typography variant="h6" sx={{ color: '#010F1B', fontWeight: 700 }}>
                                                                    {originalPrice?.toLocaleString()} MGA
                                                                </Typography>
                                                            )}
                                                            {hasDiscount && (
                                                                <Chip
                                                                    label={`-${plan.course_discount}%`}
                                                                    size="small"
                                                                    sx={{
                                                                        bgcolor: '#dc3545',
                                                                        color: '#fff',
                                                                        fontWeight: 700,
                                                                        fontSize: '11px',
                                                                        height: '22px',
                                                                        mt: 0.5
                                                                    }}
                                                                />
                                                            )}
                                                        </Box>
                                                    )}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    )}
                </Container>
            </Box>

            {/* Modal du cours */}
            {selectedCourse && (
                <CourseModal
                    open={modalOpen}
                    onClose={handleCloseCourse}
                    course={selectedCourse}
                    plan={plan}
                />
            )}
        </>
    )
}