
const ChatProfile = () => {
  
  return (
    <div className="h-full relative">
    <div className="m-auto text-center mb-10">
      <img
        className="w-36 h-36 rounded-full m-auto"
        src=""
        alt=""
      />
      <h2 className="m-auto text-2xl mt-2">Naseela</h2>
    </div>
    <div className="mb-2">
      <h4>Attachments</h4>
    </div>
    <div className="grid grid-cols-4 gap-2 m-2">
      <div>
        <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
      </div>
      <div>
        <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
      </div>
      <div>
        <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
      </div>
      <div>
        <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
      </div>
    </div>
  </div>
  )
}

export default ChatProfile