import React from 'react'
import { Link } from 'react-router'
import Pets from "../Pets"

export default function ProfileOwner({user}) {
  return (
    <div className="profile-view-container">
    <h1 className="profile-title">Mi Perfil</h1>
  {/* Sección de perfil del usuario */}
  <div className="profile-section">
  
    <div className="user-info">
      <img
        className="user-picture"
        src={user.profilePicture}
        alt="Imagen de perfil"
      />
      <div className="user-details">
        <h2 className="user-name">
          {user.name} {user.lastName}
        </h2>
        <p className="user-location">
          {user.zone}, {user.neighborhood}
        </p>
      </div>
      <Link to={`/user/${user._id}/newpet`} className='btn-add-pet' >+</Link>  
      <p>Agregar Mascota
      </p>
    </div>
  </div>

  {/* Sección de mascotas */}
  <div className="pets-section">

    <h2 className="pets-title">Mascotas</h2>

    <Pets id={user._id} />
  </div>

    </div>
  )
}
