import React from 'react'
import Logout from '../global/LogoutBtn'

const UserPage = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  
  
  return (
    <>
    <div className='max-w-full bg-pink-500 h-screen '>
      <div className='p-6 bg-white shadow-lg rounded-b-lg h-24 flex justify-between items-center '>
        <h1 className='font-satoshi text-3xl text-pink-500 font-extrabold'>Student Dashboard</h1>
        <div className=' flex items-center gap-4'>
          <h4 className='font-satoshi text-2xl text-black font-bold'>{user.user.fullName}</h4>
          <Logout/>
        </div>
      </div>
      <div className='w-48 h-48 mt-8 mx-auto'>
        <img src={user.user.profileImage} alt="UserImage" className='object-cover rounded-full w-full  ' />
      </div>
     </div>
    </>
  )
}

export default UserPage