import React from "react";
import "./DoutorPerfil.css";
import { useSelector } from "react-redux";
import {getCargo} from "../../../Utils/GetFunctions";
import Perfil from "../../../Components/Perfil/Perfil";

import {
  PacienteStatus,
  Genero,
  TipoSanguineo,
  PacienteFluxo,
} from "../../../Components/Enums/Enums";

const DoutorPerfil = () => {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const user = {
    Id: auth.id,
    Name: auth.name,
    Email: auth.email,
    Img: auth.Img,
    Idade: auth.Idade,
    Cargo: getCargo(auth),
    Descricao:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis excepturi qui ipsa nostrum nihil debitis aperiam illo voluptates et rerum doloremque velit vel quis dolores ullam molestiae quo, incidunt officia Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, consequuntur excepturi explicabo doloribus quos enim dolorum dicta reprehenderit ut ipsum aspernatur odit quisquam neque porro delectus suscipit quas. Magni, aut!",
    Numero: "12345678910",
    Endereco: "345, Sarju Appt., Mota Varacha, Surat Gujarat, India.",
    Historico: [],
    Report: {
      Genero: Genero.MASCULINO,
      Peso: "80",
      Tamanho: "170",
      Pressao: "80/120",
      Glicose: "80",
      TipoSanguineo: TipoSanguineo.O_POSITIVO,
      Alergia: "Amendoin",
      BPM: "75",
      Status: PacienteStatus.ALTA,
      Fluxo: PacienteFluxo.INTERNADO,
    },
  };

  return (
    <Perfil User={user} />
  );
};

export default DoutorPerfil;
