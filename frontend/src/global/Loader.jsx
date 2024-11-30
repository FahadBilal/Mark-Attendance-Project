import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/Animation - 1732984540426.json";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "150px", width: "150px" }}
      />
    </div>
  );
};

export default Loader;
