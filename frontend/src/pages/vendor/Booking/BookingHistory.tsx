import DefaultLayout from '../../../layout/DefaultLayout'
import Breadcrumb from '../../../components/vendor/Breadcrumbs/Breadcrumb'
import TableThree from '../../../components/vendor/Tables/TableThree'

const BookingHistory = () => {
  return (
    <DefaultLayout>
    <Breadcrumb pageName="History" folderName='Booking'/>

    <div className="flex flex-col gap-10">
      
      <TableThree />
    </div>
  </DefaultLayout>
  )
}

export default BookingHistory