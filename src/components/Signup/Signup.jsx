import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ContextApp } from "../../ContextAPI";
import Btn from "../Btn/Btn";
import Input from "../Input/Input";
import Logo from "../Reuseable/Logo/Logo";
import Carouselcont from "../Reuseable/Slides/Slides";
import Plantable from "./Plantable";
import "./Signup.css";
import firebase from "firebase";
import { writeUserDoccuments } from "../../Functions";
const Signup = (props) => {
  const { email, setEmail, setUser } = useContext(ContextApp);
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("premium");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSignup = () => {
    if (email && password && active) {
      clearErrors();
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {})
        .catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
              setErrors({
                ...errors,
                email: err.message,
              });
              break;
            case "auth/invalid-email":
              setErrors({
                ...errors,
                email: err.message,
              });
              break;
            case "auth/weak-password":
              setErrors({
                ...errors,
                password: err.message,
              });
              break;
            default:
              setErrors({
                ...errors,
                email: err.message,
              });
              setTimeout(() => {
                clearErrors();
              }, 4000);
          }
        });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          writeUserDoccuments(user, email, active);
        } else {
          setUser("");
        }
      });
    }
  };
  const slides = [
    {
      img: "https://i.imgur.com/HAFm9Km.png",
      title: "Finish setting up your account",
      text: "Netflix is personalized for you. Create a password to watch on any device at any time.",
      step: 1,
      slide1: true,
    },
    {
      title: "Create a password to start your membership",
      content: (
        <>
          <div className="signupform">
            <div className="signupcont">
              <p>Just a few more steps and you're done!</p>
              <p>We hate paperwork, too.</p>
            </div>
            <Input
              text="Email"
              value={email}
              setValue={setEmail}
              type="email"
            />
            <span className="error">{errors.email}</span>
            <Input
              text="Password"
              value={password}
              setValue={setPassword}
              type="password"
            />
            <span className="error">{errors.password}</span>
          </div>
        </>
      ),
      step: 1,
    },
    {
      img: "https://i.imgur.com/FezOYT6.png",
      title: "Choose your plan.",
      benefits: [
        "No commitments, cancel anytime.",
        "Everything on Netflix for one low price.",
        "Unlimited viewing on all your devices.",
      ],
      step: 2,
    },
    {
      plan: true,
      step: 3,
      title: "Choose a plan. You can always change or cancel.",
      content: (
        <Plantable
          active={active}
          setActive={setActive}
          handleSignup={handleSignup}
        />
      ),
    },
  ];
  const clearErrors = () => {
    setErrors({
      email: "",
      password: "",
    });
  };
  const slidesrow = slides.map((slide, i) => {
    if (slide.slide1) {
      return (
        <div className="slidesign flex slide1">
          <img src={slide.img} alt="" />
          <span>
            STEP <strong>1 </strong>OF <strong>{slides.length - 1}</strong>
          </span>
          <h2>{slide.title}</h2>
          <small>{slide.text}</small>
        </div>
      );
    } else if (slide.benefits) {
      return (
        <div className="slidesign flex benefits">
          <img src={slide.img} className="checkimg" alt="" />
          <span>
            STEP <strong>{slide.step}</strong> OF{" "}
            <strong>{slides.length - 1}</strong>
          </span>
          <h2>{slide.title}</h2>
          <div className="benefits flex">
            {slide.benefits.map((benefit) => {
              return (
                <div className="benefit flex">
                  <i className="fal fa-check"></i>
                  <span>{benefit}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className={`slidesign flex ${slide.plan ? "bigger" : ""}`}>
          <span>
            STEP <strong>{slide?.step}</strong> OF{" "}
            <strong>{slides.length - 1}</strong>
          </span>
          <h2>{slide.title}</h2>
          {slide.content}
        </div>
      );
    }
  });

  return (
    <div className="signup">
      <div className="signupheader flex">
        <Logo />
        <Link to="/signin">Sign In</Link>
      </div>
      <div className="register">
        <Carouselcont itemsrow={slidesrow} />
      </div>
    </div>
  );
};
export default Signup;
