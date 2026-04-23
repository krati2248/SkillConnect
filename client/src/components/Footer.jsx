import React from 'react';
import { Link } from 'react-router-dom';
import { useCheckSessionQuery } from '../features/auth/authApi';

const Footer = () => {
  const { data, isLoading,refetch } = useCheckSessionQuery();
  return (
    <>
      
          <div className="container-fluid bg-dark text-white-50 footer pt-5" style={{marginTop:"180px"}}>
  <div className="container py-4">

    {/* Horizontal Contact Section */}
    <div className="row text-center justify-content-center align-items-center g-4">

      <div className="col-lg-4 col-md-4 col-sm-6">
        <p className="mb-1 fw-bold text-white">Address</p>
        <p className="mb-0">
          <i className="fa fa-map-marker-alt me-2"></i>
          123 Street, New York, USA
        </p>
      </div>

      <div className="col-lg-4 col-md-4 col-sm-6">
        <p className="mb-1 fw-bold text-white">Phone</p>
        <p className="mb-0">
          <i className="fa fa-phone-alt me-2"></i>
          +91 6345678901
        </p>
      </div>

      <div className="col-lg-4 col-md-4 col-sm-6">
        <p className="mb-1 fw-bold text-white">Email</p>
        <p className="mb-0">
          <i className="fa fa-envelope me-2"></i>
          kratikash200@gmail.com
        </p>
      </div>

       

    </div>
  </div>

  {/* Copyright */}
  <div className="container border-top border-primary pt-3 pb-2">
    <div className="row">
      <div className="col-12 text-center">
        &copy;
        <Link to="/">
          {" "}Portal{" "}
        </Link>
        , All Rights Reserved. Designed By{" "}
        <a
           
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kratika
        </a>
      </div>
    </div>
  </div>
</div>


        
    </>
  )
}

export default Footer
