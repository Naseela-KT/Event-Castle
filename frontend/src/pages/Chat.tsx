
import { Link } from 'react-router-dom';
import Sidebar from '../components/chat/sidebar/Sidebar';
import MessageContainer from '../components/chat/messages/MessageContainer';
import ChatProfile from '../components/chat/profile/ChatProfile';

const Chat = () => {
  return (
    <div >
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
                <Sidebar/>
              </div>
              {/* 
              middle content start */}
              <MessageContainer/>
            </div>
            <div className="bg-gray-200 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0 hidden xl:block">
              <div className="h-full pl-6 py-6 lg:w-80">
              <ChatProfile/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
