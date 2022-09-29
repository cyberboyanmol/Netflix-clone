import React from 'react'
import { Link } from 'react-router-dom'
import { convertDate } from '../../../../Functions'
import Imgloaded from '../../../Reuseable/Imgloaded/Imgloaded'
import useGetdetails from '../../Moviecard/Getdetails'

const Notimovie = (props) => {
  const {movie} = props
  const details = useGetdetails(movie, false)
  return ( 
    <div className="notimovie flex">
        <Link className="leftnoti" to={`/watch/movie/${movie.id}`}>
          <Imgloaded alt={details?.title} img={details?.images?.posters[0]?.file_path} />
        </Link>
        <div className="rightnoti">
        <p>{details?.title} Is In Theaters Starting{' '}
        {convertDate(new Date(Date.parse(details.release_date)), true)}
        </p>
        </div>
    </div>
  )
}
export default Notimovie