import React, { createContext, useEffect, useRef, useState } from "react";
import firebase from "firebase";
import { db } from "./Fire";
import axios from "axios";

export const ContextApp = createContext();
const user = firebase.auth().currentUser;
const ContextAppProvider = (props) => {
  const [email, setEmail] = useState("");
  const [lng, setLng] = useState("en");
  const [user, setUser] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [saved, setSaved] = useState([]);
  const [watching, setWatching] = useState("");
  const [bannermovie, setBannermovie] = useState({});
  const [editing, setEditing] = useState("");
  const [watched, setWatched] = useState([]);
  //movies
  const [topten, setTopten] = useState([]);
  const [moviebrowse, setMoviebrowse] = useState([]);
  const [mostpopularmovies, setMostpopularmovies] = useState([]);
  const [lastestmovies, setLatestmovies] = useState([]);
  const [coming, setComing] = useState([]);
  const [intheaters, setIntheaters] = useState([]);
  const [topratedmovies, setTopratedmovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [trendingtv, setTrendingtv] = useState([]);
  //shows
  const [tvdiscover, setTvdiscover] = useState([]);
  const [mostpopulartv, setMostpopulartv] = useState([]);
  const [toptv, setToptv] = useState([]);
  const [netflixshows, setNetflixshows] = useState([]);
  const [kids, setKids] = useState(false);
  const handleLogout = () => {
    firebase.auth().signOut();
    window.location.reload();
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };
  useEffect(() => {
    user &&
      db
        .collection("users")
        .doc(user.uid)
        .onSnapshot((snap) => {
          const userdata = snap.data();
          setProfiles(userdata.people);
          setSaved(userdata.saved);
          setWatched(userdata.watched);
        });
  }, [user]);
  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(lng));
  }, [lng]);
  useEffect(() => {
    authListener();
  }, []);

  useEffect(() => {
    if (topratedmovies.length === 0) {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=b01f7a54e2ff090e41ca2c91f05e7159&language=en-US&page=1"
        )
        .then((resp) => {
          setTopratedmovies(resp.data.results);
        });
    }
    if (topten.length === 0) {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=b01f7a54e2ff090e41ca2c91f05e7159&language=en-US&page=2"
        )
        .then((resp) => {
          setTopten(resp.data.results);
        });
    }
    if (moviebrowse.length === 0) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/movie?api_key=b01f7a54e2ff090e41ca2c91f05e7159&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=3&with_watch_monetization_types=flatrate"
        )
        .then((resp) => {
          setMoviebrowse(resp.data.results);
        });
    }
    if (coming.length === 0) {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=b01f7a54e2ff090e41ca2c91f05e7159&language=en-US&page=1"
        )
        .then((resp) => {
          setComing(resp.data.results);
        });
    }
    if (mostpopularmovies.length === 0) {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=b01f7a54e2ff090e41ca2c91f05e7159&language=en-US&page=1"
        )
        .then((resp) => {
          setMostpopularmovies(resp.data.results);
        });
    }
    if (intheaters.length === 0) {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=b01f7a54e2ff090e41ca2c91f05e7159&language=en-US&page=1"
        )
        .then((resp) => {
          setIntheaters(resp.data.results);
        });
    }
    if (trending.length === 0) {
      axios
        .get(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=b01f7a54e2ff090e41ca2c91f05e7159"
        )
        .then((resp) => {
          setTrending(resp.data.results);
        });
    }

    if (mostpopulartv.length === 0) {
      axios
        .get(
          "https://api.themoviedb.org/3/tv/popular?api_key=b01f7a54e2ff090e41ca2c91f05e7159&language=en-US&page=2"
        )
        .then((resp) => {
          setMostpopulartv(resp.data.results);
        });
    }
    if (toptv.length === 0) {
      axios
        .get(
          "https://api.themoviedb.org/3/tv/top_rated?api_key=b01f7a54e2ff090e41ca2c91f05e7159&language=en-US&page=1"
        )
        .then((resp) => {
          setToptv(resp.data.results);
        });
    }
    if (tvdiscover.length === 0) {
      axios
        .get(
          "https://api.themoviedb.org/3/tv/popular?api_key=b01f7a54e2ff090e41ca2c91f05e7159&language=en-US&page=1"
        )
        .then((resp) => {
          setTvdiscover(resp.data.results);
        });
    }
    if (trendingtv.length === 0) {
      axios
        .get(
          "https://api.themoviedb.org/3/trending/tv/day?api_key=b01f7a54e2ff090e41ca2c91f05e7159"
        )
        .then((resp) => {
          setTrendingtv(resp.data.results);
        });
    }
    if (netflixshows.length === 0) {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/tv?with_networks=213&api_key=b01f7a54e2ff090e41ca2c91f05e7159&page=1"
        )
        .then((resp) => {
          setNetflixshows(resp.data.results);
          // console.log(resp.data.results);
        });
    }
    axios
      .get(
        "https://api.themoviedb.org/3/movie/latest?api_key=b01f7a54e2ff090e41ca2c91f05e7159&language=en-US"
      )
      .then((resp) => {
        setBannermovie(resp.data);
      });
  }, []);

  return (
    <ContextApp.Provider
      value={{
        lng,
        setLng,
        email,
        setEmail,
        user,
        setUser,
        profiles,
        watching,
        setWatching,
        mostpopularmovies,
        coming,
        intheaters,
        mostpopulartv,
        toptv,
        lastestmovies,
        topratedmovies,
        saved,
        moviebrowse,
        tvdiscover,
        trending,
        trendingtv,
        netflixshows,
        editing,
        setEditing,
        handleLogout,
        kids,
        setKids,
        topten,
        watched,
        setWatched,
      }}
    >
      {props.children}
    </ContextApp.Provider>
  );
};
export default ContextAppProvider;
