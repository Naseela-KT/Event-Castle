// DialogWithImage.js

import {

 Dialog,

 DialogBody,

 Typography,


} from "@material-tailwind/react";

interface DialogWithImageProps {
    imageUrl: string;
    open: boolean;
   caption:string;
    handler: () => void;
   }

export function DialogWithImage({ imageUrl, open, handler,caption }:DialogWithImageProps) {


 return (
    <Dialog size="xs" open={open} onClose={handler}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      
      <DialogBody  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <img
          alt="nature"
          className="h-[30rem] w-full rounded-lg object-cover object-center"
          src={imageUrl}
        />
        <Typography color="black" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {caption}
        </Typography>
      </DialogBody>
     
    </Dialog>
 );
}
