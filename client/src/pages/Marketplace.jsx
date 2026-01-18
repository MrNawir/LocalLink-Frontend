import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';

/**
 * Marketplace Page Component
 * Displays a searchable and filterable list of all available services.
 */
function Marketplace() {
    // State for data
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);

    // State for filters
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(location.state?.category || 'All');
    const [searchTerm, setSearchTerm] = useState('');

    // Update selected category if navigated here from Home page with a pre-selection
    useEffect(() => {
        if (location.state?.category) {
            setSelectedCategory(location.state.category);
        }
    }, [location.state]);

    // Fetch initial data for services and categories
    useEffect(() => {
        fetch('/services')
            .then(r => r.json())
            .then(setServices);

        fetch('/categories')
            .then(r => r.json())
            .then(setCategories);
    }, []);

    // Filter logic: Filter by category and search term
    const filteredServices = services.filter(service => {
        const matchesCategory = selectedCategory === 'All' || service.category?.name === selectedCategory;
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            {/* Header and Filter Controls */}
            <div className="flex flex-col gap-4 mb-8">
                <h1>Marketplace</h1>
                <div className="flex gap-4 flex-wrap">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search services..."
                        className="input"
                        style={{ maxWidth: '300px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Category Dropdown */}
                    <select
                        className="input"
                        style={{ maxWidth: '200px' }}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                    </select>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {filteredServices.map(service => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>

            {/* Empty State Message */}
            {filteredServices.length === 0 && <p>No services found.</p>}
        </div>
    );
}

export default Marketplace;
