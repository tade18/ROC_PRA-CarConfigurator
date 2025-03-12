import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

export default function LoginForm() {
  return (
    <>
    <Header />
        <div className="flex flex-col justify-center items-center min-h-screen bg-yellow-100">
        <h1 className="text-3xl mb-5">Přihlásit se jako správce</h1>
        <form className="bg-yellow-300 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-black">AdminID</h2>
            <input placeholder='id' className="w-full p-2 border-2 border-black rounded-md outline-none focus:ring-2 focus:ring-black"></input>
            <h2 className="mt-5 text-2xl font-bold mb-4 text-black">Heslo</h2>
            <input placeholder='heslo' type="password" className="w-full p-2 border-2 border-black rounded-md outline-none focus:ring-2 focus:ring-black"></input>
            <div className='text-right mt-5'>
            <button className="px-6 py-2 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition"><span>Vstoupit</span></button>
            </div>
        </form>
        </div>
    <Footer />
    </>
  )
}
