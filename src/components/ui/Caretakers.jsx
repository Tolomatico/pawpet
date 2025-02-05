import React, { useState, useEffect } from 'react';
import CaretakerCardSkeleton from './SkeletonCard';
import CaretakerCard from './CaretakerCard';
import getCaretakers from "../../api/apiCaretakers";
import { useLocation } from "react-router-dom";

export default function Caretakers({ filters = {}, updateCaretakersCount, cardClassName }) {
  const [caretakers, setCaretakers] = useState([]);
  const [filteredCaretakers, setFilteredCaretakers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const location = useLocation();

  const fetchCaretakers = async (filterParams = {}) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await getCaretakers(filterParams);
      console.log('Datos obtenidos:', response);

      if (response.success) {
        setCaretakers(response.data);
        applyLocalFilters(response.data);
        if (updateCaretakersCount) {
          updateCaretakersCount(response.data.length);
        }
      } else {
        setCaretakers([]);
        setFilteredCaretakers([]);
        setErrorMessage('No se encontraron cuidadores que cumplan con los criterios de búsqueda.');
      }
    } catch (error) {
      setCaretakers([]);
      setFilteredCaretakers([]);
      if (error.message === 'Cuidadores no encontrados') {
        setErrorMessage('No se encontraron cuidadores que cumplan con los criterios de búsqueda.');
      } else {
        setErrorMessage('Ocurrió un error al obtener los cuidadores. Por favor, intenta nuevamente.');
      }
      console.error('Error al obtener los cuidadores:', error.message);
    } finally {
      setIsLoading(false);
      console.log('Carga finalizada');
    }
  };

  const applyLocalFilters = (caretakersData) => {
    let filtered = caretakersData;
  
    if (filters.petType) {
      filtered = filtered.filter(caretaker => {
      
        return caretaker.petType && caretaker.petType.includes(filters.petType);
      });
    }
  
    if (filters.neighborhood) {
      filtered = filtered.filter(caretaker => caretaker.neighborhood === filters.neighborhood);
    }
  
    if (filters.reviews) {
      filtered = filtered.filter(caretaker => caretaker.reviews >= filters.reviews);
    }
  
    if (filters.maxPrice) {
      filtered = filtered.filter(caretaker => caretaker.cost <= filters.maxPrice);
    }
  
    if (filters.order) {
      filtered = filtered.sort((a, b) => {
        if (filters.order === "Menor precio") return a.cost - b.cost;
        if (filters.order === "Mayor precio") return b.cost - a.cost;
        return 0;
      });
    }
  
    setFilteredCaretakers(filtered);
    if (updateCaretakersCount) {
      updateCaretakersCount(filtered.length);
    }
  };
  

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const service = queryParams.get("service");
    const zone = queryParams.get("zone");
    const petType = queryParams.get("petType");
    fetchCaretakers({ service, zone, petType });
  }, [location.search]);

  useEffect(() => {
    if (caretakers.length > 0) {
      applyLocalFilters(caretakers);
    }
  }, [filters]);

  return (
    <div className="positioncards">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <CaretakerCardSkeleton key={index} />
        ))
      ) : filteredCaretakers.length > 0 ? (
        filteredCaretakers.map((caretaker) => (
          <CaretakerCard key={caretaker._id} caretaker={caretaker} className={cardClassName} />
        ))
      ) : (
        <h1>{errorMessage}</h1>
      )}
    </div>
  );
}
