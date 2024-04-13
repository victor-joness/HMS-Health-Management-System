import React, { useState } from "react";
import "./DoutorPerfil.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";
import Button from "../../../Components/Perfil/Button/Button";
import Input from "../../../Components/Perfil/Input/Input";
import Uploader from "../../../Components/Perfil/Uploader/Uploader";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { RiDeleteBin5Line } from "react-icons/ri";

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
                  style={
                    "background-color: rgba(157, 201, 209, 0.315); padding: 0.5rem; border-radius: 5px; margin-left: .5rem"
                  }
                >
                  {getCargo(auth)}
                </span>
              </p>
              <p>Celular: </p>
              <div className="user-perfil-informacoes-buttons">
                <button
                  className="user-perfil-informacoes-buttons"
                  onClick={(e) => setStatus(true)}
                  style={
                    status
                      ? { backgroundColor: "rgba(157, 201, 209, 0.315)" }
                      : { backgroundColor: "rgb(248 249 250/1)" }
                  }
                >
                  Informações Pessoais
                </button>
                <button
                  className="user-perfil-informacoes-buttons"
                  onClick={(e) => setStatus(false)}
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
              <div className="user-perfil-editar">
                <div className="uploader">
                  <p style={{ fontSize: "2rem", lineHeight: "1.25rem" }}>
                    Imagem de perfil
                  </p>
                  <Uploader />
                </div>
                <div className="user-perfil-editar-input-select">
                  <div className="user-perfil-editar-input-select-titulo">
                    <p>Título</p>
                    <select>
                      <option value="Dr">Dr</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                    </select>
                  </div>

                  <div className="user-perfil-editar-input-select-genero">
                    <p>Gênero</p>
                    <select>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>

                <div className="user-perfil-editar-input-nome">
                  <label for="nome-completo" class="text-sm">
                    Nome Completo
                  </label>
                  <input id="nome-completo" type="text" />
                </div>

                <div className="user-perfil-editar-input-contato">
                  <div className="user-perfil-editar-input-contato-numero">
                    <label for="numero-telefone">Número de telefone</label>
                    <input id="numero-telefone" type="tel" placeholder="" />
                  </div>
                  <div className="user-perfil-editar-input-contato-emergencia">
                    <label for="numero-emergencia" class="text-sm">
                      Número de emergência
                    </label>
                    <input id="numero-emergencia" type="tel" placeholder="" />
                  </div>
                </div>

                <label for="email" class="text-sm">
                  Email
                </label>
                <input id="email" type="email" />

                <label for="date-of-birth" class="text-sm">
                  Date of Birth
                </label>
                <input id="date-of-birth" type="date" />
                <label for="address" class="text-sm">
                  Address
                </label>
                <input id="address" type="text" />
                <div className="button-perfil">
                  <Button
                    label={"Deletar Conta"}
                    Icon={RiDeleteBin5Line}
                    onClick={() => {
                      console.log("teste2");
                    }}
                  />
                  <Button
                    label={"Save Changes"}
                    Icon={HiOutlineCheckCircle}
                    onClick={() => {
                      console.log("teste2");
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="user-perfil-editar">
                return (
                <div className="flex-colo gap-4">
                  {/* old password */}
                  <Input label="Old Password" color={true} type="password" />
                  {/* new password */}
                  <Input label="New Password" color={true} type="password" />
                  {/* confirm password */}
                  <Input
                    label="Confirm Password"
                    color={true}
                    type="password"
                  />
                  {/* submit */}
                  <Button
                    label={"Save Changes"}
                    Icon={HiOutlineCheckCircle}
                    onClick={() => {
                      console.log("teste");
                    }}
                  />
                </div>
                );
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoutorPerfil;
