import React, { useContext, useState } from 'react'
import { avatars } from '../../Arrays'
import { ContextApp } from '../../ContextAPI'
import { db } from '../../Fire'
import Input from '../Input/Input'
import Logo from '../Reuseable/Logo/Logo'
import Lngselect from '../Select/Lngselect'
import './Watch.css'
import firebase from 'firebase'
import Movies from './Moviebrowse/Movies'
import Account from './Accountbrowse/Account'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import Navbar from './Moviebrowse/Navbar/Navbar'
import Allmovies from './Moviebrowse/Allmovies/Allmovies'
import Alltvshows from './Moviebrowse/Allmovies/Alltvshows'
import Moviepage from './Moviepage/Moviepage'
import Tvpage from './Moviepage/Tvpage'
import Episodepage from './Moviepage/Episodepage'
import Popular from './Moviebrowse/Allmovies/Popular'
import Netflixoriginals from './Moviebrowse/Allmovies/Netflixoriginals'
import Mylist from './Moviebrowse/Allmovies/Mylist'
const Watch = () => {
  const {watching, intheaters} = useContext(ContextApp)
  const location = useLocation()
  let split = location.pathname.split('/')
  const renderMovieRoute = () => {
    
      const Tag = split[2]==='tv'?Tvpage:Moviepage
      return (
        <Route exact path={`/watch/${split[2]}/${split[3]}`}>
            <Tag tv={split[2]==='tv'?true:false} movie={{id: split[3]}} />
        </Route>
      )
    
  }
  const renderEpisodeRoute = () => {
    let show = split[3]
    let episodenumber = split[5]
    let season = split[4]
    return (
      <Route path={`/watch/tv/${show}/${season}/${episodenumber}`}>
          <Episodepage show={show} season={season} episodenumber={episodenumber} />
      </Route>
    )
  }
  return (
    <div className='watch'>
      {
        watching?
        <>
        <Navbar />

        <Switch>
          <Route exact path='/watch'>
            <Movies type={'all'}/>
          </Route>
          <Route path='/watch/shows'>
            <Alltvshows tv type='shows' title='TV Shows'/>
          </Route>
          <Route path='/watch/movies'>
              <Allmovies type='movies' title='Movies'/>
          </Route>
          <Route path='/watch/new-popular'>
            <Popular title='New & Popular'/>
          </Route>
          <Route path='/watch/netflix-originals'>
            <Netflixoriginals title='Netflix Originals' />
          </Route>
          <Route path='/watch/saved'>
            <Mylist title='Saved Movies & TV Shows'/>
          </Route>
         {renderMovieRoute()}
          {renderEpisodeRoute()}
        </Switch>
        </>
        : 
        <Account />
      }
    </div>
  )
}
export default Watch