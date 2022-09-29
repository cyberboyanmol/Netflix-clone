import React, { useContext } from "react";
import Banner from "./Banner/Banner";
import Navbar from "./Navbar/Navbar";
import "./Movies.css";
import Moviecard from "../Moviecard/Moviecard";
import { ContextApp } from "../../../ContextAPI";
import Movielist from "./Movierow/Movierow";
import Topcard from "../Moviecard/Topcard";
import Footer from "../../Landing/Footer/Footer";
const Movies = (props) => {
  const { type, title } = props;

  const {
    mostpopularmovies,
    coming,
    intheaters,
    mostpopulartv,
    toptv,
    lastestmovies,
    topratedmovies,
    moviebrowse,
    tvdiscover,
    saved,
    trending,
    trendingtv,
    netflixshows,
    topten,
    watching,
    watched,
  } = useContext(ContextApp);

  return (
    <div className="movies">
      <Banner tv={false} array={moviebrowse} />
      {watched.filter((x) => x.watching === watching).length !== 0 && (
        <Movielist
          movies={watched.filter((x) => x.watching === watching)}
          title="Watch Again"
        />
      )}
      {saved.filter((x) => x.watching === watching).length !== 0 && (
        <Movielist
          movies={saved.filter((x) => x.watching === watching)}
          title="Saved Movies & TV Shows"
        />
      )}
      <Movielist movies={trending} title="Trending Movies" />
      <Movielist movies={moviebrowse} title="Movies" />
      <Movielist movies={mostpopularmovies} title="Most Popular Movies" />
      <Movielist movies={topratedmovies} title="Top Rated Movies" />
      <Movielist
        Component={Topcard}
        movies={topten.slice(0, 10)}
        title="Top 10 Movies"
      />
      <Movielist movies={coming} title="Coming Soon" />
      <Movielist movies={intheaters} title="In Theaters" />
      <Movielist movies={netflixshows} tv title="Netflix Originals" />
      <Movielist movies={tvdiscover} tv title="TV Shows" />
      <Movielist movies={mostpopulartv} tv title="Most Popular TV Shows" />
      <Movielist movies={toptv} tv title="Top TV Shows" />
      <Footer />
    </div>
  );
};
export default Movies;
