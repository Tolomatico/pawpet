
import { Link } from 'react-router';
import { useState } from 'react';
import Logo from './Logo';
import { CiLogout } from "react-icons/ci";



const roleTranslation = {
  owner: "dueño",
  caretaker: "cuidador",
};

const Header = ({ user, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="navbar">
        {

          <Link to={`${user? "/results" : "/"  }`}>
            <Logo />
          </Link>
        }


        {
          user && <>
          <h2 className='header-title'>Registrado como {roleTranslation[user.role]}</h2>
            <img
              className='profile-picture'
              onClick={handleMenu}
              src={user.profilePicture}
              alt="profilePicture"
            />
            <div className={`usermenu ${isMenuOpen ? 'active' : ''}`}>

              <Link to={"/profile"}>Ver Perfil</Link>
              <button className='menu-btn' onClick={handleLogout}>Cerrar Sesión  <CiLogout/></button>
            </div>

          </>

        }

        {
          !user &&
          <div>
            <button className="hamburger" onClick={handleMenu}>&#9776;</button>
            <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
              <>
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <Link to={"/auth"}>Iniciar Sesión</Link>
                
              </>

            </div>
          </div>

        }

      </div>
    </>
  );
};

export default Header;
