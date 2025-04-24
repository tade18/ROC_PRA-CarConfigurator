import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // ikony
import "./Header.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  //zjistuje jestli je prihlaseny spravce
  const isAdmin = !!localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Hlavní horní pruh */}
      <div className={`fixed top-0 left-0 w-full z-50 transition-all absolute duration-600 ${isScrolled ? "h-0 opacity-0" : "h-auto opacity-100"}`}>
        <div className="bg-black text-white flex items-center justify-between px-4 py-3">
          <div className="w-12 h-12">
            <Link to={"/"}>
              <img src={"../logo/logo.png"} alt="logo" className="h-full w-auto" />
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to={"/"}>
              <div className="hover:text-yellow-300 font-bold">Domů</div>
            </Link>
            <Link to={"/models"}>
              <div className="hover:text-yellow-300 font-bold">Modelová řada</div>
            </Link>
            {isAdmin && (
              <Link to={"/adminpage"}>
                <div className="text-sm bg-yellow-300 text-black px-3 py-1 rounded ml-4">Admin přihlášen</div>
              </Link>
            )}
          </nav>

          {/* Hamburger menu */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <div className="bg-yellow-300 h-5"></div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-black text-white px-4 py-4 flex flex-col space-y-4">
            <Link to={"/"} onClick={() => setMobileMenuOpen(false)}>
              <div className="hover:text-yellow-300 font-bold">Domů</div>
            </Link>
            <Link to={"/models"} onClick={() => setMobileMenuOpen(false)}>
              <div className="hover:text-yellow-300 font-bold">Modelová řada</div>
            </Link>
            {isAdmin && (
              <Link to={"/adminpage"} onClick={() => setMobileMenuOpen(false)}>
                <div className="text-sm bg-yellow-300 text-black px-3 py-1 rounded font-semibold">Admin přihlášen</div>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* část která se zobrazí po scrollnutí*/}
      <div className={`fixed top-0 left-0 w-full bg-yellow-300 text-black justify-center py-2 z-40 transition-all duration-300 ${isScrolled ? "flex" : "hidden"}`}>
        <div className="flex space-x-8">
          <Link to={"/"}>
            <div className="hover:text-gray-400 font-bold">Domů</div>
          </Link>
          <Link to={"/models"}>
            <div className="hover:text-gray-400 font-bold">Modelová řada</div>
          </Link>
        </div>
      </div>
    </>
  );
}