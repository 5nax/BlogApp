import React, { useState, useEffect } from 'react'
import '../style/Slideshows.css'

function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = ['/images/blogging.jpg', '/images/Blogging-Platforms.jpeg']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className="slideshow-frame">
      <div className="slideshow">
        <div
          className="slide"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((img, index) => (
            <img src={img} alt={`Slide ${index + 1}`} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Slideshow
