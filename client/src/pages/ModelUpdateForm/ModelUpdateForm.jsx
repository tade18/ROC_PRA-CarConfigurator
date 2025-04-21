import { useParams, useNavigate } from "react-router-dom";
import { getModelById, updateModel } from "../../models/model";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function ModelUpdateForm() {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModel = async () => {
      const data = await getModelById(id);
      if (data.status === 200) {
        setModel(data.payload);
        setLoaded(true);
      } else {
        setLoaded(null);
      }
    };
    fetchModel();
  }, [id]);

  const handleChange = (e, section, index, subfield, subindex, key) => {
    const updatedModel = { ...model };
    if (section === "colors") {
      if (subfield === "rims") {
        updatedModel.colors[index].rims[subindex][key] = e.target.value;
      } else {
        updatedModel.colors[index][key] = e.target.value;
      }
    } else if (section === "engines") {
      updatedModel.engines[index][key] = e.target.value;
    } else if (section === "extras") {
      updatedModel.extras[index][key] = e.target.value;
    } else {
      updatedModel[key] = e.target.value;
    }
    setModel(updatedModel);
  };

  const handleSubmit = async () => {
    console.log("Odesílám model:", model);
    const response = await updateModel(id, model);
    if (response.status === 200) {
      alert("Model byl úspěšně upraven.");
      navigate(`/adminmodels`);
    } else {
      alert("Chyba při ukládání změn.");
    }
  };

  if (!isLoaded) return <p>Načítání...</p>;

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen py-16 px-4 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          <h1 className="text-4xl font-bold mb-6">
            Úprava modelu: {model.name}
          </h1>

          {/* Základní informace o modelu */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              className="border rounded px-4 py-2"
              placeholder="Název modelu"
              value={model.name}
              onChange={(e) => handleChange(e, null, null, null, null, "name")}
            />
            <input
              type="number"
              className="border rounded px-4 py-2"
              placeholder="Základní cena"
              value={model.basePrice}
              onChange={(e) =>
                handleChange(e, null, null, null, null, "basePrice")
              }
            />
            <input
              type="text"
              className="border rounded px-4 py-2"
              placeholder="Typ karoserie"
              value={model.bodyType}
              onChange={(e) =>
                handleChange(e, null, null, null, null, "bodyType")
              }
            />
          </div>

          {/* Barvy */}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Barvy</h2>
            <table className="table-auto w-full border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Název</th>
                  <th className="p-2 border">Cena</th>
                  <th className="p-2 border">Disky</th>
                </tr>
              </thead>
              <tbody>
                {model.colors.map((color, i) => (
                  <tr key={i}>
                    <td className="p-2 border">
                      <input
                        type="text"
                        className="w-full"
                        value={color.name}
                        onChange={(e) =>
                          handleChange(e, "colors", i, null, null, "name")
                        }
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        className="w-full"
                        value={color.price}
                        onChange={(e) =>
                          handleChange(e, "colors", i, null, null, "price")
                        }
                      />
                    </td>
                    <td className="p-2 border">
                      {color.rims.map((rim, j) => (
                        <div key={j} className="mb-1 flex flex-col gap-1">
                          <input
                            type="text"
                            placeholder="Název"
                            className="w-full"
                            value={rim.name}
                            onChange={(e) =>
                              handleChange(e, "colors", i, "rims", j, "name")
                            }
                          />
                          <input
                            type="number"
                            placeholder="Cena"
                            className="w-full"
                            value={rim.price}
                            onChange={(e) =>
                              handleChange(e, "colors", i, "rims", j, "price")
                            }
                          />
                          <input
                            type="text"
                            placeholder="Cesta k obrázku"
                            className="w-full"
                            value={rim.image}
                            onChange={(e) =>
                              handleChange(e, "colors", i, "rims", j, "image")
                            }
                          />
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Motory */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 mt-6">Motory</h2>
            <table className="table-auto w-full border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Název</th>
                  <th className="p-2 border">Cena</th>
                  <th className="p-2 border">Výkon</th>
                  <th className="p-2 border">Emise</th>
                </tr>
              </thead>
              <tbody>
                {model.engines.map((engine, i) => (
                  <tr key={i}>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={engine.name}
                        onChange={(e) =>
                          handleChange(e, "engines", i, null, null, "name")
                        }
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        value={engine.price}
                        onChange={(e) =>
                          handleChange(e, "engines", i, null, null, "price")
                        }
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        value={engine.power}
                        onChange={(e) =>
                          handleChange(e, "engines", i, null, null, "power")
                        }
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        value={engine.emissions}
                        onChange={(e) =>
                          handleChange(e, "engines", i, null, null, "emissions")
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Doplňková výbava */}
          <section>
            <h2 className="text-2xl font-semibold mb-2 mt-6">
              Doplňková výbava
            </h2>
            <table className="table-auto w-full border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Název</th>
                  <th className="p-2 border">Cena</th>
                  <th className="p-2 border">Obrázek</th>
                </tr>
              </thead>
              <tbody>
                {model.extras.map((item, i) => (
                  <tr key={i}>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleChange(e, "extras", i, null, null, "name")
                        }
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleChange(e, "extras", i, null, null, "price")
                        }
                      />
                    </td>
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={item.image}
                        onChange={(e) =>
                          handleChange(e, "extras", i, null, null, "image")
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Tlačítka */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Uložit změny
            </button>
            <button
              onClick={() => navigate("/adminmodels")}
              className="px-6 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
            >
              Zrušit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
