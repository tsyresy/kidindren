// src/App.jsx - CODE COMPLET à jour AVEC SUPPORT
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

// Pages publiques
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'

// Pages protégées
import Dashboard from './pages/Dashboard'
import Paypal from './pages/Paypal'
import Subscription from './pages/Subscription'
import Formation from './pages/Formation'
import About from './pages/About'
import Support from './pages/Support'

// Flows de transaction
import DepositFlow from './pages/deposit-flow'
import WithdrawalFlow from './pages/withdrawal-flow'

// Pages Admin
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminTransactions from './pages/admin/AdminTransactions'
import AdminCourses from './pages/admin/AdminCourses'

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Route par défaut - Landing page */}
                    <Route path="/" element={<Landing />} />

                    {/* Routes publiques - Landing */}
                    <Route path="/landing" element={<Landing />} />

                    {/* Routes publiques - Authentification */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/update-password" element={<UpdatePassword />} />

                    {/* Routes protégées - Dashboard principal */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Routes protégées - Services */}
                    <Route
                        path="/subscription"
                        element={
                            <ProtectedRoute>
                                <Subscription />
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

                    {/* Routes protégées - Transactions */}
                    <Route
                        path="/paypal/deposit"
                        element={
                            <ProtectedRoute>
                                <DepositFlow />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/paypal/withdrawal"
                        element={
                            <ProtectedRoute>
                                <WithdrawalFlow />
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

                    {/* Route Support */}
                    <Route
                        path="/support"
                        element={
                            <ProtectedRoute>
                                <Support />
                            </ProtectedRoute>
                        }
                    />

                    {/* Routes Admin */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<AdminDashboard />} />
                        <Route path="transactions" element={<AdminTransactions />} />
                        <Route path="courses" element={<AdminCourses />} />
                    </Route>

                    {/* Redirection pour les routes invalides */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}

export default App