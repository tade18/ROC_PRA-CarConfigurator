import React from 'react';
import { Routes , Route , BrowserRouter } from 'react-router-dom';
import Home from './Home/Home';
import Configurator from './Configurator/Configurator';
import Contact from './Contact/Contact';
import ModelCreateForm from "./ModelCreateForm/ModelCreateForm";
import ModelUpdateForm from "./ModelUpdateForm/ModelUpdateForm";
import ModelView from "./ModelView/ModelView";
import ModelList from "./ModelList/ModelList";
import CreatedModel from "./ModelCreateForm/CreatedModel";

export default function AppRoutes() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/configurator' element={<Configurator />} />
                <Route path='/contact' element={<Contact />} />
                <Route path="/createmodel" element={<ModelCreateForm />} />
                <Route path="/updatemodel/:id" element={<ModelUpdateForm />} />
                <Route path="/model/:id" element={<ModelView />} />
                <Route path="/models" element={<ModelList />} />
                <Route path="/createdmodel/:id" element={<CreatedModel />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}
