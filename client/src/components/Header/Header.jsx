import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Token existuje => admin je přihlášen
  const isAdmin = !!localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all absolute duration-600 ${
          isScrolled ? "h-0 opacity-0" : "h-auto opacity-100"
        }`}
      >
        <div className="bg-black text-white flex items-center justify-between px-4 py-3">
          <div
            className={`transition-all duration-300 ${
              isScrolled ? "w-20 h-20" : "w-12 h-12"
            }`}
          >
            <Link to={"/"}>
              <img src={"../logo/logo.png"} alt="logo" />
            </Link>
          </div>
          <nav className="flex space-x-8 items-center">
            <Link to={"/"}>
              <div className="hover:text-yellow-300 font-bold header-transition-slow">
                Domů
              </div>
            </Link>
            <Link to={"/models"}>
              <div className="hover:text-yellow-300 font-bold header-transition-slow">
                Modelová řada
              </div>
            </Link>

            {isAdmin && (
              <Link to={"/adminpage"}>
                <div className="text-sm bg-yellow-300 text-black px-3 py-1 rounded font-semibold ml-4">
                  Admin přihlášen
                </div>
              </Link>
            )}
          </nav>
        </div>
        <div className="bg-yellow-300 h-5"></div>
      </div>

      <div
        className={`fixed top-0 left-0 w-full bg-yellow-300 text-black flex justify-center space-x-8 py-2 z-40 transition-all duration-300 ${
          isScrolled ? "flex" : "hidden"
        }`}
      >
        <Link to={"/"}>
          <div className="hover:text-gray-400 font-bold">Domů</div>
        </Link>
        <Link to={"/models"}>
          <div className="hover:text-gray-400 font-bold">Modelová řada</div>
        </Link>
      </div>
    </>
  );
}
