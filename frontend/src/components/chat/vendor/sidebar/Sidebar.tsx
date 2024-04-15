import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import { useSelector } from 'react-redux';
import VendorRootState from '../../../../redux/rootstate/VendorState';

const Sidebar = () => {
  const vendor = useSelector((state: VendorRootState) => state.vendor.vendordata);

  return (
    <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0 bg-gray-300">
      <div className="h-full relative ml-2">
        <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4">
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12 rounded-full"
              src={vendor?.logoUrl}
              alt=""
            />
          </div>
          <div className="flex-1 min-w-0">
            <Link to="" className="focus:outline-none">
              <span className="absolute inset-0" />
              <p className="text-sm font-bold text-red-600">{vendor?.name}</p>
            </Link>
          </div>
        </div>
        <SearchInput/>
        <Conversations/>
      </div>
    </div>
  );
};

export default Sidebar;
