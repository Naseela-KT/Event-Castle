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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleOpen = (id:string) => {
    setSelectedId(id); // Set the selected id when opening the dialog
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false); // Close the dialog
  const [favourites, setFavourites] = useState([]);
  const user = useSelector((state: UserRootState) => state.user.userdata);

  useEffect(() => {
    fetchFav(currentPage);
  }, [currentPage]);

  const fetchFav = async (page: number) => {
    try {
      const response = await axiosInstance
      .get(`/get-favorite-vendor?userid=${user?._id}&page=${page}`, {
        withCredentials: true,
      })
      setFavourites(response.data.data);
      const totalPagesFromResponse = response.data.totalPages;
      setTotalPages(totalPagesFromResponse);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


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
          setFavourites(favourites.filter(fav => fav._id!== id));
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
      {favourites.length > 0 && (
        <div className="flex justify-end items-end gap-4 m-10">
          {currentPage > 1 && (
            <button
              disabled
              className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                ></path>
              </svg>
              Previous
            </button>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <div className="flex items-center gap-2">
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg ${page === currentPage ? 'bg-gray-900' : 'bg-gray-400'} text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  {page}
                </span>
              </button>
            </div>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                ></path>
              </svg>
            </button>
          )}
        </div>
      )}
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

