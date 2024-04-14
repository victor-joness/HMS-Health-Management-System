import React, { useState } from "react";
import "./DoutorPerfil.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";
import Button from "../../../Components/Perfil/Button/Button";
import Input from "../../../Components/Perfil/Input/Input";
import Uploader from "../../../Components/Perfil/Uploader/Uploader";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { RiDeleteBin5Line, RiLockPasswordLine } from "react-icons/ri";

import { BiUserPlus } from "react-icons/bi";

import { useSelector } from "react-redux";
import { getCargo } from "../../../Utils/GetFunctions";

const DoutorPerfil = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const [status, setStatus] = useState("informacoes_pessoais");

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
              <p>Celular: {auth.Numero}</p>
              <div className="user-perfil-informacoes-buttons">
                <button
                  className="user-perfil-informacoes-button"
                  onClick={(e) => setStatus("informacoes_pessoais")}
                  style={
                    status == "informacoes_pessoais"
                      ? {
                          backgroundColor: "rgba(157, 201, 209, 0.315)",
                          lineHeight: "1.5rem",
                          gap: "1rem",
                        }
                      : {
                          backgroundColor: "rgb(248 249 250/1)",
                          lineHeight: "1.5rem",
                          gap: "1rem",
                        }
                  }
                >
                  <BiUserPlus />
                  Informações Pessoais
                </button>
                <button
                  className="user-perfil-informacoes-button"
                  onClick={(e) => setStatus("definir_senha")}
                  style={
                    status == "definir_senha"
                      ? {
                          backgroundColor: "rgba(157, 201, 209, 0.315)",
                          lineHeight: "1.5rem",
                          gap: "1rem",
                        }
                      : {
                          backgroundColor: "rgb(248 249 250/1)",
                          lineHeight: "1.5rem",
                          gap: "1rem",
                        }
                  }
                >
                  <RiLockPasswordLine />
                  Editar Senha
                </button>

                <button
                  className="user-perfil-informacoes-button"
                  onClick={(e) => setStatus("definir_cargos")}
                  style={
                    status == "definir_cargos"
                      ? {
                          backgroundColor: "rgba(157, 201, 209, 0.315)",
                          lineHeight: "1.5rem",
                          gap: "1rem",
                        }
                      : {
                          backgroundColor: "rgb(248 249 250/1)",
                          lineHeight: "1.5rem",
                          gap: "1rem",
                        }
                  }
                >
                  Definir cargos
                </button>
              </div>
            </div>
            {status == "informacoes_pessoais" ? (
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
                  <label for="nome-completo">Nome Completo</label>
                  <input id="nome-completo" type="text" />
                </div>

                <div className="user-perfil-editar-input-contato">
                  <div className="user-perfil-editar-input-contato-numero">
                    <label for="numero-telefone">Número de telefone</label>
                    <input id="numero-telefone" type="tel" placeholder="" />
                  </div>
                  <div className="user-perfil-editar-input-contato-emergencia">
                    <label for="numero-emergencia">Número de emergência</label>
                    <input id="numero-emergencia" type="tel" placeholder="" />
                  </div>
                </div>

                <div className="user-perfil-editar-input-email">
                  <label for="email">Email</label>
                  <input id="email" type="email" />
                </div>

                <div className="user-perfil-editar-input-data-aniversario">
                  <label for="data-aniversario" class="text-sm">
                    Data de aniversario
                  </label>
                  <input id="data-aniversario" type="date" />
                </div>

                <div className="user-perfil-editar-input-endereço">
                  <label for="endereço" class="text-sm">
                    Endereço
                  </label>
                  <input id="endereço" type="text" />
                </div>

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
            ) : status == "definir_senha" ? (
              <div className="user-perfil-editar">
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
              </div>
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
