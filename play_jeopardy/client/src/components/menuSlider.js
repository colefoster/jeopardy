import React from "react"
import { Link } from 'react-router-dom';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "styles/MenuSliderStyles.css"

const MainMenu = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 3,
      spacing: 15,
    }
  })

  return (
    <>
    <div ref={sliderRef} className="keen-slider">
      <Link to="/play"  style={{ textDecoration: 'none' }}>
        <div className="keen-slider__slide number-slide1">PLAY</div>
      </Link>
      <Link to="/signup"  style={{ textDecoration: 'none' }}>
        <div className="keen-slider__slide number-slide1">SIGN UP</div>
      </Link>
      <Link to="/login"  style={{ textDecoration: 'none' }}>
        <div className="keen-slider__slide number-slide1">LOG IN</div>
      </Link>
      <Link to="/options"  style={{ textDecoration: 'none' }}>
        <div className="keen-slider__slide number-slide1">OPTIONS</div>
      </Link>
      <Link to="/questions"  style={{ textDecoration: 'none' }}>
        <div className="keen-slider__slide number-slide1">QUESTIONS</div>
      </Link>
      <Link to="/exit"  style={{ textDecoration: 'none' }}>
        <div className="keen-slider__slide number-slide1">EXIT</div>
      </Link>
    </div></>
  )
}
export default MainMenu;