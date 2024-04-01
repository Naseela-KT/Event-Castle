import {
  Avatar,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import {
  MapPinIcon,
} from '@heroicons/react/24/solid';
import Footer from '../layout/userLayout/footer';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axiosinstance';
import VendorTabs from '../components/Home/VendorProfile/VendorTabs';
import { toast } from 'react-toastify';
import UserRootState from '../redux/rootstate/UserState';
import { useSelector } from 'react-redux';

interface Review {
  username: string;
  rating: number;
  content: string;
  // Add any other properties of a review here
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
  favourite:Array<string>
}

export function VendorProfile() {
  const user = useSelector((state: UserRootState) => state.user.userdata);
  const location = useLocation();
  const path = location.pathname;
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [vendor, setVendor] = useState<Vendor>();
  const [favourite,setFavourite]=useState(false);

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


  const handleFavourite=async()=>{
    try {
      axiosInstance
      .post(`/add-favorite-vendor?vendorId=${id}&userId=${user?._id}`, { withCredentials: true })
      .then((response) => {
        console.log(response)
        setFavourite(true);
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
    <section className="relative block h-[80vh] overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-full bg-cover scale-105" style={{ backgroundImage: `url(${vendor?.coverpicUrl})` }} />
  <div className="absolute top-0 h-full w-full bg-black/20 bg-cover bg-center" />
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

                <div className="flex md:flex-row flex-col justify-start py-4 pt-8 lg:pt-4">
                  <div className="mr-1 p-3 text-center">
                  <Button
                    className="w-fit"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                   
                  >
                    Check Availability
                  </Button>
                  </div>
                  <div className="mr-1 p-3 text-center">
                  <Button
                    className="w-fit"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                   
                  >
                    Chat with us
                  </Button>
                  </div>
               
                </div>
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
        <VendorTabs reviews={vendor?.reviews}/>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default VendorProfile;
