import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Rating,
  } from "@material-tailwind/react";
   
   

  interface Review {
    username: string;
    rating: number;
    content: string;
  }


  const ReviewCard: React.FC<Review> = ({ username,rating,content }) => {
    return (
      <Card color="transparent" shadow={false} className="w-full max-w-[20rem]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 flex items-center gap-4 pt-0 pb-8"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
         <i className="fa-solid fa-user" ></i>
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h6" color="blue-gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {username}
              </Typography>
              <Rating value={rating} readonly placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            </div>
           
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Typography  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {content}
          </Typography>
        </CardBody>
      </Card>
    );
  }


  export default ReviewCard;