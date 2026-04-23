
import { Link, useNavigate } from 'react-router-dom';
import { useCheckSessionQuery, useLogoutMutation } from '../features/auth/authApi';
import { clearUser, setUser } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authApi } from '../features/auth/authApi'

const Header = () => {
  const { data, isLoading, refetch } = useCheckSessionQuery();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  console.log("he");
  console.log(data?.name);
  useEffect(() => {
    refetch();
  }, []);
  const hndl = async () => {
    try {
      await logout().unwrap();
      dispatch(clearUser());
      dispatch(authApi.util.resetApiState());
      sessionStorage.removeItem("setH");
      navigate('/login');
    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      {isLoading ? (
        <span className="nav-item nav-link">Loading...</span>
      ) : data ? (
        ((data.role == 'jobseeker' || (data.name != null && data.role != 'recruiter')) ?
          <>
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0 mb-2">
              <Link to="/" className="avbar-brand d-flex align-items-center justify-content-center text-center py-0 px-4 px-lg-5 flex-column">
              <img src='/img/Sc.png' alt="Logo" className="logo-img" />
              <h2 className="m-0 logo-text">Portal</h2>
            </Link>

              <button
                type="button"
                className="navbar-toggler me-4"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto p-4 p-lg-0">
                  <Link to="/" className="nav-item nav-link">Home</Link>
                  <Link to="/job-list" className="nav-item nav-link">Job List</Link>


                  <Link to="/category" className="nav-item nav-link">Category</Link>


                  <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Profile</a>
                    <div className="dropdown-menu rounded-0 m-0">
                      <Link to='/getProfile' className="dropdown-item">personal</Link>
                      <Link to='/status' className="dropdown-item">status</Link>
                    </div>
                  </div>
                  <button onClick={hndl} className="btn btn-link nav-item nav-link p-0 fw-normal">
                    Logout
                  </button>
                </div>


              </div>
            </nav>
          </>
          : <>
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow fixed-top p-0"> 
                <Link
                to="/"
                className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5"
              >
                <h1 className="m-0 text-primary">Dashboard</h1>
              </Link>
                <div className="navbar-nav ms-auto p-4 p-lg-0">
                   <Link to="/" className="d-flex align-items-center justify-content-center text-center py-0 px-4 px-lg-5 flex-column">
              <img src='/img/Sc.png' alt="Logo" className="logo-img" />
              <h2 className="m-0 logo-text pd">Portal</h2>
            </Link>
              </div>
 
            </nav>
          </>
        )) : (
        <>
          <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0 mb-2">
            <Link to="/" className="navbar-brand d-flex align-items-center justify-content-center text-center py-0 px-4 px-lg-5 flex-column">
              <img src='/img/Sc.png' alt="Logo" className="logo-img" />
              <h2 className="m-0 logo-text">Portal</h2>
            </Link>

            <button
              type="button"
              className="navbar-toggler me-4"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto p-4 p-lg-0">
                <Link to="/" className="nav-item nav-link">Home</Link>

                <Link to="/job-list" className="nav-item nav-link">Job List</Link>


                  <Link to="/category" className="nav-item nav-link">Category</Link>




                <Link to="/register" className="nav-item nav-link">
                  Register / login
                </Link>
              </div>


            </div>
          </nav>

        </>
      )}

    </>
  )
}

export default Header
