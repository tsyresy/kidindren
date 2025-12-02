// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from 'react'
import {
    Box,
    TextField,
    IconButton,
    Typography,
    CircularProgress,
    Paper
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'
import { supabase } from '../config/supabaseClient'
import { useAuth } from '../context/AuthContext'

export default function ChatBot() {
    const { user } = useAuth()
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '👋 Bonjour ! Je suis l\'assistant virtuel Payvilus. Comment puis-je vous aider aujourd\'hui ?'
        }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || loading) return

        const userMessage = input.trim()
        setInput('')

        // Ajouter message utilisateur
        const newMessages = [...messages, { role: 'user', content: userMessage }]
        setMessages(newMessages)
        setLoading(true)

        try {
            // Appel Edge Function super-worker
            const { data, error } = await supabase.functions.invoke('super-worker', {
                body: {
                    messages: newMessages,
                    userId: user?.id,
                    userEmail: user?.email
                }
            })

            if (error) throw error

            // Ajouter réponse assistant
            setMessages([...newMessages, {
                role: 'assistant',
                content: data.response
            }])
        } catch (error) {
            console.error('Erreur chat:', error)
            setMessages([...newMessages, {
                role: 'assistant',
                content: '❌ Désolé, une erreur est survenue. Veuillez réessayer ou contacter support@payvilus.com'
            }])
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
            {/* Zone des messages */}
            <Box sx={{
                flex: 1,
                overflowY: 'auto',
                mb: 2,
                pr: 1,
                '&::-webkit-scrollbar': {
                    width: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#16f98a',
                    borderRadius: '3px'
                }
            }}>
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                            mb: 2
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                            alignItems: 'flex-start',
                            gap: 1,
                            maxWidth: '85%'
                        }}>
                            {/* Avatar */}
                            <Box sx={{
                                width: 36,
                                height: 36,
                                borderRadius: '50%',
                                bgcolor: message.role === 'user' ? '#16f98a' : '#e0f2fe',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                {message.role === 'user' ? (
                                    <PersonIcon sx={{ fontSize: 20, color: '#010F1B' }} />
                                ) : (
                                    <SmartToyIcon sx={{ fontSize: 20, color: '#0284c7' }} />
                                )}
                            </Box>

                            {/* Bulle de message */}
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 2,
                                    bgcolor: message.role === 'user' ? '#16f98a' : '#f8fafc',
                                    color: message.role === 'user' ? '#010F1B' : '#1e293b',
                                    borderRadius: 2,
                                    borderTopLeftRadius: message.role === 'user' ? 2 : 0,
                                    borderTopRightRadius: message.role === 'user' ? 0 : 2
                                }}
                            >
                                <Typography sx={{
                                    fontSize: '14px',
                                    lineHeight: 1.6,
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word'
                                }}>
                                    {message.content}
                                </Typography>
                            </Paper>
                        </Box>
                    </Box>
                ))}

                {/* Indicateur de chargement */}
                {loading && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Box sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            bgcolor: '#e0f2fe',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <SmartToyIcon sx={{ fontSize: 20, color: '#0284c7' }} />
                        </Box>
                        <Paper elevation={1} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                <Box sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: '#94a3b8',
                                    animation: 'bounce 1.4s infinite ease-in-out both',
                                    '@keyframes bounce': {
                                        '0%, 80%, 100%': { transform: 'scale(0)' },
                                        '40%': { transform: 'scale(1)' }
                                    }
                                }} />
                                <Box sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: '#94a3b8',
                                    animation: 'bounce 1.4s infinite ease-in-out both',
                                    animationDelay: '0.2s'
                                }} />
                                <Box sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: '#94a3b8',
                                    animation: 'bounce 1.4s infinite ease-in-out both',
                                    animationDelay: '0.4s'
                                }} />
                            </Box>
                        </Paper>
                    </Box>
                )}

                <div ref={messagesEndRef} />
            </Box>

            {/* Zone de saisie */}
            <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                    fullWidth
                    multiline
                    maxRows={3}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Posez votre question..."
                    disabled={loading}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&.Mui-focused fieldset': {
                                borderColor: '#16f98a'
                            }
                        }
                    }}
                />
                <IconButton
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    sx={{
                        bgcolor: '#16f98a',
                        color: '#010F1B',
                        width: 48,
                        height: 48,
                        '&:hover': {
                            bgcolor: '#14e07d'
                        },
                        '&:disabled': {
                            bgcolor: '#e5e7eb',
                            color: '#9ca3af'
                        }
                    }}
                >
                    {loading ? <CircularProgress size={24} sx={{ color: '#010F1B' }} /> : <SendIcon />}
                </IconButton>
            </Box>
        </Box>
    )
}