import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getModelById } from "../../models/model";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

export default function Configurator() {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [openSection, setOpenSection] = useState("color");
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
        const fetchedModel = response.payload;
        const defaultColor = fetchedModel.colors[0];
        const defaultRim = defaultColor.rims[0];
        const defaultEngine = fetchedModel.engines[0];

        setModel(fetchedModel);
        setSelected({
          color: defaultColor,
          rim: defaultRim,
          engine: defaultEngine,
          extras: [],
          totalPrice: parseInt(defaultColor.price) + parseInt(defaultRim.price),
        });
      }
    };
    fetchModel();
  }, [id]);

  const summaryRef = useRef();

  const exportToPDF = () => {
    const input = summaryRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`konfigurace-${model.name}.pdf`);
    });
  };

  const selectColor = (color) => {
    const rim = color.rims[0];
    setSelected((prev) => ({
      ...prev,
      color,
      rim,
      totalPrice:
        prev.totalPrice -
        (prev.color?.price || 0) -
        (prev.rim?.price || 0) +
        parseInt(color.price) +
        parseInt(rim.price),
    }));
  };

  const selectRim = (rim) => {
    setSelected((prev) => ({
      ...prev,
      rim,
      totalPrice:
        prev.totalPrice - (prev.rim?.price || 0) + parseInt(rim.price),
    }));
  };

  const selectEngine = (engine) => {
    setSelected((prev) => ({
      ...prev,
      engine,
      totalPrice:
        prev.totalPrice - (prev.engine?.price || 0) + parseInt(engine.price),
    }));
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
      <div className="bg-yellow-100 min-h-screen p-8 mt-20">
        <div className="mx-auto md:w-1/2 p-8 bg-white shadow-lg rounded-xl w-full">
          {/* Obrázek auta */}
          <div className="flex justify-center mb-10 w-full">
            <img
              src={
                selected.color ? selected.rim.image : "/images/placeholder.png"
              }
              alt="Car preview"
              className="w-[600px] h-auto rounded shadow"
            />
          </div>
          <h1 className="text-4xl">{model.name}</h1>
          <div className="text-2xl text-gray-500 mb-5">{model.bodyType}</div>
          <div className="space-y-2 max-w-4xl mx-auto">
            {[
              { label: "Zvolte barvu", content: "color" },
              { label: "Zvolte ráfky", content: "rims" },
              { label: "Zvolte motorizaci", content: "engine" },
              { label: "Přidat doplňkovou výbavu", content: "extras" },
            ].map(({ label, content }) => {
              const isOpen = openSection === content;

              return (
                <div key={content} className="border rounded">
                  <button
                    onClick={() => setOpenSection(isOpen ? null : content)}
                    className="w-full text-left p-4 flex justify-between items-center bg-yellow-200 hover:bg-yellow-300 transition"
                  >
                    <span className="font-bold text-lg">{label}</span>
                    <img
                      src="/ui/arrow.png"
                      alt="Arrow"
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-white">
                      {content === "color" &&
                        model.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => selectColor(color)}
                            className={`p-2 rounded m-1 ${
                              selected.color?.name === color.name
                                ? "bg-yellow-300 text-black"
                                : "bg-gray-100"
                            }`}
                          >
                            {color.name} - {color.price} Kč
                          </button>
                        ))}

                      {content === "rims" &&
                        selected.color?.rims.map((rim) => (
                          <button
                            key={rim.name}
                            onClick={() => selectRim(rim)}
                            className={`p-2 rounded m-1 ${
                              selected.rim?.name === rim.name
                                ? "bg-yellow-300 text-black"
                                : "bg-gray-100"
                            }`}
                          >
                            {rim.name} - {rim.price} Kč
                          </button>
                        ))}

                      {content === "engine" &&
                        model.engines.map((engine) => (
                          <button
                            key={engine.name}
                            onClick={() => selectEngine(engine)}
                            className={`p-2 rounded m-1 ${
                              selected.engine?.name === engine.name
                                ? "bg-yellow-300 text-black"
                                : "bg-gray-100"
                            }`}
                          >
                            {engine.name} - {engine.price} Kč
                          </button>
                        ))}

                      {content === "extras" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {model.extras.map((extra) => {
                            const isSelected = selected.extras.includes(extra);
                            return (
                              <div
                                key={extra.name}
                                onClick={() => toggleExtra(extra)}
                                className={`cursor-pointer border rounded-xl shadow p-4 transition hover:shadow-lg ${
                                  isSelected
                                    ? "bg-yellow-200 border-yellow-400"
                                    : "bg-white"
                                }`}
                              >
                                <img
                                  src={extra.image}
                                  alt={extra.name}
                                  className="w-full h-40 object-cover rounded mb-2"
                                />
                                <h4 className="text-lg font-bold">
                                  {extra.name}
                                </h4>
                                <p>{extra.price} Kč</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <h3 className="text-4xl font-bold text-center mt-10">
            Výsledná cena: {model.basePrice + selected.totalPrice} Kč
          </h3>
          {/* Tabulka s informacema o zvolených položkách */}
          <div ref={summaryRef} className="bg-white p-6 rounded shadow mt-8">
            <div className="flex justify-center mb-6">
              <img
                src={
                  selected.color
                    ? selected.rim.image
                    : "/images/placeholder.png"
                }
                alt="Car preview"
                className="w-[400px] h-auto rounded shadow"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">Shrnutí konfigurace</h2>
            <table className="w-full table-auto border-collapse">
              <tbody>
                <tr>
                  <td className="border p-2 font-bold">Model:</td>
                  <td className="border p-2">{model.name}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-bold">Typ karoserie:</td>
                  <td className="border p-2">{model.bodyType}</td>
                </tr>
                <tr>
                  <td className="border p-2 font-bold">Barva:</td>
                  <td className="border p-2">
                    {selected.color?.name} ({selected.color?.price} Kč)
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-bold">Kola:</td>
                  <td className="border p-2">
                    {selected.rim?.name} ({selected.rim?.price} Kč)
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-bold">Motor:</td>
                  <td className="border p-2">
                    {selected.engine
                      ? `${selected.engine.name} (${selected.engine.price} Kč, ${selected.engine.power} kW, ${selected.engine.emissions} g/km)`
                      : "Nezvoleno"}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-bold">Doplňková výbava:</td>
                  <td className="border p-2">
                    {selected.extras.length > 0
                      ? selected.extras
                          .map((e) => `${e.name} (${e.price} Kč)`)
                          .join(", ")
                      : "Žádná"}
                  </td>
                </tr>
                <tr className="font-bold">
                  <td className="border p-2">Celková cena:</td>
                  <td className="border p-2">
                    {model.basePrice + selected.totalPrice} Kč
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={exportToPDF}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded shadow"
            >
              Stáhnout jako PDF
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
