import React from 'react'
import './Input.css'

const Input = (props) => {
  const {type='text', required=true, name='',placeholder='', value, setValue, text} = props

  return (
    <label className="input" >
       
        <input 
        required={required}
        onChange={(e)=> setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        type={type}
        autoComplete={type}
        />
        {text && <span>{text}</span>}
    </label>
  )
}
export default Input