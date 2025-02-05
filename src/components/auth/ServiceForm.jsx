import { useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import api from "../../lib/axios";
import { isAxiosError } from "axios";
import AvailavilityForm from "../ui/AvailavilityForm";
import { dictionary } from "../../utils/helpers";

export default function ServiceForm({ id, nextForm }) {
    const [service, setService] = useState("");
    const [costPerHour, setCostPerHour] = useState("");
    const [errors, setErrors] = useState({});
    const [addDay, setAddDay] = useState(false);
    const [days, setDays] = useState([]);

    const [data, setData] = useState({
        service: "",
        isActive: "",
        cost: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "service") {
            setService(value);
            setCostPerHour(""); // Reiniciar el costo por hora al cambiar el servicio
            setErrors({ ...errors, service: "" });
        }

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const removeDay = (dayToRemove) => {
        setDays(days.filter((day) => day.day !== dayToRemove.day));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!data.service) newErrors.service = "El servicio es obligatorio.";
        if (data.service === "caretaker" && !data.petType) newErrors.petType= "El tipo de mascota es obligatorio.";
        if (!data.isActive) newErrors.isActive = "Selecciona si el servicio está disponible.";
        if (!days.length) newErrors.availability = "Selecciona al menos un día.";
        if (!costPerHour) newErrors.costPerHour = "El costo por hora es obligatorio.";
        if (costPerHour <= 0) newErrors.costPerHour = "El costo es inválido";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const updatedData = {
            ...data,
            cost: costPerHour,
        };
        const availabilityList =[ 
            ...days
        ]
        setData(updatedData);
        console.log(updatedData)
        try {
            const request = await api.put(`/users/${id}`, updatedData );
             const result = await api.post(`/caretaker/${id}/availability`,{availability:availabilityList});
            
             if(request.status === 200 && result.status === 201){
                nextForm()
             }
            
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                console.log(error.response.data);
            }
        }
    };


    return (
        <main className="formuaaa">
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    <h2>COMPLETA LOS DATOS DE TU SERVICIO</h2>

                    <div className="form-group">
                        <label htmlFor="service">Servicio:</label>
                        <select id="service" name="service" onChange={handleChange}>
                            <option value="">-- Selecciona una opción --</option>
                            <option value="dogwalker">Paseador de Perros</option>
                            <option value="caretaker">Cuidador de Mascotas</option>
                        </select>
                        {errors.service && <ErrorMessage>{errors.service}</ErrorMessage>}
                    </div>
                    {
                        service === "caretaker" &&
                         <div className="form-group">
                        <label htmlFor="service">Tipo de mascota:</label>
                        <select id="petType" name="petType" onChange={handleChange}>
                            <option value="">-- Selecciona una opción --</option>
                            <option value="dog">Perro</option>
                            <option value="cat">Gato</option>
                        </select>
                        {errors.petType && <ErrorMessage>{errors.petType}</ErrorMessage>}
                    </div>
                    }

                    <div className="form-group">
                        <label htmlFor="isActive">Disponibilidad del servicio</label>
                        <select id="isActive" name="isActive" onChange={handleChange}>
                            <option value="">-- Selecciona una opción --</option>
                            <option value="true">Disponible</option>
                            <option value="false">No Disponible</option>
                        </select>
                        {errors.isActive && <ErrorMessage>{errors.isActive}</ErrorMessage>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="cost">Costo por hora:</label>
                        <input
                            type="number"
                            placeholder="Costo por hora"
                            value={costPerHour}
                            onChange={(e) => setCostPerHour(e.target.value)}
                        />
                        {errors.costPerHour && <ErrorMessage>{errors.costPerHour}</ErrorMessage>}
                    </div>

                    {!addDay ? (
                        <button className="btn-add-day" onClick={() => setAddDay(true)}>
                            Agregar Días y Horarios
                        </button>
                    ) : (
                        <AvailavilityForm
                            id={id}
                            setErrors={setErrors}
                            errors={errors}
                            setDays={setDays}
                            days={days}
                        />
                    )}

                    {days.length > 0 && (
                        <div className="selected-days">
                            {days.map((day, index) => (
                                <button
                                    key={index}
                                    className="btn-day"
                                    type="button"
                                    onClick={() => removeDay(day)}
                                >
                                    {dictionary[day.day]} - {day.startTime} hs a {day.endTime} hs
                                </button>
                            ))}
                        </div>
                    )}

                    <input className="btn-input" type="submit" value="Guardar" />
                </form>
            </div>
        </main>
    );
}