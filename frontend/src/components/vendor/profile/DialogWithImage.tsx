// DialogWithImage.js

import {

    Avatar,
    Button,
 Dialog,

 DialogBody,
 DialogFooter,
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
    <Dialog size="sm" open={open} onClose={handler}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
      <DialogFooter className="justify-between"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <div className="flex items-center gap-16">
            <div>
              <Typography variant="small" color="gray" className="font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Views
              </Typography>
              <Typography color="blue-gray" className="font-medium"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                44,082,044
              </Typography>
            </div>
            <div>
              <Typography variant="small" color="gray" className="font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Downloads
              </Typography>
              <Typography color="blue-gray" className="font-medium"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                553,031
              </Typography>
            </div>
          </div>
          <Button
                 size="sm"
                 variant="outlined"
                 color="blue-gray"
                 className="mr-5 flex items-center"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Share
          </Button>
        </DialogFooter>
    </Dialog>
 );
}
