import React from 'react'
import DefaultLayout from '../../../layout/DefaultLayout'
import Breadcrumb from '../../../components/vendor/Breadcrumbs/Breadcrumb'
import { Card, CardBody, Typography, CardFooter, Button, CardHeader, Select,Option } from '@material-tailwind/react'

const ViewBooking = () => {
  return (
    <DefaultLayout>
    <Breadcrumb pageName="View" folderName='Booking'/>
    <div className='flex flex-col md:flex-row justify-between gap-4'>
    <Card className="mt-6 w-full"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 mb-1 rounded-none border-b border-white/10 text-left p-5"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <Typography variant="h5" color="blue-gray" className="mb-2"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Venue
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Date
        </Typography>
    
      </CardHeader>
      <hr />
      <CardBody  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
       <div className='flex flex-col md:flex-row justify-between'>
        <div>
        <Typography variant="h6" color="blue-gray" className="mb-2"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Customer
        </Typography>
        </div>
        <div>
        <Typography variant="h6" color="blue-gray" className="mb-2"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Address
        </Typography>
        </div>
       </div>
      </CardBody>
     
    </Card>
    <Card className="w-80"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
     
      <CardBody className="flex flex-col gap-4"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <Typography variant="h6" color="blue-gray" className="mb-2"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Change Status
        </Typography>
      <Select
                          placeholder="USA"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                              className: "before:content-none after:content-none",
                          }}
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
           
                      <Option >Pending</Option>
                      <Option >Accepted</Option>
                      <Option >Rejected</Option>
                  </Select>
       
      </CardBody>
      <CardFooter className="pt-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Button variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Update
        </Button>
      
      </CardFooter>
    </Card>
    </div>
    </DefaultLayout>
  )
}

export default ViewBooking