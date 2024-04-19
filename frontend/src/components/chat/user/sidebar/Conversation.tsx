

import { Link } from 'react-router-dom'
import { axiosInstanceVendor } from '../../../../api/axiosinstance'
import { useEffect, useState } from 'react'




const Conversation=({conversation , currentUser , active}) => {
  const [vendor , setVendor] = useState(null)

  useEffect(()=>{

    const friendId = conversation.members.find((m)=> m !== currentUser._id)

    const getUser = async ()=>{
      try {
       await axiosInstanceVendor.get(`/getvendor?vendorid=${friendId}`)
       .then((res)=>{
        setVendor(res.data.data)
       })       
      } catch (error) {
        console.log(error)
      }
    }
    getUser();
  },[currentUser , conversation , active])

  return (
    <div>
    <div className={`relative rounded-lg px-2 py-2 flex items-center space-x-3 mb-3 bg-gray-100 hover:bg-gray-100`}>

        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={ vendor?.logoUrl ? vendor.logoUrl : ""}
            alt=""
          />
        </div>
        <div className="flex-1 min-w-0">
          <Link to="" className="focus:outline-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-red-600">{vendor?.name}</p>
              <div className="text-gray-400 text-xs">12:34 AM</div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 truncate">Hi</p>
              <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
                2
              </div>
            </div>
          </Link>
        </div>
      </div>

   
    </div>
  )
}

export default Conversation