import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2">Service Marketplace</h1>
                    <p className="text-muted-foreground">
                        Find and book trusted local service providers
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Input
                        type="text"
                        placeholder="Search services..."
                        className="max-w-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Categories</SelectItem>
                            {categories.map(cat => (
                                <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Results count */}
                <p className="text-sm text-muted-foreground mb-6">
                    Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                </p>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredServices.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredServices.length === 0 && (
                    <div className="text-center py-16">
                        <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="text-lg font-semibold mb-2">No services found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Marketplace;
