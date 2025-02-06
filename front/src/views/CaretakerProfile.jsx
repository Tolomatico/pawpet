import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import CaretakerProfileInfo from "../components/ui/caretakerprofile/ProfileInfo";
import Schedule from "../components/ui/caretakerprofile/Schedule";
import ContactCard from "../components/ui/caretakerprofile/ContactCard";
import api from "../lib/axios";
import CaretakerCardReview from "../components/ui/CaretakerCardReview";

function CaretakerProfile() {
  const { id } = useParams();
  const [caretaker, setCaretaker] = useState(null);

  useEffect(() => {
    const fetchCaretaker = async () => {
      try {
        const { data } = await api(`/caretaker/${id}`);
        setCaretaker(data.data);
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          console.log(error.response.data);
        }
      }
    };
    fetchCaretaker();
  }, [id]);

  if (!caretaker) return <p>Cargando...</p>;

  return (
   <> <div className="profile-container">
      <div className="profile-card">
      <h1 className="profile-h1">Perfil del cuidador</h1>
       
      <CaretakerProfileInfo caretaker={caretaker}/>
        <Schedule availability={caretaker.availability} />
      </div>
      <ContactCard caretaker={caretaker} />
    
    </div>
      <CaretakerCardReview id={id}/>
      </>
  );
}

export default CaretakerProfile;