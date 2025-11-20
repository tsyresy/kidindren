// src/components/ErrorBoundary.jsx
import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <h1 style={{ color: '#dc3545', marginBottom: '1rem' }}>
                        Oups ! Une erreur est survenue
                    </h1>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                        {this.state.error?.message || 'Une erreur inattendue est survenue'}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '1rem 2rem',
                            background: '#16f98a',
                            color: '#010F1B',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        Recharger la page
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary