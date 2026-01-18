import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/**
 * ServiceCard Component
 * Displays a single service's details in a reusable card format.
 * @param {Object} service - The service object containing its details.
 */
function ServiceCard({ service }) {
    // Destructure service properties for easier access
    const { id, title, price, image_url, category, provider, description } = service;

    return (
        <Link to={`/services/${id}`} className="block group">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={image_url || 'https://images.unsplash.com/photo-1581578731117-104f2a41bcbe?w=400'}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-white/90 text-gray-800">
                            {category?.name || 'Service'}
                        </Badge>
                    </div>
                </div>

                <CardHeader className="pb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
                </CardHeader>

                <CardContent className="pb-2">
                    <p className="text-muted-foreground text-sm line-clamp-2">
                        {description?.substring(0, 100)}...
                    </p>
                </CardContent>

                <CardFooter className="flex justify-between items-center pt-2">
                    <span className="text-xl font-bold text-primary">
                        ${price?.toFixed(2)}
                    </span>
                    <Button variant="outline" size="sm">
                        View Details
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}

export default ServiceCard;
