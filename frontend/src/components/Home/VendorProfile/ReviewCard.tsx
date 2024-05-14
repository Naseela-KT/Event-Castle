import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Rating,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { UserData } from "../../../types/userTypes";
import UserRootState from "../../../redux/rootstate/UserState";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../config/api/axiosinstance";
import { toast } from "react-toastify";

interface Review {
  _id: string;
  userId: UserData;
  rating: number;
  content: string;
  reply: Array<string>;
  key: number;
}

const ReviewCard: React.FC<Review> = ({
  _id,
  userId,
  rating,
  content,
  reply,

}) => {
  const user = useSelector((state: UserRootState) => state.user.userdata);
  

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const [review, setReview] = useState(content);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (review.trim() === "") {
      setError("Review cannot be empty!");
      return;
    }
    try {
      await axiosInstance
        .patch("/update-review", { reviewId: _id, review: review })
        .then((res) => {
          if (res.data.updateReview) {
            handleOpen();
            toast.success("Review updated successfully!");
          }
        });
    } catch (error) {
      handleOpen();
      console.log(error);
    }
  };

  return (
    <>
      <Card
        color="white"
        className="w-full p-5"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-1"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Avatar
            size="xs"
            variant="circular"
            alt={userId?.name}
            className="cursor-pointer bg-white mt-2"
            src={userId?.imageUrl ? userId.imageUrl : "/imgs/user-default.svg"}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography
                variant="h6"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {userId.name}
              </Typography>
              <Rating
                value={rating}
                readonly
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody
          className="mb-4 p-0 ml-10"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {content}
            {user?._id === userId._id ? (
              <span className="text-xs ml-2 cursor-pointer text-blue-400">
                <i className="fa-solid fa-pen" onClick={handleOpen}></i>
              </span>
            ) : (
              ""
            )}
          </Typography>
          {reply.length > 0 ? (
            <div className="flex flex-col md:flex-row gap-8 mt-5 -ml-5">
              <Menu>
                <MenuHandler>
              
                  <Button
                    className="hover:none flex flex-row"
                    variant="text"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    View replies
                    <FaAngleDown className="ml-2 mt-[0.5]"/>
                  </Button>
                  
                
                  
                </MenuHandler>
                <MenuList
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {reply.map((replyval, replyIndex) => (
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
          ) : (
            ""
          )}
        </CardBody>
      </Card>
      <Dialog
        open={open}
        size="xs"
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
          Update Review
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Input
            label="Review"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            value={review}
            name="review"
            onChange={(e) => {
              const val = e.target.value;
              setReview(val);
              if (val.trim() === "") {
                setError("Review cannot be empty!");
              } else {
                setError("");
              }
            }}
            disabled={false}
            readOnly={false}
          />
          <p className="text-xs text-red-400">{error}</p>
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
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
            onClick={handleUpdate}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ReviewCard;
