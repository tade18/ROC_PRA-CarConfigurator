import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateModel, getModel } from "../../models/model";

export default function ModelUpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Stav pro formulář
  const [formData, setFormData] = useState({
    name: "",
    basePrice: "",
    parameters: [],
  });
  
  const [isLoaded, setLoaded] = useState(false);
  const [info, setInfo] = useState();
  const [newParam, setNewParam] = useState(""); // Stav pro nový parametr

  // Načtení dat modelu
  useEffect(() => {
    const load = async () => {
      const data = await getModel(id);
      if (data.status === 500 || data.status === 404) {
        setLoaded(null);
      } else if (data.status === 200) {
        setFormData(data.payload);
        setLoaded(true);
      }
    };
    load();
  }, [id]);

  // Aktualizace formuláře
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Přidání nového parametru
  const handleParamChange = (e) => {
    setNewParam(e.target.value);
  };

  const addParameter = () => {
    if (newParam.trim() === "") return;
    setFormData({ ...formData, parameters: [...formData.parameters, { name: newParam }] });
    setNewParam(""); // Reset inputu
  };

  // Odeslání formuláře
  const handlePost = async (e) => {
    e.preventDefault();
    const response = await updateModel(id, formData);
    if (response.status === 200) {
      navigate(`/model/${id}`);
    } else {
      setInfo(response.msg);
    }
  };

  // Loading / error handling
  if (isLoaded === null) return <p>❌ Model not found</p>;
  if (!isLoaded) return <p>⏳ Model is loading...</p>;

  return (
    <>
      <h1>Model update form</h1>
      <form onSubmit={handlePost}>
        <input
          type="text"
          name="name"
          required
          placeholder="Enter model name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="basePrice"
          required
          placeholder="Enter base price"
          value={formData.basePrice}
          onChange={handleChange}
        />

        <h3>Add Parameters:</h3>
        <input
          type="text"
          placeholder="Parameter name"
          value={newParam}
          onChange={handleParamChange}
        />
        <button type="button" onClick={addParameter}>Add Parameter</button>

        <ul>
          {formData.parameters.map((param, index) => (
            <li key={index}>{param.name}</li>
          ))}
        </ul>

        <button type="submit">Update model</button>
      </form>

      {info && <p>{info}</p>}

      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}


/*import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateModel, getModel } from "../../models/model";

export default function ModelUpdateForm() {
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
  };

  const postForm = async () => {
    const model = await updateModel(id, formData);
    if (model.status === 200) {
      navigate(`/model/${id}`);
    } else {
      setInfo(model.msg);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Model not found</p>
      </>
    );
  }

  if (!isLoaded) {
    return (
      <>
        <p>Model is loading...</p>
      </>
    );
  }

  return (
    <>
      <h1>Model update form</h1>
      <p>{id}</p>
      <form onSubmit={handlePost}>
      <input
          type="text"
          name="name"
          required
          placeholder="Enter model name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="basePrice"
          required
          placeholder="Enter base price"
          value={formData.basePrice}
          onChange={handleChange}
        />

        <h3>Add Parameters:</h3>
        <input
          type="text"
          placeholder="Parameter name"
          value={newParam.name}
          onChange={handleParamChange}
        />
        <button type="button" onClick={addParameter}>Add Parameter</button>

        <ul>
          {formData.parameters.map((param, index) => (
            <li key={index}>{param.name}</li>
          ))}
        </ul>

        <button type="submit">Create model</button>
      </form>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </>
  );
}*/