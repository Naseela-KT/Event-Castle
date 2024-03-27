import { Breadcrumbs } from "@material-tailwind/react";

interface BreadcrumbProps {
  pageName: string;
  folderName:string;
}
const Breadcrumb = ({ pageName ,folderName}: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

    <Breadcrumbs placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <a href="/vendor/dashboard" className="opacity-60">
        Dashboard
      </a>
      {folderName&& <a href="#" className="opacity-60">
        {folderName}
      </a>}
      <a href="#">{pageName}</a>
    </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
