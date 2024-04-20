/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconButton, Textarea } from '@material-tailwind/react';
import { ChangeEvent, useState } from 'react';

interface MessageInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleImageInputChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onBlur,
  onClick,
  // handleImageInputChange
}) => {

  

  return (
    <>
    <div className="relative flex">
      <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-100 p-1">
        {/* <div className="flex mx-5">
          <input
            type="file"
            id="imageInput"
            className="hidden"
            onChange={(e) =>{console.log(e);handleImageInputChange(e.target.files)}}
          />
          <label htmlFor="imageInput" className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 inline-block mr-1"
              
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </label>
    
        </div> */}

        <Textarea
          rows={1}
          resize={true}
          placeholder="Your Message"
          className="min-h-full !border-0 focus:border-transparent"
          containerProps={{
            className: 'grid h-full',
          }}
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <div>
          <IconButton
            variant="text"
            className="rounded-full"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={onClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </IconButton>
        </div>
      </div>
    </div>
          
          </>
  );
};

export default MessageInput;
