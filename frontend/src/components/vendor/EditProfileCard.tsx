import React, { useEffect, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import VendorRootState from "../../redux/rootstate/VendorState";

const initialFormState = {
  name: "",
  vendor_type: "",
  email: "",
  _id: "",
  city: "",
  mobile: 0,
  coverpic: "",
  about: "",
  logo: "",
};

const EditProfileCard: React.FC = () => {
  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata
  );

  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (vendor && Object.keys(vendor).length > 0) {
      setFormState({ ...initialFormState, ...vendor });
    }
  }, [vendor]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted", formState);
    // Implement your form submission logic here
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLInputElement;
    const { name, value, files } = target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState((prevState) => ({ ...prevState, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl bg-gray-100">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Edit Profile
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                {formState.coverpic && (
                  <img
                    src={formState.coverpic}
                    alt="Selected cover picture"
                    className="mt-2 w-full h-32 object-cover"
                  />
                )}
              </div>
              <div className="md:w-1/2">
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
                {formState.logo && (
                  <img
                    src={formState.logo}
                    alt="Selected logo"
                    className="mt-2 w-full h-32 object-cover"
                  />
                )}
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
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formState.mobile}
                  onChange={handleInputChange}
                  color="light-blue"
                  placeholder="Phone"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
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
  );
};

export default EditProfileCard;
