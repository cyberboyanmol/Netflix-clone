import axios from 'axios'
import React from 'react'
import Btn from '../../Btn/Btn'

const Ratebtn = (props) => {
  const {Tag=Btn, className, text, id} = props
  
  const handleRate = () => {
    axios({
      method: 'post',
      url: `https://api.themoviedb.org/3/movie/${id}/rating?api_key=b500b7f81758d0ea6ef8e9df46c2718c`,
    })
  }

  return (
    <div className="ratebtn">
      <Tag className={className} onClick={()=> handleRate()} clickEvent={()=> handleRate()}/>
    </div>
  )
}
export default Ratebtn