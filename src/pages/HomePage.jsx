import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import "./HomePage.css";

const slides = [
  {
    id: 1,
    image: "/Images/img1.png",
    title: "Image 01",
    description:
      "A tranquil moonlit river winds through a valley of cherry blossoms and wooden houses, framed by towering mountains and a glowing full moon.",
  },
  {
    id: 2,
    image: "/Images/img2.jpg",
    title: "Image 02",
    description:
      "A massive waterfall cascades down jungle-covered cliffs into a misty gorge, with distant rock spires and birds gliding through the humid air.",
  },
  {
    id: 3,
    image: "/Images/img3.jpg",
    title: "Image 03",
    description:
      "LAt sunset, a lone traveler stands by a rocky shore, gazing toward a bridge and a glowing city nestled between rolling hills and golden skies.",
  },
  {
    id: 4,
    image: "/Images/img4.jpg",
    title: "Image 04",
    description:
      "In a stormy, desolate landscape, a colossal alien structure rises from jagged rock, pulsing with red lights against dark clouds and distant mountains.",
  },
  {
    id: 5,
    image: "/Images/img5.jpg",
    title: "Image 05",
    description:
      "Gigantic stone statues stand atop sea cliffs above a misty bay and distant fortress city, while a robed figure watches from a rocky ledge.",
  },
];

const AUTO_PLAY_DELAY = 5000;

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const thumbnailRefs = useRef([]);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_DELAY);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentThumb = thumbnailRefs.current[activeIndex];
    if (!currentThumb) return;

    const rect = currentThumb.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
      currentThumb.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
  }, [activeIndex]);

  const goToSlide = (index) => {
    setActiveIndex(index);
    startAutoPlay();
  };

  const goNext = () => {
    goToSlide((activeIndex + 1) % slides.length);
  };

  const goPrev = () => {
    goToSlide((activeIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <Navbar />
      </header>
      {/* Hero section with Image */}
      <section className="homepage-hero">
        <div className="homepage-hero-list">
          {slides.map((slide, index) => (
            <article
              key={slide.id}
              className={`homepage-hero-item ${index === activeIndex ? "active" : ""
                }`}
            >
              <img src={slide.image} alt={slide.title} />
              <div className="hero-slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Image controls */}
        <div className="homepage-hero-arrows">
          <button type="button" onClick={goPrev}>
            {"<"}
          </button>
          <button type="button" onClick={goNext}>
            {">"}
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="homepage-hero-thumbnails">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`homepage-hero-thumbnail ${index === activeIndex ? "active" : ""
                }`}
              onClick={() => goToSlide(index)}
              ref={(el) => (thumbnailRefs.current[index] = el)}
            >
              <img src={slide.image} alt={slide.title} />
              <div className="hero-thumbnail-content">Name Image</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
