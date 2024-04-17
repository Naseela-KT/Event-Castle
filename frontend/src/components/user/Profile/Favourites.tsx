import { useSelector } from 'react-redux';
import { axiosInstance } from '../../../api/axiosinstance';
import UserRootState from '../../../redux/rootstate/UserState';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Favourites() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // State to hold the selected id
  const handleOpen = (id:string) => {
    setSelectedId(id); // Set the selected id when opening the dialog
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false); // Close the dialog
  const [favourites, setFavourites] = useState([]);
  const user = useSelector((state: UserRootState) => state.user.userdata);
  useEffect(() => {
    axiosInstance
      .get(`/get-favorite-vendor?userid=${user?._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setFavourites(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log('here', error);
      });
  }, []);

  const handleDelete = async (id) => {
    axiosInstance
      .delete(`/delete-favorite-vendor?vendorId=${id}&userId=${user?._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        handleClose();
        if(response.data.userData){
          toast.success("Vendor Profile Removed from Favourites!")
          setFavourites(favourites.filter(fav => fav._id !== id));
        }
        
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log('here', error);
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 m-20">
        {favourites.map(({ coverpicUrl, name, _id }, index) => (
          <div key={index}>
            <Card
              className="mt-6 w-96"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <CardHeader
                color="blue-gray"
                className="relative h-56"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <img src={coverpicUrl} alt={name} />
                <button
                  onClick={() => handleOpen(_id)} // Pass _id to handleOpen
                  className="absolute top-0 right-0 m-2 bg-danger hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </CardHeader>
              <CardBody
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Link to={`/view-vendor?id=${_id}`}>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-2 text-center"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {name}
                  </Typography>
                </Link>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      <Dialog size="xs" open={open} handler={handleClose} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Confirmation</DialogHeader>
        <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Are you sure you want to delete this item?
        </DialogBody>
        <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Button variant="text" color="red" onClick={handleClose} className="mr-1" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => handleDelete(selectedId)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

