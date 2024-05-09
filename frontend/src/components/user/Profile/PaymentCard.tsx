import { Card, CardHeader, Typography, Button, CardBody, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { axiosInstance } from "../../../config/api/axiosinstance";
import { useState } from "react";
import UserRootState from "../../../redux/rootstate/UserState";
import { useSelector } from "react-redux";
import { VendorData } from "../../../types/vendorTypes";

interface Booking {
    _id:string;
    date: string;
    name: string;
    eventName: string;
    city: string;
    pin: number;
    mobile: number;
    vendorId: VendorData;
    status: string;
    payment_status: string;
  }



interface PaymentCardProps{
    booking:Booking;
}

const PaymentCard:React.FC<PaymentCardProps>=({booking}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const user = useSelector((state: UserRootState) => state.user.userdata);


    const handleClick = async () => {
  
        axiosInstance
          .post(
            `/create-checkout-session`,
            { userId: user?._id, ...booking?.vendorId,bookingId:booking?._id},
            { withCredentials: true },
          )
          .then((response) => {
            console.log(response)
            if (response.data.url) {
              window.location.href = response.data.url;
            }
          })
          .catch((error) => {
            console.log('here', error);
          });
      };
  return (
   <>
   <Card
        className="mt-6 mb-20 mx-20"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-1 rounded-none border-b border-white/10 text-left p-5"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex justify-between">
            <div>
              <Typography
                variant="h5"
                color="gray"
                className="mb-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Payment Details
              </Typography>
              <Typography
                variant="h6"
                color="gray"
                className="mb-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Status :{' '}
                <span className={booking?.payment_status=="Completed"?"text-green-500":"text-blue-400"}>{booking?.payment_status}</span>
              </Typography>
            </div>
            <div>
              {booking?.status==="Accepted" && booking?.payment_status==="Pending"?<Button
                onClick={handleOpen}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Make Payment
              </Button>:""}
             
              
            </div>
          </div>
        </CardHeader>

        <CardBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex flex-col md:flex-row justify-between">
            <div></div>
            <div></div>
          </div>
        </CardBody>
      </Card>
      <Dialog
        size="xs"
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
          Confirm Payment
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
           
          <Typography
            variant="h6"
            color="gray"
            className="mb-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Token Amount : 1000
          </Typography>
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
            onClick={handleClick}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Proceed</span>
          </Button>
        </DialogFooter>
      </Dialog>
   </>
  )
}

export default PaymentCard