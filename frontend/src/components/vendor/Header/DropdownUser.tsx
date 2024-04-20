/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import VendorRootState from '../../../redux/rootstate/VendorState';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const vendorData = useSelector(
    (state: VendorRootState) => state.vendor.vendordata,
  );

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >

        <span className="h-12 w-12 rounded-full">
          <img src={vendorData?.logoUrl} alt="User" />
        </span>

      </Link>
      
      
    </div>
  );
};

export default DropdownUser;
