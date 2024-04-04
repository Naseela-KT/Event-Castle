import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/vendor/Breadcrumbs/Breadcrumb';
import {
  Card,
  CardBody,
  Input,
  Button,
} from '@material-tailwind/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import VendorRootState from '../../../redux/rootstate/VendorState';
import './Dates.css'



const CustomDatePicker: React.FC = () => {
  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (selectedDate === '') {
      setError('Please select a date');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Date" folderName="Booking" />
      <div className='flex justify-between'>
<div>
      <Card
        className="w-96"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardBody
          className="flex flex-col gap-4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <form onSubmit={handleSubmit}>
            <Input
              label="Date"
              size="lg"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {error ? <p className="text-red-400 text-sm">{error}</p> : ''}

            <Button
              variant="gradient"
              className="mt-5"
              type="submit"
              fullWidth
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Add Date
            </Button>
          </form>
        </CardBody>
      </Card>
      </div>
      <div className="customDatePickerWidth">
      <DatePicker
      
            className='w-3xl'
            selected={null}
            onChange={() => {}}
            inline
            minDate={new Date()}
            excludeDates={vendor?.bookedDates?.map(date => new Date(date))}
            dayClassName={(date) => {const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
              return vendor?.bookedDates?.includes(utcDate.toISOString().split('T')[0]) ? 'bg-green-500' : '';}}
              
          />
          </div>
          </div>
          
    </DefaultLayout>
    
  );
};

export default CustomDatePicker;
