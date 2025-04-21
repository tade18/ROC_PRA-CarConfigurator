import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function AdminPage() {
  const isAdmin = !!localStorage.getItem("token");
  const { logout } = useAuth();

  const handleLogout = () =>{
    logout();
    alert("Správce byl úspěšně odhlášen");
  }
  
  if (isAdmin) {
    return (
      <>
        <Header />
        <div className="flex justify-center flex-col items-center min-h-screen bg-yellow-100">
          <div className="mx-auto w-1/2 p-8 bg-white shadow-lg rounded-xl">
            <h1 className="text-3xl mb-5">Spravovat aplikaci</h1>

            <Link to={"/createmodel"}>
              <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-2">
                <h3>Vytvořit konfiguraci</h3>
              </div>
            </Link>
            <Link to={"/adminmodels"}>
              <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-2">
                <h3>Správa konfigurací</h3>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
            >
              Odhlásit se
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
