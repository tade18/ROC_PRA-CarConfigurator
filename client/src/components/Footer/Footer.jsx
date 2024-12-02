import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
        <div className="bg-black text-white py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <ul className="space-y-2">
                    <Link><li><div href="#home" className="hover:underline">Domů.</div></li></Link>
                    <Link><li><div href="#home" className="hover:underline">Modely.</div></li></Link>
                    <Link to={"/Configurator"}><li><div href="#home" className="hover:underline">Konfigurátor.</div></li></Link>
                    </ul>
                </div>

                <div className="flex justify-center mb-6 md:mb-0">
                    <img src={'./src/img/logo.png'} alt="Logo" className="h-12"/>
                </div>

                <div className="text-center md:text-right">
                    <ul className="space-y-2">
                    <li><a href="#contact" className="hover:underline">Kontaktujte nás</a></li>
                    <li><a href="#location" className="hover:underline">Kde nás naleznete?</a></li>
                    </ul>
                </div>
                </div>

                <div className="mt-6">
                <p className="text-sm">@TadeášKeller</p>
                </div>
            </div>
            </div>
    </>
  )
}
