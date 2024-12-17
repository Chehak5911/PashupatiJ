import React from "react";
import Slider from "react-slick"; // Import react-slick
import "slick-carousel/slick/slick.css"; // Slick styles
import "slick-carousel/slick/slick-theme.css"; // Slick theme styles

import "./imageSlider-styles.scss"; // Your custom styles
import { LeftArrowIcon, RightArrowIcon } from "@assets";

interface ImageSliderProps {
  images: string[]; // Array of image URLs
}

const CustomPrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "", zIndex: "10" }}
      onClick={onClick}
    >
      <LeftArrowIcon />
    </div>
  );
};

const CustomNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right:"0", zIndex: "10" }}
      onClick={onClick}
    >
      <RightArrowIcon />
    </div>
  );
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  // Slick slider settings
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Loop slides infinitely
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    arrows: true, // Show navigation arrows
    autoplay: true, // Auto slide
    autoplaySpeed: 3000, // 3-second interval
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="imageSlider__container">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="imageSlider__slide">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="imageSlider__image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
