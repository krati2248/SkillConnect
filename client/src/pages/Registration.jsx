import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useRegisterMutation } from '../features/auth/authApi';
import { setUser } from '../features/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'jobseeker',
  });

  const [error, setError] = useState('');
  const n = /^[A-Za-z\s]+$/;
  const ph = /^[0-9]{10}$/;
  const e = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const h = () => {
    return (
      formData.name && n.test(formData.name) &&
      formData.phone && ph.test(formData.phone) &&
      formData.email && e.test(formData.email) &&
      formData.password && pswd.test(formData.password)
    )
  }
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (et) => {
    et.preventDefault();
    setError('');
    if (!n.test(formData.name)) {

      return;
    }

    if (!ph.test(formData.phone)) {

      return;
    }

    if (!e.test(formData.email)) {
      return;
    }

    if (!pswd.test(formData.password)) {
      toast.error("Password does not meet requirements");
      return;
    }
    try {
      const res = await register(formData).unwrap();
      dispatch(setUser(res.user));
      console.log("about navigate");
      navigate('/login', { state: { message: "registration successful" } });
    } catch (err) {
      const message = err?.data?.message || 'Registration failed';
      setError(message);

    }
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <div className="row">

        {/* LEFT SIDE IMAGE */}
        <div className="col-lg-6 d-none d-lg-block p-0">
          <img
            src="/img/lf.png"
            alt="Register Background"
            style={{
              width: "100%",
              height: "100vh",
              objectFit: "cover"
            }}
          />
        </div>

        {/* RIGHT SIDE REGISTER FORM */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div
            className="p-5"
            style={{
              width: "100%",
              maxWidth: "450px",
              borderRadius: "20px",
              background: "#ffffff",
              border: "1px solid #eaeaea",
              boxShadow: "0px 8px 25px rgba(0,0,0,0.10)"
            }}
          >
            <h3 className="text-center mb-4 fw-bold">Register</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control px-3 py-2 rounded-pill"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {
                  formData.name && !n.test(formData.name) && (
                    <p className="text-danger">
                      Name must contain only letters
                    </p>
                  )
                }
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">Phone No.</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control px-3 py-2 rounded-pill"
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

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control px-3 py-2 rounded-pill"
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

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control px-3 py-2 rounded-pill"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {
                  formData.password && !pswd.test(formData.password) && (
                    <p className="text-danger">
                      password must have atleast one uppercase,
                      <br />lowercase, number and special symbol with minimum length 8
                    </p>
                  )
                }
              </div>

              {/* Role */}
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-select rounded-pill px-3 py-2"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="jobseeker">Job Seeker</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              </div>

              {/* Register Button */}
              <button type="submit" className="btn btn-primary w-100 rounded-pill py-2" disabled={!h() || isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </button>

            </form>

            {/* Already have account */}
            <p className="text-center mt-3 text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">Login</Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );

};

export default Register;
