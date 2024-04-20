

import { Link } from 'react-router-dom'
import { axiosInstance} from '../../../../api/axiosinstance'
import { useEffect, useState } from 'react'




const Conversation=({conversation , currentUser , active,currentchat}) => {
  const [user , setUser] = useState(null)

  useEffect(()=>{

    const friendId = conversation.members.find((m)=> m !== currentUser._id)

    const getUser = async ()=>{
      try {
        const res = await axiosInstance.get(`/getUser?userId=${friendId}`)
        console.log(res.data)
        setUser(res.data)
      
      } catch (error) {
        console.log(error)
      }
    }
    getUser();

  },[currentUser , conversation])

  return (
    <div>
    <div className={`relative rounded-lg px-2 py-2 flex items-center space-x-3 mb-3 ${currentchat?._id === conversation._id ? 'bg-gray-300' : 'bg-gray-50'}`}>

        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={ user?  user?.imageUrl : ""}
            alt=""
          />
        </div>
        <div className="flex-1 min-w-0">
          <Link to="" className="focus:outline-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-700">{user?.name}</p>
              <div className="text-gray-400 text-xs">12:34 AM</div>
            
            </div>
            <div className="flex items-center justify-end">
              {/* <p className="text-sm text-gray-500 truncate">Hi</p>
              <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
                2
              </div> */}
               {active?<span className="text-green-500">
                            <svg width={10} height={10}>
                              <circle
                                cx={5}
                                cy={5}
                                r={5}
                                fill="currentColor"
                              ></circle>
                            </svg>
                          </span>:""}
            </div>
          </Link>
        </div>
      </div>

   
    </div>
  )
}

export default Conversation