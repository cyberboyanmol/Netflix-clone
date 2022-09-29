import React from 'react'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Vmoviecard from '../../Moviecard/Vmoviecard';
import './Movielist.css'
const Movielist = (props) => {
  const {movies, title, tv, Component=Vmoviecard} = props
  
  const Arrow = ({text, className}) => {
    return (
      <i className={className}></i>
    )
  }
  const moviesrow = movies.map((movie, i)=> {
    return (
      <Component i={i} tv={tv?tv:movie.tv} movie={movie} key={i}/>
    )
  }) 

  const ArrowLeft = Arrow({text:'', className: 'fal fa-chevron-left'})
  const ArrowRight = Arrow({text:'', className: 'fal fa-chevron-right'})
  return (
    <>
    <h2 className='listtitle'>{title}</h2>
    <ScrollMenu    
      wheel={false}
      translate={1}    
      data={moviesrow} 
      arrowLeft={ArrowLeft} 
      arrowRight={ArrowRight}
      hideSingleArrow={true}
      dragging={true}
      arrowDisabledClass={'hidearrow'}
      arrowClass='arrow'
    />
    </>
  )

}
export default Movielist