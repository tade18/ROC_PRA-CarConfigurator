import { Link, useParams, useNavigate, redirect } from "react-router-dom";
import { getModelById, deleteModel } from "../../models/model";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function ModelView() {
  const { id } = useParams();
  const [model, setModel] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getModelById(id);
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setModel(data.payload);
      setLoaded(true);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

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
        <p>Model not found</p>
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        <p>Model is loading...</p>
      </>
    )
  }
  
  return (
    <>
    <Header />
      <div className="flex justify-center items-center min-h-screen bg-yellow-100">
      <ul>
      <h1 className="text-4xl">Model view</h1>
        <li>{id}</li>
        <li>{model.name}</li>
        <li>{model.color}</li>
        <button 
            className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded" 
            onClick={() => handleDelete(model._id)}>
            Smazat model
        </button>
      <Link to={`/updatemodel/${id}`}>
      <button className='px-6 py-2 bg-blue-700 text-white font-bold rounded-md border-2k hover:bg-blue-900 transition'><span>Upravit</span></button>
      </Link>
      <Link to={`/adminmodels`}>
      <button className='px-6 py-2 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition'><span>Návrat</span></button>
      </Link>
      </ul>
      </div>
      <Footer />
    </>
  );
}