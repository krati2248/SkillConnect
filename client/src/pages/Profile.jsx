import React, { useEffect } from 'react'
import { useApliedQuery, useCheckSessionQuery, useProfilestatusQuery } from '../features/auth/authApi';
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'; 
const Profile = () => {
    const { data, isLoading, refetch } = useCheckSessionQuery();
    console.log(data);
  const { data: a } = useApliedQuery();
  console.log("profile");
  console.log(a);
  const { data: dt } = useProfilestatusQuery();
  const navigate = useNavigate();
  const locati = useLocation();
  useEffect(() => {
    refetch();
  }, [data]);
  useEffect(() => {
      const h = sessionStorage.getItem("setC");
      console.log(locati.state);
      if (locati.state?.message && !h) {
        toast.success(locati.state.message);
        sessionStorage.setItem("setC", "true");
    }
    return () =>
    {
      sessionStorage.removeItem("setC");
    }
    }, [locati.state]);
  const updt = () =>
  {
    navigate("/editprofile");
  }
  return (
    <>
      <div className="container ">
        {data ? <>
          <div className="d-flex justify-content-center align-items-center" style={{ height: "21rem" }}>
           <div className="card shadow text-center p-3" style={{ width: "20rem" }}>
  <div className="d-flex justify-content-center">
    <div className="rounded-circle bg-light d-flex justify-content-center align-items-center"
      style={{ width: "100px", height: "100px" }}>
      <i className="fa fa-solid fa-user fa-3x text-secondary"></i>
    </div>
  </div>

  <div className="card-body">
    <h5 className="card-title">{data?.name}</h5>
    <p className="card-text text-muted mb-1">{data?.email}</p>
    <p className="card-text text-muted">{data?.phone}</p>
              </div>
              <button className="btn btn-primary" onClick={updt}>update profile</button>
</div></div>
          
      </> : null}
       
       
        
        </div>
    </>
  )
}

export default Profile
