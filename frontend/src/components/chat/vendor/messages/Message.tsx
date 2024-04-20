import { format } from 'timeago.js';
import {
  axiosInstanceMsg,
  axiosInstanceVendor,
} from '../../../../api/axiosinstance';
import React, { useState } from 'react';
import VendorRootState from '../../../../redux/rootstate/VendorState';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
  DialogFooter,
} from '@material-tailwind/react';

const Message = ({ message, own, setIsUpdated }) => {
  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata,
  );
  const [openRight, setOpenRight] = React.useState(false);
  const [messageIdToDelete, setMessageIdToDelete] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const emojis = ['😀', '😂', '❤️', '👍', '👎'];
  const handleOpenRight = (msgId: string) => {
    setOpenRight(!openRight);
    setMessageIdToDelete(msgId);
  };

  const [openLeft, setOpenLeft] = React.useState(false);

  const handleOpenLeft = (msgId: string) => {
    setOpenLeft(!openLeft);
    setMessageIdToDelete(msgId);
  };

  const handleDeleteEveryone = async () => {
    axiosInstanceVendor
      .patch(
        '/delete-for-everyone',
        { msgId: messageIdToDelete },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response);
        setIsUpdated(true);
        handleOpenRight('');
      })
      .catch((error) => {
        handleOpenRight('');
        toast.error(error.response);
        console.log('here', error);
      });
  };

  const handleDeleteForMe = async (side: string) => {
    axiosInstanceVendor
      .patch(
        '/delete-for-me',
        { msgId: messageIdToDelete, id: vendor?._id },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response);
        setIsUpdated(true);
        if (side == 'right') {
          handleOpenRight('');
        } else {
          handleOpenLeft('');
        }
      })
      .catch((error) => {
        if (side == 'right') {
          handleOpenRight('');
        } else {
          handleOpenLeft('');
        }
        toast.error(error.response);
        console.log('here', error);
      });
  };

  const handleEmoji = async (msgId: string, emoji: string) => {
    axiosInstanceMsg
      .patch('/add-emoji', { msgId, emoji }, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setIsUpdated(true);
        setShowEmojis(false);
      })
      .catch((error) => {
        setShowEmojis(false);
        toast.error(error.response);
        console.log('here', error);
      });
  };

  return (
    <>
      {own ? (
        <div>
          <div className="flex items-end justify-end">
            <div className="relative flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
              <div>
                {message?.isDeleted ? (
                  <span
                    style={{ fontStyle: 'italic' }}
                    className="px-4 py-2 rounded-1g inline-block rounded-bl-none bg-pink-200 text-gray-800"
                  >
                    You deleted this message
                  </span>
                ) : message?.deletedIds.includes(vendor?._id) ? (
                  ''
                ) : (
                  <>
                    <span
                      className="inline-block bg-gray-200 rounded-full px-1 m-1"
                      onClick={() => setShowEmojis(!showEmojis)}
                    >
                      <i className="fa-regular fa-face-smile text-gray-500 text-sm"></i>
                    </span>
                    <span
                      style={{ fontSize: '14px' }}
                      className="px-4 py-2 rounded-1g inline-block rounded-bl-none bg-pink-500 text-white"
                      onClick={() => handleOpenRight(message?._id)}
                    >
                      {message.text}
                    </span>
                  </>
                )}
              </div>
              {message?.deletedIds.includes(vendor?._id) ? (
                ''
              ) : (
                <div style={{ fontSize: '16px' }}>{message?.emoji}</div>
              )}
              {showEmojis && (
                <div className="flex absolute bottom-10 right-0 w-40 justify-between bg-white border border-gray-200 p-2 rounded-lg">
                  {emojis.map((emoji, index) => (
                    <span
                      key={index}
                      onClick={() => handleEmoji(message?._id, emoji)}
                      style={{ fontSize: '16px', cursor: 'pointer' }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {message?.deletedIds.includes(vendor?._id) ? (
            ''
          ) : (
            <p className="flex items-end justify-end text-xs text-gray-500 mr-2">
              {format(message.createdAt)}
            </p>
          )}
        </div>
      ) : (
        <div className="chat-message flex flex-col">
          <div className="flex items-end">
            <div className="relative flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                {message?.isDeleted ? (
                  <span
                    style={{ fontStyle: 'italic' }}
                    className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-100 text-gray-600"
                  >
                    This message was deleted
                  </span>
                ) : message?.deletedIds.includes(vendor?._id) ? (
                  ''
                ) : (
                  <>
                    <span
                      className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600"
                      onClick={() => handleOpenLeft(message?._id)}
                      style={{ fontSize: '14px' }}
                    >
                      {message.text}
                    </span>
                    <span
                      className="inline-block bg-gray-200 rounded-full px-1 m-1"
                      onClick={() => setShowEmojis(!showEmojis)}
                    >
                      <i className="fa-regular fa-face-smile text-gray-500 text-sm"></i>
                    </span>
                  </>
                )}
              </div>
              {message?.deletedIds.includes(vendor?._id) ? (
                ''
              ) : (
                <div style={{ fontSize: '16px' }}>{message?.emoji}</div>
              )}
              {showEmojis && (
                <div className="flex justify-between absolute bottom-10  w-40 bg-white border border-gray-200 p-2 rounded-lg">
                  {emojis.map((emoji, index) => (
                    <span
                      key={index}
                      onClick={() => handleEmoji(message?._id, emoji)}
                      style={{ fontSize: '16px', cursor: 'pointer' }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {message?.deletedIds.includes(vendor?._id) ? (
            ''
          ) : (
            <p className="text-xs text-gray-500 ml-2">
              {format(message.createdAt)}
            </p>
          )}
        </div>
      )}

      <Dialog
        className="w-40"
        size="xs"
        open={openRight}
        handler={handleOpenRight}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="text-md"
        >
          Delete message?
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex justify-end flex-col text-end">
            <Button
              variant="text"
              color="red"
              className="mr-1"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={handleDeleteEveryone}
            >
              <span>Delete for everyone</span>
            </Button>
            <Button
              variant="text"
              color="red"
              className="mr-1"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={() => handleDeleteForMe('right')}
            >
              <span>Delete for me</span>
            </Button>
          </div>
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="green"
            onClick={() => handleOpenRight('')}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* LeftSide */}
      <Dialog
        className="w-40"
        size="xs"
        open={openLeft}
        handler={handleOpenLeft}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="text-md"
        >
          Delete message?
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex justify-end flex-col text-end">
            <Button
              variant="text"
              color="red"
              className="mr-1"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={() => handleDeleteForMe('left')}
            >
              <span>Delete for me</span>
            </Button>
          </div>
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="green"
            onClick={() => handleOpenLeft('')}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Message;
