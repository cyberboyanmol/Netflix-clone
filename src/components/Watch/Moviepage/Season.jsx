import React from 'react'
import { Link } from 'react-router-dom'
import useGetepisodes from '../Moviecard/Getepisodes'

const Season = (props) => {
  const {season, show} = props
  const episodes = useGetepisodes(show.id, season.season_number)
  const episodesrow = episodes?.episodes?.map(episode=> {
    return (
      <div className="episodeprev">
      <div className="episodename flex">
      <span className="num">{episode.episode_number}.</span> 
      <Link to={`/watch/tv/${show.id}/${season.season_number}/${episode.episode_number}`}>
        {episode.name}
      </Link>
      </div>
      <small className="episodedescrip">
      {episode.overview}
      </small>
      </div>
    )
  })
  return (
    <div className="seasoncont">
    <details className='appdetails'>
       <summary>{season.name}</summary>
       <div className="episodesrow">
          {episodesrow}
       </div>
     </details>

   </div>
  )
}
export default Season