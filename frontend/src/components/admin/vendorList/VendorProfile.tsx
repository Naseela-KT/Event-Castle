import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { axiosInstanceAdmin } from '../../../config/api/axiosinstance';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/VendorSlice';

interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  isActive: boolean;
  totalBooking: number;
  logoUrl: string;
  coverpicUrl: string;
  verificationRequest: boolean;
  isVerified:boolean;
}

const VendorProfile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Id = queryParams.get('Id');
  const [vendor, setVendor] = useState<Vendor>();

  useEffect(() => {
    axiosInstanceAdmin
      .get(`/getvendor?vendorid=${Id}`)
      .then((response) => {
        console.log(response.data.data);
        setVendor(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [vendor]);

  const handleBlock = () => {
    axiosInstanceAdmin
      .patch(`/vendorblock-unblock?VendorId=${Id}`)
      .then((response) => {
        console.log(response);
        if (response.data.process === 'block') {
          dispatch(logout()); // Dispatch logout action if the vendor is blocked
        }
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const updateVerifyStatus = async(status:string) => {
    axiosInstanceAdmin
      .put(`/update-verify-status`,{vendorId:vendor?._id,status:status},{withCredentials:true})
      .then((response) => {
        console.log(response);
        handleOpen()
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <>
      {vendor?.verificationRequest ? (
        <div>
          <Card
            className="mt-6  ml-20 mr-20 bg-gray-100 text-center"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <CardBody
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Request for Profile Verification
              </Typography>
            </CardBody>
            <CardFooter
              className="pt-0"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Button
               onClick={()=>updateVerifyStatus("Rejected")}
                className="mr-5"
                color="red"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Reject
              </Button>
              <Button
               onClick={handleOpen}
                color="green"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Accept
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        ''
      )}

      <div className="w-85 m-10 mx-20">
        <Card
          className="mt-6"
          placeholder={undefined}
          style={{
            backgroundColor: '#E7E3E0',
            backgroundImage: `url(${vendor?.coverpicUrl})`,
            backgroundSize: 'cover',
          }}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardBody
            placeholder={undefined}
            className="h-50"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined} children={undefined}          ></CardBody>
             {vendor?.isVerified?<svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          className="absolute top-2 right-2 h-10 w-10"
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
        </Card>
        <Card
          className=""
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardHeader
            style={{
              backgroundImage: `url(${vendor?.logoUrl})`,
              backgroundSize: 'cover',
            }}
            color="gray"
            className="mb-4 grid h-28 place-items-center w-40"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined} children={undefined}          ></CardHeader>
            

          <CardBody
            className="flex flex-col gap-4"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              variant="h4"
              style={{ marginTop: '-90px', marginLeft: '170px' }}
              color="blue-gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {vendor?.name}
            </Typography>
            <div
              className="mt-5"
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  VENDOR-TYPE
                </Typography>
                <Typography
                  textGradient
                  color="blue-gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {vendor?.name}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  CITY
                </Typography>
                <Typography
                  textGradient
                  color="blue-gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {vendor?.city}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-2"
                  //   textGradient
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  TOTAL WORKS
                </Typography>
                <Typography
                  textGradient
                  color="blue-gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {vendor?.totalBooking}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-2"
                  //   textGradient
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  CONTACTS
                </Typography>
                <Typography
                  textGradient
                  color="blue-gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  +91{vendor?.phone}
                </Typography>
              </div>
            </div>
            <div className="m-0">
              {vendor?.isActive ? (
                <Button
                  variant="gradient"
                  onClick={() => handleBlock()}
                  size="sm"
                  color="red"
                  className="hidden lg:inline-block"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <span>Block Vendor</span>
                </Button>
              ) : (
                <Button
                  variant="gradient"
                  onClick={() => handleBlock()}
                  size="sm"
                  className="hidden lg:inline-block"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <span>Unblock vendor</span>
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
      <Dialog
      size='xs'
        open={open}
        handler={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
         Confirmation
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Are you sure want to accept the request?
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={()=>updateVerifyStatus("Accepted")}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default VendorProfile;
