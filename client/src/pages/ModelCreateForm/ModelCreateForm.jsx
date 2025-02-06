import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createModel } from "../../models/model";
import Header from "../../components/Header/Header";

export default function ModelCreateForm() {
  const [formData, setFormData] = useState({
    name: "",
    basePrice: "",
    parameters: []
  });

  const [newParam, setNewParam] = useState("");
  const [newOption, setNewOption] = useState({ name: "", price: "", images: {} });

  const navigate = useNavigate();

  // Přidání nového parametru (např. color, wheels, engine)
  const addParameter = () => {
    if (!newParam) return;
    setFormData({
      ...formData,
      parameters: [...formData.parameters, { name: newParam, options: [] }]
    });
    setNewParam("");
  };

  // Přidání nové možnosti (např. barva "Red" do parametru "color")
  const addOption = (paramIndex) => {
    if (!newOption.name || !newOption.price) return;
    const updatedParams = [...formData.parameters];
    updatedParams[paramIndex].options.push({ ...newOption });
    setFormData({ ...formData, parameters: updatedParams });
    setNewOption({ name: "", price: "", images: {} });
  };

  // Odeslání dat na backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createModel(formData);
    if (response.status === 201) {
      navigate(`/createdmodel/${response.payload._id}`);
    } else {
      alert(response.msg);
    }
  };

  return (
    <>
    <Header />
    <div className="flex justify-center flex-col items-center min-h-screen bg-yellow-100">
      <h1>Přidat model</h1>
      <form className="bg-yellow-300 p-6 rounded-lg shadow-lg max-w-md w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Model Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          name="basePrice"
          placeholder="Base Price"
          value={formData.basePrice}
          onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
          required
        />

        <h3>Add Parameters</h3>
        <input
          type="text"
          placeholder="Parameter name (e.g., color, wheels, engine)"
          value={newParam}
          onChange={(e) => setNewParam(e.target.value)}
        />
        <button type="button" onClick={addParameter}>Přidat vlastnost</button>

        <h3>Parameters</h3>
        {formData.parameters.map((param, index) => (
          <div key={index}>
            <h4>{param.name}</h4>
            <input
              type="text"
              placeholder="Option Name"
              value={newOption.name}
              onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newOption.price}
              onChange={(e) => setNewOption({ ...newOption, price: Number(e.target.value) })}
            />
            <button type="button" onClick={() => addOption(index)}>Přidat možnost</button>

            <ul>
              {param.options.map((option, optIndex) => (
                <li key={optIndex}>
                  {option.name} - {option.price}Kč
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button type='submit' className='px-6 py-2 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition'><span>Přidat model do konfigurátoru</span></button>
      </form>
    </div>
    </>
  );
}


/*import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createModel } from "../../models/model";
import Header from "../../components/Header/Header";

export default function ModelCreateForm() {
  const [formData, setFormData] = useState({
    name: "",
    basePrice: "",
    parameters: [],
  });

  const [newParam, setNewParam] = useState({ name: "", options: [] });
  const [newOption, setNewOption] = useState({ name: "", price: "", images: {} });
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();

  const postForm = async () => {
    const model = await createModel(formData);
    if (model.status === 201) {
      redirectToSuccessPage(model.payload._id);
    } else {
      setInfo(model.msg);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePost = (e) => {
    e.preventDefault();
    postForm();
  };

  const redirectToSuccessPage = (id) => {
    return navigate(`/createdmodel/${id}`)
  }

  const handleParamChange = (e) => {
    setNewParam({ ...newParam, name: e.target.value });
  };

  

  const addParameter = () => {
    if (!newParam) return;
    setFormData({
      ...formData,
      parameters: [...formData.parameters, { name: newParam, options: [] }]
    });
    setNewParam("");
  };

  const addOption = (paramIndex) => {
    if (!newOption.name || !newOption.price) return;
    const updatedParams = [...formData.parameters];
    updatedParams[paramIndex].options.push({ ...newOption });
    setFormData({ ...formData, parameters: updatedParams });
    setNewOption({ name: "", price: "", images: {} });
  };

  return (
    <>
    <Header />
    <div className="flex flex-col justify-center items-center min-h-screen bg-yellow-100">

      <h1>Create Model</h1>
      {info && <p style={{ color: "red" }}>{info}</p>}
        <form className="bg-yellow-300 p-6 rounded-lg shadow-lg max-w-md w-full" onSubmit={handlePost}>
        <input
          type="text"
          name="name"
          placeholder="Model Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          name="basePrice"
          placeholder="Base Price"
          value={formData.basePrice}
          onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
          required
        />

        <h3>Add Parameters</h3>
        <input
          type="text"
          placeholder="Parameter name (e.g., color, wheels, engine)"
          value={newParam}
          onChange={(e) => setNewParam(e.target.value)}
        />
        <button type="button" onClick={addParameter}>Add Parameter</button>

        <h3>Parameters</h3>
        {formData.parameters.map((param, index) => (
          <div key={index}>
            <h4>{param.name}</h4>
            <input
              type="text"
              placeholder="Option Name"
              value={newOption.name}
              onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newOption.price}
              onChange={(e) => setNewOption({ ...newOption, price: Number(e.target.value) })}
            />
            <button type="button" onClick={() => addOption(index)}>Add Option</button>

            <ul>
              {param.options.map((option, optIndex) => (
                <li key={optIndex}>
                  {option.name} - ${option.price}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button type="submit">Create Model</button>
      </form>

      <Link to={"/"}>
        <p>Go back</p>
      </Link>


    </div>
    </>
  );
}
*/

