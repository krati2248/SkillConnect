import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { clearUser } from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi'
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const [profileOpen, setProfileOpen] = useState(false); // dropdown toggle
    const toggleProfile = () => setProfileOpen(!profileOpen);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 990);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 990);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();

    const hndl = async () => {
        try {
            await logout().unwrap();
            dispatch(clearUser());
            dispatch(authApi.util.resetApiState());
            navigate('/login');
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-3 col-xl-2 d-none d-lg-block text-white p-3">
                        {/* Sidebar code */}
                    </div>
                    <div className="d-flex">
                        {/* Sidebar */}
                        <div
                            id="sidebar"
                            className={`bg-dark text-white p-3 position-fixed ${isOpen || !isMobile ? "d-block" : "d-none"
                                }`}
                            style={{
                                width: "250px",
                                height: "100vh",
                                overflowY: "auto",
                                top: "70px", // below header
                                left: 0,
                                zIndex: 1000,
                                transition: "all 0.3s ease",
                            }}
                        >
                            <h4 className="text-center mb-4">Sidebar</h4>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link text-white">
                                        Dashboard
                                    </Link>
                                </li>

                                {/* Profile Dropdown */}
                                <li className="nav-item">
                                    <Link
                                        to="#" onClick={toggleProfile} className="nav-link text-white"

                                        style={{ textDecoration: "none" }}
                                    >
                                        Profile {profileOpen ? "▴" : "▾"}
                                    </Link>
                                    <div
                                        className="overflow-hidden"
                                        style={{
                                            maxHeight: profileOpen ? "300px" : "0",
                                            transition: "max-height 0.3s ease-in-out",
                                        }}
                                    >
                                        <ul className="nav flex-column ms-3">
                                            <li className="nav-item">
                                                <Link to="/getProfile" className="nav-link text-white">
                                                    Personal
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dpost" className="nav-link text-white">
                                        Post
                                    </Link>
                                </li>
                                {/* Logout Button */}
                                <li className="nav-item">
                                    <Link
                                        to="#"
                                        onClick={hndl}
                                        className="nav-link text-white"
                                    >
                                        Logout
                                    </Link>
                                </li>

                                {/* CTA Button */}
                                <li className="nav-item mt-3">
                                    <Link
                                        to="/postjob"
                                        className="btn btn-primary w-100"
                                    >
                                        Post A Job <i className="fa fa-arrow-right ms-2"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Backdrop on mobile */}
                        {isMobile && isOpen && (
                            <div
                                onClick={toggleSidebar}
                                style={{
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                    zIndex: 500,
                                }}
                            />
                        )}

                        {/* Content */}
                        <div
                            id="content"
                            className="flex-grow-1"
                            style={{
                                transition: "margin-left 0.3s ease",
                                padding: "20px",
                                marginLeft: isMobile ? "0px" : "250px"

                            }}
                        >
                            {/* Toggle button only on mobile */}
                            {isMobile && (
                                <button
                                    className="btn btn-primary" style={{ marginTop: "180px" }}
                                    onClick={toggleSidebar}
                                >
                                    ☰
                                </button>
                            )}

                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Sidebar
