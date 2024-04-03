// DialogWithImage.js

import {

    Avatar,
 Dialog,

 DialogBody,
 DialogHeader,
 Typography,

} from "@material-tailwind/react";

interface DialogWithImageProps {
    imageUrl: string;
    open: boolean;
    handler: () => void;
   }

export function DialogWithImage({ imageUrl, open, handler }:DialogWithImageProps) {


 return (
    <Dialog size="xs" open={open} onClose={handler}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <DialogHeader className="justify-between"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <div className="flex items-center gap-3">
            <Avatar
                     size="sm"
                     variant="circular"
                     alt="tania andrew"
                     src={imageUrl} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            />
            <div className="-mt-px flex flex-col">
              <Typography
                         variant="small"
                         color="blue-gray"
                         className="font-medium"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Tania Andrew
              </Typography>
              <Typography
                         variant="small"
                         color="gray"
                         className="text-xs font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                @emmaroberts
              </Typography>
            </div>
          </div>
        
        </DialogHeader>
      <DialogBody  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <img
          alt="nature"
          className="h-[30rem] w-full rounded-lg object-cover object-center"
          src={imageUrl}
        />
      </DialogBody>
     
    </Dialog>
 );
}
