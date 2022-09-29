import React, { useContext } from 'react'
import { timeConvert } from '../../../Functions'
import useGetdetails from '../Moviecard/Getdetails'
import './Moviepage.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Imgloaded from '../../Reuseable/Imgloaded/Imgloaded';
import Tabs from '../../Reuseable/Tabs/Tabs';
import Movieperson from './Movieperson';
import Addtofavorite from '../../Reuseable/Addtofavorite/Addtofavorite';
import useGetepisodes from '../Moviecard/Getepisodes';
import Season from './Season';
import { ContextApp } from '../../../ContextAPI';
import firebase from 'firebase'
import YouTube from 'react-youtube';
import { db } from '../../../Fire';

const  Tvpage = (props) => {
  const {user, watching, watched} = useContext(ContextApp)

  const {movie, tv} = props
  const details = useGetdetails(movie, tv)
  const opts = {
    playerVars: {
      allowFullScreen: 1
    }
  }
  const trailersrow = details?.videos?.results?.slice(0, 3).map(el=> {
    return (
      <YouTube 
        opts={opts}
        videoId={el.key}
        onEnd={()=> handleWatched()}
      />
    )
  })
  const backdroprow = details?.images?.backdrops?.map(img=> {
    return (
      <Imgloaded className='hor' img={img.file_path}/> 
    )
  }) 
  const postersrow = details?.images?.posters?.map(img=> {
    return (
      <Imgloaded className='ver' img={img.file_path}/> 
    )
  }) 
  const logosrow = details?.images?.logos?.map(img=> {
    return (
      <Imgloaded className='logoimg' img={img.file_path}/> 
    )
  })  
  const crewrow = details?.credits?.crew.map(person=> {
    return <Movieperson person={person} />
  })
  const castrow = details?.credits?.cast.map(person=> {
    return <Movieperson person={person} />
  })
  const tabs = [
    {
      link: 'backdrops',
      title: `Featured Images (${backdroprow?.length})`,
      content: backdroprow
    },
    {
      link: 'posters',
      title: `Posters (${postersrow?.length})`,
      content: postersrow
    },
    {
      link: 'logos',
      title: `Movie Logos (${logosrow?.length})`,
      content: logosrow
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
    }
  ]

  const seasonsrow = details?.seasons?.map(season=> {
    return ( 
      <Season season={season} show={movie}/>
    )
  })
  
  const handleWatched = () => {
    if(!watched.some(x=> x.id === movie.id)) {

      db.collection('users').doc(user.uid).update({
        watched: firebase.firestore.FieldValue.arrayUnion({
          id: movie.id,
          watching,
          tv
        })
      })
    }
  }
  return ( 
    
    <div className="moviepage">
       <div className="moviedetails">
        <div className="mainbgimgdetail">
        <Imgloaded img={details?.images?.backdrops[0]?.file_path}/>
        </div>
      <div className="innermoviedetails flexrow">
      <div className="imgpart">
          <Imgloaded img={details?.images?.posters[0]?.file_path}/>
        </div>
        <div className="leftpartmovie flex">
          <div className="upperleftpart">
          <h2>{details?.name}</h2>
          <div className="moredetails flexrow">
            <span>{details?.first_air_date}</span>
            <span>
              {details?.genres?.map(genre=> {
                return genre.name
              }).join(', ')}
            </span>
            <span>Seasons: {details?.number_of_seasons}</span>
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
            <Addtofavorite Tag='i' id={movie.id} className='fal fa-heart'/>
              <i className={`fal fa-download`}></i>
          </div>
        </div>
      </div>
      </div>
      <div className="trailercont episodes">
        <h2>Seasons & Episodes</h2>
        <div className="seasonsrow">
          {seasonsrow}
        </div>
      </div>
      <div className="trailercont">
      <h2>Trailers</h2>

          <div className="trailers">
          <YouTube 
              opts={opts}
              videoId={details?.videos?.results[0]?.key}
              id='maintrailer'
              className='firsttrailer'
              onEnd={()=> handleWatched()}
              />            <div className="othertrailers">
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
export default Tvpage