import { useState } from "react";

const areaCodes = [
  { code: "+54", country: "Argentina" },
  { code: "+1", country: "EE.UU." },
  { code: "+34", country: "España" },
  { code: "+55", country: "Brasil" },
];

export function PhoneInput({ handlePhoneChange}) {
    const [selectedCode, setSelectedCode] = useState(areaCodes[0].code);
    const [phoneNumber, setPhoneNumber] = useState("");
  
    const handleCodeChange = (e) => {
      const newCode = e.target.value;
      setSelectedCode(newCode);
      handlePhoneChange(newCode, phoneNumber);
    };
  
    const handlePhoneInputChange = (e) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) {
        setPhoneNumber(value);
        handlePhoneChange(selectedCode, value);
      }
    };
  
    return (
      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <label htmlFor="phone">Teléfono:</label>
        <select value={selectedCode} onChange={handleCodeChange} style={{ padding: "5px", borderRadius: "5px" }}>
          {areaCodes.map((area) => (
            <option key={area.code} value={area.code}>
              {area.code} ({area.country})
            </option>
          ))}
        </select>
        <input
          onChange={handlePhoneInputChange}
          type="number"
          id="phone"
          name="phone"
          placeholder="Escribe tu número"
          style={{ padding: "5px", borderRadius: "5px", width: "100%" }}
          value={phoneNumber}
        />
      </div>
    );
  }