import React from 'react';
import { Routes , Route , BrowserRouter } from 'react-router-dom';
import Home from './Home/Home';
import Configurator from './Configurator/Configurator';
import Contact from './Contact/Contact';

export default function AppRoutes() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/configurator' element={<Configurator />} />
                <Route path='/contact' element={<Contact />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}
