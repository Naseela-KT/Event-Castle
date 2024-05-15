/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import Conversation from "../../components/chat/vendor/sidebar/Conversation";
import { useSelector } from "react-redux";
import { MouseEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  axiosInstance,
  axiosInstanceChat,
  axiosInstanceMsg,
} from "../../config/api/axiosinstance";
import Message from "../../components/chat/vendor/messages/Message";

import VendorRootState from "../../redux/rootstate/VendorState";
import { Textarea, IconButton } from "@material-tailwind/react";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { Chats, Messages } from "../../types/commonTypes";
import { UserData } from "../../types/userTypes";
import MessageSkeleton from "../../components/chat/skeletons/MessageSkeleton";
import Layout from "../../layout/vendor/Layout";

interface FileDetails {
  filename: string;
  originalFile: File;
}

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY || "";
const BUCKET_REGION = import.meta.env.VITE_BUCKET_REGION || "";
const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME || "";
const SECRET_ACCESS_KEY = import.meta.env.VITE_SECRET_ACCESS_KEY || "";
const VITE_CHAT_BASE=import.meta.env.VITE_CHAT_BASE || "";

const Chat = () => {
  // const user = useSelector((state: UserRootState) => state.user.userdata);
  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata
  );
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const [conversation, setconversation] = useState<Chats[]>([]);
  const [currentchat, setcurrentchat] = useState<Chats | null>(null);
  const [messages, setmessages] = useState<Partial<Messages>[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<Partial<Messages> | null>(null);
  const [newMessage, setnewMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [user, setUser] = useState<UserData>();
  const [filemodal, setFileModal] = useState(false);
  const [file, setFile] = useState<FileDetails|null>();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const socket = useRef<Socket>();

  // const socket = useRef(io('ws://localhost:8900'));

  const handleConversationSelect = (selectedConversation:Chats) => {
    setcurrentchat(selectedConversation);
    const friendId = selectedConversation.members.find((m) => m !== user?._id);
    // Fetch vendor data based on friendId
    axiosInstance
      .get(`/getUser?userId=${friendId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    socket.current = io(VITE_CHAT_BASE);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentchat?.members.includes(arrivalMessage.senderId!) &&
      setmessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentchat]);

  useEffect(() => {
    console.log(vendor);
    socket.current?.emit("adduser", vendor?._id);
    socket.current?.on("getUsers", (users) => {
      console.log(users);
    });
  }, [vendor]);

  //getting conversations
  const getconversation = async () => {
    try {
      const res = await axiosInstanceChat.get(`/?userId=${vendor?._id}`);
      console.log(res.data);
      setconversation(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getconversation();
  }, [vendor?._id]);

  //getting messages
  useEffect(() => {
    const getmessages = async () => {
      try {
        const res = await axiosInstanceMsg.get(
          `/?conversationId=${currentchat?._id}`
        );
        setmessages(res.data);
        setIsUpdated(false);
      } catch (error) {
        console.log(error);
      }
    };
    getmessages();
  }, [currentchat, isUpdated]);

  const receiverId = currentchat?.members.find(
    (member) => member !== vendor?._id
  );

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const message = {
      senderId: vendor?._id,
      text: newMessage,
      image: "",
      imageUrl: "",
      conversationId: currentchat?._id,
    };
    socket.current?.emit("sendMessage", {
      senderId: vendor?._id,
      receiverId,
      text: newMessage,
      image: "",
      imageUrl: "",
    });

    try {
      axiosInstanceMsg
        .post("/", message)
        .then((res) => {
          setmessages([...messages, res.data]);
          setnewMessage("");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
    getconversation();
  };

  //scrolling to bottom when new msg arrives
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setnewMessage(e.target.value);
  };

  useEffect(() => {
    socket.current?.on("activeStatus", (users) => {
      setActiveUsers(users);
    });
  }, []);


 

  const handleButtonClick = () => {
    // When the IconButton is clicked, trigger the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: { target: { files: any[]; }; }) => {
    console.log(event.target.files[0])
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileModal(true);
      setFile({
        filename: URL.createObjectURL(selectedFile),
        originalFile: selectedFile,
      });
    }
  };

  const handleRemoveFile = () => {
    setFileModal(false);
    setFile(null); // Clears the file state
  };

  const s3 = new S3Client({
    credentials: {
      accessKeyId: ACCESS_KEY!,
      secretAccessKey: SECRET_ACCESS_KEY!,
    },
    region: BUCKET_REGION!,
  });

  const handleSend = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    if (file) {
      console.log("Sending file:", file.originalFile);
  
      const imageName = uuidv4();
  
      const params = {
        Bucket: BUCKET_NAME!,
        Key: imageName,
        Body: file.originalFile,
        ContentType: file.originalFile.type,
      };
  
      const command = new PutObjectCommand(params);
      await s3.send(command);
  
      const getObjectParams = {
        Bucket: BUCKET_NAME!,
        Key: imageName,
      };
  
      const command2 = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command2, { expiresIn: 86400 * 3 });
  
      const message = {
        senderId: vendor?._id,
        text: "",
        conversationId: currentchat?._id,
        imageName: imageName,
        imageUrl: url,
      };
  
      socket.current?.emit("send", {
        senderId: vendor?._id,
        receiverId,
        text: "",
        image: imageName,
        imageUrl: url,
      });
  
      await axiosInstanceMsg
        .post("/", message)
        .then((res) => {
          setmessages([...messages, res.data]);
          setnewMessage("");
          setFileModal(false);
          setFile(null);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //Change Read Status
  const changeIsRead = async (chatId: string) => {
    try {
      const datas = {
        chatId,
        senderId: vendor?._id,
      };
      await axiosInstanceMsg
        .patch("/changeIsRead", datas, { withCredentials: true })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
     <Layout>
    {conversation?.length==0?<MessageSkeleton/>: <div>
     
    <div>
      <div className="relative min-h-screen flex flex-col bg-gray-50">
        {/* <nav className="flex-shrink-0 bg-black">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div>
                <Link to="/vendor/dashboard">
                  <i className="fa-solid fa-arrow-left text-gray-300"></i>
                </Link>
              </div>
              <div></div>
              <div className="flex lg:hidden">
                <button className="bg-red-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-600 focus:ring-white">
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </button>
              </div>

              <div className="hidden lg:block lg:w-80">
                <div className="flex items-center justify-end">
                  <div className="flex">
                    <Link
                      to={`${VENDOR.DASHBOARD}`}
                      className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white"
                    >
                      {vendor?.name}
                    </Link>
                  </div>
                  <div className="ml-4 relative flex-shrink-0">
                    <button className="bg-red-700 text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-700 focus:ring-white">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={vendor?.logoUrl}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav> */}
        {/* Nav ends here */}
        {/* chat layout starts here */}
        <div className="flex-grow w-full max-w-7xl mx-auto lg:flex ">
          <div className="flex-1 min-w-0 bg-white xl:flex">
            <div className="border-b border-black xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-400 bg-gray-50">
              <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0 bg-white">
                <div className="h-full relative ml-2">
                  <div className="relative border-b px-2 py-3 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4">
                    <div className="flex-1 min-w-0">
                      <Link to="" className="focus:outline-none">
                        <span className="absolute inset-0" />
                        <p className="text-lg font-bold text-gray-900 pb-1">
                          Chats
                        </p>
                      </Link>
                    </div>
                  </div>

                  {conversation.map((c) => (
                    <div
                    onClick={() => {
                      handleConversationSelect(c);
                      changeIsRead(c._id);
                    }}>
                      <Conversation
                        conversation={c}
                        currentUser={vendor}
                        currentchat={currentchat}
                        active={activeUsers.some(
                          (u) => u.userId === receiverId && u.active
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>{" "}
            </div>
            {/* 
            middle content start */}
              <div className="flex-1 p-2 sm:pb-6 justify-between h-screen flex-col  hidden xl:flex mx-2">
                {!filemodal ? (
                  <>
                    <div className="flex sm:items-center  justify-between py-3 border-b border-gray-200 p-3">
                      <div className="flex items-center space-x-4">
                        <img
                          src={user ? user?.imageUrl : ""}
                          alt=""
                          className="w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor pointer"
                        />
                        <div className="flex flex-col leading-tight">
                          <div className="text-1xl mt-1 flex items-center">
                            <span className="text-gray-700 mr-3">
                              {user ? user?.name : ""}
                            </span>
                            {activeUsers.some(
                              (u) => u.userId === receiverId && u.active
                            ) ? (
                              <span className="text-green-500">
                                <svg width={10} height={10}>
                                  <circle
                                    cx={5}
                                    cy={5}
                                    r={5}
                                    fill="currentColor"
                                  ></circle>
                                </svg>
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>

                      {/* <div className="flex items-center space-x-2">
                  <button className="inline-flex items-center justify-center rounded-full h-1@ w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div> */}
                    </div>

                    {/* message */}
                    {currentchat ? (
                      <>
                        <div
                          className="message-container"
                          style={{ maxHeight: "500px", overflowY: "auto" }}
                        >
                          {messages.map((m) => (
                            <div ref={scrollRef}>
                              <Message
                                message={m}
                                own={m.senderId === vendor?._id}
                                setIsUpdated={setIsUpdated}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="relative flex">
                          <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-1">
                            <div className="flex">
                              {/* Hidden file input that triggers the file selection dialog */}
                              <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={()=>handleFileChange}
                              />

                              {/* IconButton that triggers the hidden file input */}
                              <IconButton
                                onClick={handleButtonClick}
                                variant="text"
                                className="rounded-full"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                  />
                                </svg>
                              </IconButton>
                            </div>

                            <Textarea
                              rows={1}
                              resize={true}
                              placeholder="Your Message"
                              className="min-h-full !border-0 focus:border-transparent"
                              containerProps={{
                                className: "grid h-full",
                              }}
                              labelProps={{
                                className:
                                  "before:content-none after:content-none",
                              }}
                              value={newMessage}
                              onChange={handleInputChange}
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
                      </>
                    ) : (
                      <>
                        <p className="text-center">Select a conversation</p>
                        <div className="border-t-2 border-gray-200 px-4 pt-4">
                          {/* <MessageInput onChange={handleInputChange}
                      value={newMessage}
                      onBlur={handleStopTyping} onClick={handleSubmit}/> */}
                        </div>
                      </>
                    )}

                    {/*message ends here*/}
                  </>
                ) : (
                  <>
                    <div className="relative bg-gray-100 h-screen flex flex-col  justify-center items-center">
                      {/* Container for all elements, 'relative' allows for absolute positioning within it */}

                      {/* Close icon positioned at the top left corner */}

                      <button
                        onClick={handleRemoveFile}
                        className="absolute top-2 left-2 pt-20"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>

                      {/* Centered image */}
                      {file && (
                        <img
                          src={file?.filename}
                          alt="Selected"
                          className="w-80 h-80 rounded object-cover" // Adjusted size, 'object-cover' ensures proper image scaling
                        />
                      )}

                      {/* Send icon positioned at the bottom right corner */}

                      <button
                        type="button"
                        className="rounded-full p-2 absolute bottom-4 right-4 cursor-pointer hover:bg-blue-gray-200"
                        onClick={(e) => handleSend(e)}
                        disabled={!file}
                     
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="h-10 w-10"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
   
  </div>}
  </Layout>
  </>
  );
};

export default Chat;
