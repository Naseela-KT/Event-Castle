/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogBody } from "@material-tailwind/react/components/Dialog";
import Typography from "@material-tailwind/react/components/Typography";

interface DialogWithImageProps {
  imageUrl: string;
  open: boolean;
  caption: string;
  handler: () => void;
}

export function DialogWithImage({
  imageUrl,
  open,
  caption,
}: DialogWithImageProps) {
  return (
    <Dialog
      size="xs"
      open={open}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined} handler={function (): void {
      } } 
    
       >
      <DialogBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <img
          alt="nature"
          className="h-[30rem] w-full rounded-lg object-cover object-center"
          src={imageUrl}
        />
        <Typography
          color="black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {caption}
        </Typography>
      </DialogBody>
    </Dialog>
  );
}
