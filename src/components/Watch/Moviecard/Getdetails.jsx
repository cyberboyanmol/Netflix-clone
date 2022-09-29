import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetdetails = (movie, tv) => {
  const [details, setDetails] = useState("");
  useEffect(() => {
    if (movie) {
      axios
        .get(
          `https://api.themoviedb.org/3/${tv ? "tv" : "movie"}/${
            movie.id
          }?api_key=b01f7a54e2ff090e41ca2c91f05e7159&append_to_response=videos,images,credits`
        )
        .then((resp) => {
          // console.log(resp.data);
          setDetails(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [movie]);

  return details;
};
export default useGetdetails;
