import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/vendor/Breadcrumbs/Breadcrumb';

const unavailableDates = ['2024-04-01', '2024-04-03', '2024-04-05'].map(date => new Date(date));

const CustomDatePicker: React.FC = () => {
 const [selectedDate, setSelectedDate] = useState<Date | null>(null);

 return (
    <DefaultLayout>
      <Breadcrumb pageName="History" folderName='Booking'/>
      <DatePicker
        className='bg-black'
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        excludeDates={unavailableDates}
      />
    </DefaultLayout>
 );
};

export default CustomDatePicker;
