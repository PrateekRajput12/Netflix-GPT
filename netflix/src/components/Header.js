import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut  } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice'
import {  onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { LOGO } from '../utils/constants';

 const Header = () => {
  const navigate = useNavigate()
    const dispatch=useDispatch()

  const user= useSelector(store=>store.user)

  const handleSignout=()=>{

signOut(auth).then(() => {
  // Sign-out successful.

}).catch((error) => {
  // An error happened.
  navigate("/error")
});

}
useEffect(()=>{
  const unSubscribe=onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const {uid,email,displayName,photoURL} = user;
      dispatch(addUser({uid:uid,email:email,displayName:displayName,
        photoURL:photoURL
      }))
      // ...
      navigate("/browse")
    } else {
      // User is signed out
      // ...
      dispatch(removeUser())
    navigate("/")
    }
  });
  return ()=>unSubscribe()
},[])
  return (

    <div className='absolute bg-gradient-to-b from-black px-6 py-2 z-10 w-screen  justify-between flex'> 
      <img
      alt="logo"
      className='w-44 '
      src={LOGO}
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


