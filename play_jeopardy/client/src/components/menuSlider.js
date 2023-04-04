import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./componentStyles.css"

const MainMenu = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 3,
      spacing: 15,
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider">
      <div className="keen-slider__slide number-slide1">PLAY</div>
      <div className="keen-slider__slide number-slide2">SIGN UP</div>
      <div className="keen-slider__slide number-slide3">LOG IN</div>
      <div className="keen-slider__slide number-slide4">OPTIONS</div>
      <div className="keen-slider__slide number-slide5">QUESTIONS</div>
      <div className="keen-slider__slide number-slide6">EXIT</div>
    </div>
  )
}
export default MainMenu;