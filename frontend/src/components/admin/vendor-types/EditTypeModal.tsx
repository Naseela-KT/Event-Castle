import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
 
  Select,
  Option,
} from "@material-tailwind/react";
import { axiosInstanceAdmin } from "../../../api/axiosinstance";
import { useNavigate } from "react-router-dom";
import { validate } from "../../../validations/admin/vendorTypeValidation";

interface Props {
  open: boolean;
  onClose: () => void;
  vendorTypeId: string;
}

interface VendorType {
  _id: string;
  type: string;
  status: boolean;
}

interface FormValues {
  type: string;
  status: string;
}

const initialValues: FormValues = {
  type: "",
  status: "",
};

const EditTypeModal: React.FC<Props> = ({ open, onClose, vendorTypeId }) => {
  const handleOpen = () => !open;
  const [singleType, setSingleType] = useState<VendorType>();

  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<FormValues>({
    type: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
  ) => {
    if (typeof e === "string") {
      setFormValues({ ...formValues, status: e });
    } else {
      const { name, value } = e.target as HTMLInputElement & HTMLSelectElement;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
      const errors = validate({ ...formValues, [name]: value });
      setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
    }
  };

  useEffect(() => {
    if (open) {
      axiosInstanceAdmin
        .get(`/single-type?id=${vendorTypeId}`)
        .then((response) => {
          setSingleType(response.data);
          setFormValues({
            type: response.data.type,
            status: response.data.status ? "Active" : "Non-Active",
          });
        })
        .catch((error) => {
          console.error("Error fetching single type:", error);
        });
    }
  }, [open, vendorTypeId]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.values(errors).every((error) => error === "")) {

      axiosInstanceAdmin
        .put(`/update-type?id=${vendorTypeId}`, formValues)
        .then((response) => {
          console.log(response);
          setFormValues(initialValues);
          onClose();
        })
        .catch((error) => {
          console.log("Error updating vendor type:", error);
        });
    }
  };

  useEffect(() => {
    if (open) {
      navigate("/admin/vendor-types", { replace: true });
    }
  }, [open, navigate]);

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
        placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <Card className="mx-auto w-full max-w-[24rem]" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <CardBody className="flex flex-col gap-4" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <form onSubmit={handleSubmit}>
              <Typography
                variant="h4"
                color="blue-gray"
                placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Editing {singleType?.type}
              </Typography>
              <Typography className="mb-2" variant="h6" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Type
              </Typography>
              <Input
                type="text"
                label="Type"
                size="lg"
                name="type"
                crossOrigin={undefined}
                value={formValues.type}
                onChange={handleChange} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              />
              {formErrors.type ? (
                <p className="text-sm" style={{ color: "red" }}>
                  {formErrors.type}
                </p>
              ) : null}
              <Typography className="mb-2" variant="h6" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Status
              </Typography>
              <Select
                placeholder="Active"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={formValues.status}
                name="status"
                onChange={(e) => {
                  if (e) {
                    handleChange(e);
                  }
                } }  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                <Option value="Active">Active</Option>
                <Option value="Non-Active">Non-Active</Option>
              </Select>
              {formErrors.status ? (
                <p className="text-sm" style={{ color: "red" }}>
                  {formErrors.status}
                </p>
              ) : null}
          <div className="pt-5 mr-0">
            <Button
                  variant="outlined"
                  color="red"
                  className="mr-1"
                  onClick={onClose}
                  placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              <span>Cancel</span>
            </Button>
            <Button
                  variant="gradient"
                  color="green"
                  placeholder={undefined}
                  type="submit"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              <span>Update</span>
            </Button>
            </div>
            </form>
          </CardBody>
          {/* <CardFooter  placeholder={undefined}>
            
          </CardFooter> */}
        </Card>
      </Dialog>
    </>
  );
};

export default EditTypeModal;
