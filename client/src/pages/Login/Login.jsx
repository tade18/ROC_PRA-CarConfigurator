import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Login() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminId, password }),
    });

    const data = await response.json();
    if (response.ok) {
      login(data.token);
      navigate("/adminpage");
    } else {
      alert("Chyba při přihlášení: " + data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-yellow-100">
        <form
          className="bg-white p-6 rounded-lg shadow-lg w-1/3"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4">Admin přihlášení</h2>

          <input
            type="text"
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            name="adminId"
          />
          <input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            name="password"
          />

          <button
            type="submit"
            className="px-6 py-2 bg-black text-white font-bold rounded w-full"
          >
            Přihlásit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
