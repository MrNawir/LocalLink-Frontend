mport React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Home Page Component
 * The landing page of the application using a Hero section and Popular Categories grid.
 */
function Home() {
    // State to hold the list of categories fetched from the API
    const [categories, setCategories] = useState([]);

    // Navigation hook for programmatic redirection
    const navigate = useNavigate();

    // Fetch categories on component mount
    useEffect(() => {
        fetch('/categories')
            .then(r => r.json())
            .then(setCategories)
            .catch(console.error); // Log errors if fetch fails
    }, []);

    /**
     * Handles clicking on a category card.
     * Navigates to the marketplace with the selected category pre-filtered.
     * @param {string} categoryName - The name of the category to filter by
     */
    const handleCategoryClick = (categoryName) => {
        navigate('/marketplace', { state: { category: categoryName } });
    };

    return (
        <div className="home">
            {/* Hero Section: Main welcome banner */}
            <header className="hero container">
                <h1>
                    Find Trusted <span style={{ color: 'var(--primary)' }}>Local Services</span>
                </h1>
                <p>
                    Connect with expert professionals in your neighborhood for cleaning, repairs, gardening, and more.
                </p>

                {/* Call to Action Button */}
                <div className="flex justify-center gap-4">
                    <Link to="/marketplace" className="btn btn-primary">Browse Services</Link>
                </div>
            </header>

            {/* Popular Categories Section */}
            <section id="categories-section" className="container" style={{ padding: '4rem 1rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Popular Categories</h2>

                {/* Grid Layout for Categories */}
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                    {categories.length > 0 ? categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="card"
                            style={{ textAlign: 'center', cursor: 'pointer' }}
                            onClick={() => handleCategoryClick(cat.name)}
                        >
                            {/* Category Image */}
                            <div style={{
                                height: '150px',
                                background: '#e2e8f0',
                                borderRadius: 'var(--radius)',
                                marginBottom: '1rem',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src={cat.image_url || 'https://via.placeholder.com/400x300'}
                                    alt={cat.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            {/* Category Name */}
                            <h3>{cat.name}</h3>
                        </div>
                    )) : <p style={{ textAlign: 'center', width: '100%' }}>Loading categories...</p>}
                </div>
            </section>
        </div>
    );
}

export default Home;