import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const Search = (props) => {
  const [active, setActive] = useState(false)
  const {modal, setModal, searched, setSearched} = props
  const history = useHistory()
  const [page, setPage] = useState(1)
  const location  = useLocation()
  const [loading, setLoading] = useState(false)
  const handleSearch = (e) => {
    if(e.target.value <=0) {
      history.push({
        search: ''
      })
    }
   if(e.target.value.length>0) {
    history.push({
      search:`?search=${e.target.value}`,
    })
    setModal(true)
     
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b500b7f81758d0ea6ef8e9df46c2718c&language=en-US&query=${location.search.split('?search=')[1]}&page=${page}&include_adult=false`)
    .then((resp)=> { 
      setSearched([...resp.data.results])
      setLoading(false)
    })
   }
   else {
     setModal(true)
   }
  }

  const infinitScroll = () => {
    if((window.innerHeight + window.scrollY+30) >= document.body.offsetHeight) {
      setPage(prev=> prev + 1)
    }
  }
  const handleClear = () => {
    
      setModal(false)
      history.push({
        search: ''
      })
      setModal(false)
      setSearched([])
      setActive(false)
  }
  useEffect(()=> { 
    window.addEventListener('scroll', infinitScroll)
  }, [])
  useEffect(()=> {
    if(location.search.length > 1) {
      setModal(true)
    }
  }, [])
  useEffect(()=> {
    if(modal) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'initial'
    }
  }, [modal])
  useEffect(()=> {
    if(!location.search.length) {
      setModal(false)
    }
  }, [location])
  return (
    <>
    <div className={`search ${active?'activesearch':''}`} >
      <i className='fal fa-search' onClick={()=> setActive(!active)}></i>
      <input  value={location.search.split('?search=')[1]}  type="text" placeholder='Titles, peaople, genres' onChange={(e)=> handleSearch(e)}/>
      <i className="fal fa-times xs" onClick={()=> handleClear()}></i>
    </div>
   
    </>
  )
}
export default Search