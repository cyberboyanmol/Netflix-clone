import axios from "axios";
import React, { useEffect, useState } from "react";
import VMoviecard from "../../Moviecard/Vmoviecard";
import Banner from "../Banner/Banner";
import "./Allmovies.css";
import ReactLoading from "react-loading";
import Loading from "../../../Reuseable/Loading/Loading";

const Netflixoriginals = (props) => {
  const { title } = props;
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const moviesrow = movies
    ?.filter((x) => x.genre_ids.some((x) => x == filter) || filter === "All")
    .map((movie) => {
      return <VMoviecard tv movie={movie} />;
    });

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?with_networks=213&api_key=b01f7a54e2ff090e41ca2c91f05e7159&page=${page}`
      )
      .then((resp) => {
        setMovies([...movies, ...resp.data.results]);
      })
      .catch((err) => {});
  }, [page]);
  const infinitScroll = () => {
    if (
      window.innerHeight + window.scrollY + 30 >=
      document.body.offsetHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", infinitScroll);
  }, []);

  return (
    <div className="allmovies">
      <Banner
        filter={filter}
        setFilter={setFilter}
        array={movies}
        showfilter={true}
        filtertitle={title}
      />

      <div className="innerallmovies">{moviesrow}</div>
      <Loading loading={true} type="spin" />
    </div>
  );
};
export default Netflixoriginals;
