import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllModels } from "../../models/model";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ModelCard from "../../components/ModelCard/ModelCard";

export default function UserModelList() {
  const [models, setModels] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    const data = await getAllModels();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setModels(data.payload);
      setLoaded(true);
    }
  };

  const configLink = (id) =>{
    navigate(`/configurator/${id}`);
  }

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <Header />
        <div className="flex justify-center flex-col items-center min-h-screen bg-yellow-100">
          <div className="text-4xl">Modely nenalezeny</div>
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
      <div>
        <div className="bg-yellow-100 min-h-screen p-8 mt-20">
          <Header />
          <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl text-gray-900 mb-12 ml-5">Nabídka modelů</h1>
          <div className="space-y-4 mt-4">
            {models.map((model, index) => (
              <ModelCard
                key={model._id}
                model={model}
                index={index}
                configure={configLink}
              />
            ))}
          </div>
        </div>
        </div>
        <Footer />
      </div>
    );
}
