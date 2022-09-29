import React from 'react'
import Imgloaded from '../../Reuseable/Imgloaded/Imgloaded'

const Movieperson = (props) => {
  const {person} = props
  return (
    <div className="movieperson">
      <div className="personimg">
        <Imgloaded img={person?.profile_path}/>
      </div>
      <div className="persondetail">
        <h3>{person.name}</h3>
        <span>{person.character}</span>
      </div>
    </div>
  )
}
export default Movieperson