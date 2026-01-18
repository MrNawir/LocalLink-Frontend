import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Home Page Component
 * The landing page of the application using a Hero section and Popular Categories grid.
 */
const buzzwords = [
    'Plumber',
    'Electrician', 
    'Hairdresser',
    'Cleaner',
    'Gardener',
    'IT Expert',
    'Handyman',
    'Tutor'
];

function Home() {
    const [categories, setCategories] = useState([]);
    const [buzzwordIndex, setBuzzwordIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setBuzzwordIndex((prev) => (prev + 1) % buzzwords.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch('/categories')
            .then(r => r.json())
            .then(setCategories)
            .catch(console.error);
    }, []);

    const handleCategoryClick = (categoryName) => {
        navigate('/marketplace', { state: { category: categoryName } });
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                            Find Your Next{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block min-w-[200px] md:min-w-[280px]">
                                <span key={buzzwordIndex} className="animate-fade-in">
                                    {buzzwords[buzzwordIndex]}
                                </span>
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Connect with expert professionals in your neighborhood for cleaning, repairs, gardening, IT support and more.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link to="/marketplace">Browse Services</Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link to="/admin">Provider Dashboard</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white border-y">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-primary">500+</div>
                            <div className="text-muted-foreground">Service Providers</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary">10k+</div>
                            <div className="text-muted-foreground">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary">50+</div>
                            <div className="text-muted-foreground">Service Types</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-primary">4.9</div>
                            <div className="text-muted-foreground">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Categories Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Explore our most requested service categories and find the help you need today.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.length > 0 ? categories.map((cat) => (
                            <Card
                                key={cat.id}
                                className="cursor-pointer group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                onClick={() => handleCategoryClick(cat.name)}
                            >
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={cat.image_url || 'https://images.unsplash.com/photo-1581578731117-104f2a41bcbe?w=400'}
                                        alt={cat.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-white font-semibold text-lg drop-shadow-lg">
                                            {cat.name}
                                        </h3>
                                        <span className="inline-block mt-2 px-3 py-1 bg-white text-gray-900 text-sm font-medium rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-colors">
                                            View Services
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        )) : (
                            <div className="col-span-full text-center py-12">
                                <div className="animate-pulse text-muted-foreground">Loading categories...</div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have found reliable local service providers through LocalLink.
                    </p>
                    <Button size="lg" variant="secondary" asChild>
                        <Link to="/marketplace">Find a Service Now</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default Home;
