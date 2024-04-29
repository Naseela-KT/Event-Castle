import React, { useEffect, useState } from 'react';
import { Button, Input, Typography } from '@material-tailwind/react';
import Footer from '../../layout/user/footer';
import 'react-datepicker/dist/react-datepicker.css';
import { validate} from '../../validations/home/BookingValidation';
import { axiosInstance } from '../../config/api/axiosinstance';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UserRootState from '../../redux/rootstate/UserState';
import { useSelector } from 'react-redux';
import { USER } from '../../config/constants/constants';



interface FormValues {
  eventName: string;
  name: string;
  date: string;
  city: string;
  pin: string;
  mobile: string;
}

const initialValues: FormValues = {
  eventName: '',
  name: '',
  date: '',
  city: '',
  pin: '',
  mobile: '',
};



const BookEventForm: React.FC = () => {
  const user = useSelector((state: UserRootState) => state.user.userdata);
  const [minDate, setMinDate] = useState('');
  const navigate=useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<FormValues>({
    eventName: '',
    name: '',
    date: '',
    city: '',
    pin: '',
    mobile: '',
  });

  useEffect(() => {
    // Get tomorrow's date in the required format
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const tomorrowDate = currentDate.toISOString().split("T")[0];
    
    setMinDate(tomorrowDate);
  }, []);



  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const errors = validate({ ...formValues, [name]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
  };


  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors)
    if (Object.values(errors).every((error) => error === "")) {
      console.log(formValues);
      axiosInstance
        .post(`/book-an-event?vendorId=${id}&userId=${user?._id}`, formValues, { withCredentials: true })
        .then((response) =>{
          console.log(response);
          toast.success(response.data.message);
          navigate(`${USER.PROFILE}${USER.BOOKING_DETAILS}`)
        })
        .catch((error) => {
          toast.error(error.response.data.message)
          console.log("here", error);
        });
    }
  };
 
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded px-6 pt-8 pb-8 w-full max-w-3xl mt-30 mb-30">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col justify-center items-center">
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-3"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                BOOK AN EVENT
              </Typography>
              <form
                onSubmit={submitHandler}
                className="border border-gray-300 shadow-lg p-10 w-full"
              >
                
                <div className="mb-4">
                  <Input
                    label="Date"
                    type="date"
                    onChange={handleChange}
                    value={formValues.date}
                    name="date"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                    min={minDate}
                  />
                 
                </div>
                <div className="mb-4">
                  <Input
                    label="Event name"
                    type="text"
                    size="md"
                    onChange={handleChange}
                    value={formValues.eventName}
                    name="eventName"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                  />
                   {formErrors.eventName ? (
                    <p
                      className="text-sm"
                      style={{
                        color: 'red',
                      }}
                    >
                      {formErrors.eventName}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <Input
                    type="text"
                    size="md"
                    label="Name"
                    onChange={handleChange}
                    value={formValues.name}
                    name="name"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                  />
                        {formErrors.name ? (
                    <p
                      className="text-sm"
                      style={{
                        color: 'red',
                      }}
                    >
                      {formErrors.name}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <Input
                    label="City"
                    type="text"
                    size="md"
                    onChange={handleChange}
                    value={formValues.city}
                    name="city"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                  />
                        {formErrors.city ? (
                    <p
                      className="text-sm"
                      style={{
                        color: 'red',
                      }}
                    >
                      {formErrors.city}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <Input
                    label="Pin"
                    type="text"
                    size="md"
                    onChange={handleChange}
                    value={formValues.pin}
                    name="pin"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                  />
                        {formErrors.pin ? (
                    <p
                      className="text-sm"
                      style={{
                        color: 'red',
                      }}
                    >
                      {formErrors.pin}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <Input
                    label="Mobile"
                    type="text"
                    size="md"
                    onChange={handleChange}
                    value={formValues.mobile}
                    name="mobile"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                  />
                        {formErrors.mobile ? (
                    <p
                      className="text-sm"
                      style={{
                        color: 'red',
                      }}
                    >
                      {formErrors.mobile}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    color="blue-gray"
                    size="sm"
                    type="submit"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Book Now
                  </Button>
                </div>
              </form>
            </div>
            {/* Image container */}
            <div className="hidden md:block p-5">
              <img
                className="h-full w-full object-cover object-center shadow-lg"
                src="https://plus.unsplash.com/premium_photo-1664790560155-eeef67a1e77c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="nature image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
};

export default BookEventForm;
