import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Caretakers from "../components/ui/Caretakers";
import SearchBar from "../components/ui/SearchBar";
import SearchFilter from "../components/ui/SearchFilter";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const [caretakersCount, setCaretakersCount] = useState(0);
  const [filters, setFilters] = useState({
    service: "",
    zone: "",
    petType: "",
    neighborhood: "",
    reviews: "",
    maxPrice: "",
    order: "",
  });
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const service = queryParams.get("service");
    const zone = queryParams.get("zone"); 
    const petType = queryParams.get("petType");

    setFilters((prevFilters) => ({
      ...prevFilters,
      service: service || "",
      zone: zone || "",
      petType: petType || "",
    }));

    if (zone) {
      setSelectedProvince(zone);
    }
  }, [location.search]);

  const updateCaretakersCount = (count) => {
    setCaretakersCount(count);
  };

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilters };

    
      const { service, zone, petType } = updatedFilters;
      const queryParams = new URLSearchParams();

      if (service) queryParams.set("service", service);
      if (zone) queryParams.set("zone", zone);
      if (petType) queryParams.set("petType", petType);

      navigate(`?${queryParams.toString()}`);

      return updatedFilters;
    });
  };

  return (
    <div className="search-results-container">
      <SearchBar setSelectedProvince={setSelectedProvince} />
      <h2>Resultados:</h2>
      <p>{caretakersCount} personas</p>
      <SearchFilter updateFilters={updateFilters} selectedProvince={selectedProvince} />
      <Caretakers filters={filters} updateCaretakersCount={updateCaretakersCount} cardClassName="caretaker-card-search" />
    </div>
  );
}
