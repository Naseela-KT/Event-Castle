import React from 'react';

interface VendorCoverProps {
  coverpic: string | null|undefined;  
  logo: string | null |undefined; 
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VendorCover: React.FC<VendorCoverProps> = ({ coverpic, logo }) => {
  return (
    <header className="bg-white pt-8 pl-8">
      <div className="grid mt-1 ml-20 mr-20 min-h-[30vh] mx-auto lg:h-[30rem] md:h-[20rem] place-items-stretch bg-contain bg-no-repeat"  style={{ backgroundImage: `url(${coverpic || ''})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <div className="container mx-auto text-center">
          {logo?   <img
            className="lg:h-40 lg:w-40 rounded-full object-cover object-center bg-white mt-10 md:w-20 md:h-20"
            src={logo} // Use the logo prop
            alt="Vendor Logo"
          />:   <img
          className="lg:h-40 lg:w-40 rounded-full object-cover object-center bg-white mt-10 md:w-20 md:h-20"
          src="" // Use the logo prop
          alt="Vendor Logo"
        />}
         
        </div>
      </div>
    </header>
  );
};

export default VendorCover;
