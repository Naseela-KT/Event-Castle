import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../../../components/vendor/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import { useSelector } from 'react-redux';
import VendorRootState from '../../../redux/rootstate/VendorState';
import { useEffect, useState } from 'react';
import { axiosInstanceVendor } from '../../../api/axiosinstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface Post {
  imageUrl: string;
  _id: string;
  caption: string;
}

export default function Posts() {
  const vendorData = useSelector(
    (state: VendorRootState) => state.vendor.vendordata,
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstanceVendor
      .get(`/posts?vendorid=${vendorData?._id}`, { withCredentials: true })
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log('here', error);
      });
  }, [fetchTrigger]);

  const handleDelete = (postId: string) => {
    axiosInstanceVendor
      .delete(`/posts/${postId}`)
      .then((response) => {
        toast.success(response.data.message);
        setFetchTrigger(!fetchTrigger);
        navigate('/Vendor/view-posts');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log('here', error);
      });
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Posts" folderName=""/>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 m-2">
          {posts.map(({ imageUrl, caption, _id }, index) => (
            <div key={index} className="card shadow-lg rounded-lg relative">
              <div className="card-body">
                <img
                  className="h-40 w-full max-w-full rounded-lg object-cover object-center"
                  src={imageUrl}
                  alt="gallery-photo"
                />
                <button
                  onClick={() => handleDelete(_id)}
                  className="absolute top-0 right-0 m-2 bg-danger hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <p className="mt-4 text-center p-2">{caption}</p>
              </div>
            </div>
          ))}
        </div>
      </DefaultLayout>
    </>
  );
}
