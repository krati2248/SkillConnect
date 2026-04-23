import React, { useState, useEffect } from 'react'
import { useUserdtQuery, useEditprofileMutation } from '../features/auth/authApi'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Editprofile = () => {
    const { data: d, isLoading,refetch } = useUserdtQuery();
    console.log("edit");
    console.log(d);
    const [editprofile] = useEditprofileMutation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const e = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const n = /^[A-Za-z\s]+$/;
    const ph = /^[0-9]{10}$/;
    useEffect(() => {
        refetch();
    }, [d]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (d) {
            setFormData({
                name: d.name || '',
                email: d.email || '',
                phone: d.phone || ''
            });
        }
    }, [d]);
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                console.log(key, value);
                if (key === "phone") {
                    data.append(key, Number(value));
                }
                else {
                    data.append(key, value);
                }
            });
            console.log(data);
            const res = await editprofile(data).unwrap(); 
            navigate("/getprofile",{state:{message:"profile updated"}});

        } catch (err) {
            const message = err?.data?.message || '';
            setError(message);
            toast.error(message);
        }
    };
    return (
        <>
            <div className="container mt-5">
                 
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <h3 className="card-title text-center mb-4">Post Job</h3>

                                {error && <div className="alert alert-danger">{error}</div>}

                                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        {
                  formData.name && !n.test(formData.name) && (
                    <p className="text-danger">
                      please use only characters
                    </p>
                  )
                }
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        {
                  formData.email && !e.test(formData.email) && (
                    <p className="text-danger">
                     Enter a valid email such as (h@gmail.com)
                    </p>
                  )
                }
                                    </div>


                                    <div className="mb-3">
                                        <label className="form-label">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="form-control"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            maxLength="10" 
                                            required
                                        />
                                        {
                  formData.phone && !ph.test(formData.phone) && (
                    <p className="text-danger">
                     Phone no. must be 10 digit
                    </p>
                  )
                }
                                    </div>



                                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" />
                                                updating...
                                            </>
                                        ) : (
                                            'Update'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Editprofile
