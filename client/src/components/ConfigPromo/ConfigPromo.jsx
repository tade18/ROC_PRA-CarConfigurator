import React from 'react'
import { Link } from 'react-router-dom'

export default function ConfigPromo() {
  return (
    <>
        <div className="bg-yellow-300 flex items-center justify-between w-full h-20 pl-10">
      <div className="text-black text-md font-bold xl:text-5xl ">
        Nový vůz z pohodlí domova.
      </div>
      <Link to={"/models"}><button className='px-6 py-2 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition'><span>Konfigurovat model</span></button></Link>
    </div>
    </>
  )
}
