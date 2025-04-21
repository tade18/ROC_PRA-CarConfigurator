import React from "react";

export default function ModelCard({ model, index, configure}) {
  const isEven = index % 2 === 0;
  const bgColor = isEven ? "bg-yellow-300" : "bg-white";

  const image =
    model.colors?.[0]?.rims?.[0]?.image || "/thumbnails/imgErr.jpg";

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center p-4 gap-4 ${bgColor}`}
    >
      <img
        src={image}
        alt={model.name}
        className="w-full md:w-48 h-auto rounded-lg object-cover"
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between flex-1 gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold">{model.name}</h2>
          <p className="text-lg text-gray-600 font-semibold">
            {model.bodyType}
          </p>
          <p className="text-l text-black">
            Počáteční cena: <b>{model.basePrice} Kč</b>
          </p>
        </div>

        <div className="flex gap-3 self-start md:self-auto">
          <button
            onClick={() => configure(model._id)}
            className="bg-yellow-500 text-white px-4 py-2 font-bold rounded hover:bg-yellow-600"
          >
            Konfigurovat
          </button>
        </div>
      </div>
    </div>
  );
}
