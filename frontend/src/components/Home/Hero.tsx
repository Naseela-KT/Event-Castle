import { Typography, Input, Button, Card, CardBody } from "@material-tailwind/react";

const Hero = () => {
  return (
    <>
      <header className="bg-white" style={{ marginTop: -40, marginBottom: -40 }}>
        <div className="grid min-h-[40vh] w-full lg:h-[33rem] md:h-[20rem] sm:h-[35rem] place-items-stretch bg-[url('/imgs/Hero.png')] bg-cover bg-contain bg-no-repeat">
          <div className="container mx-auto text-center my-auto">
            <Card style={{ backgroundColor: "#EC4C67", paddingRight: "20px" }} className="inline-flex text-xs rounded-lg font-medium text-primary" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <CardBody placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Typography
                  variant="h1"
                  color="white"
                  className="mx-5 w-full leading-snug !text-3xl lg:max-w-xl lg:!text-3xl"
                  placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  Leading Event Planning Platform
                </Typography>
              </CardBody>
            </Card>

            <div className="mt-8 grid w-full place-items-start md:justify-center">
              <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">
                <Input color="gray" label="Enter your email" size="lg" className="bg-white" crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                <Button
                  color="gray"
                  className="w-full px-4 md:w-[12rem]"
                  placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  get started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Hero;
