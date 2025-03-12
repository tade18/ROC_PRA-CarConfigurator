import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'

export default function AdminPage() {
  return (
    <>
        <Header />
        <div className="flex justify-center flex-col items-center min-h-screen bg-yellow-100">
            <div className='mx-auto w-1/2 p-8 bg-white shadow-lg rounded-xl'>
            <h1 className="text-3xl mb-5">Spravovat aplikaci</h1>

                <Link to={"/createmodel"}>
                    <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-2">
                        <h3>Vytvořit konfiguraci</h3>
                    </div>
                </Link>
                <Link to={"/models"}>
                    <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-2">
                        <h3>Správa konfigurací</h3>
                    </div>
                </Link>
                
                
                <Link to={"/"}><button className='px-6 py-2 mt-10 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition'><span>Návrat</span></button></Link>
            </div>
        </div>
        <Footer />
    </>
  )
}
