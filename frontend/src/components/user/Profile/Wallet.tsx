import { useSelector } from 'react-redux';
import UserRootState from '../../../redux/rootstate/UserState';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../api/axiosinstance';
import Pagination from '../../common/Pagination';

const Wallet = () => {
  const user = useSelector((state: UserRootState) => state.user.userdata);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    setTran(currentPage);
  }, [currentPage]);

  const setTran = async (page: number) => {
    try {
      axiosInstance
        .get(`/all-transaction-details?userId=${user?._id}&page=${page}`, {
          withCredentials: true,
        })
        .then((response) => {
          setTransaction(response.data.transaction);
          const totalPagesFromResponse = response.data.totalPages;
          setTotalPages(totalPagesFromResponse);
          console.log(response.data.payment);
        })
        .catch((error) => {
          console.log('here', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {user?.name}'s Wallet
          </h2>
          <div className="flex justify-center items-center">
            <p className="text-gray-600">Balance:</p>
            <p className="text-xl font-bold">₹2000</p>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="rounded-sm border border-stroke mx-20 mt-5 bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-400 text-left dark:bg-meta-4">
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Vendor
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Event
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Date
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((item, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item?.vendorId}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item?.eventName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item?.date}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item?.refundAmount}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transaction.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              isTable={true}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Wallet;
