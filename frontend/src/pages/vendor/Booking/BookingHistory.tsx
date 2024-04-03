import DefaultLayout from '../../../layout/DefaultLayout'
import Breadcrumb from '../../../components/vendor/Breadcrumbs/Breadcrumb'
import BookingTable from '../../../components/vendor/Tables/BookingTable'

const BookingHistory = () => {
  return (
    <DefaultLayout>
    <Breadcrumb pageName="History" folderName='Booking'/>

    <div className="flex flex-col gap-10">
      
      <BookingTable />
    </div>
  </DefaultLayout>
  )
}

export default BookingHistory