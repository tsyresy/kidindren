// src/App.jsx - CODE COMPLET MIS À JOUR
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import Dashboard from './pages/Dashboard'
import Paypal from './pages/Paypal'
import { Formation } from './pages/Formation'
import { About } from './pages/About'

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Redirection par défaut vers login */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* Routes publiques */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/update-password" element={<UpdatePassword />} />

                    {/* Routes protégées */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/paypal"
                        element={
                            <ProtectedRoute>
                                <Paypal />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/formation"
                        element={
                            <ProtectedRoute>
                                <Formation />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <ProtectedRoute>
                                <About />
                            </ProtectedRoute>
                        }
                    />

                    {/* Route 404 */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App