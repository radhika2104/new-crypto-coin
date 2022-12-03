import React from "react";

const ProgressBar = ({ progress }) => {
  const progressPercent = progress * 100;
  //   console.log("progress:", progressPercent);
  const parentDiv = {
    height: "0.5rem",
    width: "100%",
    backgroundColor: "whitesmoke",
    borderRadius: "40",
  };
  const childDiv = {
    height: "0.5rem",
    width: `${progressPercent}%`,
    backgroundColor: "#99ff66",
    borderRadius: "40",
  };
  return (
    <div style={parentDiv}>
      <div style={childDiv}></div>
    </div>
  );
};

export default ProgressBar;
