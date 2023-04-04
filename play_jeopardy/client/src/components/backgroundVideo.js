import React from "react";
import intro from "./video/background_intro.webm";



function BackgroundVideo() {
  const handleVideoEnd = () => {
    var myVideo = document.getElementById('bg-video');
    myVideo.currentTime = 7.5;
    myVideo.play();
  };

  return (
    <video id="bg-video"
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
      <source src={intro} type="video/mp4" />
    </video>
  );
}

export default BackgroundVideo;
