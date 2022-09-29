import React, {useEffect} from 'react'
import Imgloaded from '../../Reuseable/Imgloaded/Imgloaded'
import useGetepisode from '../Moviecard/Getepisode'
import Movieperson from './Movieperson'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Tabs from '../../Reuseable/Tabs/Tabs';
import useGetdetails from '../Moviecard/Getdetails';

const Episodepage = (props) => {

  const {show, season, episodenumber} = props

  const details = useGetepisode(show, season, episodenumber)
  const seasoninfo = useGetdetails({id: show}, true)

  const trailersrow = seasoninfo?.videos?.results?.slice(0, 3).map(el=> {
    return (
      <iframe allow='fullscreen' allowFullScreen={true} title='Video' src={`https://www.youtube.com/embed/${el.key}`} frameborder="0"></iframe>

    )
  })
  const stillsrow = details?.images?.stills?.map(img=> {
    return (
      <Imgloaded className='hor' img={img.file_path}/> 
    )
  }) 

  const crewrow = details?.credits?.crew.map(person=> {
    return <Movieperson person={person} />
  })
  const castrow = details?.credits?.cast.map(person=> {
    return <Movieperson person={person} />
  })
  const gueststars = details?.credits?.guest_stars.map(person=> {
    return <Movieperson person={person} />
  })
  const tabs = [
    {
      link: 'backdrops',
      title: `Featured Images (${stillsrow?.length})`,
      content: stillsrow
    }
   
  ]
  const crewcasttabs = [
    {
      link: 'crew',
      title: `Crew (${crewrow?.length})`,
      content: crewrow
    },
    {
      link: 'cast',
      title: `Cast (${castrow?.length})`, 
      content: castrow
    },
    {
      link: 'stars',
      title: `Guest Stars (${gueststars?.length})`,
      content: gueststars
    }
  ]
  useEffect(()=> {
    console.log(details)
  }, []) 
  return ( 
    
    <div className="moviepage">
       <div className="moviedetails">
        <div className="mainbgimgdetail">
        <Imgloaded img={details?.images?.stills[0]?.file_path}/>
        </div>
      <div className="innermoviedetails flexrow">
      <div className="imgpart">
          <Imgloaded img={seasoninfo?.images?.posters[0]?.file_path}/>
        </div>
        <div className="leftpartmovie flex">
          <div className="upperleftpart">
          <h2>{details?.name}</h2>
          <div className="moredetails flexrow">
            <span>{details?.air_date}</span>
            <span>
              {seasoninfo?.genres?.map(genre=> {
                return genre.name
              }).join(', ')}
            </span>
            <span>Episode: {episodenumber}</span>
          </div>
          </div>
          <div className="about">
            <small>{details.overview}</small>
          </div>

          <div className="midpart">
              <div>
              <span style={{color: details?.vote_average>8?'var(--green)':(details?.vote_average<8 && details?.vote_average>6)?'yellow':'var(--red)'}}>User Rating</span>
               <div className="circle">
              <CircularProgressbar 
                value={(details?.vote_average*10)} 
                text={(details?.vote_average*10)?.toFixed(0)+'%'} 
                strokeWidth={5}
                styles={buildStyles({
                  textColor: details?.vote_average>8?'var(--green)':(details?.vote_average<8 && details?.vote_average>6)?'yellow':'var(--red)',
                  pathColor: details?.vote_average>8?'var(--green)':(details?.vote_average<8 && details?.vote_average>6)?'yellow':'var(--red)',
                  trailColor: '#141414',
                  backgroundColor: details?.vote_average>8?'var(--green)':(details?.vote_average<8 && details?.vote_average>6)?'yellow':'var(--red)',
                })}
                />
            </div>
              </div>
            {/* <Addtofavorite Tag='i' id={movie.id} className='fal fa-heart'/> */}
              <i className={`fal fa-download`}></i>
          </div>
        </div>
      </div>
      </div>

      <div className="trailercont">
      <h2>Trailers</h2>

          <div className="trailers">
            <iframe allow='fullscreen' allowFullScreen={true} title='Video' src={`https://www.youtube.com/embed/${seasoninfo?.videos?.results[0]?.key}`} frameborder="0"></iframe>
            <div className="othertrailers">
                {trailersrow}
            </div>
          </div>
      </div>
      <div className="featuredimgs trailercont tt">
        <h2>Media</h2>
        <Tabs links={tabs} initial={'backdrops'}/>
      </div>
      <div className="cast trailercont">
        <h2>Cast</h2>
        <div className="castrow">
        <Tabs links={crewcasttabs} initial={'crew'}/>
        </div>
      </div>
    </div>
  )
}
export default Episodepage