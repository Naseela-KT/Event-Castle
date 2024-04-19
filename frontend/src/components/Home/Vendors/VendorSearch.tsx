import { Button, Input } from '@material-tailwind/react'

const VendorSearch = ({onChange}) => {
  return (
    <>
     <Input
              type="search"
              color="black"
              label="Type here..."
              className="pr-20"
              containerProps={{
                className: 'min-w-[288px]',
              }}
              onChange={(e) =>setSearch(e.target.value)}  
              onKeyUp={onChange}  
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Button
              size="sm"
              color="white"
              className="!absolute right-1 top-1 rounded"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Search
            </Button>
    </>
  )
}

export default VendorSearch