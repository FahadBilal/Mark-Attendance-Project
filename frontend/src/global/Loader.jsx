import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from '../assets/Animation - 1732984540426.json'
const Loader = ({className}) => {
  return (
    <div className={`flex justify-center items-center min-h-screen w-full bg-pink-500 z-50 ${className}`}>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "300px", width: "300px" }}
      >
      </Player>
    </div>
  );
};

export default Loader;
