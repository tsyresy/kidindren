// src/pages/Blog.jsx - PAGE BLOG
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LandingFooter from '../components/LandingFooter'
import '../styles/Blog.css'

export default function Blog() {
    const [selectedCategory, setSelectedCategory] = useState('all')

    // Articles factices (à remplacer par fetch depuis Supabase plus tard)
    const articles = [
        {
            id: 1,
            title: "PayPal à Madagascar : Guide Complet 2025",
            category: "Guides & Tutoriels",
            date: "07/12/2024",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop",
            excerpt: "Tout ce que vous devez savoir pour créer, vérifier et sécuriser votre compte PayPal à Madagascar. Évitez les erreurs qui mènent au blocage...",
            slug: "paypal-madagascar-guide-complet-2025"
        },
        {
            id: 2,
            title: "10 Niches Freelance les Plus Rentables en 2025",
            category: "Freelancing",
            date: "05/12/2024",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
            excerpt: "Découvrez les 10 compétences les plus demandées sur Fiverr et Upwork, et combien vous pouvez gagner dans chaque domaine...",
            slug: "10-niches-freelance-rentables-2025"
        },
        {
            id: 3,
            title: "Comment J'ai Atteint 2000 USD/Mois sur Upwork",
            category: "Success Stories",
            date: "03/12/2024",
            image: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&h=500&fit=crop",
            excerpt: "L'histoire inspirante de Nivo, développeur malgache qui a transformé sa vie grâce au freelancing. Ses stratégies, ses échecs, et ses succès...",
            slug: "success-story-2000-usd-upwork"
        },
        {
            id: 4,
            title: "Mobile Money vs Banque Traditionnelle : Comparatif",
            category: "Actualité & Tendances",
            date: "01/12/2024",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
            excerpt: "Mvola, Orange Money, Airtel Money : quel opérateur choisir pour vos transactions PayPal ? Comparaison détaillée des frais, délais et limites...",
            slug: "mobile-money-vs-banque-comparatif"
        },
        {
            id: 5,
            title: "Fiverr SEO : Apparaître en 1ère Page en 30 Jours",
            category: "Guides & Tutoriels",
            date: "28/11/2024",
            image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=500&fit=crop",
            excerpt: "Les secrets du référencement sur Fiverr. Optimisez votre gig pour apparaître dans les premiers résultats et multiplier vos ventes par 10...",
            slug: "fiverr-seo-premiere-page-30-jours"
        },
        {
            id: 6,
            title: "Nouvelle Fonctionnalité : Retrait Express Premium",
            category: "Payvilus Updates",
            date: "25/11/2024",
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop",
            excerpt: "Payvilus lance le retrait express : convertissez vos fonds PayPal en Ariary en 5 minutes chrono avec le plan Premium. Découvrez comment ça marche...",
            slug: "nouvelle-fonctionnalite-retrait-express"
        }
    ]

    const categories = [
        'Tous les articles',
        'Guides & Tutoriels',
        'Freelancing',
        'Success Stories',
        'Actualité & Tendances',
        'Payvilus Updates'
    ]

    const filteredArticles = selectedCategory === 'all'
        ? articles
        : articles.filter(article => article.category === selectedCategory)

    return (
        <div className="blog-page-wrapper">
            {/* Navbar */}
            <header className="landing-navbar">
                <div className="landing-navbar-content">
                    <Link to="/" className="landing-logo">
                        <img
                            src="https://res.cloudinary.com/djillj6xt/image/upload/v1763394595/CL-B-3_sigqnz.png"
                            alt="Payvilus"
                        />
                    </Link>
                    <nav className="landing-nav">
                        <Link to="/">Accueil</Link>
                        <Link to="/about">À propos</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                    <div className="landing-ctas">
                        <Link to="/login" className="btn-nav-secondary">Connexion</Link>
                        <Link to="/register" className="btn-nav-primary">S'inscrire</Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="blog-hero">
                <div className="blog-hero-content">
                    <h1>Blog Payvilus</h1>
                    <p>
                        Guides, tutoriels, success stories et actualités pour réussir votre aventure freelance.
                        Apprenez des meilleurs et transformez vos compétences en revenus.
                    </p>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="blog-categories">
                <div className="categories-container">
                    <button
                        className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        Tous les articles
                    </button>
                    {categories.slice(1).map((category) => (
                        <button
                            key={category}
                            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {/* Articles Grid */}
            <section className="blog-articles">
                <div className="articles-container">
                    <p className="articles-count">
                        Article {filteredArticles.length > 0 ? '1' : '0'} sur {filteredArticles.length}
                    </p>

                    <div className="articles-grid">
                        {filteredArticles.map((article) => (
                            <article key={article.id} className="article-card">
                                <div className="article-image">
                                    <img src={article.image} alt={article.title} />
                                    <div className="article-category-badge">{article.category}</div>
                                </div>

                                <div className="article-content">
                                    <div className="article-meta">
                                        <span className="article-date">{article.date}</span>
                                    </div>

                                    <h3 className="article-title">{article.title}</h3>

                                    <p className="article-excerpt">{article.excerpt}</p>

                                    <Link to={`/blog/${article.slug}`} className="article-link">
                                        En lire plus →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="no-articles">
                            <p>Aucun article trouvé dans cette catégorie.</p>
                        </div>
                    )}

                    {/* Pagination (à implémenter plus tard) */}
                    <div className="blog-pagination">
                        <button className="pagination-btn" disabled>← Précédent</button>
                        <span className="pagination-info">Page 1 sur 1</span>
                        <button className="pagination-btn" disabled>Suivant →</button>
                    </div>
                </div>
            </section>

            {/* Newsletter Subscription */}
            <section className="blog-newsletter">
                <div className="newsletter-container">
                    <h2>📬 Restez Informé</h2>
                    <p>
                        Recevez nos derniers articles, astuces freelance et offres exclusives directement dans votre boîte mail.
                    </p>
                    <form className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Votre adresse email"
                            required
                        />
                        <button type="submit">S'abonner</button>
                    </form>
                    <p className="newsletter-note">
                        ✅ 1 email par semaine maximum. Aucun spam. Désabonnement en 1 clic.
                    </p>
                </div>
            </section>

            <LandingFooter />
        </div>
    )
}