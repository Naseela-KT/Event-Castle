// ChatProfile.tsx
import React from 'react';
import { VendorData } from '../../../../types/vendorTypes';

interface ChatProfileProps {
  vendor?: VendorData;
}

const ChatProfile: React.FC<ChatProfileProps> = ({ vendor }) => {
  return (
    <div className="h-full relative mt-10">
      <div className="m-auto text-center mb-10">
        <img
          className="w-20 h-20 rounded-full m-auto"
          src={vendor?.logoUrl?vendor?.logoUrl:"/imgs/vendor/logo-default.jpeg"}
          alt={vendor?.name}
        />
        <h2 className="m-auto text-2xl mt-2">{vendor?.name}</h2>
      </div>
      <div className="mb-2 mx-2">
        <p>{vendor?.about}</p>
      </div>
    </div>
  );
};

export default ChatProfile;
