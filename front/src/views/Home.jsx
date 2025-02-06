import SearchBar from "../components/ui/SearchBar";
import Caretakers from "../components/ui/Caretakers";

export default function Home() {


  return (
    <>
      <main className="main">
      <h1>Encontrá el cuidador ideal para tu mascota</h1>
        <SearchBar />

        <Caretakers />
       
        <h1 className="titulo">¿Qué dicen las mascotas?</h1>
        <div className="ftmascotas">
          <div>
            <img className="cardh" src="/pets.jpg" alt="" />
          </div>
          <div>
            <img className="cardh" src="/perrosfelices.jpg" alt="" />
          </div>
          <div>
            <img className="cardh" src="/gatos.jpg" alt="" />
          </div>
        </div>
      </main>
    </>
  );
}
