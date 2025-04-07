import React, { useRef } from 'react'
import emailjs from '@emailjs/browser'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

export default function ContactForm() {
  const formRef = useRef(null);

  const sendMail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_qrbz59r', 'template_u31ylpu', e.target, '4Nkl6HbYcE8Wmg_rJ');
    alert("Váš dotaz byl odeslán!");
    formRef.current.reset();
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-yellow-100 px-4">
        <form
          ref={formRef}
          onSubmit={sendMail}
          className="bg-yellow-300 p-8 rounded-xl shadow-xl w-full max-w-xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-black text-center">
            Neváhejte se nás zeptat
          </h2>

          <div className="mb-6">
            <input
              name="email_from"
              type="email"
              placeholder="Zadejte váš email"
              required
              className="w-full p-3 border-2 border-black rounded-md outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="mb-6">
            <textarea
              name="message"
              placeholder="Zde napište svůj dotaz..."
              rows="8"
              required
              className="w-full p-3 border-2 border-black rounded-md outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition duration-300"
            >
              Odeslat
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
