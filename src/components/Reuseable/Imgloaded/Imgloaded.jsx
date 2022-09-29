import React, { useState } from 'react'
import './Imgloaded.css'

const Imgloaded = (props) => {
  const {img, className='', skeletonClass='', alt=''} = props
  const [isLoading, setIsLoading] = useState(true)
  return (
    <>
    <img alt={alt} onLoad={()=> setIsLoading(false)} style={isLoading?{display: 'none'}:{display: 'block'}} src={`https://image.tmdb.org/t/p/original/${img}`} className={className} />
    <div style={isLoading?{display: 'block'}:{display: 'none'}} className={"imgskeltonload "+skeletonClass}></div>
    </>
  )
} 
export default Imgloaded