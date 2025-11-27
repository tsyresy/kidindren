// src/pages/admin/AdminCourses.jsx - Gestion des cours
import { useState, useEffect } from 'react'
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Chip,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    Alert,
    InputAdornment,
    FormControlLabel,
    Switch
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import StarIcon from '@mui/icons-material/Star'
import { supabase } from '../../config/supabaseClient'
import toast from 'react-hot-toast'

export default function AdminCourses() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(null)

    // Form data
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        tagline: '',
        description: '',
        thumbnail_url: '',
        video_url: '',
        destination_url: '',
        level: 'Débutant',
        lessons_count: 0,
        duration_hours: 0,
        students_count: 0,
        instructor_name: '',
        base_price: 0,
        is_free: false,
        category: '',
        status: 'draft',
        featured: false
    })

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setCourses(data || [])
        } catch (error) {
            console.error('Erreur chargement cours:', error)
            toast.error('Erreur lors du chargement des cours')
        } finally {
            setLoading(false)
        }
    }

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
            ...(field === 'title' && { slug: generateSlug(value) })
        }))
    }

    const handleOpenDialog = (course = null) => {
        if (course) {
            setEditMode(true)
            setSelectedCourse(course)
            setFormData(course)
        } else {
            setEditMode(false)
            setSelectedCourse(null)
            setFormData({
                title: '',
                slug: '',
                tagline: '',
                description: '',
                thumbnail_url: '',
                video_url: '',
                destination_url: '',
                level: 'Débutant',
                lessons_count: 0,
                duration_hours: 0,
                students_count: 0,
                instructor_name: '',
                base_price: 0,
                is_free: false,
                category: '',
                status: 'draft',
                featured: false
            })
        }
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
        setSelectedCourse(null)
        setEditMode(false)
    }

    const handleSubmit = async () => {
        try {
            if (!formData.title || !formData.slug) {
                toast.error('Le titre et le slug sont obligatoires')
                return
            }

            const { data: { user } } = await supabase.auth.getUser()

            const courseData = {
                ...formData,
                created_by: user.id,
                lessons_count: parseInt(formData.lessons_count) || 0,
                duration_hours: parseFloat(formData.duration_hours) || 0,
                students_count: parseInt(formData.students_count) || 0,
                base_price: parseFloat(formData.base_price) || 0
            }

            if (editMode && selectedCourse) {
                const { error } = await supabase
                    .from('courses')
                    .update(courseData)
                    .eq('id', selectedCourse.id)

                if (error) throw error
                toast.success('Cours modifié avec succès')
            } else {
                const { error } = await supabase
                    .from('courses')
                    .insert([courseData])

                if (error) throw error
                toast.success('Cours créé avec succès')
            }

            fetchCourses()
            handleCloseDialog()
        } catch (error) {
            console.error('Erreur sauvegarde cours:', error)
            toast.error(error.message || 'Erreur lors de la sauvegarde')
        }
    }

    const handleDelete = async (courseId) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return

        try {
            const { error } = await supabase
                .from('courses')
                .delete()
                .eq('id', courseId)

            if (error) throw error
            toast.success('Cours supprimé avec succès')
            fetchCourses()
        } catch (error) {
            console.error('Erreur suppression cours:', error)
            toast.error('Erreur lors de la suppression')
        }
    }

    const handleToggleStatus = async (course) => {
        const newStatus = course.status === 'published' ? 'draft' : 'published'

        try {
            const { error } = await supabase
                .from('courses')
                .update({ status: newStatus })
                .eq('id', course.id)

            if (error) throw error
            toast.success(`Cours ${newStatus === 'published' ? 'publié' : 'mis en brouillon'}`)
            fetchCourses()
        } catch (error) {
            console.error('Erreur changement statut:', error)
            toast.error('Erreur lors du changement de statut')
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'success'
            case 'draft': return 'warning'
            case 'archived': return 'error'
            default: return 'default'
        }
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress sx={{ color: '#16f98a' }} />
            </Box>
        )
    }

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                        Gestion des Cours
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        Créez et gérez les cours de formation
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{
                        background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                        color: '#010F1B',
                        fontWeight: 700,
                        px: 3,
                        '&:hover': {
                            background: 'linear-gradient(135deg, #3EF0D0, #16f98a)'
                        }
                    }}
                >
                    Nouveau Cours
                </Button>
            </Box>

            {/* Statistiques */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                {[
                    { label: 'Total', count: courses.length, color: '#16f98a' },
                    { label: 'Publiés', count: courses.filter(c => c.status === 'published').length, color: '#66BB6A' },
                    { label: 'Brouillons', count: courses.filter(c => c.status === 'draft').length, color: '#FFA726' },
                    { label: 'En vedette', count: courses.filter(c => c.featured).length, color: '#FFD700' }
                ].map((stat) => (
                    <Paper
                        key={stat.label}
                        sx={{
                            p: 2,
                            flex: 1,
                            minWidth: 150,
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            borderLeft: `4px solid ${stat.color}`
                        }}
                    >
                        <Typography variant="h4" sx={{ color: stat.color, fontWeight: 700 }}>
                            {stat.count}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14 }}>
                            {stat.label}
                        </Typography>
                    </Paper>
                ))}
            </Box>

            {/* Liste des cours */}
            {courses.length === 0 ? (
                <Alert severity="info" sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)', color: '#fff' }}>
                    Aucun cours disponible. Créez votre premier cours !
                </Alert>
            ) : (
                <Grid container spacing={3}>
                    {courses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                            <Card sx={{
                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(10px)',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={course.thumbnail_url || 'https://via.placeholder.com/400x300?text=Pas+d%27image'}
                                    alt={course.title}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                                        <Chip
                                            label={course.status}
                                            color={getStatusColor(course.status)}
                                            size="small"
                                            sx={{ fontWeight: 600 }}
                                        />
                                        {course.featured && (
                                            <Chip
                                                icon={<StarIcon />}
                                                label="Vedette"
                                                size="small"
                                                sx={{ bgcolor: '#FFD700', color: '#000', fontWeight: 600 }}
                                            />
                                        )}
                                        {course.is_free && (
                                            <Chip
                                                label="GRATUIT"
                                                size="small"
                                                sx={{ bgcolor: '#4CAF50', color: '#fff', fontWeight: 600 }}
                                            />
                                        )}
                                    </Box>

                                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1, lineHeight: 1.3 }}>
                                        {course.title}
                                    </Typography>

                                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, mb: 2 }}>
                                        {course.tagline || 'Pas de description'}
                                    </Typography>

                                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 1 }}>
                                        <Typography sx={{ color: '#16f98a', fontSize: 14 }}>
                                            {course.lessons_count} leçons
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 14 }}>
                                            {course.duration_hours}h
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 14 }}>
                                            {course.level}
                                        </Typography>
                                    </Box>

                                    <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700, mt: 2 }}>
                                        {course.is_free ? 'GRATUIT' : `${course.base_price?.toLocaleString()} MGA`}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleToggleStatus(course)}
                                        sx={{ color: course.status === 'published' ? '#66BB6A' : '#FFA726' }}
                                    >
                                        {course.status === 'published' ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(course)}
                                        sx={{ color: '#2196F3' }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(course.id)}
                                        sx={{ color: '#EF5350' }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Dialog Création/Édition */}
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: '#1a1a1a',
                        color: '#fff'
                    }
                }}
            >
                <DialogTitle>
                    {editMode ? 'Modifier le cours' : 'Créer un nouveau cours'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {/* Titre */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Titre du cours *"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                                }}
                            />
                        </Grid>

                        {/* Slug */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Slug (URL) *"
                                value={formData.slug}
                                onChange={(e) => handleInputChange('slug', e.target.value)}
                                helperText="Généré automatiquement depuis le titre"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                                    '& .MuiFormHelperText-root': { color: 'rgba(255, 255, 255, 0.5)' }
                                }}
                            />
                        </Grid>

                        {/* Texte d'accroche */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Texte d'accroche"
                                value={formData.tagline}
                                onChange={(e) => handleInputChange('tagline', e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                                }}
                            />
                        </Grid>

                        {/* Description */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Description du cours"
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                                }}
                            />
                        </Grid>

                        {/* URLs */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="URL de l'image vignette"
                                value={formData.thumbnail_url}
                                onChange={(e) => handleInputChange('thumbnail_url', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="URL de la vidéo (YouTube)"
                                value={formData.video_url}
                                onChange={(e) => handleInputChange('video_url', e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="URL de destination après achat"
                                value={formData.destination_url}
                                onChange={(e) => handleInputChange('destination_url', e.target.value)}
                                placeholder="https://drive.google.com/..."
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                                }}
                            />
                        </Grid>

                        {/* Instructeur et catégorie */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nom de l'instructeur"
                                value={formData.instructor_name}
                                onChange={(e) => handleInputChange('instructor_name', e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Catégorie"
                                value={formData.category}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                placeholder="Ex: Design Graphique"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                                }}
                            />
                        </Grid>

                        {/* Niveau */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Niveau</InputLabel>
                                <Select
                                    value={formData.level}
                                    onChange={(e) => handleInputChange('level', e.target.value)}
                                    sx={{
                                        color: '#fff',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.2)'
                                        }
                                    }}
                                >
                                    <MenuItem value="Débutant">Débutant</MenuItem>
                                    <MenuItem value="Intermédiaire">Intermédiaire</MenuItem>
                                    <MenuItem value="Avancé">Avancé</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Statut */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Statut</InputLabel>
                                <Select
                                    value={formData.status}
                                    onChange={(e) => handleInputChange('status', e.target.value)}
                                    sx={{
                                        color: '#fff',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(255, 255, 255, 0.2)'
                                        }
                                    }}
                                >
                                    <MenuItem value="draft">Brouillon</MenuItem>
                                    <MenuItem value="published">Publié</MenuItem>
                                    <MenuItem value="archived">Archivé</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Nombres */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Nombre de leçons"
                                value={formData.lessons_count}
                                onChange={(e) => handleInputChange('lessons_count', e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Durée (heures)"
                                value={formData.duration_hours}
                                onChange={(e) => handleInputChange('duration_hours', e.target.value)}
                                inputProps={{ step: 0.5 }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Nombre d'élèves"
                                value={formData.students_count}
                                onChange={(e) => handleInputChange('students_count', e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                                }}
                            />
                        </Grid>

                        {/* Prix */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Prix de base (MGA)"
                                value={formData.base_price}
                                onChange={(e) => handleInputChange('base_price', e.target.value)}
                                disabled={formData.is_free}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>MGA</InputAdornment>
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' }
                                    },
                                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' }
                                }}
                            />
                        </Grid>

                        {/* Switches */}
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.is_free}
                                            onChange={(e) => handleInputChange('is_free', e.target.checked)}
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': {
                                                    color: '#16f98a'
                                                },
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                    backgroundColor: '#16f98a'
                                                }
                                            }}
                                        />
                                    }
                                    label="Cours gratuit"
                                    sx={{ color: '#fff' }}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.featured}
                                            onChange={(e) => handleInputChange('featured', e.target.checked)}
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': {
                                                    color: '#FFD700'
                                                },
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                    backgroundColor: '#FFD700'
                                                }
                                            }}
                                        />
                                    }
                                    label="Mettre en vedette"
                                    sx={{ color: '#fff' }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ color: '#fff' }}>
                        Annuler
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            background: 'linear-gradient(135deg, #16f98a, #3EF0D0)',
                            color: '#010F1B',
                            fontWeight: 700,
                            '&:hover': {
                                background: 'linear-gradient(135deg, #3EF0D0, #16f98a)'
                            }
                        }}
                    >
                        {editMode ? 'Modifier' : 'Créer'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}