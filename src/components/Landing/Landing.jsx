import React, { useContext } from "react";
import { ContextApp } from "../../ContextAPI";
import Btn from "../Btn/Btn";
import Logo from "../Reuseable/Logo/Logo";
import Lngselect from "../Select/Lngselect";
import Select from "../Select/Select";
import Footer from "./Footer/Footer";
import "./Landing.css";
import Preview from "./Preview/Preview";
import Questionsaccordions from "./Questionsaccordions";
import Rdy from "./Rdy";
import { Translator, Translate } from "react-auto-translate";
import { Link } from "react-router-dom";

const Landing = () => {
  const { lng, setLng } = useContext(ContextApp);
  const previews = [
    {
      class: "our-story-card animation-card watchOnTv",
      title: "Enjoy on your TV.",
      text: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
      content: (
        <>
          <div className="our-story-card-img-container">
            <div className="our-story-card-animation-container">
              <img
                alt=""
                className="our-story-card-img"
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
                data-uia="our-story-card-img"
              />
              <div className="our-story-card-animation">
              
                <video
                  className="our-story-card-video"
                  autoPlay
                  playsInline
                  muted
                  loop
                >
                  <source
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
                    type="video/mp4"
                  />
                </video>
                <div className="our-story-card-animation-text"></div>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      class: "our-story-card animation-card downloadAndWatch flipped",
      title: "Download your shows to watch offline.",
      text: "Save your favorites easily and always have something to watch.",
      content: (
        <>
          <div className="our-story-card-img-container">
            <div className="our-story-card-animation-container">
              <img
                alt=""
                className="our-story-card-img"
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
                data-uia="our-story-card-img"
              />
              <div className="our-story-card-animation">
                <div className="our-story-card-animation-image">
                  <img
                    alt=""
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
                  />
                </div>
                <div className="our-story-card-animation-text">
                  <div id="" className="text-0" data-uia="">
                    Stranger Things
                  </div>
                  <div id="" className="text-1" data-uia="">
                    Downloading...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Watch everywhere.",
      class: "our-story-card animation-card watchOnDevice",
      text: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.",
      content: (
        <>
          <div className="our-story-card-img-container">
            <div className="our-story-card-animation-container">
              <img
                alt=""
                className="our-story-card-img"
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
                data-uia="our-story-card-img"
              />
              <div className="our-story-card-animation">
                <video
                  className="our-story-card-video"
                  autoPlay
                  playsInline
                  muted
                  loop
                >
                  <source
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v"
                    type="video/mp4"
                  />
                </video>
                <div className="our-story-card-animation-text"></div>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      class: "our-story-card animation-card kidsValueProp flipped",
      title: "Create profiles for kids.",
      text: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
      content: (
        <>
          <div className="our-story-card-img-container">
            <div className="our-story-card-animation-container">
              <img
                alt=""
                className="our-story-card-img"
                src="https://occ-0-1382-999.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABdFTpLmANuJpYneLq8L5m7CunMCi8e8Nl4y7xaPVWzG3IeoDoq17egTQAthApKg_4sdRWdwuR8KadWu1frjL3JQImpwq.png?r=fcd"
                data-uia="our-story-card-img"
              />
              <div className="our-story-card-animation">
                <div className="our-story-card-animation-text"></div>
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  const previewsrow = previews.map((preview) => {
    return <Preview preview={preview} />;
  });

  return (
    <div className="landing">
      <div className="innerlandingbanner">
        <div className="backgroundeffect"></div>
        <div className="landingimg"></div>
        <div className="landingheader">
          <Logo />
          <div className="signin">
            <Lngselect />
            <Link to="signin">
              <Btn text="Sign In" className="br signinbtn" />
            </Link>
          </div>
        </div>
        <div className="landingtitle flex">
          <div className="extratext flex">
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h3>Watch anywhere. Cancel anytime.</h3>
          </div>
          <Rdy />
        </div>
      </div>
      <div className="previewrow">{previewsrow}</div>
      <div class="asked">
        <h1>Frequently Asked Questions</h1>
        <Questionsaccordions />
        <Rdy />
      </div>
      <Footer />
    </div>
  );
};
export default Landing;
