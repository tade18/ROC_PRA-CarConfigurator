import React from 'react'
import './ConfiguratorAd.css'
import { Link } from 'react-router-dom'

export default function ConfiguratorAd() {
  return (
    <>
        <div className="bg-yellow-300 flex items-center justify-between w-full h-20 pl-10">
      <div className="text-black text-4xl font-bold">
        Nový vůz z pohodlí domova.
      </div>
      <Link to={"/Configurator"}><button className='mr-10'><span>Objevit</span></button></Link>
    </div>
    </>
  )
}
