import { Card, CardHeader, CardBody, Input, Button } from "@material-tailwind/react";
import UserRootState from "../../../redux/rootstate/UserState";
import { useSelector } from "react-redux";
import { useState } from "react";

const ProfileCard = () => {
 const user = useSelector((state: UserRootState) => state.user.userdata);
 const [selectedImage, setSelectedImage] = useState<string | null>(null);


 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
     const file = e.target.files[0];
     const reader = new FileReader();
     reader.onloadend = () => {
       setSelectedImage(reader.result as string);
     };
     reader.readAsDataURL(file);
  }
 };

 return (
    <Card
      className="w-96 mx-auto"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        floated={false}
        className="h-50 bg-transparent shadow-none flex items-center justify-center"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
         {selectedImage ? (
          <img src={selectedImage} alt="Selected Profile" className="h-40 w-40 rounded-full" />
        ) : user?.image ? (
          <img src={user.image} alt="User Profile" className="h-40 w-40 rounded-full" />
        ) : (
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex items-center justify-center inline-block text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-40 w-40 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </label>
        )}
        <input id="file-upload" type="file" className="hidden"  onChange={handleImageChange}/>
      </CardHeader>
      <CardBody
        className="text-center flex flex-col gap-4"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {user?.email && (
          <Input
            label="Email"
            disabled
            size="md"
            value={user.email}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
        )}
        {user?.name && (
          <Input
            label="Name"
            size="md"
            value={user.name}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
        )}
        <Input
            label="Phone"
            size="md"
            value=""
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
       <Button
              variant="gradient"
              fullWidth
              placeholder={undefined}
              type="submit"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Update
          </Button>
      </CardBody>
    </Card>
 );
};

export default ProfileCard;
