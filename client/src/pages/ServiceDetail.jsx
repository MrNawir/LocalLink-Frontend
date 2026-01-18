import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

/**
 * ServiceDetail Page Component
 * Displays full details for a specific service, including provider info and booking button.
 */
function ServiceDetail() {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/services/${id}`)
            .then(r => {
                if (r.ok) return r.json();
                throw new Error('Service not found');
            })
            .then(setService)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading service details...</div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Service Not Found</h2>
                    <p className="text-muted-foreground mb-4">The service you're looking for doesn't exist.</p>
                    <Button asChild>
                        <Link to="/marketplace">Browse Services</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Service Image */}
                    <div className="relative">
                        <img
                            src={service.image_url || 'https://images.unsplash.com/photo-1581578731117-104f2a41bcbe?w=800'}
                            alt={service.title}
                            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
                        />
                        <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800 hover:bg-white">
                            {service.category?.name || 'Service'}
                        </Badge>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
                            <div className="text-3xl font-bold text-primary">
                                ${service.price?.toFixed(2)}
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {service.description}
                            </p>
                        </div>

                        <Separator />

                        {/* Provider Card */}
                        <Card>
                            <CardContent className="p-4">
                                <h3 className="font-semibold mb-3">Service Provider</h3>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={service.provider?.image_url} alt={service.provider?.username} />
                                        <AvatarFallback>
                                            {service.provider?.username?.charAt(0).toUpperCase() || 'P'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{service.provider?.username}</p>
                                        <p className="text-sm text-muted-foreground">Verified Provider</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Book Now Button */}
                        <Button size="lg" className="w-full" asChild>
                            <Link to={`/book/${service.id}`}>Book This Service</Link>
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Secure booking with LocalLink protection
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceDetail;
