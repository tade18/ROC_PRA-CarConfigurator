import { Link } from "react-router-dom";
import ModelLink from "./ModelLink";
import { useState, useEffect } from "react";
import { getModels } from "../../models/model";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function CatList() {
  const [models, setModels] = useState();
  const [isLoaded, setLoaded] = useState(false);

  const load = async () => {
    const data = await getModels();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setModels(data.payload);
      setLoaded(true);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (isLoaded === null) {
    return (
      <>
        <p>Models not found</p>
      </>
    )
  }

  if (!isLoaded) {
    return (
      <>
        <p>Models are loading...</p>
      </>
    )
  }

  return (
    <>
    <Header />
    <div className="flex justify-center flex-col items-center min-h-screen bg-yellow-100">
      <h1 className="text-xl">Model list</h1>
      {
        models.map((model, index) => (
          <ModelLink key={index} {...model} />
        ))
      }
      <Link to={"/"}>
        <p>Zpět</p>
      </Link>
    </div>
      <Footer />
    </>
  );
}