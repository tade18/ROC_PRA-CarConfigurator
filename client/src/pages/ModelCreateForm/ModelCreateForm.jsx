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
    extras: [],
  });

  const [newColor, setNewColor] = useState({ name: "", price: "", rims: [] });
  const [newRim, setNewRim] = useState({ name: "", price: "", image: "" });
  const [newEngine, setNewEngine] = useState({
    name: "",
    price: "",
    power: "",
    emissions: "",
  });
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
    setNewEngine({ name: "", price: "", power: "", emissions: "" });
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
        <div className="max-w-6xl w-full mx-auto p-8 bg-white shadow-lg rounded-xl">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Vytvořit model pro konfigurátor
          </h1>

          <form onSubmit={handlePost} className="space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <input
                className="p-2 border rounded col-span-1"
                type="text"
                name="name"
                placeholder="Název modelu"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className="p-2 border rounded col-span-1"
                type="number"
                name="basePrice"
                placeholder="Základní cena"
                value={formData.basePrice}
                onChange={handleChange}
                required
              />
              <input
                className="p-2 border rounded col-span-1"
                type="text"
                name="bodyType"
                placeholder="Typ karoserie"
                value={formData.bodyType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">Přidat Barvu</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="p-2 border rounded"
                  type="text"
                  name="name"
                  placeholder="Název lakování"
                  value={newColor.name}
                  onChange={handleColorChange}
                />
                <input
                  className="p-2 border rounded"
                  type="number"
                  name="price"
                  placeholder="Cena lakování"
                  value={newColor.price}
                  onChange={handleColorChange}
                />
              </div>
              <div className="mt-4">
                <h4 className="font-semibold">Disky pro tuto barvu</h4>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <input
                    className="p-2 border rounded"
                    type="text"
                    name="name"
                    placeholder="Název disků"
                    value={newRim.name}
                    onChange={handleRimChange}
                  />
                  <input
                    className="p-2 border rounded"
                    type="number"
                    name="price"
                    placeholder="Cena disků"
                    value={newRim.price}
                    onChange={handleRimChange}
                  />
                  <input
                    className="p-2 border rounded"
                    type="text"
                    name="image"
                    placeholder="URL obrázku disků k barvě"
                    value={newRim.image}
                    onChange={handleRimChange}
                  />
                </div>
                <button
                  type="button"
                  onClick={addRim}
                  className="px-4 py-2 mt-4 bg-black text-yellow-300 font-semibold rounded border-2 border-black hover:bg-yellow-300 hover:text-black transition"
                >
                  Přidat disk
                </button>
              </div>
              <button
                type="button"
                onClick={addColor}
                className="px-6 py-2 mt-6 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition"
              >
                Potvrdit barvu
              </button>

              {formData.colors.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">
                    Přidané barvy a jejich kola
                  </h4>
                  <table className="w-full table-auto border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-2 py-1">Barva</th>
                        <th className="border px-2 py-1">Cena</th>
                        <th className="border px-2 py-1">Disky</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.colors.map((color, index) => (
                        <tr key={index}>
                          <td className="border px-2 py-1">{color.name}</td>
                          <td className="border px-2 py-1">{color.price}</td>
                          <td className="border px-2 py-1">
                            <ul>
                              {color.rims.map((rim, rimIndex) => (
                                <li key={rimIndex}>
                                  {rim.name} - {rim.price} Kč
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">Přidat Motorizaci</h2>
              <div className="grid grid-cols-4 gap-4">
                <input
                  className="p-2 border rounded"
                  type="text"
                  name="name"
                  placeholder="Název"
                  value={newEngine.name}
                  onChange={handleEngineChange}
                />
                <input
                  className="p-2 border rounded"
                  type="number"
                  name="power"
                  placeholder="Výkon"
                  value={newEngine.power}
                  onChange={handleEngineChange}
                />
                <input
                  className="p-2 border rounded"
                  type="number"
                  name="emissions"
                  placeholder="Emise"
                  value={newEngine.emissions}
                  onChange={handleEngineChange}
                />
                <input
                  className="p-2 border rounded"
                  type="number"
                  name="price"
                  placeholder="Cena"
                  value={newEngine.price}
                  onChange={handleEngineChange}
                />
              </div>
              <button
                type="button"
                className="px-6 py-2 mt-6 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition"
                onClick={addEngine}
              >
                Potvrdit motorizaci
              </button>
              {formData.engines.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Přidané motorizace</h4>
                  <table className="w-full table-auto border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-2 py-1">Název</th>
                        <th className="border px-2 py-1">Výkon</th>
                        <th className="border px-2 py-1">Emise</th>
                        <th className="border px-2 py-1">Cena</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.engines.map((engine, index) => (
                        <tr key={index}>
                          <td className="border px-2 py-1">{engine.name}</td>
                          <td className="border px-2 py-1">
                            {engine.power} kW
                          </td>
                          <td className="border px-2 py-1">
                            {engine.emissions} g/km
                          </td>
                          <td className="border px-2 py-1">
                            {engine.price} Kč
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">
                Přidat Doplňkovou výbavu
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <input
                  className="p-2 border rounded"
                  type="text"
                  name="name"
                  placeholder="Název"
                  value={newExtra.name}
                  onChange={handleExtraChange}
                />
                <input
                  className="p-2 border rounded"
                  type="number"
                  name="price"
                  placeholder="Cena"
                  value={newExtra.price}
                  onChange={handleExtraChange}
                />
                <input
                  className="p-2 border rounded"
                  type="text"
                  name="image"
                  placeholder="Obrázek URL"
                  value={newExtra.image}
                  onChange={handleExtraChange}
                />
              </div>
              <button
                type="button"
                onClick={addExtra}
                className="px-6 py-2 mt-6 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition"
              >
                Potvrdit výbavu
              </button>
              {formData.extras.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">
                    Přidaná doplňková výbava
                  </h4>
                  <table className="w-full table-auto border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-2 py-1">Název</th>
                        <th className="border px-2 py-1">Cena</th>
                        <th className="border px-2 py-1">Obrázek</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.extras.map((extra, index) => (
                        <tr key={index}>
                          <td className="border px-2 py-1">{extra.name}</td>
                          <td className="border px-2 py-1">{extra.price} Kč</td>
                          <td className="border px-2 py-1">{extra.image}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-400 text-black font-bold py-3 rounded hover:bg-green-500"
            >
              Vytvořit model
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
