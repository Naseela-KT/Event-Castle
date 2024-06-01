import { Input, Spinner, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { validate } from "../../validations/user/contactVal";
import { axiosInstance } from "../../config/api/axiosinstance";
import { toast } from "react-toastify";

interface UserFormValues {
  email: string;
  name: string;
  mobile: string;
  subject: string;
  message: string;
}

const initialValues: UserFormValues = {
  email: "",
  name: "",
  mobile: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<UserFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const errors = validate({ ...formValues, [name]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
  };
  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors)
    console.log(Object.values(errors))
    if (Object.values(errors).every((error) => error === "")) {
        setIsSubmitting(true);
      axiosInstance
        .post("/send-message", formValues, { withCredentials: true })
        .then((response) => {
          console.log(response);
          if (response.data) {
            toast.success("Email send Successfully!");
            setFormValues(initialValues)
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message)
          console.log("here", error.data.message);
        }) .finally(() => {
            setIsSubmitting(false); 
          });
    }
  };
  return (
    <div className="md:w-1/2 lg:w-2/3 lg:pl-4">
      <form className=" shadow-none rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2 lg:pr-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <Input
              label="Name"
              size="lg"
              onChange={handleChange}
              value={formValues.name}
              name="name"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {formErrors.name ? (
            <p
              className="text-sm"
              style={{ color: "red" }}
            >
              {formErrors.name}
            </p>
          ) : null}
          </div>
          <div className="w-full md:w-1/2 lg:pl-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              label="Email"
              onChange={handleChange}
              value={formValues.email}
              name="email"
              size="lg"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {formErrors.email ? (
            <p
              className="text-sm"
              style={{ color: "red" }}
            >
              {formErrors.email}
            </p>
          ) : null}
          </div>
        </div>
        <div className="mb-4 flex flex-wrap">
          <div className="w-full md:w-1/2 pr-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mobile"
            >
              Mobile
            </label>
            <Input
              label="Mobile"
              size="lg"
              onChange={handleChange}
              value={formValues.mobile}
              name="mobile"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
             {formErrors.mobile ? (
            <p
              className="text-sm"
              style={{ color: "red" }}
            >
              {formErrors.mobile}
            </p>
          ) : null}
          </div>
          <div className="w-full md:w-1/2 lg:pl-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subject"
            >
              Subject
            </label>
            <Input
              label="Subject"
              size="lg"
              onChange={handleChange}
              value={formValues.subject}
              name="subject"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {formErrors.subject ? (
            <p
              className="text-sm"
              style={{ color: "red" }}
            >
              {formErrors.subject}
            </p>
          ) : null}
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <Textarea
            label="Message"
            size="lg"
            onChange={handleChange}
            value={formValues.message}
            name="message"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
           {formErrors.message ? (
            <p
              className="text-sm"
              style={{ color: "red" }}
            >
              {formErrors.message}
            </p>
          ) : null}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
             {isSubmitting ? (
          <div className="flex justify-center">
            <Spinner color="pink" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}  />
          </div>
        ):"Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
