import { Link } from 'react-router-dom';
import ChatProfile from '../../components/chat/user/profile/ChatProfile';
import SearchInput from '../../components/chat/user/sidebar/SearchInput';
import Conversation from '../../components/chat/user/sidebar/Conversation';
import UserRootState from '../../redux/rootstate/UserState';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { axiosInstanceChat, axiosInstanceMsg } from '../../api/axiosinstance';
import Message from '../../components/chat/user/messages/Message';
import MessageInput from '../../components/chat/user/messages/MessageInput';


const Chat = () => {
  const user = useSelector((state: UserRootState) => state.user.userdata);

  const [conversation, setconversation] = useState([]);
  const [currentchat, setcurrentchat] = useState(null);
  const [messages, setmessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setnewMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);


  const scrollRef = useRef();
  const socket = useRef(io('ws://localhost:8900'));
  const [typing, setTyping] = useState(false);

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
        console.log(res.data)
        setconversation(res.data)
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
      } catch (error) {
        console.log(error);
      }
    };
    getmessages();
  }, [currentchat]);



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
    <div>
      <div>
        <div className="relative min-h-screen flex flex-col bg-gray-50">
          <nav className="flex-shrink-0 bg-[#565656]">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
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
                        to="/chat"
                        className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white"
                      >
                        Chat
                      </Link>
                    </div>
                    <div className="ml-4 relative flex-shrink-0">
                      <button className="bg-red-700 text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-700 focus:ring-white">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          {/* Nav ends here */}
          {/* chat layout starts here */}
          <div className="flex-grow w-full max-w-7xl mx-auto lg:flex ">
            <div className="flex-1 min-w-0 bg-white xl:flex">
              <div className="border-b border-gray-500 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-gray-50">
                <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0 bg-gray-300">
                  <div className="h-full relative ml-2">
                    <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={user?.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link to="" className="focus:outline-none">
                          <span className="absolute inset-0" />
                          <p className="text-sm font-bold text-red-600">
                            {user?.name}
                          </p>
                        </Link>
                      </div>
                    </div>
                    <SearchInput />
                    {conversation.map((c) => (
                      <div onClick={() => setcurrentchat(c)}>
                        <Conversation

                          conversation={c}
                          currentUser={user}
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
              <div className="flex-1 p-2 sm:pb-6 justify-between  flex-col  hidden xl:flex">
                <div className="flex sm:items-center  justify-between py-3 border-b border-gray-200 p-3">
                  <div className="flex items-center space-x-4">
                    <img
                      src=""
                      alt=""
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor pointer"
                    />
                    <div className="flex flex-col leading-tight">
                      <div className="text-1xl mt-1 flex items-center">
                        <span className="text-gray-700 mr-3">""</span>
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
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
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
                  </div>
                </div>

                {/* message */}
                {currentchat ? (
                  <>
              
                      {messages.map((m) => (
                        <div ref={scrollRef}>
                          <Message message={m} own={m.senderId === user?._id} />
                        </div>
                      ))}
                      {typing && <div className="userTyping">Typing...</div>}
                 
                    
                     <MessageInput onChange={handleInputChange}
                        value={newMessage}
                        onBlur={handleStopTyping} onClick={handleSubmit}/>
                  </>
                ) : (
                  <>
                  <p className='text-center'>Send a message to start the conversation</p>
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
            <div className="bg-gray-200 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0 hidden xl:block">
              <div className="h-full pl-6 py-6 lg:w-80">
                <ChatProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
