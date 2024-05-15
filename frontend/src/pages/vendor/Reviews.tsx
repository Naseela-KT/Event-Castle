import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Progress,
  Rating,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import Breadcrumb from "../../components/vendor/Breadcrumbs/Breadcrumb";
import { useSelector } from "react-redux";
import VendorRootState from "../../redux/rootstate/VendorState";
import React, { FormEvent, useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { axiosInstanceVendor } from "../../config/api/axiosinstance";
import { toast } from "react-toastify";
import { FaAngleDown } from "react-icons/fa";
import { Review } from "../../types/commonTypes";
import Layout from "../../layout/vendor/Layout";
import { format } from "timeago.js";
import Pagination from "../../components/common/Pagination";

export const Reviews = () => {
  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata
  );



  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<number[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage]);



  const fetchReviews=async (page: number) => {
    axiosInstanceVendor
    .get(`/getReviews?vendorId=${vendor?._id}&page=${page}`, { withCredentials: true })
    .then((response) => {
      setReviews(response.data.reviews);
      setTotalPages(response.data.totalPages)
      console.log(response.data);
    })
    .catch((error) => {
      console.log("here", error);
    });
  }

  useEffect(() => {
    
    axiosInstanceVendor
      .get(`/reviews/statistics?vendorId=${vendor?._id}`)
      .then((res) => {
        console.log(res.data.percentages);
        setStats(res.data.percentages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOpen = (reviewId: string) => {
    setCurrentReviewId(reviewId); // Set the current review ID
    setOpen(true);
  };


  const handleReplySubmit = async (
    e: FormEvent<HTMLFormElement>,
    reviewId: string
  ) => {
    e.preventDefault();
    console.log(reviewId);
    axiosInstanceVendor
      .put(
        `/add-review-reply?&reviewId=${reviewId}`,
        { content },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        if (response.data.vendorData) {
          setOpen(false);
          toast.success("Reply added Successfully!");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log("here", error);
      });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <Layout>
      <Breadcrumb pageName="Reviews" folderName="" />
      {reviews.length > 0 ? (
        <>
          <div className="flex flex-col md:flex-row  justify-between  gap-2 m-10">
            <div className="flex flex-col items-start w-full">
              <div className="flex items-center mb-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold">
                    Customer reviews & ratings
                  </h2>
                  <div className="flex">
                    <Rating
                      value={Math.ceil(vendor?.totalRating ?? 0)}
                      ratedColor="amber"
                      readonly
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  </div>
                  <div className="flex">
                    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      {Math.ceil(vendor?.totalRating ?? 0)}
                    </p>
                    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      out of
                    </p>
                    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      5
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex items-center mt-4">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  5 star
                </a>
                <div className="w-2/4 h-2 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <Progress
                    value={stats[4]}
                    color="amber"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stats[4]}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  4 star
                </a>
                <div className="w-2/4 h-2 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <Progress
                    value={stats[3]}
                    color="amber"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stats[3]}%
                </span>
              </div>
              <div className="flex items-center mt-2">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  3 star
                </a>
                <div className="w-2/4 h-2 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <Progress
                    value={stats[2]}
                    color="amber"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stats[2]}%
                </span>
              </div>
              <div className="flex items-center mt-2">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  2 star
                </a>
                <div className="w-2/4 h-2 mx-4 bg-gray-200 rounded ">
                  <Progress
                    value={stats[1]}
                    color="amber"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stats[1]}%
                </span>
              </div>
              <div className="flex items-center mt-2">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  1 star
                </a>
                <div className="w-2/4 h-2 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <Progress
                    value={stats[0]}
                    color="amber"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stats[0]}%
                </span>
              </div>
            </div>
          </div>

          {reviews?.map((val, index) => (
            <React.Fragment key={index}>
              <hr className="border-bodydark2 mx-10 my-6" />
              <div className="flex flex-col md:flex-row lg:gap-8 gap-3 m-10">
                <div className="md:w-1/2">
                  <div className="mb-4 gap-3 flex">
                  <h2 className="text-sm font-bold">{val.userId.name}</h2>
                    <Rating
                      style={{ fontSize:"2px"}}
                      value={val.rating}
                      className="text-sm"
                      ratedColor="amber"
                      readonly
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                    
                  </div>
                  <div>
                  <p className="text-sm text-gray-500 -mt-3">  {format(val?.createdAt)}</p>
                  <p className="text-md text-gray-700">{val.content}</p>
                  </div>
                  
                </div>

                <div className="md:w-1/2">
                  <div className="mb-4 gap-2">
                  <Menu>
                  <MenuHandler>
                    <Button
                      className="hover:none bg-gray-100 flex flex-row"
                      variant="text"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      View replies
                      <FaAngleDown className="ml-2 mt-[0.5]" />
                    </Button>
                  </MenuHandler>
                  <MenuList
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {val?.reply?.map((replyval, replyIndex) => (
                      <MenuItem
                        key={replyIndex}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {replyval}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
                   
                  </div>
                </div>
                <div>
                  <Button
                    onClick={() => handleOpen(val._id)}
                    size="sm"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Give reply
                  </Button>
                </div>
              </div>
          
            </React.Fragment>
          ))}
           {reviews.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          isTable={false}
        />
      )}
        </>
      ) : (
        <Typography
          variant="h5"
          color="red"
          className="text-center mt-4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          No reviews added yet!
        </Typography>
      )}

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add Reply
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the default form submission
              handleReplySubmit(e, currentReviewId); // Pass the event and currentReviewId to handleReplySubmit
            }}
          >
            <Textarea
              label="Message"
              color="blue-gray"
              name="content"
              onChange={(e) => setContent(e.target.value)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <div className="text-right">
              <Button
                variant="text"
                color="red"
                onClick={() => setOpen(false)}
                className="mr-1"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                color="green"
                type="submit"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <span>Submit</span>
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </Layout>
  );
};
