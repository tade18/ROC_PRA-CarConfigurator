import { Link, useParams, useNavigate } from "react-router-dom";
import { getModelById, deleteModel } from "../../models/model";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function ModelView() {
  const { id } = useParams();
  const [model, setModel] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    const data = await getModelById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setModel(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Opravdu chcete smazat tento model?");
    if (confirmDelete) {
      await deleteModel(id);
      navigate("/adminmodels");
    }
  };

  if (isLoaded === null) {
    return <p>Model not found</p>;
  }

  if (!isLoaded) {
    return <p>Model is loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen py-16 px-4 mt-12">
        <div className="flex flex-col gap-4 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold">{model.name}</h1>

          <div className="flex gap-4">
            <button
              className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(model._id)}
            >
              Smazat model
            </button>
            <Link to={`/updatemodel/${id}`}>
              <button className="px-6 py-2 bg-blue-700 text-white font-bold rounded-md hover:bg-blue-900 transition">
                Upravit
              </button>
            </Link>
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
                    <td className="p-2 border">{color.name}</td>
                    <td className="p-2 border">{color.price} Kč</td>
                    <td className="p-2 border">
                      <ul className="list-disc list-inside">
                        {color.rims.map((rim, j) => (
                          <li key={j}>
                            <div>
                              <strong>{rim.name}</strong> – {rim.price} Kč
                            </div>
                            <div className="text-sm text-gray-600 italic">
                              {rim.image}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Motory – zůstává beze změny */}

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
                  <th className="p-2 border">Cesta k obrázku</th>
                </tr>
              </thead>
              <tbody>
                {model.extras.map((item, i) => (
                  <tr key={i}>
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">{item.price} Kč</td>
                    <td className="p-2 border text-sm text-gray-600 italic">
                      {item.image || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <Link to={`/adminmodels`}>
            <button className="px-6 py-2 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition">
              Návrat
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
