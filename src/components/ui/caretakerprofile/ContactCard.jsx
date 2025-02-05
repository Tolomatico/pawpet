import React, { useState } from "react";
import { isAxiosError } from "axios";
import { FaWhatsapp, FaEnvelope, FaLess } from "react-icons/fa";
import api from "../../../lib/axios";
import ErrorMessage from "../ErrorMessage";

export default function ContactCard({ caretaker }) {
  const [data, setData] = useState({
    subject: "",
    text: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos vacíos
    if (!data.subject || !data.text) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const { data: responseData } = await api.post(
        `/caretaker/${caretaker._id}/mailing`,
        data
      );

      console.log(responseData)
      
      if (responseData ==="Correo enviado con éxito") {
        setError("");
        setSuccess(responseData);

        setData({ subject: "", text: "" });
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError("Error al enviar el correo. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="contact-card">
      <h1 className="profile-h1">Contactar</h1>

      {/* Botón de WhatsApp */}
      <a
        href={`https://wa.me/${caretaker.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-button whatsapp"
      >
        <FaWhatsapp /> WhatsApp
      </a>

      {/* Botón de Enviar Email */}
      <a
        href={`mailto:${caretaker.email}`}
        className="contact-button email"
      >
        <FaEnvelope /> Enviar Email
      </a>

      {/* Formulario de contacto */}
      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Campo de Consulta */}
        <label htmlFor="subject" className="contact-button label">
          Consulta:
        </label>
        <input
          onChange={handleChange}
          type="text"
          id="subject"
          name="subject"
          value={data.subject}
        />

        {/* Área de texto para el mensaje */}
        <label htmlFor="text" className="contact-button label">
          Mensaje:
        </label>
        <textarea
          onChange={handleChange}
          name="text"
          id="text"
          rows={5}
          value={data.text}
        />
       {
        success ? <p className="success-message">{success}</p> :
        <button type="submit" className="contact-button email">
          Enviar Consulta
        </button>
       } 
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}