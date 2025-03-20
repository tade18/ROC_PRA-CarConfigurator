import { Link } from "react-router-dom";
import ModelLink from "../ModelList/ModelLink";
import { useState, useEffect } from "react";
import { getAllModels, deleteModel } from "../../models/model";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

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
  }

  useEffect(() => {
    load();
  }, []);


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Opravdu chcete smazat tento model?");
    if (confirmDelete) {
      await deleteModel(id);
      load();
    }
  }

  if (isLoaded === null) {
    return (
      <>
      <Header />
        <div className="flex justify-center flex-col items-center min-h-screen bg-yellow-100">
        <div className="text-4xl">Modely nenalezeny</div>
        <Link to={"/createmodel"}><button className='px-6 py-2 mt-10 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition'><span>Vytvořit model</span></button></Link>
        </div>
      <Footer />
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        <p>Načítání modelů...</p>
      </>
    )
  }

  return (
    <>
    <Header />
      <div className="flex justify-center flex-col items-center min-h-screen bg-yellow-100">
        <div className="mx-auto md:w-1/2 p-8 bg-white shadow-lg rounded-xl w-full">
        <h1 className="text-3xl mb-5">Modely</h1>
        {models.map((model, index) => (
          <div key={index} className="flex justify-between items-center w-full bg-white p-4 rounded shadow mb-2 flex-col md:flex-row">
            <ModelLink className="flex-6" {...model} />
          </div>
        ))}
        <Link to={"/"}><button className='px-6 py-2 mt-10 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition'><span>Návrat</span></button></Link>
        </div>
      </div>
      <Footer />
    </>
  );
}