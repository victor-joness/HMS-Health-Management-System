import React, { useState } from "react";
import "./DoutorPerfil.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";

import { useSelector } from "react-redux";
import { getCargo } from "../../../Utils/GetFunctions";

const DoutorPerfil = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const [status, setStatus] = useState(true);

  return (
    <div>
      <div className="home-container">
        <Navbar></Navbar>
        <div className="home-direita">
          <Header title={"Perfil"} cargo={getCargo(auth)} />

          <div className="container-user-perfil">
            <div className="user-perfil-informacoes">
              <div className="user-perfil-informacoes-img">
                <img src={`../../../../public/upload/${auth.Img}`} alt="" />
              </div>
              <p>Nome: {auth.name}</p>
              <p>E-mail: {auth.email}</p>
              <p>
                Cargos:
                <span
                  class="cargo"
                  style={"background-color: rgba(157, 201, 209, 0.315); padding: 0.5rem; border-radius: 5px; margin-left: .5rem"}
                >
                  {getCargo(auth)}
                </span>
              </p>
              <p>Celular: </p>
              <div className="user-perfil-informacoes-buttons">
                <button
                  onClick={(e) => setStatus(!status)}
                  style={
                    status
                      ? { backgroundColor: "rgba(157, 201, 209, 0.315)" }
                      : { backgroundColor: "rgb(248 249 250/1)" }
                  }
                >
                  Informações Pessoais
                </button>
                <button
                  onClick={(e) => setStatus(!status)}
                  style={
                    !status
                      ? { backgroundColor: "rgba(157, 201, 209, 0.315)" }
                      : { backgroundColor: "rgb(248 249 250/1)" }
                  }
                >
                  Editar Senha
                </button>
              </div>
            </div>
            {status ? (
              <div className="user-perfil-editar"></div>
            ) : (
              <div className="user-perfil-editar"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoutorPerfil;
