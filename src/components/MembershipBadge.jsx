// src/components/MembershipBadge.jsx - MIS À JOUR AVEC ICÔNES MUI
import { Link } from 'react-router-dom'
import { Chip, Tooltip } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import VerifiedIcon from '@mui/icons-material/Verified'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { useSubscription } from '../hooks/useSubscription'
import { useAuth } from '../context/AuthContext'

export default function MembershipBadge() {
    const { user } = useAuth()
    const { plan, loading } = useSubscription(user?.id)

    if (loading) return null

    const planName = plan?.slug || 'free'

    // Configuration par plan avec icônes MUI
    const planConfig = {
        free: {
            icon: StarIcon,
            color: 'default',
            label: 'Free',
            tooltipTitle: 'Plan Gratuit - 15% commission'
        },
        standard: {
            icon: VerifiedIcon,
            color: 'info',
            label: 'Standard',
            tooltipTitle: 'Plan Standard - 5% commission'
        },
        premium: {
            icon: WorkspacePremiumIcon,
            color: 'warning',
            label: 'Premium',
            tooltipTitle: 'Plan Premium - 0% commission'
        }
    }

    const config = planConfig[planName] || planConfig.free
    const IconComponent = config.icon

    return (
        <Tooltip title={config.tooltipTitle} arrow>
            <Link to="/subscription" style={{ textDecoration: 'none' }}>
                <Chip
                    icon={<IconComponent />}
                    label={config.label}
                    color={config.color}
                    variant="outlined"
                    clickable
                    sx={{
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        },
                        fontWeight: 700,
                        fontSize: '0.9rem'
                    }}
                />
            </Link>
        </Tooltip>
    )
}