import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/**
 * AdminServiceForm Page Component
 * Handles creating and editing Services.
 * Reuses same form for both actions based on presence of ID param.
 */
function AdminServiceForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id; // Boolean flag to determine mode
    const [categories, setCategories] = useState([]);

    // Initial form state
    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        price: '',
        image_url: '',
        category_id: '',
        provider_id: '1' // Default provider ID for now (MVP simplification)
    });

    useEffect(() => {
        // Fetch categories for dropdown
        fetch('/categories')
            .then(r => r.json())
            .then(setCategories);

        // Fetch existing data if in Edit Mode
        if (isEditMode) {
            fetch(`/services/${id}`)
                .then(r => r.json())
                .then(data => {
                    if (!data.error) {
                        setInitialValues({
                            title: data.title,
                            description: data.description,
                            price: data.price,
                            image_url: data.image_url || '',
                            category_id: data.category_id,
                            provider_id: data.provider_id
                        });
                    }
                });
        }
    }, [id, isEditMode]);

    // Form configuration
    const formik = useFormik({
        enableReinitialize: true, // Allow form to update when initialValues fetch completes
        initialValues: initialValues,
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            description: Yup.string(),
            price: Yup.number().positive('Must be positive').required('Required'),
            category_id: Yup.number().required('Required'),
            image_url: Yup.string().url('Must be a valid URL')
        }),
        onSubmit: (values) => {
            const url = isEditMode ? `/services/${id}` : '/services';
            const method = isEditMode ? 'PATCH' : 'POST';

            fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            }).then(r => {
                if (r.ok) navigate('/admin');
            });
        }
    });

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '600px' }}>
            <h1>{isEditMode ? 'Edit Service' : 'New Service'}</h1>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                {/* Title Field */}
                <div>
                    <label>Title</label>
                    <input className="input" type="text" {...formik.getFieldProps('title')} />
                    {formik.touched.title && formik.errors.title ? <div style={{ color: 'red' }}>{formik.errors.title}</div> : null}
                </div>

                {/* Description Field */}
                <div>
                    <label>Description</label>
                    <textarea className="input" {...formik.getFieldProps('description')} />
                </div>

                {/* Price Field */}
                <div>
                    <label>Price</label>
                    <input className="input" type="number" {...formik.getFieldProps('price')} />
                    {formik.touched.price && formik.errors.price ? <div style={{ color: 'red' }}>{formik.errors.price}</div> : null}
                </div>

                {/* Category Dropdown */}
                <div>
                    <label>Category</label>
                    <select className="input" {...formik.getFieldProps('category_id')}>
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    {formik.touched.category_id && formik.errors.category_id ? <div style={{ color: 'red' }}>{formik.errors.category_id}</div> : null}
                </div>

                {/* Image URL Field */}
                <div>
                    <label>Image URL</label>
                    <input className="input" type="text" {...formik.getFieldProps('image_url')} />
                    {formik.touched.image_url && formik.errors.image_url ? <div style={{ color: 'red' }}>{formik.errors.image_url}</div> : null}
                </div>

                <button type="submit" className="btn btn-primary">Save Service</button>
            </form>
        </div>
    );
}

export default AdminServiceForm;