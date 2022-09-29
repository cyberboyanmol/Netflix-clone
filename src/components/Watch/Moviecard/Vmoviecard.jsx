import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './Vmoviecard.css'
import axios from 'axios'
import Imgloaded from '../../Reuseable/Imgloaded/Imgloaded'
import Addtofavorite from '../../Reuseable/Addtofavorite/Addtofavorite'
import { ContextApp } from '../../../ContextAPI'
import useGetdetails from './Getdetails'
const VMoviecard = (props) => {
  const {movie, tv} = props
  const {saved, intheaters} = useContext(ContextApp)
  const details = useGetdetails(movie, tv)
  const link = '/watch/'

  return (
    <div className="vmoviecard" >
        <Link to={`/watch/${tv?'tv':'movie'}/${movie.id}`}>
          <div className="vmovieimgvid">
          <Imgloaded alt={details?.title} img={details?.images?.posters[0]?.file_path} />
          </div>
        </Link>
        
        <div className="vmoviecontrols">
          <Link to={`/watch/${tv?'tv':'movie'}/${movie.id}`}>
              <i className={'fal fa-play'}></i> 
             </Link>
            <Addtofavorite tv={tv} id={movie.id} issaved={saved.some(x=> x.id === movie.id)} className={`fa${saved.some(x=> x.id === movie.id)?'':'l'} fa-heart`} Tag={'i'}/>
           <i className={`fal fa-download`}></i>
         </div>
    </div>
  )
}
export default VMoviecard