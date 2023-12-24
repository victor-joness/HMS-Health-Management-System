import React from "react";
import "./Home.css";

import logo from "../../Assets/LOGO.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container-home">
      <div className="container-home-center">
        <div className="image">
          <img src={logo} alt="" />
        </div>
        <h1>Bem Vindo ao ERP</h1>
        <div className="buttons">
          <button className="container-home-login" onClick={handleLogin}>
            Login
          </button>
          <button className="container-home-login" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
