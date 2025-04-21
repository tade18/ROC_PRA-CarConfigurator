import { useState, useEffect } from "react";
import { getAllModels, deleteModel } from "../../models/model";
import AdminModelCard from "../../components/AdminModelCard/AdminModelCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

export default function ModelList() {
  const [models, setModels] = useState([]);
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

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (id) => {
    navigate(`/updatemodel/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Opravdu chcete smazat tento model?");
    if (confirmDelete) {
      await deleteModel(id);
      load();
    }
  };

  const viewLink = (id) => {
    navigate(`/model/${id}`);
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
            <AdminModelCard
              key={model._id}
              model={model}
              index={index}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={viewLink}
            />
          ))}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
