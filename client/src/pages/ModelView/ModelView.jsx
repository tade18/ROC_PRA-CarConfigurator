import { Link, useParams, useNavigate } from "react-router-dom";
import { getModel, deleteModel } from "../../models/model";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function ModelView() {
  const { id } = useParams();
  const [model, setModel] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [info, setInfo] = useState();
  const [formData, setFormData] = useState();
  const navigate = useNavigate();

  const load = async () => {
    const data = await getModel(id);
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

  const handleDelete = async (e) => {
    e.preventDefault();
    if (model.name === formData) {
      const data = await deleteModel(id);
      if (data.status === 200) {
        navigate("/");
      } else {
        setInfo(data.msg);
      }
    } else {
      setInfo("Wrong input!");
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
      <div className="flex justify-center flex-col items-center min-h-screen bg-yellow-100">
      <h1>Model view</h1>
      <p>{id}</p>
      <p>{model.name}</p>
      <p>{model.legs}</p>
      <p>{model.color}</p>
      <form>
        <input type="text" placeholder={model.name} onChange={handleChange} />
        <button onClick={handleDelete}>Delete</button>
        <p>{info}</p>
      </form>
      <Link to={`/updatemodel/${id}`}>
      <button className='px-6 py-2 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition'><span>Upravit</span></button>
      </Link>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
      </div>
      <Footer />
    </>
  );
}