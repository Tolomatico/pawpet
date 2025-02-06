
import { Link } from "react-router-dom"

const RegisterCongratulations = () => {
  return (
    <div className="container-congrats">
      <img className="img-congrats" src="/background.png" alt="logo" width="500px" />
      <div className="content-congrats">
        <h2 className="h2-congrats">Felicidades, ya estás registrado en PawPet</h2>
        <p className="p-congrats">Ya puedes iniciar sesión para utilizar nuestros servicios.</p>
        <Link to="/auth" className="login-button-congrats">Iniciar Sesión</Link>
      </div>
    </div>
  );
};

export default RegisterCongratulations;