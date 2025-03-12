import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

export default function Error() {
  return (
    <>
    <Header />
        <div className='flex flex-col justify-center items-center min-h-screen bg-yellow-100'>
            <h1 className='text-4xl font-bold'>Nastala chyba :-/</h1>
        </div>
    <Footer />
    </>
  )
}
