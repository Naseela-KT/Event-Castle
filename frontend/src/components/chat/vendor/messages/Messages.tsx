import { useEffect, useRef } from "react";
import useGetMessages from "../../../../hooks/useGetMessages";
import Message from "./Message"
import MessageSkeleton from "../../skeletons/MessageSkeleton";
import useListenMessages from "../../../../hooks/useListenMessages";


const Messages = () => {
  const { messagesV, loading } = useGetMessages();
  useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messagesV]);
  return (
    <div
    id="messages"
    className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
  >
   {!loading &&
				messagesV.length > 0 &&
				messagesV.map((message: any) => (
				
						<Message message={message} />
			
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messagesV.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
  </div>
  )
}

export default Messages