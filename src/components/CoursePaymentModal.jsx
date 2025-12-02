// src/components/CoursePaymentModal.jsx
import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Box,
    Typography,
    CircularProgress,
    Alert
} from '@mui/material'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { supabase } from '../config/supabaseClient'
import CloseIcon from '@mui/icons-material/Close'
import LockIcon from '@mui/icons-material/Lock'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

function CheckoutForm({ onSuccess, onCancel, courseName, amount, course, user }) {
    const stripe = useStripe()
    const elements = useElements()
    const [isProcessing, setIsProcessing] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsProcessing(true)
        setMessage('')

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/formation?payment=success`,
                },
                redirect: 'if_required'
            })

            if (error) {
                setMessage(error.message || 'Une erreur est survenue')
                setIsProcessing(false)
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                console.log('✅ Paiement cours réussi:', paymentIntent.id)

                // Enregistrer l'achat du cours
                const { error: enrollError } = await supabase
                    .from('user_courses')
                    .insert({
                        user_id: user.id,
                        course_id: course.id,
                        payment_intent_id: paymentIntent.id,
                        amount_paid: amount,
                        enrolled_at: new Date().toISOString()
                    })

                if (enrollError && enrollError.code !== '23505') {
                    console.error('Erreur inscription cours:', enrollError)
                }

                setMessage('Paiement réussi ! Ouverture du cours...')

                // Ouvrir dans un nouvel onglet
                if (course.destination_url) {
                    window.open(course.destination_url, '_blank')
                }

                setTimeout(() => {
                    onSuccess()
                }, 1500)
            }
        } catch (err) {
            console.error('Erreur paiement:', err)
            setMessage('Une erreur est survenue lors du paiement')
            setIsProcessing(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
                <Box sx={{
                    bgcolor: '#f0fdf4',
                    border: '1px solid #16f98a',
                    borderRadius: 2,
                    p: 2,
                    mb: 3
                }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Vous allez payer :
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#16f98a' }}>
                        {amount.toLocaleString('fr-FR')} MGA
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {courseName} - Unique
                    </Typography>
                </Box>

                <PaymentElement />
            </Box>

            {message && (
                <Alert severity={message.includes('réussi') ? 'success' : 'error'} sx={{ mb: 2 }}>
                    {message}
                </Alert>
            )}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                    variant="outlined"
                    onClick={onCancel}
                    disabled={isProcessing}
                >
                    Annuler
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!stripe || isProcessing}
                    sx={{
                        background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                        color: '#010F1B',
                        fontWeight: 700,
                        '&:hover': {
                            background: 'linear-gradient(135deg, #3EF0D0, #16f98a)'
                        }
                    }}
                >
                    {isProcessing ? (
                        <>
                            <CircularProgress size={20} sx={{ mr: 1, color: '#010F1B' }} />
                            Traitement...
                        </>
                    ) : (
                        `Payer ${amount.toLocaleString('fr-FR')} MGA`
                    )}
                </Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2 }}>
                <LockIcon sx={{ fontSize: 16, color: '#666' }} />
                <Typography variant="caption" color="text.secondary">
                    Paiement sécurisé par Stripe
                </Typography>
            </Box>
        </form>
    )
}

export default function CoursePaymentModal({ isOpen, onClose, course, user, plan }) {
    const [clientSecret, setClientSecret] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const calculatePrice = () => {
        if (!course || course.is_free) return 0
        const discount = plan?.course_discount ?? 0
        const finalPrice = course.base_price - (course.base_price * discount / 100)
        return Math.round(finalPrice)
    }

    useEffect(() => {
        if (isOpen && course && user) {
            createPaymentIntent()
        }
    }, [isOpen, course, user])

    const createPaymentIntent = async () => {
        setLoading(true)
        setError('')

        try {
            const finalPrice = calculatePrice()
            console.log('Création Payment Intent pour cours:', course.title, finalPrice)

            const { data, error: funcError } = await supabase.functions.invoke('super-responder', {
                body: {
                    amount: finalPrice * 100,
                    currency: 'mga',
                    type: 'course_purchase',
                    courseId: course.id,
                    courseName: course.title,
                    userId: user.id,
                    userEmail: user.email,
                    destinationUrl: course.destination_url
                }
            })

            if (funcError) throw funcError

            console.log('Client Secret reçu:', data.clientSecret)
            setClientSecret(data.clientSecret)

        } catch (err) {
            console.error('Erreur création Payment Intent:', err)
            setError('Impossible de créer la session de paiement. Veuillez réessayer.')
        } finally {
            setLoading(false)
        }
    }

    const handleSuccess = () => {
        onClose(true)
    }

    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#16f98a',
            colorBackground: '#ffffff',
            colorText: '#010F1B',
            colorDanger: '#df1b41',
            fontFamily: 'system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '8px',
        }
    }

    if (!course) return null

    const finalPrice = calculatePrice()

    return (
        <Dialog
            open={isOpen}
            onClose={() => onClose(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3 }
            }}
        >
            <DialogTitle sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #e0e0e0'
            }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Paiement sécurisé
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {course.title}
                    </Typography>
                </Box>
                <Button
                    onClick={() => onClose(false)}
                    sx={{ minWidth: 'auto', p: 1 }}
                    disabled={loading}
                >
                    <CloseIcon />
                </Button>
            </DialogTitle>

            <DialogContent sx={{ py: 3 }}>
                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                        <CircularProgress sx={{ color: '#16f98a' }} />
                        <Typography sx={{ ml: 2 }}>Chargement du formulaire...</Typography>
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {clientSecret && !loading && (
                    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                        <CheckoutForm
                            onSuccess={handleSuccess}
                            onCancel={() => onClose(false)}
                            courseName={course.title}
                            amount={finalPrice}
                            course={course}
                            user={user}
                        />
                    </Elements>
                )}
            </DialogContent>
        </Dialog>
    )
}