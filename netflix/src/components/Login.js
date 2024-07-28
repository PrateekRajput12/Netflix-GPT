import React from 'react'
import Header from './Header'
import '../index.css'
import { checkValidData } from '../utils/validate'
import { useState,useEffect } from 'react'
import { useRef } from 'react'
import { auth } from '../utils/firebase'
import {  createUserWithEmailAndPassword , signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

export const Login = () => {

  const navigate=useNavigate()
  const [isSignInForm,setisSignInForm]=useState([true])
const disPatch= useDispatch()
 const [errorMsg,seterrorMsg]=useState(null)

 const name=useRef(null)
  const email =useRef(null)
  const password =useRef(null)

  const toggleSignInForm=()=>{
    setisSignInForm(!isSignInForm)
  }

  const handleButtonClick=()=>{
    // validate form data
    const msg=checkValidData(email.current.value,password.current.value)
    // console.log(email.current.value);
    // console.log(msg);
    // console.log(password);
    seterrorMsg(msg)

if(msg) {return}
 

if(!isSignInForm){
  createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRU3FAHSDNe8KA2MZcXDmdy0TRWmCNffivg6W9R1x1QBuB_3IWxoUN0y39Ug&s"
    }).then(() => {
      const {uid, email,displayName, photoURL} =auth.currentUser
      disPatch(
        addUser({
          uid: uid,
          displayName: displayName,
          email: email,
          photoURL: photoURL,
        })
      )
      navigate("/browse")
      // Profile updated! 
      // ...
    }).catch((error) => {
      // An error occurred
      seterrorMsg(error.message) 
      // ...
    });
    console.log(user);
    navigate("/browse")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMsg(errorCode+ "-"+errorMessage)
    // ..
  });
}
else{
  signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate("/browse")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMsg(errorCode);
  });
}


}
    // if this  done we process sign in signb up
  

  return (
    <div className=''>
   <Header/>
        <div className='absolute '>
          <img alt="bg"
          className='bg-gradient-to-b from-black'
           src="https://assets.nflxext.com/ffe/siteui/vlv3/21a8ba09-4a61-44f8-8e2e-70e949c00c6f/6678e2ea-85e8-4db2-b440-c36547313109/IN-en-20240722-POP_SIGNUP_TWO_WEEKS-perspective_WEB_3457a8b1-284d-4bb5-979e-2a2e9bb342b3_small.jpg" />
        </div>


        <form
        onSubmit={(e)=>e.preventDefault()}
         className='absolute p-12 w-3/12 my-36 mx-auto right-0 left-0 bg-black text-white rounded-lg flex justify-center items-center flex-col bg-opacity-80'>
        <h1 className='font-semibold text-3xl py-2 pl-4 self-start'>{isSignInForm ?"Sign In":"Sign Up"}</h1>
         
    {   !isSignInForm && ( <input
          ref={name}
          type="name"
            placeholder="Full Name" 
            className='p-3 m-4 w-full  bg-[#111212]  '
             />)}

          <input
          ref={email}
           type="text"
            placeholder="Email Address"
             className='p-3 m-4 w-full bg-[#111212] bg-opacity-85' 
              
             />


          <input
          ref={password}
           type="password"
            placeholder="Password" 
            className='p-3 m-4 w-full  bg-[#111212]  '
             />

             <p className='py-2  text-red-700 text-lg font-bold  self-start ' >{errorMsg}</p>

          <button 
          type="submit"
           className='p-4 m-4 bg-red-700 w-full'
           onClick={handleButtonClick}>
           {isSignInForm ?"Sign In":"Sign Up"}
           
            </button>

          <p className='py-4 self-start cursor-pointer '>
          {isSignInForm ?"New to Netflix ?":"Already registered ?"} <a href="#" onClick={toggleSignInForm}>
          {isSignInForm ?" Sign Up Now":"Sign In Now"}</a>
          </p>
        </form>
    </div>
  )
}


export default Login