// src/components/CourseModal.jsx
import React, { useState, useEffect, useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Box,
    Typography,
    Button,
    Chip,
    Divider
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { supabase } from '../config/supabaseClient'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function CourseModal({ open, onClose, course, plan, onPurchaseClick }) {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [showUnmuteButton, setShowUnmuteButton] = useState(false)
    const videoRef = useRef(null)
    const iframeRef = useRef(null)

    // Détecter si c'est une vidéo YouTube
    const isYouTubeUrl = (url) => {
        if (!url) return false
        return url.includes('youtube.com') || url.includes('youtu.be')
    }

    // Convertir URL YouTube en format embed
    const getYouTubeEmbedUrl = (url, muted = false) => {
        if (!url) return null

        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)

        if (match && match[2].length === 11) {
            const muteParam = muted ? '&mute=1' : ''
            return `https://www.youtube.com/embed/${match[2]}?autoplay=1${muteParam}&loop=1&playlist=${match[2]}`
        }

        return null
    }

    // Gestion autoplay avec tentative son d'abord
    useEffect(() => {
        if (open && course.video_url && !isYouTubeUrl(course.video_url)) {
            const timer = setTimeout(async () => {
                if (videoRef.current) {
                    try {
                        videoRef.current.muted = false
                        await videoRef.current.play()
                        setIsMuted(false)
                        setShowUnmuteButton(false)
                        console.log('✅ Autoplay avec son réussi')
                    } catch (err) {
                        console.log('❌ Autoplay avec son bloqué, essai avec mute:', err)
                        try {
                            videoRef.current.muted = true
                            await videoRef.current.play()
                            setIsMuted(true)
                            setShowUnmuteButton(true)
                            toast('🔇 Cliquez sur l\'icône pour activer le son', {
                                duration: 3000,
                                icon: '🔊'
                            })
                        } catch (mutedErr) {
                            console.log('❌ Autoplay muted également bloqué:', mutedErr)
                        }
                    }
                }
            }, 300)

            return () => clearTimeout(timer)
        }
    }, [open, course.video_url])

    const handleUnmute = () => {
        if (videoRef.current) {
            videoRef.current.muted = false
            setIsMuted(false)
            setShowUnmuteButton(false)
        }
    }

    const calculatePrice = () => {
        if (course.is_free) return 0
        const discount = plan?.course_discount ?? 0
        const finalPrice = course.base_price - (course.base_price * discount / 100)
        return Math.round(finalPrice)
    }

    const handlePurchase = async () => {
        if (!user) {
            toast.error('Veuillez vous connecter pour acheter ce cours')
            return
        }

        const price = calculatePrice()

        // Cours gratuit - DEUX vérifications (is_free OU price = 0)
        if (course.is_free || price === 0) {
            try {
                setLoading(true)

                // Insertion avec price_paid obligatoire
                const { error } = await supabase
                    .from('user_courses')
                    .insert({
                        user_id: user.id,
                        course_id: course.id,
                        price_paid: 0  // OBLIGATOIRE même pour cours gratuits
                    })

                if (error && error.code !== '23505') throw error

                toast.success('Cours ajouté à votre bibliothèque !', {
                    icon: '🎉',
                    duration: 3000
                })
                onClose()

                // Redirection immédiate dans nouvel onglet
                if (course.destination_url) {
                    window.open(course.destination_url, '_blank')
                }
            } catch (error) {
                console.error('Erreur inscription gratuite:', error)
                toast.error('Erreur lors de l\'inscription')
            } finally {
                setLoading(false)
            }
            return // STOP ICI - ne pas ouvrir le modal de paiement
        }

        // Cours payant uniquement
        onPurchaseClick(course)
    }

    const finalPrice = calculatePrice()
    const hasDiscount = plan?.course_discount > 0 && !course.is_free

    const isYouTube = isYouTubeUrl(course.video_url)
    const youtubeEmbedUrl = isYouTube ? getYouTubeEmbedUrl(course.video_url, false) : null

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    maxHeight: '90vh'
                }
            }}
        >
            <DialogTitle sx={{ p: 0, position: 'relative' }}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        zIndex: 10,
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.7)'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {/* Vidéo Preview */}
                {course.video_url ? (
                    <Box sx={{ position: 'relative', paddingTop: '56.25%', bgcolor: '#000' }}>
                        {isYouTube && youtubeEmbedUrl ? (
                            // YouTube iframe
                            <iframe
                                ref={iframeRef}
                                src={youtubeEmbedUrl}
                                title={course.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                        ) : (
                            // Vidéo standard
                            <>
                                <video
                                    ref={videoRef}
                                    src={course.video_url}
                                    controls
                                    loop
                                    playsInline
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                />

                                {/* Bouton unmute */}
                                {showUnmuteButton && (
                                    <IconButton
                                        onClick={handleUnmute}
                                        sx={{
                                            position: 'absolute',
                                            bottom: 70,
                                            right: 16,
                                            bgcolor: '#16f98a',
                                            color: '#010F1B',
                                            width: 56,
                                            height: 56,
                                            boxShadow: '0 4px 20px rgba(22, 249, 138, 0.4)',
                                            animation: 'pulse 2s infinite',
                                            '@keyframes pulse': {
                                                '0%, 100%': {
                                                    transform: 'scale(1)',
                                                    boxShadow: '0 4px 20px rgba(22, 249, 138, 0.4)'
                                                },
                                                '50%': {
                                                    transform: 'scale(1.1)',
                                                    boxShadow: '0 8px 30px rgba(22, 249, 138, 0.6)'
                                                }
                                            },
                                            '&:hover': {
                                                bgcolor: '#14e07d',
                                                transform: 'scale(1.15)'
                                            }
                                        }}
                                    >
                                        <VolumeUpIcon sx={{ fontSize: 32 }} />
                                    </IconButton>
                                )}

                                {/* Badge son actif */}
                                {!isMuted && !showUnmuteButton && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            right: 16,
                                            bgcolor: 'rgba(22, 249, 138, 0.9)',
                                            color: '#010F1B',
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            fontSize: '12px',
                                            fontWeight: 700
                                        }}
                                    >
                                        <VolumeUpIcon sx={{ fontSize: 16 }} />
                                        SON ACTIVÉ
                                    </Box>
                                )}
                            </>
                        )}
                    </Box>
                ) : (
                    <Box
                        sx={{
                            position: 'relative',
                            paddingTop: '56.25%',
                            bgcolor: '#e5e7eb',
                            backgroundImage: course.thumbnail_url ? `url(${course.thumbnail_url})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
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
                                bgcolor: 'rgba(0, 0, 0, 0.4)'
                            }}
                        >
                            <PlayArrowIcon sx={{ fontSize: 80, color: 'white' }} />
                        </Box>
                    </Box>
                )}
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    {course.featured && (
                        <Chip label="TOP-VENTES" size="small" sx={{ bgcolor: '#fbbf24', color: '#000', fontWeight: 700 }} />
                    )}
                    {course.is_free && (
                        <Chip label="GRATUIT" size="small" color="success" sx={{ fontWeight: 700 }} />
                    )}
                    <Chip label={course.category || 'Général'} size="small" variant="outlined" />
                    <Chip label={course.level || 'Tous niveaux'} size="small" variant="outlined" />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {course.title}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {course.tagline}
                </Typography>

                {course.instructor_name && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Par <strong>{course.instructor_name}</strong>
                    </Typography>
                )}

                <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <Typography variant="body2">{course.students_count?.toLocaleString() || 0} étudiants</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <Typography variant="body2">{course.duration_hours}h de contenu</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                        </svg>
                        <Typography variant="body2">{course.lessons_count} leçons</Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {course.description && (
                    <>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Description
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, whiteSpace: 'pre-line' }}>
                            {course.description}
                        </Typography>
                    </>
                )}

                {course.learning_objectives && course.learning_objectives.length > 0 && (
                    <>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Ce que vous apprendrez
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                            {course.learning_objectives.map((objective, index) => (
                                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                    <CheckCircleIcon sx={{ color: '#16f98a', fontSize: 20, flexShrink: 0 }} />
                                    <Typography variant="body2">{objective}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </>
                )}

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                    <Box>
                        {course.is_free || finalPrice === 0 ? (
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#059669' }}>
                                GRATUIT
                            </Typography>
                        ) : (
                            <Box>
                                {hasDiscount ? (
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                            <Typography variant="h6" sx={{ color: '#9ca3af', textDecoration: 'line-through' }}>
                                                {course.base_price?.toLocaleString()} MGA
                                            </Typography>
                                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827' }}>
                                                {finalPrice.toLocaleString()} MGA
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={`-${plan.course_discount}% RÉDUCTION`}
                                            size="small"
                                            sx={{ bgcolor: '#ef4444', color: 'white', fontWeight: 700, mt: 1 }}
                                        />
                                    </>
                                ) : (
                                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827' }}>
                                        {course.base_price?.toLocaleString()} MGA
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handlePurchase}
                        disabled={loading}
                        sx={{
                            bgcolor: '#16f98a',
                            color: '#010F1B',
                            fontWeight: 700,
                            px: 4,
                            py: 1.5,
                            fontSize: '16px',
                            textTransform: 'uppercase',
                            '&:hover': {
                                bgcolor: '#14e07d'
                            },
                            '&:disabled': {
                                bgcolor: '#9ca3af'
                            }
                        }}
                    >
                        {loading ? '...' : (course.is_free || finalPrice === 0) ? 'Commencer gratuitement' : 'Acheter maintenant'}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}