import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextApp } from '../../ContextAPI'

const Watched = (props) => {
  const {watching, id, tv=false, link, className=''} = props
  const {watched} = useContext(ContextApp)
  
  return (
    <Link to={link} className={className}>
    {props.children}
    </Link>
  )
}
export default Watched