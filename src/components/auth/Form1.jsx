import { useMemo, useState } from 'react'
import api from '../../lib/axios'
import { isAxiosError } from 'axios'
import ErrorMessage from '../ui/ErrorMessage'


export default function Form1({user,nextForm}) {


  const [picture, setPicture] = useState(null)
  const [data, setData] = useState({
    name: "",
    lastName: ""
  })
  const [errors, setErrors] = useState({
    picture: "",
    name: "",
    lastName: ""
  })
  const memoPicture = useMemo(() => picture, [picture])


  const handleInputFile = (e) => {

    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      setPicture(URL.createObjectURL(file))
      handleFormData(file)
    }

  }

  const handleFormData = async (file) => {
    if (!file) return setErrors({ ...errors, picture: "Error al seleccionar la imagen" })
    const formdata = new FormData()
    formdata.append("image", file)

    try {
      const request = await api.post(`/users/${user._id}/image`, formdata)
      console.log(request)
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setErrors({ ...errors, picture: error.response.data.error });
      }
    }

  }

  const handleChangeInputs = (e) => {

    setData({ ...data, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {};

    if (data.name === "") {
      newErrors.name = "El nombre es obligatorio"
    }
    if (data.lastName === "") {
      newErrors.lastName = "El apellido es obligatorio"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, ...newErrors })
      return
    }


    try {
      const request = await api.put(`/users/${user._id}`,data)
      console.log(request)
      nextForm()
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log(error.response.data.error)
      }
    }


  }


  return (
    <main className="formuaaa">
      <div className="form-container">
        <form
          onSubmit={handleSubmit}
          className="form">
          <h2>COMPLETA TUS DATOS PERSONALES</h2>

          {/* Contenedor para la imagen y el ícono de la cámara */}
          <div className="profile-picture-container">
            {
               memoPicture ?
               <img className='picture-img' src={memoPicture} height="150px" width="150px" alt="Foto Perfil" />
               :
               <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <rect width="24" height="24" rx="4" fill="#e0e0e0" />
                   <path d="M7 10.5C7 9.67157 7.67157 9 8.5 9C9.32843 9 10 9.67157 10 10.5C10 11.3284 9.32843 12 8.5 12C7.67157 12 7 11.3284 7 10.5Z" fill="#9e9e9e" />
                   <path fillRule="evenodd" clipRule="evenodd" d="M4 6C4 5.44772 4.44772 5 5 5H8L9 4H15L16 5H19C19.5523 5 20 5.44772 20 6V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V6ZM6 8V17H18V8H6ZM8 16H16L12 11L8 16Z" fill="#9e9e9e" />
               </svg>
            }

            <label htmlFor="profile-picture-input" className="camera-icon">
              📷
            </label>
            <input
              type="file"
              id="profile-picture-input"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleInputFile}


            />

          </div>
          {errors.picture && <ErrorMessage>{errors.picture}</ErrorMessage>}
          <label htmlFor="name">Nombre:</label>
          <input
            onChange={handleChangeInputs}
            id='name'
            type="text"
            name="name"
            placeholder="Escribe tu nombre"
            value={data.name}

          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          <label htmlFor="lastName">Apellido:</label>
          <input
            onChange={handleChangeInputs}
            id='lastName'
            type="text"
            name="lastName"
            placeholder="Escribe tu apellido"
            value={data.lastName}
          />
          {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}

          <input

            className="btn-input"
            type="submit"
            value={"Guardar y continuar"}
          />

        </form>
      </div>
    </main>
  )
}
