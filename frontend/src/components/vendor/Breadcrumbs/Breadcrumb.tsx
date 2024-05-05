import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { VENDOR } from "../../../config/constants/constants";

interface BreadcrumbProps {
  pageName: string;
  folderName: string;
}
const Breadcrumb = ({ pageName, folderName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Typography
        variant="h5"
        className="font-bold mb-5 ml-2"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {pageName}
      </Typography>

      <Breadcrumbs
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <a href={VENDOR.DASHBOARD} className="opacity-60">
          Dashboard
        </a>
        {folderName && (
          <a href="#" className="opacity-60">
            {folderName}
          </a>
        )}
        <a href="#">{pageName}</a>
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
