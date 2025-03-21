import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function CreatedModel() {
  const { id } = useParams();  

  return (
    <>
    <Header />
    <div className="flex flex-col justify-center items-center min-h-screen bg-yellow-100">
      <p>Created model: { id }</p>
      <Link to={`/model/${id}`}>
      <button className='px-6 py-2 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition'><span>Zobrazit podrobnosti</span></button>
      </Link>
      <Link to={"/"}>
      <button className='px-6 py-2 mr-10 bg-black text-yellow-300 font-bold rounded-md border-2 border-black hover:bg-yellow-300 hover:text-black transition'><span>Návrat domů</span></button>
      </Link>
    </div>
      <Footer />
    </>
  );
}