import React from 'react'
import './Btn.css'

const Btn = (props) => {

  const {text, className, clickEvent, icon} = props 

  return (
    <button onClick={()=> clickEvent?.()} className={'themebtn flex '+className}>
      <span>{text}</span>
      {icon&&<i className={icon}></i>}
    </button>
  )
}
export default Btn