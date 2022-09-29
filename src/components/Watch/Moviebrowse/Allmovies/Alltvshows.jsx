import axios from 'axios'
import React, { useEffect, useState } from 'react'
import VMoviecard from '../../Moviecard/Vmoviecard'
import Banner from '../Banner/Banner'
import './Allmovies.css'
import ReactLoading from 'react-loading';
import Loading from '../../../Reuseable/Loading/Loading'

const Alltvshows = (props) => {
  const {title} = props
  const [tvshows, setTvshows] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('All')
  const moviesrow = tvshows?.filter(x=> x.genre_ids.some(x=> x == filter) || filter === 'All').map(movie=> {
    return (
      <VMoviecard tv={true} movie={movie} /> 
    )
  })

  useEffect(()=> {  
    setLoading(true)
 
      axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=b01f7a54e2ff090e41ca2c91f05e7159&language=en-US&page=${page}`).then(resp=> {
        setTvshows([...tvshows, ...resp.data.results])
        setLoading(false)
      })

      .catch(err=> {
        console.log(err)
        setLoading(false)

      })
    
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

      <Banner tv={true} filter={filter} setFilter={setFilter} array={tvshows} showfilter={true} filtertitle={title}/>
 
      <div className="innerallmovies">
        {moviesrow}
      </div>
      <Loading loading={true} type='spin'/>
    </div>
  )
}
export default Alltvshows