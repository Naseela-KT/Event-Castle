import React, { useEffect, useState } from "react";
import { Rating } from "@material-tailwind/react";
import { axiosInstance } from "../../../config/api/axiosinstance";
import { toast } from "react-toastify";
import UserRootState from "../../../redux/rootstate/UserState";
import { useSelector } from "react-redux";
import { toast as hottoast } from "react-hot-toast";

interface VendorReviewProps {
  id: string | undefined;
  setReviewAdded: (value: boolean) => void;
  reviewAdded:boolean;
}
const AddReview: React.FC<VendorReviewProps> = ({ id, setReviewAdded,reviewAdded }) => {
  const user = useSelector((state: UserRootState) => state.user.userdata);

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");


  useEffect(()=>{
    if(reviewAdded){
      setRating(0)
    }
  },[reviewAdded])

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      hottoast.error("User must be logged in to add a review.", {
        style: {
          background: "red", // Red background
          color: "#FFFFFF", // White text
        },
        duration: 3000,
      });
      return;
    }

    if (rating === 0) {
      hottoast.error("Please select a rating.");
      return;
    }

    if (!review.trim()) {
      hottoast.error("Please enter a review.");
      return;
    }

    axiosInstance
      .post(
        `/addVendorReview`,
        { vendorId: id, userId: user?._id, rating: rating, content: review },
        { withCredentials: true }
      )
      .then((response) => {
        
        console.log(response);
        toast.success(response.data.message);
        setReviewAdded(true);
        setRating(0);
        setReview("");
        console.log(rating,review)
       
      })
      .catch((error) => {
        hottoast.error(error.response.data.message);
        console.log("here", error);
      });
  };

  return (
    <div className="max-w-2xl mx-5 lg:mx-auto mt-8 p-8 bg-gray rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <Rating
            value={rating}
            onChange={(e) => handleRatingChange(e)}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700"
          >
            Review
          </label>
          <textarea
            id="review"
            name="review"
            rows={4}
            value={review}
            onChange={handleReviewChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
