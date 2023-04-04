import React from "react";
import loop from "./video/background_loop.webm";
import intro from "./video/background_intro.webm";

let video = intro;

function BackgroundVideo() {
    console.log("BackgroundVideo() called");
  const handleVideoEnd = () => {
    video = loop;
  };

  return (
    <video
      autoPlay
      muted
      playsInline
      onEnded={handleVideoEnd}
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: "-1",
      }}
    >
      <source src={video} type="video/mp4" />
    </video>
  );
}

export default BackgroundVideo;
