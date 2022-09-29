import axios from 'axios'
import React, { useEffect, useState } from 'react'
import VMoviecard from '../../Moviecard/Vmoviecard'
import Banner from '../Banner/Banner'
import './Allmovies.css'
import ReactLoading from 'react-loading';
import Loading from '../../../Reuseable/Loading/Loading'

const Popular = (props) => {
  const { title} = props
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('All')
  const popularrow = popular?.filter(x=> x.genre_ids.some(x=> x == filter) || filter === 'All').map(movie=> {
    return (
      <VMoviecard tv={movie.media_type==='tv'}  movie={movie} /> 
    )
  })
  
  useEffect(()=> {  
    setLoading(true)
   
      axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=b01f7a54e2ff090e41ca2c91f05e7159&page=${page}`)
      .then((resp)=> {
        setPopular([...popular, ...resp.data.results])
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

      <Banner  filter={filter} setFilter={setFilter} array={popular} showfilter={true} filtertitle={title}/>
 
      <div className="innerallmovies">
        {popularrow}
      </div>
      <Loading loading={true} type='spin'/>
    </div>
  )
}
export default Popular