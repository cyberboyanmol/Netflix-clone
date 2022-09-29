import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextApp } from "../../../ContextAPI";
import Addtofavorite from "../../Reuseable/Addtofavorite/Addtofavorite";
import Imgloaded from "../../Reuseable/Imgloaded/Imgloaded";
import useGetdetails from "./Getdetails";

const Topcard = (props) => {
  const { saved } = useContext(ContextApp);
  const { movie, i } = props;
  const details = useGetdetails(movie, false);

  return (
    <div className="topmoviecard flex">
      <span className="index">{i + 1}</span>
      <Link className="imgsection" to={`/watch/${"movie"}/${movie.id}`}>
        <Imgloaded
          alt={details?.title}
          img={details?.images?.posters[0]?.file_path}
        />
        <div className="vmoviecontrols">
          <Link to={`/watch/${movie.id}`}>
            <i className={"fal fa-play"}></i>
          </Link>
          <Addtofavorite
            tv={false}
            id={movie.id}
            issaved={saved.some((x) => x.id === movie.id)}
            className={`fa${
              saved.some((x) => x.id === movie.id) ? "" : "l"
            } fa-heart`}
            Tag={"i"}
          />
          <i className={`fal fa-download`}></i>
        </div>
      </Link>
    </div>
  );
};
export default Topcard;
