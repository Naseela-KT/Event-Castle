import { Link } from 'react-router-dom';
import Conversation from '../../components/chat/user/sidebar/Conversation';
import UserRootState from '../../redux/rootstate/UserState';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { axiosInstance, axiosInstanceChat, axiosInstanceMsg } from '../../api/axiosinstance';
import Message from '../../components/chat/user/messages/Message';
import MessageInput from '../../components/chat/user/messages/MessageInput';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from '@material-tailwind/react';

const Chat = () => {
  const user = useSelector((state: UserRootState) => state.user.userdata);
  const [isUpdated, setIsUpdated] = useState(false);
  const [conversation, setconversation] = useState([]);
  const [currentchat, setcurrentchat] = useState(null);
  const [messages, setmessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setnewMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);
  const [vendor,setVendor]=useState({})

  const scrollRef = useRef();
  const socket = useRef(io('ws://localhost:8900'));
  const [typing, setTyping] = useState(false);

  const [selectedImage, setSelectedImage] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleImageInputChange = (files) => {
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
      console.log(files[0])
      handleOpen()
    }
  };

  const handleSend = () => {
    // Implement sending logic here
    // For example, you can send the image to the server
    // and then close the modal and reset state
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleCancel = () => {
    // Close the modal and reset state
    setShowModal(false);
    setSelectedImage(null);
  };

  const sendHeartbeat = () => {
    socket.current.emit('heartbeat');
  };

  setInterval(sendHeartbeat, 60000);

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    socket.current.on('typingsent', (senderId) => {
      setTyping(true);
      console.log('vendor typing');
    });

    socket.current.on('stopTypingsent', (senderId) => {
      setTyping(false);
      console.log('vendor stopped typing');
    });
  }, []);

  useEffect(() => {
    socket.current.emit('adduser', user?._id);
    socket.current.on('getUsers', (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    arrivalMessage &&
      currentchat?.members.includes(arrivalMessage.sender) &&
      setmessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentchat]);

  //getting conversations
  useEffect(() => {
    const getconversation = async () => {
      try {
        const res = await axiosInstanceChat.get(`/?userId=${user?._id}`);
        console.log(res.data);
        setconversation(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getconversation();
  }, [user?._id]);

  //getting messages
  useEffect(() => {
    const getmessages = async () => {
      try {
        const res = await axiosInstanceMsg.get(
          `/?conversationId=${currentchat?._id}`,
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
    (member) => member !== user?._id,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendHeartbeat();
    const message = {
      senderId: user?._id,
      text: newMessage,
      conversationId: currentchat?._id,
    };
    socket.current.emit('sendMessage', {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    axiosInstanceMsg
      .post('/', message)
      .then((res) => {
        setmessages([...messages, res.data]);
        setnewMessage('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleConversationSelect = (selectedConversation) => {
    setcurrentchat(selectedConversation);
    const friendId = selectedConversation.members.find((m) => m !== user?._id);
    // Fetch vendor data based on friendId
    axiosInstance.get(`/getvendor?vendorid=${friendId}`)
      .then((res) => {
        setVendor(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  //scrolling to bottom when new msg arrives
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTyping = () => {
    socket.current.emit('typing', { receiverId: receiverId });
  };

  const handleStopTyping = () => {
    socket.current.emit('stopTyping', { receiverId: receiverId });
  };

  const handleInputChange = (e) => {
    setnewMessage(e.target.value);
    handleTyping();
  };

  useEffect(() => {
    socket.current.on('activeStatus', (users) => {
      setActiveUsers(users);
    });
  }, []);

  return (
    <>
      <div>
        <div>
          <div className="relative min-h-screen flex flex-col bg-gray-50 pt-15">
            {/* chat layout starts here */}
            <div className="flex-grow w-full max-w-7xl mx-auto lg:flex ">
              <div className="flex-1 min-w-0 bg-white xl:flex ">
                <div className="border-b border-black xl:border-b-0 xl:flex-shrink-0 xl:w-70 xl:border-r xl:border-gray-400 bg-gray-50">
                  <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0 bg-white">
                    <div className="h-full relative ml-2">
                      <div className="relative px-2 border-b py-3 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4">
                        {/* <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={user?.imageUrl}
                          alt=""
                        />
                      </div> */}
                        <div className="flex-1 min-w-0">
                          <Link to="" className="focus:outline-none">
                            <span className="absolute inset-0" />
                            <p className="text-lg font-bold text-gray-900 pb-1">
                              Chats
                            </p>
                          </Link>
                        </div>
                      </div>
                      {/* <SearchInput /> */}
                      {conversation.map((c) => (
                        <div onClick={()=>handleConversationSelect(c)}>
                          <Conversation
                            conversation={c}
                            currentUser={user}
                            currentchat={currentchat}
                            
                            active={activeUsers.some(
                              (u) => u.userId === receiverId && u.active,
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>{' '}
                </div>
                {/* 
              middle content start */}
                <div className="flex-1 p-2 sm:pb-6 justify-between  flex-col  hidden xl:flex mx-2">
                  <div className="flex sm:items-center  justify-between py-3 border-b border-gray-200 p-3">
                    <div className="flex items-center space-x-4">
                      <img
                        src={vendor?vendor?.logoUrl:""}
                        alt=""
                        className="w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor pointer"
                      />
                      <div className="flex flex-col leading-tight">
                        <div className="text-1xl mt-1 flex items-center">
                          <span className="text-gray-700 mr-3">{vendor?vendor?.name:""}</span>
                          {activeUsers.some(
                          (u) => u.userId === receiverId && u.active,
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
                          ''
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
                      {messages.map((m) => (
                        <div ref={scrollRef}>
                          <Message
                            message={m}
                            own={m.senderId === user?._id}
                            setIsUpdated={setIsUpdated}
                          />
                        </div>
                      ))}
                      {typing && <div className="userTyping">Typing...</div>}

                      <MessageInput
                        onChange={handleInputChange}
                        value={newMessage}
                        onBlur={handleStopTyping}
                        onClick={handleSubmit}
                        handleImageInputChange={handleImageInputChange}
                      />
                    </>
                  ) : (
                    <>
                      <p className="text-center">
                        Send a message to start the conversation
                      </p>
                      <div className="border-t-2 border-gray-200 px-4 pt-4">
                        {/* <MessageInput onChange={handleInputChange}
                        value={newMessage}
                        onBlur={handleStopTyping} onClick={handleSubmit}/> */}
                      </div>
                    </>
                  )}

                  {/*message ends here*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
        <Dialog
        size='xs'
          open={open}
          handler={handleOpen}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <DialogHeader
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Its a simple dialog.
          </DialogHeader>
          <DialogBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <img src="" alt="" />
            <p>{selectedImage?.name}</p>
          </DialogBody>
          <DialogFooter
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={handleOpen}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      
    </>
  );
};

export default Chat;
