import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
const ForgotPassword = () => {
 


  return (
    <Card
      className="w-96 mt-50 m-auto bg-dark"
      placeholder={undefined}
      shadow={false}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"
        placeholder={undefined}
      >
        <Typography variant="h4" color="white" placeholder={undefined}>
          Forgot Password
        </Typography>
      </CardHeader>
   
        <CardBody className="flex flex-col gap-4" placeholder={undefined}>
          <div className="flex items-center">
            <Input
              label="Email"
              size="md"
              
              name="email"
              crossOrigin={undefined}
              color="pink"
              className="bg-white bg-opacity-50"
            />
            <Button
              variant="gradient"
              placeholder={undefined}
              size="md"
          
            >
              OTP
            </Button>
          </div>
         
          <Input
            label="Enter OTP"
            size="md"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
           
            name="otp"
          />
         
          <Button
            variant="gradient"
            fullWidth
            placeholder={undefined}
            type="submit"
          >
            Verify OTP
          </Button>
        </CardBody>
      
    </Card>
  );
};

export default ForgotPassword;
