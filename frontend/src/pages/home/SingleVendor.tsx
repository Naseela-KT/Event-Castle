import {
  Avatar,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import {
  MapPinIcon,
} from '@heroicons/react/24/solid';
import Footer from '../../layout/user/footer';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/api/axiosinstance';
import VendorTabs from '../../components/home/VendorProfile/VendorTabs';
import { toast } from 'react-toastify';
import UserRootState from '../../redux/rootstate/UserState';
import { useSelector } from 'react-redux';
import AddReview from '../../components/home/VendorProfile/AddReview';
import ProfileButtons from '../../components/home/VendorProfile/ProfileButtons';
import { Review } from '../../types/commonTypes';
import { VendorData } from '../../types/vendorTypes';





export function VendorProfile() {
  const user = useSelector((state: UserRootState) => state.user.userdata);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id') || '';
  const [vendor, setVendor] = useState<VendorData>();
  const [favourite,setFavourite]=useState(false);
  const [review,setReview]=useState<Review[]>([]);

  useEffect(() => {
    if (user?.favourite.includes(id)) { 
      setFavourite(true);
  }
    axiosInstance
      .get(`/getvendor?vendorid=${id}`, { withCredentials: true })
      .then((response) => {
        setVendor(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log('here', error);
      });
  }, []);

  useEffect(()=>{
    axiosInstance
    .get(`/getReviews?vendorId=${id}`, { withCredentials: true })
    .then((response) => {
      setReview(response.data.reviews);
      console.log(response.data);
    })
    .catch((error) => {
      console.log('here', error);
    });
  })


  const handleFavourite=async()=>{
    try {
      axiosInstance
      .post(`/add-favorite-vendor?vendorId=${id}&userId=${user?._id}`, { withCredentials: true })
      .then((response) => {
        console.log(response)
        setFavourite(response.data.fav);
        toast.success(response.data.message)
        console.log(response.data);
      })
      .catch((error) => {
        console.log('here', error);
        toast.error(error.response.data.message)
      });
    } catch (error) {
     console.log(error)
    }
  }

  return (
    <>
    <section className="relative block h-[100vh] overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-full  scale-105" style={{ backgroundImage: `url(${vendor?.coverpicUrl})`,backgroundSize:"cover" }} />
  <div className="absolute top-0 h-full w-full bg-black/20 bg-cover" />
</section>
      <section className="relative bg-white py-10">
        <div className="relative -mt-40 flex w-full px-8 min-w-0 flex-col break-words bg-white px-15">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="relative flex gap-6 items-start">
                <div className="-mt-20 w-40 ml-20">
                  <Avatar
                    src={vendor?.logoUrl}
                    alt="Profile picture"
                    variant="circular"
                    className="h-40 w-50"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <Typography
                    variant="h4"
                    color="blue-gray"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {vendor?.name}
                  </Typography>
                  {vendor?.isVerified?<svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          className="absolute top-2 right-2 h-7 w-7"
        >
          <polygon
            fill="#42a5f5"
            points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
          ></polygon>
          <polygon
            fill="#fff"
            points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
          ></polygon>
        </svg>:""}
                  <Typography
                    variant="paragraph"
                    color="gray"
                    className="!mt-0 font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {vendor?.email}
                  </Typography>
                </div>
              </div>

              <div className="mt-10 mb-10 flex lg:flex-col md:flex-row flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
                <div className='flex gap-2'>

             
              <IconButton
                color={favourite?"red":"black"}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    onClick={handleFavourite}
                  >
                    <i className="fas fa-heart w-fit lg:ml-auto" />
                  </IconButton>
          
             

                  <Button
                    className="w-fit lg:ml-auto"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    color="green"
                  >
                    4.7
                  </Button>

                
                </div>
                <ProfileButtons vendorId={vendor?._id} bookedDates={vendor?.bookedDates} userId={user?._id}/>
              </div>
            </div>
            <div className="-mt-4 lg:pl-20 container space-y-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography
                  className="font-medium text-blue-gray-500"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {vendor?.city}
                </Typography>
              </div>
            
            </div>
            <div className="mb-10 py-6 lg:pl-20">
              <div className="flex w-full flex-col items-start lg:w-1/2">
                <Typography
                  className="mb-6 font-normal text-blue-gray-500"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                  and records all of his own music, giving it a warm, intimate
                  feel with a solid groove structure. An artist of considerable
                  range.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <VendorTabs reviews={review}/>
      </section>
      <section className='mb-20'>
        <AddReview id={vendor?._id}/>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default VendorProfile;
