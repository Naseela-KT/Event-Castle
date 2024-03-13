

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";

const TABLE_HEAD = ["User", "Phone", "Status", "Action"];

import { useState, useEffect} from "react";
import { axiosInstanceAdmin } from "../../../api/axiosinstance";
import { useLocation, useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
}

const UsersTable=()=> {

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const totalPages=Math.ceil(users.length/6);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageParam = queryParams.get("page");
    const searchParam = queryParams.get("search");
    setPage(pageParam ? parseInt(pageParam, 10) : 1);
    setSearch(searchParam? searchParam: "");
    fetchData(pageParam, searchParam);
  }, [location.search]);

  const fetchData = (pageParam?: string | null, searchParam?: string | null) => {
    axiosInstanceAdmin
      .get(`/users?page=${pageParam || page}&search=${searchParam || search}`)
      .then((response) => {
        console.log(response)
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleBlock = (userId: string) => {
    axiosInstanceAdmin
      .patch(`/block-unblock?userId=${userId}`)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        navigate("/admin/users");
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleSearch = () => {
    navigate(`/admin/users?page=${page}&search=${search}`)
  };

    return (
    <Card className="h-full w-full"  placeholder={undefined}>
      <CardHeader floated={false} shadow={false} className="rounded-none"  placeholder={undefined}>
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray"  placeholder={undefined}>
              Users list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal"  placeholder={undefined}>
              See information about all members
            </Typography>
          </div>
          <div className="w-full md:w-72">
            <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                name="search"
                value={search}
                color="black"
                onChange={(e) =>setSearch(e.target.value)}
                onKeyUp={handleSearch}
               crossOrigin={undefined}/>
      </div>
        </div>
      
      </CardHeader>
      <CardBody className="overflow-scroll px-0"  placeholder={undefined}>
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"  placeholder={undefined}                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {users && users.length > 0 ? (
  users.map((user, index) => {
    const classes = "p-4";

    return (
      <tr key={index}>
        <td className={classes}>
          <div className="flex items-center gap-3">
            <Avatar src={"https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"} size="sm" placeholder={undefined} />
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                {user.name}
              </Typography>
              <Typography variant="small" color="blue-gray" className="font-normal opacity-70" placeholder={undefined}>
                {user.email}
              </Typography>
            </div>
          </div>
        </td>
        <td className={classes}>
          <div className="flex flex-col">
            <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
              {user.phone}
            </Typography>
          </div>
        </td>
        <td className={classes}>
          <div className="w-max">
            <Chip
              variant="ghost"
              size="sm"
              value={user.isActive ? "active" : "Blocked"}
              color={user.isActive ? "green" : "red"}
            />
          </div>
        </td>
        <td className={classes}>
          {user.isActive ? (
            <Button variant="gradient" onClick={() => handleBlock(user._id)} size="sm" className="hidden lg:inline-block" placeholder={undefined}>
              <span>Block</span>
            </Button>
          ) : (
            <Button variant="gradient" onClick={() => handleBlock(user._id)} size="sm" className="hidden lg:inline-block" placeholder={undefined}>
              <span>Unblock</span>
            </Button>
          )}
        </td>
      </tr>
    );
  })
) : (
  <tr>
    <td colSpan={TABLE_HEAD.length} className="p-4">
      No users found.
    </td>
  </tr>
)}

          </tbody>
        </table>
      </CardBody>
    
       <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" placeholder={undefined}>
        <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
          Page {page} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={() => {
              const nextPage = page - 1 > 0 ? page - 1 : 1;
              navigate(`/admin/users?page=${nextPage}&search=${search}`);
            }}
            placeholder={undefined}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => {
              const nextPage = page + 1 <= totalPages ? page + 1 : totalPages;
              navigate(`/admin/users?page=${nextPage}&search=${search}`);
            }}
            placeholder={undefined}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
  

  export default UsersTable