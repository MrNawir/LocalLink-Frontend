import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';

/**
 * Marketplace Page Component
 * Displays a searchable and filterable list of all available services.
 */
function Marketplace() {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const urlCategory = searchParams.get('category') || location.state?.category || 'All';
    const [selectedCategory, setSelectedCategory] = useState(urlCategory);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const category = searchParams.get('category') || location.state?.category;
        if (category) {
            setSelectedCategory(category);
        }
    }, [location.state, searchParams]);

    useEffect(() => {
        fetch('/services').then(r => r.json()).then(setServices);
        fetch('/categories').then(r => r.json()).then(setCategories);
    }, []);

    const filteredServices = services.filter(service => {
        const matchesCategory = selectedCategory === 'All' || service.category?.name === selectedCategory;
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            {/* Premium Search Header */}
            <div style={{ 
                background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
                padding: '48px 0 80px'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    <h1 style={{ 
                        fontSize: '36px', 
                        fontWeight: '700', 
                        color: '#ffffff',
                        marginBottom: '8px'
                    }}>
                        Find the perfect service
                    </h1>
                    <p style={{ color: '#93c5fd', fontSize: '18px', marginBottom: '32px' }}>
                        Browse {services.length}+ trusted professionals in your area
                    </p>
                    
                    {/* Floating Search Bar */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        padding: '8px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        alignItems: 'center'
                    }}>
                        {/* Search Input */}
                        <div style={{ flex: '1', minWidth: '200px', position: 'relative' }}>
                            <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#9ca3af' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="What service do you need?"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '16px 16px 16px 48px',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    backgroundColor: '#f1f5f9',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        
                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{
                                padding: '16px 24px',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '16px',
                                backgroundColor: '#f1f5f9',
                                cursor: 'pointer',
                                minWidth: '180px',
                                outline: 'none'
                            }}
                        >
                            <option value="All">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        
                        {/* Search Button */}
                        <button style={{
                            padding: '16px 32px',
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Pills */}
            <div style={{ maxWidth: '1200px', margin: '-40px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
                <div style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    overflowX: 'auto', 
                    paddingBottom: '16px',
                    scrollbarWidth: 'none'
                }}>
                    <button
                        onClick={() => setSelectedCategory('All')}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '50px',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            backgroundColor: selectedCategory === 'All' ? '#2563eb' : '#ffffff',
                            color: selectedCategory === 'All' ? '#ffffff' : '#374151',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}
                    >
                        All Services
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name)}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '50px',
                                border: 'none',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                backgroundColor: selectedCategory === cat.name ? '#2563eb' : '#ffffff',
                                color: selectedCategory === cat.name ? '#ffffff' : '#374151',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                            }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Section */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
                {/* Results Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                            {selectedCategory === 'All' ? 'All Services' : selectedCategory}
                        </h2>
                        <p style={{ color: '#6b7280', marginTop: '4px' }}>
                            {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} available
                        </p>
                    </div>
                </div>

                {/* Services Grid */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '24px'
                }}>
                    {filteredServices.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredServices.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <svg style={{ width: '64px', height: '64px', margin: '0 auto 16px', color: '#9ca3af' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>No services found</h3>
                        <p style={{ color: '#6b7280' }}>
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Marketplace;
