import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getModelById } from "../../models/model";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Configurator() {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [selected, setSelected] = useState({
    color: null,
    rim: null,
    engine: null,
    extras: [],
    totalPrice: 0,
  });

  useEffect(() => {
    const fetchModel = async () => {
      const response = await getModelById(id);
      if (response.status === 200) {
        setModel(response.payload);
      }
    };
    fetchModel();
  }, [id]);

  const selectColor = (color) => {
    setSelected({ ...selected, color, rim: null, totalPrice: selected.totalPrice + parseInt(color.price) });
  };

  const selectRim = (rim) => {
    setSelected({ ...selected, rim, totalPrice: selected.totalPrice + parseInt(rim.price) });
  };

  const selectEngine = (engine) => {
    setSelected({ ...selected, engine, totalPrice: selected.totalPrice + parseInt(engine.price) });
  };

  const toggleExtra = (extra) => {
    const isSelected = selected.extras.includes(extra);
    if (isSelected) {
      setSelected({
        ...selected,
        extras: selected.extras.filter((e) => e !== extra),
        totalPrice: selected.totalPrice - parseInt(extra.price),
      });
    } else {
      setSelected({
        ...selected,
        extras: [...selected.extras, extra],
        totalPrice: selected.totalPrice + parseInt(extra.price),
      });
    }
  };

  if (!model) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="bg-yellow-100 min-h-screen p-4">
        <h1 className="text-xl text-center">{model.name} Configurator</h1>
        <div>
          <h2>Colors</h2>
          {model.colors.map((color, index) => (
            <div key={index}>
              <button onClick={() => selectColor(color)}>{color.name} - {color.price} Kč</button>
              {selected.color === color && color.rims.map((rim, i) => (
                <button key={i} onClick={() => selectRim(rim)}>{rim.name} - {rim.price} Kč</button>
              ))}
            </div>
          ))}
        </div>
        <div>
          <h2>Engines</h2>
          {model.engines.map((engine, index) => (
            <button key={index} onClick={() => selectEngine(engine)}>{engine.name} - {engine.price} Kč</button>
          ))}
        </div>
        <div>
          <h2>Extras</h2>
          {model.extras.map((extra, index) => (
            <button key={index} onClick={() => toggleExtra(extra)}>{extra.name} - {extra.price} Kč</button>
          ))}
        </div>
        <h3>Total Price: {model.basePrice + selected.totalPrice} Kč</h3>
      </div>
      <Footer />
    </>
  );
}
