import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../Components/DashSidebar';
import DashProfile from '../Components/DashProfile';

const Dashboard = () => {

  const location = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [Location.search]);


  return (
    <>
      <div className='min-h-screen flex flex-col md:flex-row'>
        <div className='md:w-56'>
          {/* Sidebar */}
          <DashSidebar />
        </div>
        {/* profle... */}

        {tab === 'profile' && <DashProfile />}
      </div>
    </>
  )
}


export default Dashboard