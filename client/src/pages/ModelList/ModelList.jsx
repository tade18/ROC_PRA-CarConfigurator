import { Link } from "react-router-dom";
import ModelLink from "./ModelLink";
import { useState, useEffect } from "react";
import { getAllModels, deleteModel } from "../../models/model";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function ModelList() {
  const [models, setModels] = useState();
  const [isLoaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getAllModels();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setModels(data.payload);
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
      load();
    }
  };

  if (isLoaded === null) {
    return (
      <>
        <Header />
        <div className="flex justify-center flex-col items-center min-h-screen bg-yellow-100">
          <div className="text-4xl">Modely nenalezeny</div>
          <Link to={"/createmodel"}>
            <button className="px-6 py-2 mt-10 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition">
              <span>Vytvořit model</span>
            </button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <p>Načítání modelů...</p>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex justify-center flex-col items-center min-h-screen bg-yellow-100">
        <div className="mx-auto md:w-1/2 p-8 bg-white shadow-lg rounded-xl w-full">
          <h1 className="text-3xl mb-5">Modely</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => {
              const image =
                model.colors?.[0]?.rims?.[0]?.image ||
                "/images/placeholder.png";

              return (
                <div
                  key={model._id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col items-center transition hover:shadow-lg"
                >
                  <img
                    src={image}
                    alt={model.name}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h2 className="text-xl font-bold mb-2">{model.name}</h2>
                  <div className="flex gap-2 mt-auto">
                    <ModelLink {...model}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Detail
                      </button>
                    </ModelLink>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(model._id)}
                    >
                      Smazat
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <Link to={"/adminpage"}>
            <button className="px-6 py-2 mt-10 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition">
              <span>Návrat</span>
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
