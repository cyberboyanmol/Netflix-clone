import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import VMoviecard from '../../Moviecard/Vmoviecard'
import Banner from '../Banner/Banner'
import './Allmovies.css'
import ReactLoading from 'react-loading';
import Loading from '../../../Reuseable/Loading/Loading'
import { ContextApp } from '../../../../ContextAPI'

const Mylist = (props) => {
  const { title} = props
  const {saved, watching} = useContext(ContextApp)
  const [limit, setLimit] = useState(20)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('All')
  
  const savedrow = saved?.filter(x=> x.watching === watching).slice(0, limit).map(movie=> {
    return (
      <VMoviecard tv={movie.tv} movie={movie} /> 
    )
  })
  
  useEffect(()=> {  

    setLimit(prev=> prev + 20)
   
  }, [page])
  const infinitScroll = () => {
    if((window.innerHeight + window.scrollY+30) >= document.body.offsetHeight) {
      setPage(prev=> prev + 1)
    }
  }
  useEffect(()=> {
    window.addEventListener('scroll', infinitScroll)
  }, [])

  return (
    <div className="allmovies">

      <Banner  filter={filter} setFilter={setFilter} array={saved} showfilter={true} filtertitle={title}/>
 
      <div className="innerallmovies">
        {savedrow.length !==0?savedrow:
        <div className='flexrow'>
          <h2 style={{color: '#fff'}}>No saved movies...</h2>
        </div>}
      </div>
      
    </div>
  )
}
export default Mylist 