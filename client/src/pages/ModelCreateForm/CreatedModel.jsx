import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function CreatedModel() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center min-h-screen bg-yellow-100">
        <p className="text-xl">
          Model <b>{id}</b> byl přidán
        </p>
        <Link to={`/model/${id}`}>
          <button className="bg-yellow-200 text-black px-4 py-2 font-bold rounded hover:bg-yellow-300">
            Zobrazit podrobnosti
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}
