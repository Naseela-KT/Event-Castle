import React from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix
} from "@material-tailwind/react";
import {

  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
 
const Sidebar=() =>{
  const [open, setOpen] = React.useState(0);
 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOpen = (value: React.SetStateAction<number>) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-[calc(100vh-2rem)] fixed-sidebar w-full max-w-[16rem] shadow-xl shadow-blue-gray-900/5"  style={{ borderRadius: 0,border:0,backgroundColor:'#565656' }} placeholder={undefined}>
      <List  placeholder={undefined}>
      <Link to="/admin">
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
          Logout
        </ListItem>
      </List>
    </Card>
  );
}


export default Sidebar