import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createModel } from "../../models/model";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function ModelCreateForm() {
  const [formData, setFormData] = useState({
    name: "",
    basePrice: "",
    bodyType: "",
    colors: [],
    engines: [],
    extras: []
  });

  const [newColor, setNewColor] = useState({ name: "", price: "", rims: [] });
  const [newRim, setNewRim] = useState({ name: "", price: "", image: "" });
  const [newEngine, setNewEngine] = useState({ name: "", price: "", power: "", emissions: ""});
  const [newExtra, setNewExtra] = useState({ name: "", price: "", image: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e) => {
    setNewColor({ ...newColor, [e.target.name]: e.target.value });
  };

  const handleRimChange = (e) => {
    setNewRim({ ...newRim, [e.target.name]: e.target.value });
  };

  const handleEngineChange = (e) => {
    setNewEngine({ ...newEngine, [e.target.name]: e.target.value });
  };

  const handleExtraChange = (e) => {
    setNewExtra({ ...newExtra, [e.target.name]: e.target.value });
  };

  const addColor = () => {
    setFormData({ ...formData, colors: [...formData.colors, newColor] });
    setNewColor({ name: "", price: "", rims: [] });
  };

  const addRim = () => {
    setNewColor({ ...newColor, rims: [...newColor.rims, newRim] });
    setNewRim({ name: "", price: "", image: "" });
  };

  const addEngine = () => {
    setFormData({ ...formData, engines: [...formData.engines, newEngine] });
    setNewEngine({ name: "", price: "", power: "", emissions: ""});
  };

  const addExtra = () => {
    setFormData({ ...formData, extras: [...formData.extras, newExtra] });
    setNewExtra({ name: "", price: "", image: "" });
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const response = await createModel(formData);
    if (response.status === 201) {
      navigate(`/createdmodel/${response.payload._id}`);
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <>
    <Header />
    <div className="flex justify-center flex-col items-center min-h-screen mt-20 bg-yellow-100 p-5">
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl">

      <h1 className="text-2xl font-bold mb-6 text-center">Vytvořit model pro konfigurátor</h1>

      <form onSubmit={handlePost} className="space-y-6">
        <input className="block w-full p-2 border rounded" type="text" name="name" placeholder="Název modelu" value={formData.name} onChange={handleChange} required />
        <input className="block w-full p-2 border rounded" type="number" name="basePrice" placeholder="Základní cena" value={formData.basePrice} onChange={handleChange} required />
        <input className="block w-full p-2 border rounded" type="text" name="bodyType" placeholder="Typ karoserie" value={formData.bodyType} onChange={handleChange} required />
        
        <div>
          <h3 className="font-semibold">Přidat Barvu</h3>
          <div className="grid grid-cols-2 gap-4">
            <input className="p-2 border rounded" type="text" name="name" placeholder="Color Name" value={newColor.name} onChange={handleColorChange} />
            <input className="p-2 border rounded" type="number" name="price" placeholder="Color Price" value={newColor.price} onChange={handleColorChange} />
          </div>
          <button type="button" onClick={addColor}  className='px-6 py-2 mt-10 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition'>Potvrdit barvu</button>
        </div>

        <div>
          <h4 className="font-semibold">Přidat Disky (k aktuální barvě)</h4>
          <div className="grid grid-cols-3 gap-4">
            <input className="p-2 border rounded" type="text" name="name" placeholder="Rim Name" value={newRim.name} onChange={handleRimChange} />
            <input className="p-2 border rounded" type="number" name="price" placeholder="Rim Price" value={newRim.price} onChange={handleRimChange} />
            <input className="p-2 border rounded" type="text" name="image" placeholder="Rim Image URL" value={newRim.image} onChange={handleRimChange} />
          </div>
          <button type="button" onClick={addRim}  className='px-6 py-2 mt-10 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition'>Potvrdit disky</button>
        </div>

        <h3>Přidat Motorizace</h3>
        <input className="p-2 border rounded" type="text" name="name" placeholder="Název" value={newEngine.name} onChange={handleEngineChange} />
        <input className="p-2 border rounded" type="number" name="power" placeholder="Výkon" value={newEngine.power} onChange={handleEngineChange} />
        <input className="p-2 border rounded" type="number" name="emissions" placeholder="Emise" value={newEngine.emissions} onChange={handleEngineChange} />
        <input className="p-2 border rounded" type="number" name="price" placeholder="Cena motorizace" value={newEngine.price} onChange={handleEngineChange} />
        <button type="button" className='px-6 py-2 mt-10 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition' onClick={addEngine}>Potvrdit motorizaci</button>

        <h3>Přidat Doplňkovou výbavu</h3>
        <input className="p-2 border rounded" type="text" name="name" placeholder="Extra Name" value={newExtra.name} onChange={handleExtraChange} />
        <input className="p-2 border rounded" type="number" name="price" placeholder="Extra Price" value={newExtra.price} onChange={handleExtraChange} />
        <input className="p-2 border rounded" type="text" name="image" placeholder="Extra Image URL" value={newExtra.image} onChange={handleExtraChange} />
        <button type="button" onClick={addExtra} className='px-6 py-2 mt-10 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition'>Potvrdit výbavu</button>

        <button type="submit" className="w-full bg-yellow-300 text-black py-3 rounded">Create Model</button>
      </form>
      <Link to="/"><div className="w-full text-yellow-300 bg-black text-black py-3 rounded text-center mt-3">Go back</div></Link>
    </div>
    </div>
    <Footer />
    </>
  );
}
