import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { axiosInstance } from "../../../config/api/axiosinstance";
import { DialogWithImage } from "./DialogWithImage";

import { Post } from "../../../types/vendorTypes";
import { Button, Typography } from "@material-tailwind/react";

// Define the interface for your response data

const VendorPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Partial<Post>>();
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    axiosInstance
      .get(`/posts?vendorid=${id}`, { withCredentials: true })
      .then((response) => {
        setPosts(response.data.posts);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("here", error);
      });
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {posts.length == 0 && (
        <Typography
          variant="h5"
          color="pink"
          className=" mt-4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          No post added!
        </Typography>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {posts.map(({ imageUrl, _id, caption }, index) => (
          <div
            key={index}
            className="relative"
            onClick={() => {
              setSelectedPost({ imageUrl, _id });
              handleOpen();
            }}
          >
            <img
              className="h-50 w-100 max-w-full rounded-lg object-cover object-center"
              src={imageUrl}
              alt="gallery-photo"
            />
            <Typography
              variant="h6"
              color="black"
              className="text-center mt-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {caption}
            </Typography>

            {selectedPost && (
              <DialogWithImage
                caption={selectedPost.caption!}
                imageUrl={selectedPost.imageUrl!}
                open={open}
                handler={handleOpen}
              />
            )}
          </div>
        ))}
      </div>
      {posts.length > 0 && (
        <div className="flex justify-center items-center mt-10">
          <Button
            variant="outlined"
            placeholder={undefined}
            color="pink"
            size="lg"
            className="mr-3 mt-5 text-center"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            View More Images
          </Button>
        </div>
      )}
    </>
  );
};

export default VendorPosts;
