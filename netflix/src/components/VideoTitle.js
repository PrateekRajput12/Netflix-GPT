import React from 'react'

const VideoTitle = (props) => {
    const {title,overview} = props
  return (
    <div className='pt-[20%] px-24 w-screen  aspect-video   absolute text-white bg-gradient-to-r from-black'>
<h1 className='text-4xl'>{title}</h1>
<h3  className='py-6 text-lg leading-10 w-1/4'>{overview}</h3>

<div>
    <button className='bg-white text-black py-3 px-8 font-bold text-lg text-center rounded-lg hover:opacity-80'>▶️ Play</button>
    <button className='mx-4 bg-gray-600 text-black py-3 px-8 font-bold text-lg text-center rounded-lg'>More Info</button>
</div>

    </div>
  )
}

export default VideoTitle