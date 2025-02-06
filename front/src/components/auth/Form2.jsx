import { useMemo, useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import api from "../../lib/axios";
import { isAxiosError } from "axios";
import { useParams } from "react-router";
import { PhoneInput } from "../ui/PhoneInput";
import { zones } from "../../data/zones";


export default function Form2({ prevForm, nextForm }) {
  const params = useParams();
  const id = params.id;

  const [data, setData] = useState({
    about: "",
    nationality: "",
    neighborhood: "",
    phone: "",
    zone: ""

  });

  const [errors, setErrors] = useState({
    about: "",
    nationality: "",
    neighborhood: "",
    phone: "",
    zone: ""

  });
  const [zoneSelected, setZoneSelected] = useState("")
  const memoZone=useMemo(()=>
   zones.find(item=>
      item.province === zoneSelected 
     ) 
  ,[zoneSelected])
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "zone") {
      setZoneSelected(value)
    }
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePhoneChange = (selectedCode, phoneNumber) => {
    setData({ ...data, phone: `${selectedCode}${phoneNumber}` });
    setErrors({ ...errors, phone: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!data.about) newErrors.about = "La descripción es obligatoria";
    if (!data.nationality) newErrors.nationality = "La nacionalidad es obligatoria";
    if (!data.zone) newErrors.zone = "La localidad es obligatoria";
    if (!data.neighborhood) newErrors.neighborhood = "El barrio es obligatorio";
    if (!data.phone || data.phone.length <= 9) newErrors.phone = "El teléfono es obligatorio";

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, ...newErrors });
      return;
    }

    try {
      const request = await api.put(`/users/${id}`, data);
      console.log(request);
      nextForm();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log(error.response.data.error);
      }
    }
  };

  


   
  return (
    <main className="formuaaa">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h2>INFORMACIÓN ADICIONAL</h2>

          <label htmlFor="nationality">Nacionalidad:</label>
          <input
            onChange={handleChange}
            type="text"
            id="nationality"
            name="nationality"
            placeholder="Escribe tu nacionalidad"
            value={data.nationality}
          />
          {errors.nationality && <ErrorMessage>{errors.nationality}</ErrorMessage>}

          <label htmlFor="zone">Localidad:</label>
          <select onChange={handleChange} value={data.zone} name="zone" id="zone">
            <option value="">--Selecciona tu localidad--</option>
            {zones.map((item) => (
              <option value={item.province} key={item.province}>
                {item.province}
              </option>
            ))}
          </select>
          {errors.zone && <ErrorMessage>{errors.zone}</ErrorMessage>}
          <label htmlFor="neighborhood">Barrio:</label>
          <select onChange={handleChange} value={data.neighborhood} name="neighborhood" id="neighborhood">
            <option value="">--Selecciona tu barrio--</option>
             {memoZone?.neighborhoods?.map((item) => (
              <option value={item.name} key={item.name}>
                {item.name}
              </option>
            )
            )}  
          </select> 
          {errors.neighborhood && <ErrorMessage>{errors.neighborhood}</ErrorMessage>}

          <PhoneInput handlePhoneChange={handlePhoneChange} />
          {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          <label htmlFor="about">Breve descripción sobre vos:</label>
          <textarea
            onChange={handleChange}
            className="sss"
            id="about"
            name="about"
            rows="4"
            placeholder="Escribe una breve descripción sobre ti"
          ></textarea>
          {errors.about && <ErrorMessage>{errors.about}</ErrorMessage>}

          <input className="btn-input" type="submit" value="Guardar y continuar" />
        </form>
      </div>
    </main>
  );
}


