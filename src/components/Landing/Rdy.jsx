import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ContextApp } from "../../ContextAPI";
import Btn from "../Btn/Btn";
import Input from "../Input/Input";

const Rdy = (props) => {
  const { email, setEmail } = useContext(ContextApp);

  return (
    <div className="rdy flex">
      <h3>
        Ready to watch? Enter your email to create or restart your membership.
      </h3>
      <div className="rdycontrols flex">
        <Input
          type="email"
          value={email}
          text="Email address"
          setValue={setEmail}
          placeholder=""
        />
        <Link to="/signup">
          <Btn text="Get Started" icon="fal fa-chevron-right" />
        </Link>
      </div>
    </div>
  );
};
export default Rdy;
