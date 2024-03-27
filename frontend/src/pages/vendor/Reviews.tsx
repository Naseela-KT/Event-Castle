import { Progress, Rating } from '@material-tailwind/react';
import Breadcrumb from '../../components/vendor/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';


export const Reviews = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reviews" folderName="" />
      <div className="flex flex-col md:flex-row  justify-between w-full gap-2 m-10">
        <div className="flex flex-col items-start w-full">
          <div className="flex items-center mb-2">
            <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Customer reviews & ratings</h2>
              <div className="flex">
              
              <Rating value={4} ratedColor="amber" readonly placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              </div>
              <div className="flex">
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  4.95
                </p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  out of
                </p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  5
                </p>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                1,745 global ratings
              </p>
            </div>
          </div>
        </div>
    
        <div className="flex flex-col w-full">
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              5 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
            <Progress value={70} color="amber" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              70%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              4 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
            <Progress value={17} color="amber" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              17%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              3 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
            <Progress value={8} color="amber" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              8%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              2 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded ">
            <Progress value={4} color="amber" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              4%
            </span>
          </div>
          <div className="flex items-center mt-4">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              1 star
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
            <Progress value={1} color="amber" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              1%
            </span>
          </div>
        </div>
       

      </div>
      {/* <div className="items-start w-full"> */}
        <hr className="border-bodydark2 mx-10 my-6" />
        {/* </div> */}
        <div className="flex flex-col md:flex-row gap-8 m-10">
  {/* Left Side */}
  <div className="md:w-1/2">
    <div className="mb-4 gap-1">
      <Rating value={4} className="text-sm" ratedColor="amber" readonly placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      <h2 className="text-lg font-bold">Bessie Cooper</h2>
      <p className="text-sm text-gray-500">March 14, 2021</p>
    </div>
  </div>

  {/* Right Side */}
  <div className="md:w-1/2">
    <div className="mb-4 gap-4">
      <p className="text-sm font-semibold">Great product, smooth purchase</p>
      <p className="text-sm text-gray-600">
        Almost completed building my replacement website and very pleased with the result. Although the customization is great, the theme's features and Customer Support have also been great.
      </p>
    </div>
  </div>
</div>
<hr className="border-bodydark2 mx-10 my-6" />
        {/* </div> */}
        <div className="flex flex-col md:flex-row gap-8 m-10">
  {/* Left Side */}
  <div className="md:w-1/2">
    <div className="mb-4 gap-1">
      <Rating value={4} className="text-sm" ratedColor="amber" readonly placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
      <h2 className="text-lg font-bold">Bessie Cooper</h2>
      <p className="text-sm text-gray-500">March 14, 2021</p>
    </div>
  </div>

  {/* Right Side */}
  <div className="md:w-1/2">
    <div className="mb-4 gap-4">
      <p className="text-sm font-semibold">Great product, smooth purchase</p>
      <p className="text-sm text-gray-600">
        Almost completed building my replacement website and very pleased with the result. Although the customization is great, the theme's features and Customer Support have also been great.
      </p>
    </div>
  </div>
</div>

    </DefaultLayout>
  );
};
