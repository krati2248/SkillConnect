import React, { useEffect, useState,useRef } from 'react'
import { useJobdetailQuery } from '../features/auth/authApi'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Viewpost = () => {
  const { id } = useParams();
  const { data: dt } = useJobdetailQuery(id);
  console.log(dt);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const descRef = useRef(null);
  const reqRef = useRef(null);
  useEffect(() => {
    if (dt) {
      if (descRef.current) {
        descRef.current.innerHTML = dt.description;
      }
      if (reqRef.current) {
        reqRef.current.innerHTML = dt.requirement;
      }
    }
  }, [dt]);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">

          <div className="col-lg-3 col-xl-2 d-none d-lg-block text-white p-3">
          </div>

          {/* Main Content */}
          <div className="col-12 col-lg-9 col-xl-10">
            <div className="table-responsive m-4">
              <table class="table table-striped table-sm w-100">
                <thead>
                  <tr>
                     
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Type</th>
                    <th scope="col">Vacancy</th>
                    <th scope="col">Role</th>
                    <th scope="col">Stip</th>
                    <th scope="col">Description</th>
                    <th scope="col">Requirement</th>
                  </tr>
                </thead>
                <tbody>
                   <tr>
                     
                    <td>{dt?.name}</td>
                    <td>{dt?.address}</td>
                    <td>{dt?.type}</td>
                    <td>{dt?.vacancy}</td>
                    <td>{dt?.role}</td>
                    <td>{dt?.stip}</td>
                    <td ref={descRef}></td>
                    <td ref={reqRef}></td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Viewpost;
