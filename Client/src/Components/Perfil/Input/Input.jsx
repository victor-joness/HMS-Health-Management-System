import React from "react";
import "./Input.css";

function Input({ label, name, type, color, placeholder, register }) {
  return (
    <div style={{ width: "100%", fontSize: "0.875rem", lineHeight: "1.25rem" }}>
      <label className={`${color ? "black" : "white"} `}>{label}</label>
      <input
        name={name}
        {...register}
        type={type}
        placeholder={placeholder}
        className={`input-perfil ${color ? "black" : "white"}`}
      />
    </div>
  );
}

export default Input;
