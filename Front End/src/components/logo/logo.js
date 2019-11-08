import React from "react";
import Tilt from "react-tilt";
import "./logo.css";
import Music from "./music.png";

const logo = () => {
  return (
    <div
      style={{
        width: "150px",
        height: "150px",
        display: "inline-block",
        margin: "0px"
      }}
    >
      <img style={{ paddingTop: "50px" }} alt="logo" src={Music} />
    </div>
  );
};

export default logo;
