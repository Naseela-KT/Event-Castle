import React, { useEffect, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import VendorRootState from "../../../redux/rootstate/VendorState";
import { axiosInstanceVendor } from "../../../api/axiosinstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultLayout from "../../../layout/DefaultLayout";
import Breadcrumb from "../../../components/vendor/Breadcrumbs/Breadcrumb";


const initialFormState = {
  name: "",
  city: "",
  phone: 0,
  coverpic: null,
  coverpicPreview: null, // Store coverpic preview separately
  about: "",
  logo: null,
  logoPreview: null,
  logoUrl:null,
  coverpicUrl:null // 
};

const EditProfile: React.FC = () => {
  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata
  );

  const navigate = useNavigate();
  // const dispatch=useDispatch()

  const [formState, setFormState] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    axiosInstanceVendor
        .get(`/getvendor?vendorid=${vendor?._id}`)
        .then((response) => {
            console.log(response);
            const { coverpic, logo, ...restData } = response.data.data;
            const updatedFormState = {
                ...restData,
                coverpicPreview: coverpic ? `URL to fetch coverpic preview from S3` : null,
                logoPreview: logo ? `URL to fetch logo preview from S3` : null,
            };
            setFormState(updatedFormState);
        })
        .catch((error) => {
            toast.error(error.response.data.message);
            console.log("here", error);
        });
}, []);


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Validate form fields
    const errors: { [key: string]: string } = {};
    if (!formState.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formState.city.trim()) {
      errors.city = "City is required";
    }
    if (!/^\d{10}$/.test(formState.phone.toString())) {
      errors.phone = "Invalid phone number";
    }
  
    if (Object.keys(errors).length === 0) {
      // No errors, submit the form
      console.log("Form submitted", formState);
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("city", formState.city);
      formData.append("phone", formState.phone.toString());
      // Append coverpic if it exists
      if (formState.coverpic) {
        formData.append("coverpic", formState.coverpic);
      }
      // Append logo if it exists
      if (formState.logo) {
        formData.append("logo", formState.logo);
      }
  
      axiosInstanceVendor
        .put(`/update-profile?vendorid=${vendor?._id}`, formData,{ headers: { "Content-Type": "multipart/form-data" }})
        .then((response) => {
          console.log(response);
          setFormState(initialFormState); // Reset form state after successful submission
          toast.success("Profile updated successfully!");
          navigate("/vendor/view-profile");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log("here", error);
        });
    } else {
      // Update formErrors state with validation errors
      setFormErrors(errors);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLInputElement;
    const { name, files, value } = target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormState((prevState) => ({
          ...prevState,
          [name]: file, // Set the file directly
          [`${name}Preview`]: reader.result as string, // Set the preview URL
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  return (
    <DefaultLayout>
    <Breadcrumb pageName="Edit-Profile" folderName="Profile"/>
    <div className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl lg:max-w-4xl bg-gray-100">
    <div className="md:flex">
    <div className="p-8 md:flex md:space-x-4 w-full">
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            {/* Left Side: Cover Picture, Logo, Name */}
            <div className="md:flex md:space-x-4">
            <div className="md:w-1/2">
              <label
                htmlFor="coverpic"
                className="block text-sm font-medium text-gray-700"
              >
                Cover Picture
              </label>
              <input
                id="coverpic"
                name="coverpic"
                type="file"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleInputChange}
              />
              {formState.coverpicUrl? (
                <img
                  src={formState.coverpicUrl}
                  alt="Logo Preview"
                  className="mt-2 w-full h-32 object-cover"
                />
              ):(formState.coverpicPreview&&<img
              src={formState.coverpicPreview}
              alt="Logo Preview"
              className="mt-2 w-full h-32 object-cover"
            />)}
            </div>
            <div className="md:w-1/2 ">
              <label
                htmlFor="logo"
                className="block text-sm font-medium text-gray-700"
              >
                Logo
              </label>
              <input
                id="logo"
                name="logo"
                type="file"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleInputChange}
              />
              {formState.logoUrl? (
                <img
                  src={formState.logoUrl}
                  alt="Logo Preview"
                  className="mt-2 w-full h-32 object-cover"
                />
              ):(formState.logoPreview&&<img
              src={formState.logoPreview}
              alt="Logo Preview"
              className="mt-2 w-full h-32 object-cover"
            />)}
            </div>
            </div>
            <div className="md:flex md:space-x-4">
              <div className="md:w-1/2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  color="light-blue"
                  placeholder="Name"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
                  {formErrors.name && (
                  <p className="text-red-500 text-sm">{formErrors.name}</p>
                )}
              </div>
            
              <div className="md:w-1/2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <Input
                  type="text"
                  name="city"
                  value={formState.city}
                  onChange={handleInputChange}
                  color="light-blue"
                  placeholder="City"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
                  {formErrors.city && (
                  <p className="text-red-500 text-sm">{formErrors.city}</p>
                )}
              </div>
            </div>
            {/* Right Side: City, About, Phone */}
            <div className="md:flex md:space-x-4">
              <div className="md:w-1/2">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  About
                </label>
                <textarea
                  id="about"
                  name="about"
                  value={formState.about}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows={4}
                />
              </div>
              <div className="md:w-1/2">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  color="light-blue"
                  placeholder="Phone"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
                 {formErrors.phone && (
                  <p className="text-red-500 text-sm">{formErrors.phone}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                color="pink"
                className="rounded-lg" // Use Tailwind CSS for rounded corners
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>

    </DefaultLayout>
  );
};

export default EditProfile;

