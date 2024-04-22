import DefaultLayout from '../../layout/vendor/VendorLayout'
import Breadcrumb from '../../components/vendor/Breadcrumbs/Breadcrumb'
import ChatCard from '../../components/vendor/Chat/ChatCard'

const Notifications = () => {
  return (
    <DefaultLayout>
    <Breadcrumb pageName="Notifications" folderName="" />
        <ChatCard/>
    </DefaultLayout>
  )
}

export default Notifications