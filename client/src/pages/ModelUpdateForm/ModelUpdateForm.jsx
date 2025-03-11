import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateModel, getModelById } from "../../models/model";

export default function ModelUpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    basePrice: "",
    parameters: [],
  });
  
  const [isLoaded, setLoaded] = useState(false);
  const [info, setInfo] = useState();
  const [newParam, setNewParam] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await getModelById(id);
      if (data.status === 500 || data.status === 404) {
        setLoaded(null);
      } else if (data.status === 200) {
        setFormData(data.payload);
        setLoaded(true);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleParamChange = (e) => {
    setNewParam(e.target.value);
  };

  const addParameter = () => {
    if (newParam.trim() === "") return;
    setFormData({ ...formData, parameters: [...formData.parameters, { name: newParam }] });
    setNewParam("");
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const response = await updateModel(id, formData);
    if (response.status === 200) {
      navigate(`/model/${id}`);
    } else {
      setInfo(response.msg);
    }
  };

  if (isLoaded === null) return <p>Model not found</p>;
  if (!isLoaded) return <p>Model is loading...</p>;

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