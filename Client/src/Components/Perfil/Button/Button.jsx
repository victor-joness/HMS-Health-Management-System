import React from "react";
import "./Button.css";
import { BiLoaderCircle } from "react-icons/bi";

const Button = ({ label, onClick, loading, Icon }) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`button`}
      style={{
        backgroundColor:
          label === "Deletar Conta" ? "rgb(189, 54, 54) " : "rgb(9, 170, 103)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem 1rem",
      }}
    >
      {loading ? (
        <BiLoaderCircle className="animate-spin-button" />
      ) : (
        <>
          {label}
          {Icon && <Icon className="icon-button" />}
        </>
      )}
    </button>
  );
};

export default Button;
