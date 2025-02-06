import React from 'react'
import emailjs from '@emailjs/browser'

export default function ContactForm() {

    const sendMail = (e) =>{
        e.preventDefault();
            emailjs.sendForm('service_qrbz59r', 'template_u31ylpu', e.target, '4Nkl6HbYcE8Wmg_rJ');
            alert("Váš dotaz byl odeslán!");
    }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-yellow-100">
      <form className="bg-yellow-300 p-6 rounded-lg shadow-lg max-w-md w-full" onSubmit={sendMail}>

        <h2 className="text-2xl font-bold mb-4 text-black">
          Neváhejte se nás zeptat..
        </h2>

        <div className="mb-4">
          <input name='email_from' type="email" placeholder="..sem zadejte váš email.." className="w-full p-2 border-2 border-black rounded-md outline-none focus:ring-2 focus:ring-black"/>
        </div>

        <div className="mb-4">
          <textarea name='message' placeholder="..a sem váš dotaz na nás" rows="5" className="w-full p-2 border-2 border-black rounded-md outline-none focus:ring-2 focus:ring-black"></textarea>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition">
            Odeslat
          </button>
        </div>
      </form>
    </div>
    </>
  )
}
