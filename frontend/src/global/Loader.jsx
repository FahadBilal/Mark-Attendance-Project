import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import animationData from '../assets/Animation - 1732984540426.json'
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-pink-500">
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
