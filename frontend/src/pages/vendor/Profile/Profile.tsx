import { useSelector } from 'react-redux';
import Breadcrumb from '../../../components/vendor/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import { Link, useLocation } from 'react-router-dom';
import VendorRootState from '../../../redux/rootstate/VendorState';
import { useEffect, useState } from 'react';
import { axiosInstanceVendor } from '../../../api/axiosinstance';
import { Button } from '@material-tailwind/react';
import { toast } from 'react-toastify';

interface Review {
  username: string;
  rating: number;
  content: string;
}

interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  isActive: boolean;
  totalBooking: number;
  coverpic: string;
  logo: string;
  reviews: Review[] | undefined;
  logoUrl: string;
  coverpicUrl: string;
  about: string;
  isVerified: boolean;
  verificationRequest: boolean;
}

const Profile = () => {
  const vendorData = useSelector(
    (state: VendorRootState) => state.vendor.vendordata,
  );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [vendor, setVendor] = useState<Vendor>();

  useEffect(() => {
    axiosInstanceVendor
      .get(`/getvendor?vendorid=${vendorData?._id}`, { withCredentials: true })
      .then((response) => {
        setVendor(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log('here', error);
      });
  }, [id, vendorData]);

  const handleVerification = async () => {
    axiosInstanceVendor
      .post(`/verification-request`,{vendorId:vendor?._id}, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        toast.success("Requested for Verification!")
      })
      .catch((error) => {
        console.log('here', error);
      });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" folderName="" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={vendor?.coverpicUrl}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-16 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img
                src={vendor?.logoUrl}
                alt="profile"
                className="rounded-full w-full h-30 object-cover"
              />
            </div>
          </div>
          <div className="relative z-30 mx-auto -mt-16  w-full mr-2 max-w-30 rounded-full  p-1 ">
            <div className="relative">
              {!vendor?.isVerified && !vendor?.verificationRequest ? (
                <Button
                  onClick={handleVerification}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Request Verification
                </Button>
              ) :vendor?.verificationRequest ? (
                <Button
                color='blue'
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Pending
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {vendor?.name}
            </h3>
            <p className="font-medium">{vendor?.city}</p>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  259
                </span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  129K
                </span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  2K
                </span>
                <span className="text-sm">Following</span>
              </div>
            </div>

            <div className="mx-auto max-w-180">
              <h4 className="font-semibold text-black dark:text-white">
                About Me
              </h4>
              <p className="mt-4.5">{vendor?.about}</p>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
