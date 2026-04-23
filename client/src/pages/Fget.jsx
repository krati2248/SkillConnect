import React, { useState } from "react";
import { useFgetMutation } from "../features/auth/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Fget = () => {
    const [el, setEl] = useState("");
    const [p, setP] = useState(false);
    const [fget, { isLoading }] = useFgetMutation();
    const navigate = useNavigate();
    const handleChange = (e) => {
        const value = e.target.value;
        setEl(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fget({email:el}).unwrap();
            //toast.success(res.data);
            navigate('/check');
        }
        catch (error) {
            const message = error?.data?.message || 'login';
            toast.error(message);
        }
    };

    return (
        <>

            <div className="container d-flex justify-content-center align-items-center flex-column" style={{ minHeight: "80vh" }}>
                <h5 className="text-center mb-3">Please, enter email to generate new password</h5>
                <div className="p-4 border rounded-3 shadow" style={{ width: "350px", background: "#fff" }}>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                value={el}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100" disabled={isLoading}
                        >
                            {isLoading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
       
    </>
  ) : (
    " Next"
  )}
                            
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Fget;
