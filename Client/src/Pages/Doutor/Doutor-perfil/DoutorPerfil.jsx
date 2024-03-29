import React, { useState } from "react";
import "./DoutorPerfil.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";
import Button from "../../../Components/Perfil/Button/Button";
import Input from "../../../Components/Perfil/Input/Input";
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
                <div class="flex gap-3 flex-col w-full col-span-6">
                  <p class="text-sm">Profile Image</p>
                  <input type="file" />
                </div>
                <div class="flex w-full flex-col gap-3">
                  <p class="text-black text-sm">Title</p>
                  <select>
                    <option value="title1">Title 1</option>
                    <option value="title2">Title 2</option>
                    <option value="title3">Title 3</option>
                  </select>
                </div>
                <label for="full-name" class="text-sm">
                  Full Name
                </label>
                <input id="full-name" type="text" />

                <label for="phone-number" class="text-sm">
                  Phone Number
                </label>
                <input id="phone-number" type="tel" />

                <label for="email" class="text-sm">
                  Email
                </label>
                <input id="email" type="email" />
                <div class="flex w-full flex-col gap-3">
                  <p class="text-black text-sm">Gender</p>
                  <select>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <label for="emergency-contact" class="text-sm">
                  Emergency Contact
                </label>
                <input id="emergency-contact" type="tel" />
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
