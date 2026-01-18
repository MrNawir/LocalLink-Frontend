import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/**
 * AdminCategoryForm Page Component
 * Handles creating and editing Service Categories.
 * Reuses same form for both actions.
 */
function AdminCategoryForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const [initialValues, setInitialValues] = useState({ name: '', image_url: '' });

    useEffect(() => {
        // Fetch existing data if in Edit Mode
        if (isEditMode) {
            fetch(`/categories/${id}`)
                .then(r => r.json())
                .then(data => {
                    if (!data.error) setInitialValues({ name: data.name, image_url: data.image_url || '' });
                });
        }
    }, [id, isEditMode]);

    // Form configuration
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            image_url: Yup.string().url('Must be a valid URL')
        }),
        onSubmit: (values) => {
            const url = isEditMode ? `/categories/${id}` : '/categories';
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
            <h1>{isEditMode ? 'Edit Category' : 'New Category'}</h1>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                {/* Category Name */}
                <div>
                    <label>Category Name</label>
                    <input
                        className="input"
                        type="text"
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? <div style={{ color: 'red' }}>{formik.errors.name}</div> : null}
                </div>

                {/* Image URL */}
                <div>
                    <label>Image URL</label>
                    <input
                        className="input"
                        type="text"
                        {...formik.getFieldProps('image_url')}
                    />
                    {formik.touched.image_url && formik.errors.image_url ? <div style={{ color: 'red' }}>{formik.errors.image_url}</div> : null}
                </div>

                <button type="submit" className="btn btn-primary">Save Category</button>
            </form>
        </div>
    );
}

export default AdminCategoryForm;
