import React from "react";
import "./DoutorPerfil.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";

import { useSelector } from "react-redux";
import { getCargo } from "../../../Utils/GetFunctions";

const DoutorPerfil = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  return (
    <div>
      <div className="home-container">
        <Navbar></Navbar>
        <div className="home-direita">
          <Header title={"Perfil"} cargo={getCargo(auth)} />
        </div>
      </div>
    </div>
  );
};

export default DoutorPerfil;
