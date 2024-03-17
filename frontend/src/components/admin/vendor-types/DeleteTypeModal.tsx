import { Button, Dialog } from "@material-tailwind/react";
import { useState } from "react";


interface Props {
  open: boolean;
  onClose: () => void;
  vendorTypeId: string;
  onDelete: (vendorTypeId: string) => void;
}

const DeleteTypeModal: React.FC<Props> = ({
  open,
  onClose,
  vendorTypeId,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    onDelete(vendorTypeId);
    setLoading(false);
    onClose();
  };

  return (
    <Dialog
          size="sm"
          open={open}
          className="shadow-none p-4"  placeholder={undefined} handler={onClose}    >
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">Confirm Deletion</h3>
        <p className="text-sm">
          Are you sure you want to delete this vendor type? This action cannot
          be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button
            onClick={onClose}
            color="gray"
            variant="outlined"
            size="sm"
            placeholder={undefined}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="red"
            size="sm"
            disabled={loading}
            placeholder={undefined}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteTypeModal;
