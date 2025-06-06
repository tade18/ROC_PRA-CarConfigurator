import React from 'react';
import { Routes , Route , BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Home from './Home/Home';
import Configurator from './Configurator/Configurator';
import Contact from './Contact/Contact';
import ModelCreateForm from "./ModelCreateForm/ModelCreateForm";
import ModelUpdateForm from "./ModelUpdateForm/ModelUpdateForm";
import ModelView from "./ModelView/ModelView";
import ModelList from "./ModelList/ModelList";
import CreatedModel from "./ModelCreateForm/CreatedModel";
import AdminPage from './AdminPage/AdminPage';
import Error from './Error/Error';
import UserModelList from './UserModelList/UserModelList';
import Login from './Login/Login';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

export default function AppRoutes() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/configurator/:id' element={<Configurator />} />
                <Route path='/contact' element={<Contact />} />
                <Route path="/createmodel" element={<PrivateRoute><ModelCreateForm /></PrivateRoute>} />
                <Route path="/updatemodel/:id" element={<ModelUpdateForm />} />
                <Route path="/model/:id" element={<ModelView />} />
                <Route path="/adminmodels" element={<ModelList />} />
                <Route path="/models" element={<UserModelList />} />
                <Route path="/createdmodel/:id" element={<CreatedModel />} />
                <Route path="/login" element={<Login />} />
                <Route path='/adminpage' element={<PrivateRoute><AdminPage /></PrivateRoute>}/>
                <Route path='/*' element={<Error />}/>
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}
