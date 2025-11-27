// src/components/CourseModal.jsx - Modal détails du cours
import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Button,
    Chip,
    IconButton,
    Grid,
    Divider,
    CircularProgress
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PeopleIcon from '@mui/icons-material/People'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SchoolIcon from '@mui/icons-material/School'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import StarIcon from '@mui/icons-material/Star'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../config/supabaseClient'
import toast from 'react-hot-toast'

export default function CourseModal({ open, onClose, course, plan }) {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [alreadyPurchased, setAlreadyPurchased] = useState(false)

    useEffect(() => {
        if (open && user && course) {
            checkIfPurchased()
        }
    }, [open, user, course])

    const checkIfPurchased = async () => {
        try {
            const { data, error } = await supabase
                .from('user_courses')
                .select('id')
                .eq('user_id', user.id)
                .eq('course_id', course.id)
                .single()

            setAlreadyPurchased(!!data)
        } catch (error) {
            // Pas acheté
            setAlreadyPurchased(false)
        }
    }

    // Calculer le prix avec réduction
    const calculatePrice = () => {
        if (course.is_free) return 0

        const discount = plan?.course_discount ?? 0
        const finalPrice = course.base_price - (course.base_price * discount / 100)
        return Math.round(finalPrice)
    }

    const finalPrice = calculatePrice()
    const hasDiscount = plan?.course_discount > 0 && !course.is_free

    // Extraire l'ID de la vidéo YouTube
    const getYouTubeId = (url) => {
        if (!url) return null
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
        return match ? match[1] : null
    }

    const videoId = getYouTubeId(course.video_url)

    const handlePurchase = async () => {
        if (alreadyPurchased) {
            // Rediriger directement vers le cours
            window.open(course.destination_url, '_blank')
            return
        }

        if (course.is_free) {
            // Cours gratuit - enregistrer directement
            await handleFreeCourse()
        } else {
            // Cours payant - créer Payment Intent Stripe
            await handlePaidCourse()
        }
    }

    const handleFreeCourse = async () => {
        try {
            setLoading(true)

            const { error } = await supabase
                .from('user_courses')
                .insert([{
                    user_id: user.id,
                    course_id: course.id,
                    price_paid: 0,
                    discount_applied: 0
                }])

            if (error) throw error

            toast.success('Cours ajouté à votre bibliothèque !')
            setAlreadyPurchased(true)

            // Rediriger vers le cours
            setTimeout(() => {
                window.open(course.destination_url, '_blank')
            }, 1000)
        } catch (error) {
            console.error('Erreur ajout cours gratuit:', error)
            toast.error('Erreur lors de l\'ajout du cours')
        } finally {
            setLoading(false)
        }
    }

    const handlePaidCourse = async () => {
        try {
            setLoading(true)

            // Créer Payment Intent Stripe
            const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/super-task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
                },
                body: JSON.stringify({
                    courseId: course.id,
                    userId: user.id,
                    amount: finalPrice,
                    discount: plan?.course_discount ?? 0
                })
            })

            if (!response.ok) {
                throw new Error('Erreur création Payment Intent')
            }

            const { clientSecret, paymentIntentId } = await response.json()

            // Rediriger vers page de paiement Stripe (à implémenter)
            toast.success('Redirection vers le paiement...')
            // TODO: Implémenter la redirection Stripe Checkout

        } catch (error) {
            console.error('Erreur paiement cours:', error)
            toast.error('Erreur lors de la création du paiement')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    maxHeight: '90vh'
                }
            }}
        >
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    color: '#fff',
                    zIndex: 1,
                    '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.7)'
                    }
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent sx={{ p: 0 }}>
                {/* Vidéo YouTube avec autoplay */}
                {videoId && (
                    <Box sx={{ position: 'relative', paddingTop: '56.25%', bgcolor: '#000' }}>
                        <iframe
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: 'none'
                            }}
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                            title={course.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Box>
                )}

                {/* Contenu du cours */}
                <Box sx={{ p: 4 }}>
                    {/* Titre et badges */}
                    <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                            {course.featured && (
                                <Chip
                                    label="TOP-VENTES"
                                    sx={{
                                        bgcolor: '#FFC107',
                                        color: '#000',
                                        fontWeight: 700
                                    }}
                                />
                            )}
                            {course.is_free && (
                                <Chip
                                    label="GRATUIT AVEC PLUS"
                                    sx={{
                                        bgcolor: '#dc3545',
                                        color: '#fff',
                                        fontWeight: 700
                                    }}
                                />
                            )}
                            <Chip
                                label={course.category}
                                sx={{
                                    bgcolor: '#e3f2fd',
                                    color: '#1976d2'
                                }}
                            />
                            <Chip
                                label={course.level}
                                sx={{
                                    bgcolor: '#f3e5f5',
                                    color: '#7b1fa2'
                                }}
                            />
                        </Box>

                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                            {course.title}
                        </Typography>

                        <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', mb: 2 }}>
                            {course.tagline}
                        </Typography>

                        {course.instructor_name && (
                            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                                Un cours proposé par <strong>{course.instructor_name}</strong>
                            </Typography>
                        )}
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Stats du cours */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <PeopleIcon sx={{ fontSize: 32, color: '#16f98a', mb: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {course.students_count?.toLocaleString() || 0}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Élèves
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <SchoolIcon sx={{ fontSize: 32, color: '#16f98a', mb: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {course.lessons_count}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Leçons ({course.duration_hours}h)
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <AccessTimeIcon sx={{ fontSize: 32, color: '#16f98a', mb: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {course.level}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Niveau
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    {/* Description */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Description
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                            {course.description}
                        </Typography>
                    </Box>

                    {/* Avantages */}
                    {hasDiscount && (
                        <Box sx={{
                            bgcolor: '#fff3cd',
                            border: '1px solid #ffc107',
                            borderRadius: 2,
                            p: 2,
                            mb: 3
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <StarIcon sx={{ color: '#ffc107' }} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Votre avantage Plan {plan.name}
                                </Typography>
                            </Box>
                            <Typography sx={{ color: 'text.secondary' }}>
                                Vous économisez <strong>{plan.course_discount}%</strong> sur ce cours grâce à votre abonnement !
                            </Typography>
                        </Box>
                    )}

                    {/* Prix et bouton d'achat */}
                    <Box sx={{
                        bgcolor: '#f8f9fa',
                        borderRadius: 2,
                        p: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2
                    }}>
                        <Box>
                            {course.is_free ? (
                                <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 700 }}>
                                    GRATUIT
                                </Typography>
                            ) : (
                                <Box>
                                    {hasDiscount && (
                                        <Typography
                                            sx={{
                                                textDecoration: 'line-through',
                                                color: 'text.secondary',
                                                fontSize: '1.2rem'
                                            }}
                                        >
                                            {course.base_price?.toLocaleString()} MGA
                                        </Typography>
                                    )}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="h4" sx={{ color: '#dc3545', fontWeight: 700 }}>
                                            {finalPrice.toLocaleString()} MGA
                                        </Typography>
                                        {hasDiscount && (
                                            <Chip
                                                label={`-${plan.course_discount}%`}
                                                sx={{
                                                    bgcolor: '#dc3545',
                                                    color: '#fff',
                                                    fontWeight: 700
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={handlePurchase}
                            disabled={loading}
                            startIcon={alreadyPurchased ? <CheckCircleIcon /> : null}
                            sx={{
                                bgcolor: alreadyPurchased ? '#4CAF50' : '#16f98a',
                                color: '#010F1B',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                px: 4,
                                py: 1.5,
                                minWidth: 200,
                                '&:hover': {
                                    bgcolor: alreadyPurchased ? '#45a049' : '#3EF0D0'
                                },
                                '&:disabled': {
                                    bgcolor: '#ccc'
                                }
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: '#010F1B' }} />
                            ) : alreadyPurchased ? (
                                'Accéder au cours'
                            ) : course.is_free ? (
                                'Ajouter à ma bibliothèque'
                            ) : (
                                'Acheter maintenant'
                            )}
                        </Button>
                    </Box>

                    {/* Note sur l'accès */}
                    {!alreadyPurchased && (
                        <Typography sx={{
                            color: 'text.secondary',
                            fontSize: '0.85rem',
                            mt: 2,
                            textAlign: 'center'
                        }}>
                            En ligne et à votre rythme • {course.lessons_count} leçons • {course.duration_hours}h de contenu
                        </Typography>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    )
}