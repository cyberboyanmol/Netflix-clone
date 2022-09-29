import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ContextApp } from "../../../../ContextAPI";
import { findProfile } from "../../../../Functions";
import Logo from "../../../Reuseable/Logo/Logo";
import VMoviecard from "../../Moviecard/Vmoviecard";
import Dropdown from "./Dropdown";
import "./Navbar.css";
import Notimovie from "./Notimovie";
import Search from "./Search";

const Navbar = () => {
  const {
    profiles,
    watching,
    setWatching,
    setEditing,
    handleLogout,
    setKids,
    intheaters,
  } = useContext(ContextApp);
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(false);
  const [searched, setSearched] = useState([]);
  const [accdrop, setAccdrop] = useState(false);
  const links = [
    {
      text: "Home",
      link: "",
    },
    {
      text: "TV Shows",
      link: "shows",
    },
    {
      text: "Movies",
      link: "movies",
    },
    {
      text: "New & Popular",
      link: "new-popular",
    },
    {
      text: "Netflix Originals",
      link: "netflix-originals",
    },
    {
      text: "My List",
      link: "saved",
    },
  ];
  const profilesrow = profiles
    ?.filter((x) => x.nameid !== watching)
    .map((profile) => {
      return (
        <div
          onClick={() => setWatching(profile.nameid)}
          className="profileswitch flex"
        >
          <img src={profile.img} alt="" />
          <span>{profile.name}</span>
        </div>
      );
    });
  const linksrow = links.map((link) => {
    return (
      <NavLink exact activeClassName="activenavlink" to={`/watch/${link.link}`}>
        {link.text}
      </NavLink>
    );
  });
  const handleScroll = () => {
    if (window.scrollY > 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  const intheatersrow = intheaters?.slice(0, 10).map((el) => {
    return <Notimovie movie={el} />;
  });
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={`navbar flexrow sb ${
          scrolled || modal ? "scrollednav" : ""
        }`}
      >
        <div className="leftpartnav flexrow">
          <Logo />
          <div className="browsecont">
            <span className="browseresp">
              Browse
              <i className="fal fa-chevron-down"></i>
            </span>
            <Dropdown row={linksrow} />
          </div>
          <div className="leftlinks flexrow">{linksrow}</div>
        </div>
        <div className="rightpartnav flexrow">
          <Search
            searched={searched}
            setSearched={setSearched}
            modal={modal}
            setModal={setModal}
          />
          <span>KIDS</span>
          <div className="notidrop profiledrop">
            <div className="bell">
              <i className="fa fa-bell"></i>
              <div className="bellred"></div>
            </div>
            <div className="noticont accountdropdown">{intheatersrow}</div>
          </div>
          <div className="profiledrop flexrow">
            <img src={findProfile(profiles, watching)?.img} alt="" />
            <i className="fal fa-chevron-down"></i>
            <div className="accountdropdown">
              {profilesrow}
              <span
                className="manageprofile"
                onClick={() => {
                  setWatching("");
                  setEditing(true);
                }}
              >
                Manage Profiles
              </span>
              <span
                onClick={() => setKids((prev) => !prev)}
                className="manageprofile"
              >
                Kids
              </span>
              <span onClick={() => handleLogout()} className="manageprofile">
                Sign out from Netflix
              </span>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <div className="searchmodal modal">
          <div className="innermodal">
            {searched?.map((el) => {
              return <VMoviecard movie={el} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
