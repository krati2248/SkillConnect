import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useCheckSessionQuery, useEditpostMutation, useJobdetailQuery } from '../features/auth/authApi';
import { toast } from 'react-toastify';

const Editpost = () => {
    const navigate = useNavigate();
    const { data } = useCheckSessionQuery();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        role: '',
        type: 'full time',
        duration: '',
        description: '',
        requirement: '',
        category: "marketing",
        logo: null,
        last_date: '',
        vacancy: '',
        stip: ''
    });
    const { id } = useParams();
    const { data: dt, refetch } = useJobdetailQuery(id);
    console.log(dt);
    const [error, setError] = useState('');
    const [editpost, { isLoading }] = useEditpostMutation();
    const descRef = useRef(null);
    const reqRef = useRef(null);

    useEffect(() => {
        if (dt) {
            setFormData({
                name: dt.name || "",
                address: dt.address || "",
                role: dt.role || "",
                type: dt.type || "full time",
                duration: dt.duration || "",
                description: dt.description || "",
                requirement: dt.requirement || "",
                vacancy: dt.vacancy || "",
                logo: dt.logo.url || null,
                stip: dt.stip || "",
                category: dt.category || ""
            });

            if (descRef.current) {
                descRef.current.innerHTML = dt.description || "";
            }
            if (reqRef.current) {
                reqRef.current.innerHTML = dt.requirement;
            }
        }
    }, [dt]);
    const handleDescInput = (e) => {
        setFormData(prev => ({
            ...prev,
            description: e.target.innerHTML
        }));
    };

    const handleReqInput = (e) => {
        setFormData(prev => ({
            ...prev,
            requirement: e.target.innerHTML
        }));
    };

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                console.log(key, value);
                data.append(key, value);
            });
            const res = await editpost({ data, id }).unwrap();
            await refetch();
            navigate('/dpost', { state: { message: "edited successfully" } });
        } catch (err) {
            const message = err?.data?.message || 'add failed';
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
                                        <label className="form-label">Company Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="form-control"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Role</label>
                                        <input
                                            type="text"
                                            name="role"
                                            className="form-control"
                                            value={formData.role}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Stipend</label>
                                        <input
                                            type="text"
                                            name="stip"
                                            className="form-control"
                                            value={formData.stip}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Type</label>
                                        <select name='type' className="form-select" value={formData.type} onChange={handleChange}>
                                            <option value='full time'>Full time</option>
                                            <option value='part time'>Part time</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Category</label>
                                        <select name='category' className="form-select" value={formData.category} onChange={handleChange}>
                                            <option value='marketing'>Marketing</option>
                                            <option value='Customer Service'>Customer service</option>
                                            <option value='Project Management'>Project management</option>
                                            <option value='Web Development'>Web development</option>
                                            <option value='Frontend Development'>Frontend development</option>
                                            <option value='Backend Development'>Backend development</option>
                                            <option value='Education'>Education</option>
                                            <option value='Graphic Design'>Graphic Design</option>
                                            <option value='Software Development'>Software Development</option>
                                            <option value='Data Science'>Data Science</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Duration</label>
                                        <input
                                            type="text"
                                            name="duration"
                                            className="form-control"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Vacancy</label>
                                        <input
                                            type="number"
                                            name="vacancy"
                                            className="form-control"
                                            value={formData.vacancy}
                                            onChange={handleChange}

                                            min={1}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <div className="toolbar">
                                            <button type="button" onClick={() => document.execCommand("bold")}><b>B</b></button>
                                            <button type="button" onClick={() => document.execCommand("italic")}><i>I</i></button>
                                            <button type="button" onClick={() => document.execCommand("insertUnorderedList")}>• List</button>
                                        </div>

                                        <div
                                            className="editor"
                                            ref={descRef}
                                            contentEditable
                                            onInput={handleDescInput}
                                            style={{ border: "1px solid #ccc", minHeight: "150px", padding: "10px" }}
                                        ></div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Requirement</label>
                                        <div className="toolbar">
                                            <button type="button" onClick={() => document.execCommand("bold")}><b>B</b></button>
                                            <button type="button" onClick={() => document.execCommand("italic")}><i>I</i></button>
                                            <button type="button" onClick={() => document.execCommand("insertUnorderedList")}>• List</button>
                                        </div>
                                        <div
                                            className="editor"
                                            ref={reqRef}
                                            contentEditable
                                            onInput={handleReqInput}
                                            style={{ border: "1px solid #ccc", minHeight: "150px", padding: "10px" }}
                                        ></div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">logo</label>
                                        <input
                                            type="file"
                                            name="logo"
                                            className="form-control"
                                            accept='.png,.jpg'
                                            onChange={handleChange}

                                        />
                                    </div>
                                    <img src={dt?.logo.url} alt="/" />
                                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" />
                                                Updating...
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

export default Editpost
