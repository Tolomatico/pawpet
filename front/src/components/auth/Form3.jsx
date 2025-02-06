import { useMemo, useState } from "react"
import api from "../../lib/axios"
import ErrorMessage from "../ui/ErrorMessage"
import { useParams } from "react-router";

const petOptions = [
    { 
        id: 1,
        species: "dog"
    },
    {
        id: 2,
        species: "cat"
    },

]

const speciesTranslation = {
    dog: "perro",
    cat: "gato",
  };
  

export default function Form3({  nextForm }) {

    const params = useParams();
    const id = params.id;
    const [loading,setLoading]=useState(false)
    const [preview, setPreview] = useState(null)
    const [file, setFile] = useState(null)
    const [errors, setErrors] = useState({
        image: "",
        name: "",
        species: "",
        breed: "",
        age: "",
        description: "",
        medicalHistory: ""
    })
    const [data, setData] = useState({
        image: "",
        name: "",
        species: "",
        breed: "",
        age: "",
        description: "",
        medicalHistory: ""
    })

    const memoPicture = useMemo(() => preview, [preview])



    const handleInputFile = (e) => {

        e.preventDefault()
        const file = e.target.files[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
            setFile(file)
            setErrors({ ...errors, image: "" },)

        }
    }

    const handleFormData = async (e) => {  
        e.preventDefault()
        setLoading(true)
        const newErrors = {}
        if (!file) newErrors.image = "La foto es obligatoria"
        if (!data.name) newErrors.name = "El nombre es obligatorio"
        if (!data.species) newErrors.species = "La especie es obligatoria"
        if (!data.breed) newErrors.breed = "La raza es obligatoria"
        if (!data.age) newErrors.age = "La edad es obligatoria"
        if (!data.description) newErrors.description = "Los campos no pueden ir vacíos"
        if (!data.medicalHistory) newErrors.medicalHistory = "Los campos no pueden ir vacíos"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setLoading(false)
            return 
        }


        const formdata = new FormData()
        formdata.append("image", file)
        formdata.append("name", data.name)
        formdata.append("species", data.species)
        formdata.append("breed", data.breed)
        formdata.append("age", data.age)
        formdata.append("description", data.description)
        formdata.append("medicalHistory", data.medicalHistory)
        formdata.append("user", id)
        try {
            const request = await api.post("/pets/create", formdata)
            if (request.status === 201) {
                nextForm()
            }
           

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                setErrors({ ...errors, preview: error.response.data.error });
            }
        }finally{
            setLoading(false)
        }

    }

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrors({ ...errors, [name]: "" });
    }

    return (
        <main className="formuaaa">
            <div className="form-container">


                <form className="form" onSubmit={handleFormData}>
                    <h2>Información sobre Mascotas</h2>

                    <div className="profile-picture-container">
                        {
                            memoPicture ?
                                <img className='picture-img' src={memoPicture} height="150px" width="150px" alt="Foto mascota" />
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
                    {
                        errors.image && <ErrorMessage>{errors.image}</ErrorMessage>
                    }

                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nombre de la mascota"
                        value={data.name}
                        onChange={handleChange} />
                    {
                        errors.name && <ErrorMessage>{errors.name}</ErrorMessage>
                    }

                    <label htmlFor="species">Especie:</label>
                    <select
                        id="species"
                        name="species"
                        value={data.species}
                        onChange={handleChange}
                    >
                        <option >--Selecciona la mascota--</option>
                        {
                            petOptions.map(pet => (
                                <option
                                    key={pet.id}
                                >
                                    {speciesTranslation[pet.species]}
                                </option>
                            ))
                        }
                    </select>
                    {
                        errors.species && <ErrorMessage>{errors.species}</ErrorMessage>
                    }
                    <label htmlFor="breed">Raza:</label>
                    <input
                        type="text"
                        id="breed"
                        name="breed"
                        placeholder="Raza"
                        onChange={handleChange}
                    />
                    {
                        errors.breed && <ErrorMessage>{errors.breed}</ErrorMessage>
                    }
                    <label htmlFor="age">Edad:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="Edad en años"
                        onChange={handleChange}
                    />
                    {
                        errors.age && <ErrorMessage>{errors.age}</ErrorMessage>
                    }

                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        onChange={handleChange}
                        id="description"
                        name="description"
                        rows={3}
                        placeholder="Escribe una breve descripción" ></textarea>
                    {
                        errors.description && <ErrorMessage>{errors.description}</ErrorMessage>
                    }
                    <label htmlFor="medicalHistory">Historial Médico:</label>
                    <textarea
                        onChange={handleChange}
                        id="medicalHistory"
                        name="medicalHistory"
                        rows={3}
                        placeholder="Historial médico de la mascota"></textarea>
                    {
                        errors.medicalHistory && <ErrorMessage>{errors.medicalHistory}</ErrorMessage>
                    }
                    <input
                     className="btn-input"
                      type="submit"
                       value={loading ? "Guardando..." : "Guardar"} 
                       disabled={loading}             
                       />
                </form>
            </div>
        </main>
    )
}
