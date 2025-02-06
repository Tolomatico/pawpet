import { useLocation } from "react-router";

export default function Pet({ pet, onDelete}) {

    const location=useLocation()
    const profile=location.pathname.includes("profile")
    return (
        <div className="pet-container">
            <div className="pet-card">
                <div className='pet-div-1'>
                    <img className="pet-image" src={pet.image[0]} alt="Imagen Mascota" />
                    <div className='pet-info'>
                        <h2 className="pet-name">{pet.name.toUpperCase()}</h2>
                        <p>{pet.breed}</p>
                        <p>Edad: {pet.age}</p>
                    </div>
                </div>
                <div className='pet-about'>
                    <p><strong>Sobre Mí:</strong> {pet.description}</p>
                    <p><strong>Antecedentes:</strong> {pet.medicalHistory}</p>
                </div>
                {
                  profile &&  <button className='btn-red-pet' onClick={() => onDelete(pet._id)}>Eliminar</button>
                } 
            </div>
        </div>
    );
}