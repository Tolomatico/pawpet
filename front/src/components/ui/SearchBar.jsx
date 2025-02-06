import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { zones } from "../../data/zones";  // Import the zones data

const serviceMapping = {
  "Cuidado": "caretaker",
  "Paseo": "dogwalker"
};

export default function SearchBar({ setSelectedProvince }) {
  const [service, setService] = useState("");
  const [province, setProvince] = useState("");
  const [focus, setFocus] = useState("service");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const searchBarRef = useRef(null);

  const serviceOptions = Object.keys(serviceMapping);
  const provinceOptions = zones.map((zone) => zone.province); 

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (focus === "service") {
      setService(value);
      setSuggestions(
        serviceOptions
          .filter((option) => option.toLowerCase().includes(value.toLowerCase()))
          .sort((a, b) => (a.toLowerCase().startsWith(value.toLowerCase()) ? -1 : 1))
      );
    } else {
      setProvince(value);  // Changed to province
      setSuggestions(
        provinceOptions
          .filter((option) => option.toLowerCase().includes(value.toLowerCase()))
          .sort((a, b) => (a.toLowerCase().startsWith(value.toLowerCase()) ? -1 : 1))
      );
    }
  };

  const handleSuggestionClick = (option) => {
    if (focus === "service") {
      setService(option);
    } else {
      setProvince(option);
      setSelectedProvince(option);  
    }
    setSuggestions([]);
  };

  const handleSearch = () => {
    const mappedService = serviceMapping[service] || service;
    const params = new URLSearchParams();
  
    if (mappedService) {
      params.append("service", mappedService);
    }
    if (province) {
      params.append("zone", province);
    }
  
    console.log("URL generada:", `/results?${params.toString()}`);
    navigate(`/results?${params.toString()}`, { replace: true });
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar-container" ref={searchBarRef}>
      <div className="search-bar">
        <input
          type="text"
          value={service}
          placeholder="Servicio"
          onChange={handleInputChange}
          onClick={() => {
            setFocus("service");
            setSuggestions(serviceOptions);
          }}
          onFocus={() => setSuggestions(serviceOptions)}
          autoComplete="off"
        />
        <input
          type="text"
          value={province}  
          placeholder="Provincia" 
          onChange={handleInputChange}
          onClick={() => {
            setFocus("province");
            setSuggestions(provinceOptions);
          }}
          onFocus={() => setSuggestions(provinceOptions)}
          autoComplete="off"
        />
        <button type="button" onClick={handleSearch}>
          Buscar
        </button>
        {suggestions.length > 0 && (
          <ul className={`suggestions ${suggestions.length > 0 ? "show" : ""}`}>
            {suggestions.map((option, index) => (
              <li key={index} onClick={() => handleSuggestionClick(option)} className="suggestion-item">
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
