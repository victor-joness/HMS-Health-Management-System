import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./PacienteCard.css";

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
      pacienteGenero: Genero.MASCULINO,
      pacientePeso: "80",
      pacienteTamanho: "170",
      pacientePressao: "10/80",
      pacienteGlucose: "",
      pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
      pacienteAlergia: "Amendoin",
      pacienteDoenças: "",
      pacienteBPM: "75",
      pacienteStatus: PacineteStatus.ALTA,
    },
  }

  const PacienteImg = `../../../public/upload/${paciente.pacienteImg}`;

  return (
    <div className="CardContainer">
      <CardMedia
        className="Img"
        component="img"
        alt="green iguana"
        image={PacienteImg}
      />
      <div className="PacienteInfos">
        <h3>{paciente.pacienteName}</h3>
        <h4 className="PacienteEndereco">{paciente.pacienteEndereco}</h4>

        <p>Peso: {paciente.pacienteInfos.pacientePeso}</p>
        <p>Pressão: {paciente.pacienteInfos.pacientePressao}</p>
        <p>BPM: {paciente.pacienteInfos.pacienteBPM}</p>
        <p>: {paciente.pacienteInfos.pacientePeso}</p>
      </div>
      <div className="PacinteButton">
        <button>Ver detalhes do Paciente</button>
      </div>

      <div className="PacienteStatus">
        <p>Status: {paciente.pacienteInfos.pacienteStatus}</p>
      </div>
    </div>
  );
};

export default PacienteCard;
