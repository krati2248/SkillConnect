import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const List = () => {
  const category=JSON.parse(localStorage.getItem("category")) || [];
    
  console.log("cate");
  console.log(category);
  return (
    <>
      <div className="container-xxl py-5">
      <div id="tab-1" className="p-0">
        {category?.map((cate, index) => (
          <div className="d-flex justify-content-center">
          <div key={index} className="job-item p-4 mb-4" style={{ backgroundColor: "#f9fafb", maxWidth: "880px", width: "100%" }}>
            <div className="row g-4">
              <div className="col-sm-12 col-md-8 d-flex align-items-center">
                <img
                  className="flex-shrink-0 img-fluid border rounded"
                  src={cate.logo.url}
                  alt=""
                  style={{ width: '80px', height: '80px' }}
                />
                <div className="text-start ps-4">
                    <h6 className="mb-3">{cate.name}</h6>
                    <p>Role: {cate.role}</p>
                  <span className="text-truncate me-3">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    {cate.address}
                  </span>
                  <span className="text-truncate me-3">
                    <i className="far fa-clock text-primary me-2"></i>
                    {cate.type}
                  </span>
                  <span className="text-truncate me-0">
                    <i className="far fa-money-bill-alt text-primary me-2"></i>
                    {cate.stip}
                  </span>
                </div>
              </div>
              <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                <div className="d-flex mb-3">
                   
                  <Link to={`/jobdetail/${cate._id}`} className="btn btn-primary">
                    Apply Now
                  </Link>
                </div>
                <small className="text-truncate">
                   
                  Posted on: {new Date(cate.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
            </div>
            </div>
        ))}
        </div>
        </div>
    </>
  )
}

export default List
