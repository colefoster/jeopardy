import React from "react";
import intro from "./video/background_intro.webm";
import introMP4 from "./video/background_intro.mp4";


function BackgroundVideo() {
  const handleVideoEnd = () => {
    var myVideo = document.getElementById('bg-video');
    myVideo.currentTime = 7.5;
    myVideo.play();
  };

  function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  } 


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
      <source src={iOS() ? introMP4 : intro} type="video/mp4" />
    </video>
  );
}

export default BackgroundVideo;
