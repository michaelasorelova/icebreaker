import { useState, useEffect } from "react";
import Slider from "react-slick";
import { QuestionCard } from '../QuestionCard';

const NextArrow = ({ onClick }) => (
  <button
    className="custom-arrow right"
    aria-label="Další otázka"
    onClick={onClick}
  >
    <i className="fi fi-rr-angle-small-right" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="custom-arrow left"
    aria-label="Předchozí otázka"
    onClick={onClick}
  >
    <i className="fi fi-rr-angle-small-left" />
  </button>
);

export function QuestionSlider({ questions, onSlideChange }) {
  const [showArrows, setShowArrows] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setShowArrows(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    centerMode: true,
    infinite: false,
    centerPadding: "20px",
    slidesToShow: 1,
    swipeToSlide: true,
    speed: 500,
    arrows: showArrows,
    nextArrow: showArrows ? <NextArrow /> : null,
    prevArrow: showArrows ? <PrevArrow /> : null,
    beforeChange: (_, newIndex) => {
      if (onSlideChange) onSlideChange(newIndex);
    },
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {questions.map((question, index) => (
          <QuestionCard key={index} question={question.text} />
        ))}
      </Slider>
    </div>
  );
}