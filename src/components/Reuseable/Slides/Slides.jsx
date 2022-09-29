import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Slides.css'
import Btn from '../../Btn/Btn';
const Carouselcont =  (props) => {

  const {itemsrow, thumbails=true, autoplay=false, infiniteLoop=false} = props

  return (
    <Carousel showThumbs={false}  renderArrowNext={(onClickHandler, hasNext, label) =>
      hasNext && (
          <button className='themebtn nextbtn controlbtn' onClick={onClickHandler}>Next</button>
      )
  }
  renderArrowPrev={(onClickHandler, hasNext, label) =>
    hasNext && (
        <button className='themebtn prevbtn controlbtn' onClick={onClickHandler}>Go Back</button>
    )
} 
  autoPlay={autoplay} interval={5000} infiniteLoop={infiniteLoop}>
      {itemsrow}
    </Carousel>
  )

}
export default Carouselcont

// <li
// onClick={onClickHandler}
// onKeyDown={onClickHandler}
// value={index}
// key={index}
// role="button"
// tabIndex={0}
// title={`${label} ${index + 1}`}
// aria-label={`${label} ${index + 1}`}
// >{index +1}</li>