import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

interface PageTitleProps {
  section: string;
  heading: string;
  children: ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ section, heading, children }) => {
  return (
    <div className="mx-auto w-full px-4 text-center lg:w-6/12">
      <Typography variant="lead" className="font-semibold"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{section}</Typography>
      <Typography variant="h2" color="blue-gray" className="my-3"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        {heading}
      </Typography>
      <Typography variant="lead" className="text-blue-gray-500"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        {children}
      </Typography>
    </div>
  );
};

PageTitle.propTypes = {
  section: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

PageTitle.displayName = "/src/widgets/layout/page-title.jsx";

export default PageTitle;
