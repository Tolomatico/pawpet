import React, { useState, useEffect } from "react";
import { zones } from "../../data/zones";

export default function SearchFilter({ updateFilters, selectedProvince }) {
  const [filters, setFilters] = useState({
    petType: "",
    neighborhood: "",
    reviews: "",
    maxPrice: "",
    order: "",
  });

  const petTypeMapping = {
    "Perro": "dog",
    "Gato": "cat",
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [name]: value,
      };

      
      if (name === "petType") {
        updatedFilters[name] = petTypeMapping[value] || ""; 
      }

      updateFilters(updatedFilters);  
      return updatedFilters;
    });
  };

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      province: selectedProvince,
      neighborhood: "", 
    }));
  }, [selectedProvince]);

  const selectedZone = zones.find(zone => zone.province === selectedProvince);
  const neighborhoods = selectedZone ? selectedZone.neighborhoods : [];

  return (
    <div className="search-filter-container">
      <p>Filtrar por:</p>
      <div className="search-filter">
        {/* Tipo de mascota */}
        <select name="petType" value={filters.petType} onChange={handleChange}>
          <option value="">Tipo de mascota</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Otro">Otro</option>
        </select>

        {/* Barrio */}
        <select name="neighborhood" value={filters.neighborhood} onChange={handleChange} disabled={!selectedProvince}>
          <option value="">Barrio</option>
          {neighborhoods.map((neighborhood) => (
            <option key={neighborhood.name} value={neighborhood.name}>
              {neighborhood.name}
            </option>
          ))}
        </select>

        {/* Valoración */}
        <select name="reviews" value={filters.reviews} onChange={handleChange}>
          <option value="">Valoración mínima</option>
          <option value="1">1 estrella</option>
          <option value="2">2 estrellas</option>
          <option value="3">3 estrellas</option>
          <option value="4">4 estrellas</option>
          <option value="5">5 estrellas</option>
        </select>

        {/* Ordenar por precio */}
        <select className="order-filter" name="order" value={filters.order} onChange={handleChange}>
          <option value="">Ordenar por</option>
          <option value="Menor precio">Menor precio</option>
          <option value="Mayor precio">Mayor precio</option>
        </select>
      </div>
    </div>
  );
}
