import { Button, Typography } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import { USER } from "../../../config/constants/constants";

const MessageSkeleton = () => {
	const path = useLocation();
  return (
    <>
<div className={`${
  path.pathname === USER.CHAT
    ? "flex items-center justify-center pt-30 gap-4 md:flex-col flex-row"
    : "flex items-center justify-center -ml-40 pt-20 gap-4 md:flex-col flex-row"
}`}>
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
		</Link></>:<><Typography
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
         No conversations yet!
        </Typography>
</>}
        
      </div>
    </>
  );
};
export default MessageSkeleton;
