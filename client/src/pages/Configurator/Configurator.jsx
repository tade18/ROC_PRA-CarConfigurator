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
    totalPrice: 0
  });

  useEffect(() => {
    const fetchModel = async () => {
      const response = await getModelById(id);
      if (response.status === 200) {
        const fetchedModel = response.payload;

        const defaultColor = fetchedModel.colors[0];
        const defaultRim = defaultColor.rims[0];

        setModel(fetchedModel);
        setSelected({
          color: defaultColor,
          rim: defaultRim,
          engine: null,
          extras: [],
          totalPrice: parseInt(defaultColor.price) + parseInt(defaultRim.price)
        });
      }
    };
    fetchModel();
  }, [id]);

  const selectColor = (color) => {
    const rim = color.rims[0];
    setSelected({
      ...selected,
      color,
      rim,
      totalPrice: selected.totalPrice - (selected.color?.price || 0) - (selected.rim?.price || 0) + parseInt(color.price) + parseInt(rim.price)
    });
  };

  //výběr kol
  const selectRim = (rim) => {
    setSelected({ ...selected, rim, totalPrice: selected.totalPrice + parseInt(rim.price) });
  };

  //výběr motoru
  const selectEngine = (engine) => {
    setSelected({ ...selected, engine, totalPrice: selected.totalPrice + parseInt(engine.price) });
  };

  //výběr doplňkové výbavy
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
      <div className="bg-yellow-100 min-h-screen p-8 mt-20">
        <h1 className="text-4xl text-center">{model.name}</h1>

        {/*Zobrazení obrázku podle zakliknutý konfigurace*/}
        <div className="flex justify-center my-6">
            <img 
              src={selected.color ? selected.rim.image : "/images/placeholder.png"} 
              alt="Car preview" 
              className="w-96 h-auto rounded shadow"/>
          </div>

        <div className="bg-white p-4 rounded shadow mb-2">
          <h2 className="text-lg font-bold mb-2">Zvolte barvu:</h2>
          <div className="flex space-x-4">
            {model.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => selectColor(color)}
                className={`p-2 rounded ${selected.color?.name === color.name ? "bg-yellow-300 text-black" : "bg-gray-100"}`}
              >
                {color.name} - {color.price} Kč
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow mb-2">
          <h2 className="text-lg font-bold mb-2">Zvolte ráfky:</h2>
          <div className="flex space-x-4">
            {selected.color?.rims.map((rim) => (
              <button
                key={rim.name}
                onClick={() => selectRim(rim)}
                className={`p-2 rounded ${selected.rim?.name === rim.name ? "bg-yellow-300 text-black" : "bg-gray-100"}`}
              >
                {rim.name} - {rim.price} Kč
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow mb-2">
          <h2 className="text-lg font-bold mb-2">Zvolte motorizaci:</h2>
          <div className="flex space-x-4">
            {model.engines.map((engine) => (
              <button
                key={engine.name}
                onClick={() => selectEngine(engine)}
                className={`p-2 rounded ${selected.engine?.name === engine.name ? "bg-yellow-300 text-black" : "bg-gray-100"}`}
              >
                {engine.name} - {engine.price} Kč
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow mb-2">
          <h2 className="text-lg font-bold mb-2">Přidat doplňkovou výbavu:</h2>
          <div className="flex space-x-4">
            {model.extras.map((extra) => (
              <button
                key={extra.name}
                onClick={() => toggleExtra(extra)}
                className={`p-2 rounded ${selected.extras.includes(extra) ? "bg-yellow-300 text-black" : "bg-gray-100"}`}
              >
                {extra.name} - {extra.price} Kč
              </button>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold text-center mt-6">
          Výsledná cena: {model.basePrice + selected.totalPrice} Kč
        </h3>
      </div>
      <Footer />
    </>
  );
}
