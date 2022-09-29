import "./styles.css";
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import ScrollToTop from "./components/ScrollToTop";
import Landing from "./components/Landing/Landing";
import {Translator, Translate} from 'react-auto-translate';
import Signup from "./components/Signup/Signup";
import Login from "./components/Landing/Login/Login";
import { ContextApp } from "./ContextAPI";
import Watch from "./components/Watch/Watch";


export default function App() {
  const {user} = useContext(ContextApp)
  return (
    <Router>
    
      <ScrollToTop />
          <Switch>
         <Route exact path='/'>
              <Landing />
              {user &&  <Redirect to='/watch'/> }
          </Route>
          <Route  path='/watch'>
              <Watch />
          </Route>
          <Route path='/signup'>
            <Signup />
            {user &&  <Redirect to='/watch'/> }

          </Route>
          <Route path='/signin'>
            <Login />
            {user &&  <Redirect to='/watch'/> }
          </Route>
          <Route>
            <Redirect exact to='/'/>
          </Route>
      </Switch>
    </Router>
  );
}
