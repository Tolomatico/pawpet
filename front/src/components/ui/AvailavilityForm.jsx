import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { dictionary } from "../../utils/helpers";


export default function AvailavilityForm({ id, setErrors, errors, setDays, days }) {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedDay, setSelectedDay] = useState("");

    const handleDaySelect = (e) => {
        setSelectedDay(e.target.value);
    };

    const handleAddDay = () => {
        if (!selectedDay || !startTime || !endTime) {
            setErrors({ ...errors, availability: "Completa todos los campos." });
            return;
        }

        const dayInEnglish = Object.keys(dictionary).find(
            (key) => dictionary[key] === selectedDay
        );

        const dayExist=days.some(day=>day.day === dayInEnglish)

        if(dayExist){
            return
        }
        const newDay = {
            day: dayInEnglish,
            startTime,
            endTime,
        };

        setDays([...days, newDay]);
        setSelectedDay("");
        setStartTime("");
        setEndTime("");
        setErrors({ ...errors, availability: "" });
    };

    const availavilityDays = Object.entries(dictionary).map(([key, value]) => ({
        key,
        value,
    }));

    return (
        <>
            <div className="form-group">
                <label htmlFor="startTime">Inicio del horario de atención</label>
                <input
                    type="time"
                    placeholder="ej: 10:00"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <label htmlFor="endTime">Finalización del horario de atención</label>
                <input
                    type="time"
                    placeholder="ej: 18:00"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="days">Disponibilidad de días</label>
                <select id="days" name="days" onChange={handleDaySelect} value={selectedDay}>
                    <option value="">-- Selecciona una opción --</option>
                    {availavilityDays.map((item) => (
                        <option key={item.key} value={item.value}>
                            {item.value}
                        </option>
                    ))}
                </select>
                {errors.availability && <ErrorMessage>{errors.availability}</ErrorMessage>}
            </div>

            <button type="button" className="btn-add-day" onClick={handleAddDay}>
                Agregar Día
            </button>
        </>
    );
}