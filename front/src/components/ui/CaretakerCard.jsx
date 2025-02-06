import { Link } from "react-router";
import { useUser } from "../../hooks/useUser";
import { dictionaryService } from "../../utils/helpers";
import { LuMapPin } from "react-icons/lu";
import PawIcon from "./PawIcon"

function CaretakerCard({ caretaker, className = "" }) {
  const { user } = useUser();
  const linkTo = user ? `/caretaker/${caretaker._id}` : "/auth";

  return (
    <div className={`caretaker-card ${className}`}>
      <div className="caretaker-card-info">
        <img
          className="caretaker-img"
          src={caretaker?.profilePicture}
          alt="Imagen de paseador"
        />
        <div className="caretaker-card-info-text">
          <h3>
            {caretaker.name} {caretaker.lastName}
          </h3>
          <p>
            <LuMapPin />
            {caretaker.neighborhood}, {caretaker.zone}
          </p>
        </div>
      </div>
      <div className="caretaker-card-text">
        <div className="caretaker-reviews">
          <PawIcon/>
          <a className="caretaker-reviews-link" href="#">
            <p>
              (Reseñas <span id="review-count-summary-1">{caretaker?.reviews?.length }</span>)
            </p>
          </a>
        </div>
        <h2 className="caretaker-card-service">
          {dictionaryService[caretaker.service]}
        </h2>
        <p className="caretaker-card-description">{caretaker.about}</p>
        <p className="caretaker-card-cost">
          Precio por hora: <span>${caretaker.cost}</span>
        </p>
      </div>
      
      <Link to={linkTo} className="caretaker-card-btn">
        {user ? "Contactar Servicio" : "Inicia Sesión para contactar"}
      </Link>
      
    
    </div>
  );
}

export default CaretakerCard;
