import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

/**
 * BookingForm Page Component
 * Handles the form submission for booking a service.
 * Uses Formik for form handling and Yup for validation.
 */
function BookingForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!user) {
            navigate('/login', { state: { from: `/book/${id}` } });
        }
    }, [user, navigate, id]);

    if (!user) {
        return null;
    }

    const formik = useFormik({
        initialValues: {
            date: '',
            contact_phone: '',
            location: '',
            notes: '',
        },
        validationSchema: Yup.object({
            date: Yup.date().min(new Date(), 'Date must be in the future').required('Date is required'),
            contact_phone: Yup.string()
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(10, 'Must be at least 10 digits')
                .required('Phone number is required'),
            location: Yup.string().required('Location is required'),
            notes: Yup.string(),
        }),
        onSubmit: (values) => {
            fetch('/bookings', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    service_id: id,
                    client_id: user.id,
                    date: values.date,
                    contact_phone: values.contact_phone,
                    location: values.location,
                    notes: values.notes,
                }),
            })
                .then((r) => {
                    if (r.ok) {
                        setSuccess(true);
                    } else {
                        r.json().then((err) => setError(err.error || 'Failed to book'));
                    }
                })
                .catch((err) => setError('Network Error'));
        },
    });

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center">
                    <CardContent className="pt-8 pb-8">
                        <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-primary mb-2">Booking Confirmed!</h2>
                        <p className="text-muted-foreground mb-6">
                            Your service has been successfully booked. The provider will contact you shortly at {formik.values.contact_phone}.
                        </p>
                        <Button onClick={() => navigate('/marketplace')}>
                            Return to Marketplace
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-8">
            <div className="container mx-auto px-4 max-w-lg">
                <Card>
                    <CardHeader>
                        <CardTitle>Complete Your Booking</CardTitle>
                        <CardDescription>Fill in the details below to book this service</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                                {error}
                            </div>
                        )}

                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date & Time</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    type="datetime-local"
                                    onChange={formik.handleChange}
                                    value={formik.values.date}
                                />
                                {formik.touched.date && formik.errors.date && (
                                    <p className="text-sm text-red-500">{formik.errors.date}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contact_phone">Phone Number</Label>
                                <Input
                                    id="contact_phone"
                                    name="contact_phone"
                                    type="tel"
                                    placeholder="e.g., 0712345678"
                                    onChange={formik.handleChange}
                                    value={formik.values.contact_phone}
                                />
                                {formik.touched.contact_phone && formik.errors.contact_phone && (
                                    <p className="text-sm text-red-500">{formik.errors.contact_phone}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location / Address</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    type="text"
                                    placeholder="e.g., 123 Main St, Apartment 4B"
                                    onChange={formik.handleChange}
                                    value={formik.values.location}
                                />
                                {formik.touched.location && formik.errors.location && (
                                    <p className="text-sm text-red-500">{formik.errors.location}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                                <Textarea
                                    id="notes"
                                    name="notes"
                                    rows={4}
                                    onChange={formik.handleChange}
                                    value={formik.values.notes}
                                    placeholder="Special requests or details..."
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="w-full h-11 px-8 rounded-md text-base font-medium"
                                style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
                            >
                                Confirm Booking
                            </button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default BookingForm;
