import { Select, Option } from "@material-tailwind/react";

const VendorSort = ({setSort}) => {

  return (
    <Select
     
      placeholder="Sort by "
      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
      labelProps={{
        className: "before:content-none after:content-none",
      }}
      onChange={(e)=>{e=="rating"?setSort(-1):setSort(1)}}
      menuProps={{ className: "h-20" }}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <Option value="rating">High rating</Option>
      <Option value="-rating">Low rating</Option>
    </Select>
  );
};

export default VendorSort;
