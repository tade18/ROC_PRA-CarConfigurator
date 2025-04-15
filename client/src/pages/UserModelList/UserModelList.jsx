import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllModels, deleteModel } from "../../models/model";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ModelCard from "../../components/ModelCard/ModelCard";

export default function UserModelList() {
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
      <div className="bg-white min-h-screen py-16 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl text-gray-900 mb-12 ml-5">Nabídka modelů</h1>

          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {models.map((model) => {
              const image =
                model.colors?.[0]?.rims?.[0]?.image ||
                "/thumbnails/imgErr.jpg";

              return (
                <ModelCard
                  key={model._id}
                  id={model._id}
                  basePrice={model.basePrice}
                  name={model.name}
                  image={image}
                />
              );
            })}
          </div>

          <div className="mt-16">
            <Link to={"/"}>
              <button className="px-6 py-3 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition duration-300">
                Návrat
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
