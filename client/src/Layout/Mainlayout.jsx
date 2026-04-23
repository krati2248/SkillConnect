import React, { useEffect } from 'react'

import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCheckSessionQuery } from '../features/auth/authApi'
import Sidebar from '../components/Sidebar'

function Mainlayout() {
  const { data, isLoading, refetch } = useCheckSessionQuery();
  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <Header />
      {data ? (data.role == "jobseeker" ? null : <Sidebar />) : null}
      <Outlet />

      {data ? (data.role == "jobseeker" ? <Footer /> : null) : <Footer />}
    </>
  )
}

export default Mainlayout
