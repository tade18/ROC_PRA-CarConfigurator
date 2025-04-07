import { Link } from "react-router-dom";

export default function ConfiguratorLink(props) {
  return (
    <>
      <Link to={`/configurator/${props._id}`}>
        <h1 className="text-2xl">{props.name}</h1>
        <p className="text-gray-500 mb-2">{props.bodyType}</p>
        <p className="text-lg font-semibold">{props.basePrice} Kč</p>
      </Link>
    </>
  );
}
