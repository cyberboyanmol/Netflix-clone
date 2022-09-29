import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Moviecard.css'
import axios from 'axios'
import Imgloaded from '../../Reuseable/Imgloaded/Imgloaded'
const Moviecard = (props) => {
  const {movie} = props

  const [details, setDetails] = useState('')

  useEffect(()=> {
    if(movie.id) {
      axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=b01f7a54e2ff090e41ca2c91f05e7159&append_to_response=videos,images`).then(resp=> {
        setDetails(resp.data)
      })
    }
  }, [movie])

  return (
    <div className="moviecard" >
        <Link to={`/watch/${movie.id}`}>  
        <div className="movieimgvid">
          <Imgloaded img={details?.images?.backdrops[0]?.file_path} />
         <iframe  
         src="https://www.youtube.com/embed/Nt9L1jCKGnE?autoplay=1&mute=1&controls=0&loop=1"  title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        </Link>
        <div className="moviecardcontrols">
          <div className="uppersect flex sb">
            <div className="leftups flex">
            <Link to={`/watch/${movie.id}`}>
            <i className='fa fa-play'></i>
            </Link>
            <i className="fa fa-plus"></i>
            <i className="fa fa-thumbs-up"></i>
            <i className="fal fa-thumbs-down"></i>
            </div>
            <div className="rightups">
              <i className='fal fa-chevron-down'></i>
            </div>
          </div>
          <div className="btmsect">
              <div className='flex'>
                <span className="green">New</span>
                <span className="boxed">TV-MA</span>
                <span className="tim">2h 15mmin</span>
                <span className="boxed">HD</span>
              </div>
              <div className="genres flex">
                <span>Offbeat</span>
                <span>Psychological</span>
                <span>Intimate</span>
              </div>
          </div>
        </div>
    </div>
  )
}
export default Moviecard