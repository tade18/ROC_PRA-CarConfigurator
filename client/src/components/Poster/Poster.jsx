import React from 'react'
import { useState, useEffect } from 'react'

export default function Poster() {
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
        <div className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">
      <img src={'./src/img/posterCar.jpeg'} alt="Car poster" className="w-full h-full object-cover" style={{transform: `translateY(${scrollY * 0.5}px)`,}} />
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 text-white">
        <h1 className="text-3xl md:text-6xl font-bold">UTVÁŘÍME BUDOUCNOST.</h1>
        <p className="text-base md:text-2xl mt-2">Již dnes</p>
      </div>
    </div>
    </>
  )
}
