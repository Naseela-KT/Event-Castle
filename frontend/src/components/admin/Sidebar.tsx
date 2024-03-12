import React from "react";
import {
  Button,
  Card,
  List,
  ListItem,
  ListItemPrefix
} from "@material-tailwind/react";
import {
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstanceAdmin } from "../../api/axiosinstance";
import { logout } from "../../redux/slices/AdminSlice";
import { useDispatch } from "react-redux";
 
const Sidebar=() =>{
  const [open, setOpen] = React.useState(0);

  const navigate = useNavigate();
  const dispatch= useDispatch();
 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOpen = (value: React.SetStateAction<number>) => {
    setOpen(open === value ? 0 : value);
  };


  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axiosInstanceAdmin.get("/logout")
      .then(() => {
        dispatch(logout()); // Assuming you want to clear admin info on logout
        navigate("/admin/login");
      })
      .catch((error) => {
        console.log('here', error);
      });
  };
  
 
  return (
    <div style={{ position: 'fixed', top: 50, left: 0, height: '100%', zIndex: 100 }}>
    <Card className="h-[calc(100vh-2rem)] fixed-sidebar w-full max-w-[16rem] shadow-xl shadow-blue-gray-900/5"  style={{ borderRadius: 0,border:0,backgroundColor:'#565656' }} placeholder={undefined}>
      <List  placeholder={undefined}>
      <Link to="/admin/dashboard">
        <ListItem  placeholder={undefined} style={{ color: 'white' }}>
          <ListItemPrefix  placeholder={undefined}>
          <i className="fa-solid fa-table-columns" color="white"></i>
          </ListItemPrefix>
          Dashboard
        </ListItem>
        </Link>
        <Link to="/admin/users">
        <ListItem  placeholder={undefined} style={{ color: 'white' }}>
          <ListItemPrefix  placeholder={undefined}>
          <i className="fa-solid fa-users"></i>
          </ListItemPrefix>
          
          Users
        </ListItem>
        </Link>
        <Link to="/admin/vendors">
        <ListItem  placeholder={undefined} style={{ color: 'white' }}>
          <ListItemPrefix  placeholder={undefined}>
          <i className="fa-solid fa-user-tie"></i>
          </ListItemPrefix>
          
            Vendors
          
          
        </ListItem>
        </Link>
        <Link to="/admin/wallet">
        <ListItem  placeholder={undefined} style={{ color: 'white' }}>
          <ListItemPrefix  placeholder={undefined}>
          <i className="fa-solid fa-wallet"></i>
          </ListItemPrefix>
        
            Wallet
         
        </ListItem>
        </Link>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem  placeholder={undefined} style={{ color: 'white' }}>
          <ListItemPrefix  placeholder={undefined}>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Button variant="outlined" color="white" size="sm" className="" placeholder={undefined} onClick={handleLogout} style={{border:"none"}}>
          <span>Logout</span>
        </Button>
          
        </ListItem>
      </List>
    </Card>
    </div>
  );
}


export default Sidebar