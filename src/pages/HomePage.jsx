import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import "./HomePage.css";

const slides = [
  {
    id: 1,
    image: "/Images/img1.jpg",
    title: "Image 01",
    description:
      "A snow-capped mountain rising under a clear blue sky. A river flows in the foreground with dark blue, rippling water. Along the green riverbank, rows of pink cherry blossoms are in full bloom.",
  },
  {
    id: 2,
    image: "/Images/img2.jpg",
    title: "Image 02",
    description:
      "A modern city skyline at night, with tall skyscrapers and a prominent tower lit up against a deep blue sky. The colorful lights of the buildings create vivid reflections on the calm water in front. The whole scene feels lively and bright with a crisp, clear horizon.",
  },
  {
    id: 3,
    image: "/Images/img3.jpg",
    title: "Image 03",
    description:
      "A abstract painting filled with swirling patterns of turquoise, pink, orange, black, and white. The colors twist and blend like liquid, making a striking marbled effect. There is no clear subject, just flowing dynamic shapes and textures.",
  },
  {
    id: 4,
    image: "/Images/img4.jpg",
    title: "Image 04",
    description:
      "A Venn diagram comparing apples and oranges. Two overlapping circles list unique traits for each fruit, such as color and skin texture. In the overlapping center, shared qualities like being fruits that grow on trees and can be juiced are written.",
  },
  {
    id: 5,
    image: "/Images/img5.jpg",
    title: "Image 05",
    description:
      "A black-and-white portrait of an elderly man with wild, white hair. He has a mustache, deep-set eyes, and a thoughtful, slightly serious expression. He wears a textured buttoned coat, with the background softly blurred behind him.",
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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
