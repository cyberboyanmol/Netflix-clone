import React, { useContext } from "react";
import { ContextApp } from "../../ContextAPI";
import Select from "./Select";

const Lngselect = () => {
  const options = [
    { text: "English", value: "en" },
    { text: "Hindi", value: "	hi" },
  ];
  const { lng, setLng } = useContext(ContextApp);
  return (
    <div>
      <Select
        className="lngselect"
        options={options}
        value={lng}
        setValue={setLng}
      />
      <i className="fal fa-globe"></i>
    </div>
  );
};
export default Lngselect;
