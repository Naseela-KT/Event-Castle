import React, { useEffect, useState } from 'react';
import { Typography} from '@material-tailwind/react';
import { axiosInstance } from '../../config/api/axiosinstance';
import { VendorType } from '../../types/commonTypes';
import { Link } from 'react-router-dom';
import { USER } from '../../config/constants/constants';

const year = new Date().getFullYear();




interface Menu {
 name: string;
 items: string[];
}

interface FooterProps {
 menus?: Menu[];
 copyright?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({

 menus = [
  {
    name: "Start Planning",
    items: [
      "Search by Vendor",
      "Search by City"
    ],
  },
],
 copyright = (
    <>
      Copyright © {year} Event Castle by{" "}
      <a
        href="https://www.creative-tim.com?ref=mtk"
        target="_blank"
        className="text-blue-gray-500 transition-colors hover:text-blue-500"
      >
        Naseela
      </a>
      .
    </>
 ),
}) => {
  const [vendorTypes, setvendorTypes] = useState<VendorType[]>([]);
  useEffect(() => {
    axiosInstance
      .get("/vendor-types")
      .then((response) => {
        console.log(response);
        setvendorTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
 return (
    <footer className="relative px-4 pt-8 pb-6 ml-10 mr-10">
      <div className="container mx-auto">
        <div className="flex flex-wrap pt-6 text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <Typography variant="h4" className="mb-4" color="blue-gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Event Castle
            </Typography>
            <Link to={USER.HOME}>
            <Typography className="font-normal text-blue-gray-500 lg:w-2/5"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Home
            </Typography>
            </Link>
            <Link to={USER.VENDORS}>
            <Typography className="font-normal text-blue-gray-500 lg:w-2/5"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Vendors
            </Typography>
            </Link>
            <Link to={USER.ABOUT}>
            <Typography className="font-normal text-blue-gray-500 lg:w-2/5"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              About
            </Typography>
            </Link>
            
          </div>
          <div className="mx-auto mt-12 grid w-max grid-cols-2 gap-24 lg:mt-0">
            {menus.map(({ name, items }) => (
              <div key={name}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 block font-bold uppercase"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                 {name}
                </Typography>
                <ul className="mt-3">
                 {items.map((item,index) => (
                    <li key={index}>
                      <Link to={USER.VENDORS}>
                      <Typography
                       as="a"
                       target="_blank"
                       rel="noreferrer"
                       variant="small"
                       className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                      >
                        {item}
                      </Typography>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 block font-bold uppercase "  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                 Services
                </Typography>
                <ul className="mt-3">
                 {vendorTypes.map((item,index) => (
                    <li key={index}>
                      <Typography
                       as="a"
                       target="_blank"
                       rel="noreferrer"
                       variant="small"
                       className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                      >
                        {item.type}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography
             variant="small"
             className="font-normal text-blue-gray-500"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
 );
};

export default Footer;
