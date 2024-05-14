/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { SetStateAction, useState } from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
  Button,
} from '@material-tailwind/react';
import VendorPosts from './VendorsPosts';
import ReviewCard from './ReviewCard';
import { Review } from '../../../types/commonTypes';



interface VendorReviewProps {
  reviews: Review[] | undefined;
}

const VendorTabs: React.FC<VendorReviewProps> = ({ reviews }) => {
  const [activeTab, setActiveTab] = useState('images');
  

  const handleTabChange = (value: SetStateAction<string>) => {
    setActiveTab(value);
  };

  const data = [
    {
      label: 'Images',
      value: 'images',
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: 'Reviews',
      value: 'reviews',
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
  ];

  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      className="mx-5 sm:mx-10 md:mx-10 lg:mx-20 mb-10"
    >
      <TabsHeader
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className='z-0'
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {data.map(({ value }) => (
          <TabPanel key={value} value={value}>
            {value === 'images' && <VendorPosts />}
            {value === 'reviews' && (
              <>
              {reviews?.length==0&&<Typography variant="h5" color="pink" className=" mt-4"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      No reviews added!
    </Typography>}
              <div className="grid  gap-4 sm:grid-cols-1 md:grid-cols-2">
                {reviews?.map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
                
         
              </div>
              {reviews?.length!>0&&<div className="flex justify-center items-center mt-10">
              <Button
                variant="outlined"
                placeholder={undefined}
                color="pink"
                size="lg"
                className="mr-3 mt-5 text-center"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                View More Reviews
              </Button>
            </div>}
              </>
            )}

          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default VendorTabs;
