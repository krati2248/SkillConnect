import React from 'react'
import { useGetjobsQuery } from '../features/job/jobapi';
import { useCheckSessionQuery, useCardQuery, useDpostQuery, useFtypeMutation } from '../features/auth/authApi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Joblist = () => {
  const { data: jobs} = useGetjobsQuery();

  const { data } = useCheckSessionQuery();
  let { data: a } = useCardQuery();
  console.log(a);

  const [card, setCard] = useState(null);
  const { data: dt } = useDpostQuery();
  useEffect(() => {
    if (a) {
      setCard(a);
    }
  }, [a]);
  const [ftype] = useFtypeMutation();

  const fetc = async (tp) => {
    try {
      console.log(tp);
      const res = await ftype({ type: tp }).unwrap();
      console.log("l");
      console.log(res);
      console.log("i");
      setCard(res);
    }
    catch (er) {
      console.error("Error:", er);
    }

  }
  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">

          </h1>
          <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
                  data-bs-toggle="pill"
                  href="#tab-1" onClick={() => fetc("all")}
                >
                  <h6 className="mt-n1 mb-0">All</h6>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 pb-3"
                  data-bs-toggle="pill"
                  href="#tab-2" onClick={() => fetc("full time")}
                >
                  <h6 className="mt-n1 mb-0">Full Time</h6>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 me-0 pb-3"
                  data-bs-toggle="pill"
                  href="#tab-3" onClick={() => fetc("part time")}
                >
                  <h6 className="mt-n1 mb-0">Part Time</h6>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div id="tab-1" className="p-0">
          {card? card.length > 0 ? (card.map((job, index) => (
                          <div className="d-flex justify-content-center">
          
                            <div key={index} className="job-item p-4 mb-4" style={{ backgroundColor: "#f9fafb", maxWidth: "880px", width: "100%" }}>
                              <div className="row g-4">
                                <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                  <img
                                    className="flex-shrink-0 img-fluid border rounded"
                                    src={job.logo.url}
                                    alt=""
                                    style={{ width: '80px', height: '80px' }}
                                  />
                                  <div className="text-start ps-4">
                                    <h6 className="mb-3">{job.name}</h6>
                                    <p>Role:{job.role}</p>
                                    <span className="text-truncate me-3">
                                      <i className="fa fa-map-marker-alt text-primary me-2"></i>
                                      {job.address}
                                    </span>
                                    <span className="text-truncate me-3">
                                      <i className="far fa-clock text-primary me-2"></i>
                                      {job.type}
                                    </span>
                                    <span className="text-truncate me-0">
                                      <i className="far fa-money-bill-alt text-primary me-2"></i>
                                      {job.stip}
                                    </span>
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                  <div className="d-flex mb-3">
                                     
                                    <Link to={`/jobdetail/${job._id}`} className="btn btn-primary">
                                      Apply Now
                                    </Link>
                                  </div>
                                  <small className="text-truncate">
                                     
                                    Posted on: {new Date(job.createdAt).toLocaleDateString()}
                                  </small>
                                </div>
                              </div>
                            </div></div>
                        ))) : <h4 className="text-center">Not found...</h4> : (jobs?.map((job, index) => (
          
                          <div className="d-flex justify-content-center">
                            <div key={index} className="job-item p-4 mb-4" style={{ backgroundColor: "#f9fafb", maxWidth: "880px", width: "100%" }}>
                              <div className="row g-4">
                                <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                  <img
                                    className="flex-shrink-0 img-fluid border rounded"
                                    src={job.logo.url}
                                    alt=""
                                    style={{ width: '80px', height: '80px' }}
                                  />
                                  <div className="text-start ps-4">
                                    <h6 className="mb-3">{job.name}</h6>
                                    <p>Role:{job.role}</p>
                                    <span className="text-truncate me-3">
                                      <i className="fa fa-map-marker-alt text-primary me-2"></i>
                                      {job.address}
                                    </span>
                                    <span className="text-truncate me-3">
                                      <i className="far fa-clock text-primary me-2"></i>
                                      {job.type}
                                    </span>
                                    <span className="text-truncate me-0">
                                      <i className="far fa-money-bill-alt text-primary me-2"></i>
                                      140$
                                    </span>
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                  <div className="d-flex mb-3">
          
                                    <Link to='/login' className="btn btn-primary">
                                      Apply Now
                                    </Link>
                                  </div>
                                  <small className="text-truncate">
          
                                    Posted on: {new Date(job.createdAt).toLocaleDateString()}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        )))}
        </div>



      </div>


    </>
  )
}

export default Joblist
