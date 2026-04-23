import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useNavigate, useLocation,Link } from 'react-router-dom';
import { toast} from 'react-toastify';
import { useLoginMutation,useGoogleLoginMutation } from '../features/auth/authApi';
import { setUser } from '../features/auth/authSlice';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Login, { isLoading }] = useLoginMutation();
  const locati = useLocation();
  const [googleLogin] = useGoogleLoginMutation();

  useEffect(() => {
     const h = sessionStorage.getItem("setL");
    console.log(locati.state);
    if (locati.state?.message&&!h) {
      sessionStorage.setItem("setL", "true");
      toast.success(locati.state.message);
      navigate(locati.pathname, { replace: true });
    }
    return (() => {
      sessionStorage.removeItem("setL");
    })
  }, [locati.state]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  //Harsh@66
  //Palh@660
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try { 
      const res = await Login(formData).unwrap();
      dispatch(setUser(res.user));

      navigate('/',{ state: { message: "logged in successful" } });
    } catch (err) {
      const message = err?.data?.message || 'login failed';
      setError(message);
      formData.email = '';
      formData.password = '';
      toast.error(message);
    }
  };
  const handleGoogleSuccess = async (resp) => {
  const token = resp.credential;
    const decoded = jwtDecode(token);
    const googleData = {
      googleId: decoded.sub,
      name: decoded.name,
      email: decoded.email
    };
  try {
    const l = await googleLogin(googleData).unwrap();

    dispatch(setUser(l.user));

    navigate("/", { state: { message: "logged in with Google" } });

  } catch (err) {
    const message = err?.data?.message || "no login";
    toast.error(message);
  }
  };
  
   return   (
  <div className="container-fluid" style={{ height: "100vh", backgroundColor: "#ffffff" }}>
    <div className="row">

      {/* LEFT SIDE IMAGE */}
      <div className="col-lg-7 d-none d-lg-block p-0">
        <img
          src="/img/lf.png"
          alt="Login Background"
          style={{
            width: "80%",
            height: "100vh",
            objectFit: "cover"
          }}
        />
      </div>
 
         <div className="col-lg-5 d-flex justify-content-center mt-4" style={{ minHeight: "40vh" }}>
 
        <div
          className="p-5"
          style={{
            width: "100%",
            maxWidth: "420px",
            borderRadius: "20px",
            background: "#ffffff",
            border: "1px solid #eaeaea",
            boxShadow: "0px 8px 25px rgba(0,0,0,0.10)",
            height:"80vh"
          }}
        >
          <h3 className="text-center mb-4 fw-bold">Sign In</h3>

           
          <form onSubmit={handleSubmit}>
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
            </div>

               {/* Submit */}
               <div className='w-100 d-flex justify-content-center'>
            <button
              type="submit"
              className="btn w-75 py-2 rounded-4 text-white rounded-pill" style={{backgroundColor:'#4ed092',border:'1px solid #e0f5eb'}}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
                 </button>
               </div>
               <div className="text-center mt-2">
                 <Link to="/fget">forgot password?</Link>
                 </div>
          </form>
 
          <div className="text-center my-3 text-muted">OR</div>
 
          
   

 <div className="flex justify-center ">
          <GoogleLogin 
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Login Failed")}
          />
        </div>
           <br/>

          <p className="text-center text-muted">
            Don’t have an account? <Link to="/register" className="text-primary">Register</Link>
          </p>

        </div>

      </div>

    </div>
  </div>
);


};

export default Login;

