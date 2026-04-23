import React from 'react'
import { useCheckSessionQuery,useApliedQuery } from '../features/auth/authApi';
import { useEffect } from 'react';
const Status = () => {
    const { data, isLoading, refetch } = useCheckSessionQuery();
        console.log(data);
      const { data: dt } = useApliedQuery();
      console.log("profile");
      console.log(dt);
       
      useEffect(() => {
        refetch();
      }, [data]);
  return (
    <>
      <div className="container mt-4" style={{marginBottom:"400px"}}>
        {(dt&&dt.length>0) ? (
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">S. no.</th>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">address</th>
                <th scope="col">type</th>
                <th scope="col">status</th>
              </tr>
            </thead>
            <tbody>
              {dt.map((d, i) => <tr>
                <th scope="row">{i + 1}</th>
                <td>{d.job.name}</td>
                <td>{d.job.role}</td>
                <td>{d.job.address}</td>
                <td>{d.job.type}</td>
                <td>{d.status}</td>
              </tr>)} 
 
            </tbody>
          </table>
):<p className="text-center fs-3" style={{marginTop:"140px",marginBottom:"140px"}}>Start applying!</p>}
        
      </div>
    </>
  )
}

export default Status
