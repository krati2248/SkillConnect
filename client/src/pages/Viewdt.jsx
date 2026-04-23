import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDapplicantQuery, useStatusMutation } from '../features/auth/authApi';

const Viewdt = () => {
  const { id } = useParams();
  const { data: dt,refetch } = useDapplicantQuery(id);
  console.log(dt);
  const [d, setD] = useState(null);
  const [status] = useStatusMutation();
  const hndl = async (id) => {
    setD("approved");
    console.log(id);
    console.log("hello");
    const data = { status: "approved" };
    await status({ id, data }).unwrap();
    refetch();
  }
  return (
    <>
       <div className="container-fluid">
  <div className="row">
     
      <div className="col-lg-3 col-xl-2 d-none d-lg-block text-white p-3">
    </div>

    {/* Main Content */}
    <div className="col-12 col-lg-9 col-xl-10">
        <div className="table-responsive m-4">
              {dt&&(dt.length!=0)?<><table class="table table-striped table-sm w-100">
         
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">email</th>
                    <th scope="col">phone</th>
                    <th scope="col">resume</th>
                    <th scope="col">action</th>

                  </tr>
                </thead>
                <tbody>
                  {dt?.map((d, i) => <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{d.name}</td>
                    <td>{d.email}</td>
                    <td>{d.phone}</td>
                    <td><Link to={`${d.resume.url}`}>{d.resume.url}</Link></td>
                    <td>{d?.status === "approved" ? <button className="btn btn-primary mx-1">
                      approved
                    </button> : (<><button onClick={() => hndl(d._id)} className="btn btn-primary mx-1">
                      approve
                    </button>
                      <button className="btn btn-danger">
                        reject
                      </button></>)}</td>
                  </tr>)}

                </tbody>
              </table></>:<p className="text-center fs-4 text-capitalize">No applicant</p>}
          </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default Viewdt
