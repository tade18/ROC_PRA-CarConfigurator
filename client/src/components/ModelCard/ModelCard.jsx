// src/components/ModelCard.jsx
import React from "react";
import ConfiguratorLink from "../../pages/UserModelList/ConfiguratorLink";

export default function ModelCard({ id, name, image, basePrice }) {
  return (
    <div
      key={id}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col items-center p-5 border border-gray-200"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />

      <ConfiguratorLink _id={id} name={name} basePrice={basePrice}></ConfiguratorLink>
    </div>
  );
}
