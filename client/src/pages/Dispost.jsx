import React, { useEffect, useState } from 'react'
import { useDeleteMutation, useDpostQuery } from '../features/auth/authApi'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dispost = () => {
  const { data: dt, refetch } = useDpostQuery();
  const [dele] = useDeleteMutation();
  const navigate = useNavigate();
  const locati = useLocation();
  useEffect(() => {
    const h = sessionStorage.getItem("setD");
    console.log(locati.state);

    if (locati.state?.message && !h) {
      refetch();
      toast.success(locati.state.message);
      sessionStorage.setItem("setD", "true");
      navigate(locati.pathname, { replace: true });
    }
    return (() => {
      sessionStorage.removeItem("setD");
    }
    );
  }, [locati.state]);
  const delet = async (i) => {
    try {
      await dele(i).unwrap();
      toast.success('Deleted successfully');
    }
    catch (error) {
      const message = error?.data?.message || 'delete failed';
      toast.error(message);
    }
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
                    <th scope="col">Sno.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">address</th>
                    <th scope="col">type</th>
                    <th scope="col">vacancy</th>
                    <th scope="col">action</th>

                  </tr>
                </thead>
                <tbody>
                  {dt?.map((d, i) => <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{d.name}</td>
                    <td>{d.role}</td>
                    <td>{d.address}</td>
                    <td>{d.type}</td>
                    <td>{d.vacancy}</td>
                    <td>
                      <div className="d-flex flex-wrap flex-md-column flex-lg-row gap-2">
                        <Link
                          to={`/viewpost/${d._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          View
                        </Link>
                        <Link
                          to={`/editpost/${d._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => delet(d._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>)}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dispost
