import { IconButton, Textarea } from "@material-tailwind/react";
import { ChangeEvent } from "react";

interface MessageInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}
const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  handleSubmit,
}) => {
  return (
    <div className="relative flex">
      <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-1">
        <div className="flex"></div>

        <Textarea
          rows={1}
          resize={true}
          placeholder="Your Message"
          className="min-h-full !border-0 focus:border-transparent"
          containerProps={{
            className: "grid h-full",
          }}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={value}
          onChange={onChange}
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
            onClick={handleSubmit}
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
  );
};

export default MessageInput;
