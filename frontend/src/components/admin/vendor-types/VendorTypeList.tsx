import { Button } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { axiosInstanceAdmin } from '../../../config/api/axiosinstance';
import { useNavigate } from 'react-router-dom';
import EditTypeModal from './EditTypeModal';
import DeleteTypeModal from './DeleteTypeModal';
import { ADMIN } from '../../../config/constants/constants';
import { VendorType } from '../../../types/commonTypes';


const VendorTypeList = () => {
  const [vendorType, setVendorType] = useState<VendorType[]>([]);
  const navigate = useNavigate();
  const [editId, setEditId] = useState<string>(''); // State to store the id of the type being edited
  const [deleteId, setDeleteId] = useState<string>(''); // State to store the id of the type being deleted
  const [openEditModal, setOpenEditModal] = useState(false); // State to track whether the edit modal is open
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    axiosInstanceAdmin
      .get('/vendor-types')
      .then((response) => {
        console.log(response);
        setVendorType(response.data);
        navigate('/admin/vendor-types');
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [openEditModal, openDeleteModal]);

  const handleDelete = async (vendorTypeId: string) => {
    axiosInstanceAdmin
      .delete(`/delete-vendortype?id=${vendorTypeId}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setVendorType((prevVendorTypes) =>
          prevVendorTypes.filter((type) => type._id !== vendorTypeId),
        );
        navigate(`${ADMIN.VENDOR_TYPES}`);
      })
      .catch((error) => {
        console.log('here', error);
      });
  };

  const handleEdit = (vendorTypeId: string) => {
    setEditId(vendorTypeId); // Set the id of the type being edited
    setOpenEditModal(true); // Open the edit modal
  };

  const handleDeleteModal = (vendorTypeId: string) => {
    setDeleteId(vendorTypeId); // Set the id of the type being deleted
    setOpenDeleteModal(true); // Open the delete modal
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false); // Close the edit modal
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false); // Close the delete modal
  };

  return (
    <>
      <div className="relative flex flex-col w-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
          <div className="flex flex-col px-10 justify-between gap-8 mb-4 md:flex-row md:items-center">
            <div>
              <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Available Vendor Types
              </h5>
            </div>
            
          </div>
        </div>
        <div className="p-6 px-10 overflow-scroll">
          <table className="w-full text-left table-auto min-w-max pl-20">
            <thead>
              <tr>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Type
                  </p>
                </th>

                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Status
                  </p>
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Action
                  </p>
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              {vendorType.map((type, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex gap-3">
                      <p className="block text-center font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                        {type.type}
                      </p>
                    </div>
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      {type.status ? (
                        <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                          <span className="">ACTIVE</span>
                        </div>
                      ) : (
                        <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-red-900 uppercase rounded-md select-none whitespace-nowrap bg-red-500/20">
                          <span className="">Non-ACTIVE</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <Button
                        size="sm"
                        onClick={() => handleEdit(type._id)}
                        className="mr-2"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        placeholder={undefined}
                        variant="outlined"
                        onClick={() => handleDeleteModal(type._id)}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EditTypeModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        vendorTypeId={editId}
      />

      {/* Delete Modal */}
      <DeleteTypeModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        vendorTypeId={deleteId}
        onDelete={handleDelete} // Pass the delete function to the delete modal
      />
    </>
  );
};

export default VendorTypeList;
