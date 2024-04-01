import { Button, Progress, Rating, Textarea } from '@material-tailwind/react';
import Breadcrumb from '../../components/vendor/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useSelector } from 'react-redux';
import VendorRootState from '../../redux/rootstate/VendorState';
import React, { FormEvent, useState } from 'react';
import { Dialog, DialogHeader, DialogBody } from '@material-tailwind/react';
import { axiosInstanceVendor } from '../../api/axiosinstance';
import { toast } from 'react-toastify';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

export const Reviews = () => {
  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata,
  );

  const [openAccordions, setOpenAccordions] = useState<number[]>([]);

  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState('');

  const handleOpen = (reviewId: string) => {
    setCurrentReviewId(reviewId); // Set the current review ID
    setOpen(true);
  };
  const handleToggleAccordion = (index: number) => {
    const isOpen = openAccordions.includes(index);
    setOpenAccordions((prevState) => {
      if (isOpen) {
        return prevState.filter((item) => item !== index); // Close the accordion
      } else {
        return [...prevState, index]; // Open the accordion
      }
    });
  };

  const handleReplySubmit = async (
    e: FormEvent<HTMLFormElement>,
    reviewId: string,
  ) => {
    e.preventDefault();
    console.log(reviewId);
    axiosInstanceVendor
      .put(
        `/add-review-reply?vendorId=${vendor?._id}&reviewId=${reviewId}`,
        { content },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response);
        if (response.data.vendorData) {
          setOpen(false);
          toast.success('Reply added Successfully!');
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log('here', error);
      });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reviews" folderName="" />
      <div className="flex flex-col md:flex-row  justify-between w-full gap-2 m-10">
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center mb-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Customer reviews & ratings</h2>
              <div className="flex">
                <Rating
                  value={4}
                  ratedColor="amber"
                  readonly
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>
              <div className="flex">
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  4.95
                </p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  out of
                </p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5
                </p>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                1,745 global ratings
              </p>
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
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <Progress
                value={70}
                color="amber"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              70%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              4 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <Progress
                value={17}
                color="amber"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              17%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              3 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <Progress
                value={8}
                color="amber"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              8%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              2 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded ">
              <Progress
                value={4}
                color="amber"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              4%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              1 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <Progress
                value={1}
                color="amber"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              1%
            </span>
          </div>
        </div>
      </div>

      {vendor?.reviews.map((val, index) => (
        <React.Fragment key={index}>
          <hr className="border-bodydark2 mx-10 my-6" />
          <div className="flex flex-col md:flex-row gap-8 m-10">
            <div className="md:w-1/2">
              <div className="mb-4 gap-1">
                <Rating
                  value={val.rating}
                  className="text-sm"
                  ratedColor="amber"
                  readonly
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                <h2 className="text-lg font-bold">{val.username}</h2>
                <p className="text-sm text-gray-500">March 14, 2021</p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="mb-4 gap-4">
                <p className="text-sm text-gray-600">{val.content}</p>
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
          <div className="flex flex-col md:flex-row gap-8 mx-10 mb-10 -mt-10">
            <Accordion
              open={openAccordions.includes(index)} 
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="w-50"
            >
              <AccordionHeader
                className="text-sm flex items-center w-60" 
                onClick={() => handleToggleAccordion(index)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                View replies
               
                {openAccordions.includes(index) ? (
                  <FaAngleUp />
                ) : (
                  <FaAngleDown />
                )}
              </AccordionHeader>
              <AccordionBody>
                {val.reply.map((reply, replyIndex) => (
                  <p key={replyIndex}>{reply}</p>
                ))}
              </AccordionBody>
            </Accordion>
          </div>
        </React.Fragment>
      ))}

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
    </DefaultLayout>
  );
};
