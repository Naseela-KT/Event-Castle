import React from 'react';
import CardDataStats from '../../components/vendor/CardDataStats';
import DefaultLayout from '../../layout/vendor/VendorLayout';
import { useSelector } from 'react-redux';
import VendorRootState from '../../redux/rootstate/VendorState';

const Dashboard: React.FC = () => {
  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata,
  );

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        
       
        <CardDataStats title="Total Booking" value={vendor?.totalBooking}>
        <i className="flex fa-regular fa-calendar-check justify-center" style={{fontSize:'36px'}}></i>
        </CardDataStats>
        <CardDataStats title="Total Rating" value={vendor?.totalRating}>
        <i className="fa-regular fa-star justify-center" style={{fontSize:'36px'}}></i>
        </CardDataStats>
      </div>

      
    </DefaultLayout>
  );
};

export default Dashboard;
