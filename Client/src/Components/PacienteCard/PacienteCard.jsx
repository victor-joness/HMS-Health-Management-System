import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import "./PacienteCard.css";
import { BloodType, Gender, PatientStatus } from "../../Utils/Enum.ts";
import { NavLink } from "react-router-dom";

const PacienteCard = ({ paciente }) => {
  const PacineteTemplate = {
    pacienteId: 17,
    pacienteName: "Joao",
    pacienteIdade: "",
    pacienteNumero: "",
    pacienteRG: "",
    pacienteSUS: "",
    pacienteEmail: "",
    pacienteEndereco: "",
    pacienteDetalhes: "Joao é um paciente frequente",
    pacienteImg: "IMG-USER.png",
    pacienteInfos: {
      pacienteGenero: Gender.MASCULINO,
      pacientePeso: "80",
      pacienteTamanho: "170",
      pacientePressao: "10/80",
      pacienteGlucose: "",
      pacienteTipoSanguineo: BloodType.O_POSITIVO,
      pacienteAlergia: "Amendoin",
      pacienteBPM: "75",
      pacienteStatus: PatientStatus.ALTA,
    },
  };

  const PacienteImg = `../../../public/upload/${paciente.pacienteImg}`;
  const statusClass = `PacienteStatus ${paciente.pacienteInfos.pacienteStatus}`;

  return (
    <div className="CardContainer">
      <div className="img">
        <CardMedia
          className="Img"
          component="img"
          alt="green iguana"
          image={PacienteImg}
        />
        <div className={statusClass}></div>
      </div>

      <div className="PacienteInfos">
        <h3>{paciente.pacienteName}</h3>
        <h4 className="PacienteEndereco">{paciente.pacienteEndereco}</h4>

        <p className="PacienteIdade">
          <strong>Idade: </strong>
          {paciente.pacienteIdade} Anos
        </p>
        <p>
          <strong>Peso/Tamanho: </strong>
          {paciente.pacienteInfos.pacientePeso}Kg /{" "}
          {paciente.pacienteInfos.pacienteTamanho}cm
        </p>
        <p>
          <strong>Pressão: </strong>
          {paciente.pacienteInfos.pacientePressao}mmHg
        </p>
        <p>
          <strong>BPM: </strong>
          {paciente.pacienteInfos.pacienteBPM}Bpm
        </p>
        <p>
          <strong>Glicose: </strong>
          {paciente.pacienteInfos.pacienteGlicose}mg/dl
        </p>
        <p>
          <strong>Alergia: </strong>
          {paciente.pacienteInfos.pacienteAlergia}
        </p>
      </div>
      <div className="PacinteButton">
        <NavLink
          to={`/doutor/pacientes/perfil/id/${paciente.pacienteId}`}
          style={() => {
            return {
              color: "white",
            };
          }}
        >
          <button>Ver Detalhes do paciente</button>
        </NavLink>
      </div>
    </div>
  );
};

export default PacienteCard;
