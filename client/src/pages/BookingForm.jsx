import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/**
 * BookingForm Page Component
 * Handles the form submission for booking a service.
 * Uses Formik for form handling and Yup for validation.
 */
function BookingForm() {
    // Get service ID from URL
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            date: '',
            contact_phone: '',
            location: '',
            notes: '',
        },
        // Validation Schema
        validationSchema: Yup.object({
            date: Yup.date().min(new Date(), 'Date must be in the future').required('Date is required'),
            contact_phone: Yup.string()
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(10, 'Must be at least 10 digits')
                .required('Phone number is required'),
            location: Yup.string().required('Location is required'),
            notes: Yup.string(),
        }),
        // Form Submission Handler
        onSubmit: (values) => {
            fetch('/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service_id: id,
                    client_id: 6, // Hardcoded client for MVP
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
            <div className="container" style={{ padding: '4rem 1rem', maxWidth: '600px', textAlign: 'center' }}>
                <div className="card" style={{ padding: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                    <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Booking Confirmed!</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        Your service has been successfully booked. The provider will contact you shortly at {formik.values.contact_phone}.
                    </p>
                    <button
                        onClick={() => navigate('/marketplace')}
                        className="btn btn-primary"
                    >
                        Return to Marketplace
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '600px' }}>
            <h1>Complete Booking</h1>
            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>You are booking service #{id}</p>

            {/* Error Message Display */}
            {error && <div className="card" style={{ backgroundColor: '#fee2e2', color: '#b91c1c', marginBottom: '1rem' }}>{error}</div>}

            {/* Booking Form */}
            <form onSubmit={formik.handleSubmit} className="card">
                {/* Date Input */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="date" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Date & Time</label>
                    <input
                        id="date"
                        name="date"
                        type="datetime-local"
                        onChange={formik.handleChange}
                        value={formik.values.date}
                        className="input"
                    />
                    {formik.touched.date && formik.errors.date ? (
                        <div style={{ color: 'red', marginTop: '0.25rem', fontSize: '0.875rem' }}>{formik.errors.date}</div>
                    ) : null}
                </div>

                {/* Contact Phone Input */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="contact_phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number</label>
                    <input
                        id="contact_phone"
                        name="contact_phone"
                        type="tel"
                        placeholder="e.g., 0712345678"
                        onChange={formik.handleChange}
                        value={formik.values.contact_phone}
                        className="input"
                    />
                    {formik.touched.contact_phone && formik.errors.contact_phone ? (
                        <div style={{ color: 'red', marginTop: '0.25rem', fontSize: '0.875rem' }}>{formik.errors.contact_phone}</div>
                    ) : null}
                </div>

                {/* Location Input */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="location" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location / Address</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="e.g., 123 Main St, Apartment 4B"
                        onChange={formik.handleChange}
                        value={formik.values.location}
                        className="input"
                    />
                    {formik.touched.location && formik.errors.location ? (
                        <div style={{ color: 'red', marginTop: '0.25rem', fontSize: '0.875rem' }}>{formik.errors.location}</div>
                    ) : null}
                </div>

                {/* Notes Input */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="notes" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        rows="4"
                        onChange={formik.handleChange}
                        value={formik.values.notes}
                        className="input"
                        placeholder="Special requests or details..."
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Confirm Booking</button>
            </form>
        </div>
    );
}

export default BookingForm;
