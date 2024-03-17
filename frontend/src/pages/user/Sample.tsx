import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
 
export default function DialogWithForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
 
  return (
    <>
      <Button onClick={handleOpen}  placeholder={undefined}>Sign In</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"  placeholder={undefined}      >
        <Card className="mx-auto w-full max-w-[24rem]"  placeholder={undefined}>
          <CardBody className="flex flex-col gap-4"  placeholder={undefined}>
            <Typography variant="h4" color="blue-gray"  placeholder={undefined}>
              Sign In
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"  placeholder={undefined}            >
              Enter your email and password to Sign In.
            </Typography>
            <Typography className="-mb-2" variant="h6"  placeholder={undefined}>
              Your Email
            </Typography>
            <Input label="Email" size="lg" crossOrigin={undefined} />
            <Typography className="-mb-2" variant="h6"  placeholder={undefined}>
              Your Password
            </Typography>
            <Input label="Password" size="lg" crossOrigin={undefined} />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" crossOrigin={undefined} />
            </div>
          </CardBody>
          <CardFooter className="pt-0"  placeholder={undefined}>
            <Button variant="gradient" onClick={handleOpen} fullWidth  placeholder={undefined}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center"  placeholder={undefined}>
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}  placeholder={undefined}              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}