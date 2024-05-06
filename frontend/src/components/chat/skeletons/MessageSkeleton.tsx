import { Button, Typography } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import { USER } from "../../../config/constants/constants";

const MessageSkeleton = () => {
	const path = useLocation();
  return (
    <>
      <div className="flex items-center justify-center pt-25 gap-4 md:flex-col flex-row">
        <img src="/imgs/chat-default.svg" alt="" className="w-100 h-200" />
		{path.pathname==`${USER.CHAT}`?<><Typography
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Find Vendors to start the chat...
        </Typography>
		<Link to={USER.VENDORS}>
        <Button
          color="pink"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Find Vendors
        </Button>
		</Link></>:""}
        
      </div>
    </>
  );
};
export default MessageSkeleton;
