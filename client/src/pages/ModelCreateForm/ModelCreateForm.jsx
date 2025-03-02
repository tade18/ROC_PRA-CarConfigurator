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
  const [newEngine, setNewEngine] = useState({ name: "", price: "", power: "", emissions: "", image: "" });
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
    setNewEngine({ name: "", price: "", power: "", emissions: "", image: "" });
  };

  const addExtra = () => {
    setFormData({ ...formData, extras: [...formData.extras, newExtra] });
    setNewExtra({ name: "", price: "", image: "" });
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const response = await createModel(formData);
    if (response.status === 200) {
      navigate(`/created-car/${response.payload._id}`);
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <>
    <Header />
    <div className="flex justify-center flex-col items-center min-h-screen bg-yellow-100">

    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Model</h1>
      <form onSubmit={handlePost} className="space-y-6">
        <input className="block w-full p-2 border rounded" type="text" name="name" placeholder="Model Name" value={formData.name} onChange={handleChange} required />
        <input className="block w-full p-2 border rounded" type="number" name="basePrice" placeholder="Base Price" value={formData.basePrice} onChange={handleChange} required />
        <input className="block w-full p-2 border rounded" type="text" name="bodyType" placeholder="Body Type" value={formData.bodyType} onChange={handleChange} required />
        
        <div>
          <h3 className="font-semibold">Add Color</h3>
          <div className="grid grid-cols-2 gap-4">
            <input className="p-2 border rounded" type="text" name="name" placeholder="Color Name" value={newColor.name} onChange={handleColorChange} />
            <input className="p-2 border rounded" type="number" name="price" placeholder="Color Price" value={newColor.price} onChange={handleColorChange} />
          </div>
          <button type="button" onClick={addColor} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Add Color</button>
        </div>

        <div>
          <h4 className="font-semibold">Add Rim to Color</h4>
          <div className="grid grid-cols-3 gap-4">
            <input className="p-2 border rounded" type="text" name="name" placeholder="Rim Name" value={newRim.name} onChange={handleRimChange} />
            <input className="p-2 border rounded" type="number" name="price" placeholder="Rim Price" value={newRim.price} onChange={handleRimChange} />
            <input className="p-2 border rounded" type="text" name="image" placeholder="Rim Image URL" value={newRim.image} onChange={handleRimChange} />
          </div>
          <button type="button" onClick={addRim} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Add Rim</button>
        </div>

        <h3>Add Extra</h3>
        <input type="text" name="name" placeholder="Extra Name" value={newExtra.name} onChange={handleExtraChange} />
        <input type="number" name="price" placeholder="Extra Price" value={newExtra.price} onChange={handleExtraChange} />
        <input type="text" name="image" placeholder="Extra Image URL" value={newExtra.image} onChange={handleExtraChange} />
        <button type="button" onClick={addExtra}>Add Extra</button>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded">Create Model</button>
      </form>
      <Link to="/" className="block text-center text-blue-500 mt-4">Go back</Link>
    </div>
    </div>
    <Footer />
    </>
  );
}
