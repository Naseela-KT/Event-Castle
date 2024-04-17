import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Rating,
    Accordion,
    AccordionBody,
    AccordionHeader,
  } from "@material-tailwind/react";
import { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
   
   

  interface Review {
    _id:string;
    username: string;
    rating: number;
    content: string;
    reply:Array<string>;
    key:number;
  }


  const ReviewCard: React.FC<Review> = ({ username,rating,content,reply,key }) => {
    const [openAccordions, setOpenAccordions] = useState<number[]>([]);
    const handleToggleAccordion = (index: number) => {
      const isOpen = openAccordions.includes(key);
      setOpenAccordions((prevState) => {
        if (isOpen) {
          return prevState.filter((item) => item !== key); // Close the accordion
        } else {
          return [...prevState, index]; // Open the accordion
        }
      });
    };
    return (
      <Card color="transparent" shadow={false} className="w-full max-w-[20rem]"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 flex items-center gap-4 pt-0 pb-1"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
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
        <CardBody className="mb-6 p-0 ml-7"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Typography  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {content}
          </Typography>
          {reply.length>0?<div className="flex flex-col md:flex-row gap-8  mb-10 mt-5">
            <Accordion
              open={openAccordions.includes(key)} 
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="w-50"
            >
              <AccordionHeader
                className="text-sm flex items-center w-60" 
                onClick={() => handleToggleAccordion(key)}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                View replies
               
                {openAccordions.includes(key) ? (
                  <FaAngleUp />
                ) : (
                  <FaAngleDown />
                )}
              </AccordionHeader>
              <AccordionBody>
                {reply.map((replyval, replyIndex) => (
                  <p key={replyIndex}>{replyval}</p>
                ))}
              </AccordionBody>
            </Accordion>
          </div>:""}
          
        </CardBody>
      </Card>
    );
  }


  export default ReviewCard;