import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut  } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';




 const Header = () => {
  const navigate = useNavigate()
    
  const user= useSelector(store=>store.user)

  const handleSignout=()=>{

signOut(auth).then(() => {
  // Sign-out successful.
  navigate("/")
}).catch((error) => {
  // An error happened.
  navigate("/error")
});

}
  return (

    <div className='absolute bg-gradient-to-b from-black px-6 py-2 z-10 w-screen  justify-between flex'> 
      <img
      alt="logo"
      className='w-44 '
      src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
      />
     {user &&( <div className='flex'>
       <img 
       className='w-12 h-12'
       alt='userLogo'
       src={user?.photoURL}
       />
       <button onClick={handleSignout} className='font-bold text-white'>Sign Out</button>

     </div>)
     }
    </div>
    
  )
}

  
export default Header

