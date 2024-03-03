import * as React from "react";
import "./Perfil.css";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /*Valor entre 0 e 100 da barra*/
  value: PropTypes.number.isRequired,
};

const Perfil = ({ User }) => {
  const HandleEditPerfil = () => {
    console.log("teste");
  };

  const IMC =
    (User.Report.Peso / (User.Report.Tamanho * User.Report.Tamanho)) * 10000;

  const PRESSAO =
    (User.Report.Pressao.split("/")[0] / User.Report.Pressao.split("/")[1]) *
    100;

  const [progressBPM, setProgressBPM] = React.useState(User.Report.BPM);
  const [progressIMC, setProgressIMC] = React.useState(IMC);
  const [progressPressao, setProgressPressao] = React.useState(PRESSAO);
  const [progressGlicose, setProgressGlicose] = React.useState(
    User.Report.Glicose
  );

  return (
    <div>
      <div className="home-container">
        <Navbar></Navbar>
        <div className="home-direita">
          <Header title={"Perfil"} cargo={User.Cargo} />
          <div className="container-perfil">
            <div className="buttons">
              <button onClick={HandleEditPerfil}>Editar Perfil</button>
            </div>
            <div className="container-perfil-informacoes">
              <div className="parent">
                <div className="container-perfil-foto">
                  <img
                    src={`../../../../public/upload/${User.Img}`}
                    alt="Imagem do Perfil"
                  />
                </div>
                <div className="container-perfil-pessoal">
                  <h2>Sobre o paciente</h2>
                  <p>{User.Descricao}</p>
                  <div className="container-perfil-pessoal-dados">
                    <div className="container-perfil-pessoal-dados-email">
                      <h2>Email</h2>
                      <p>{User.Email}</p>
                    </div>
                    <div className="container-perfil-pessoal-dados-numero">
                      <h2>Número</h2>
                      <p>{User.Numero}</p>
                    </div>
                    <div className="container-perfil-pessoal-dados-endereco">
                      <h2>Endereço</h2>
                      <p>{User.Endereco}</p>
                    </div>
                    <div className="container-perfil-pessoal-dados-genero">
                      <h2>Genero</h2>
                      <p>{User.Report.Genero}</p>
                    </div>
                    <div className="container-perfil-pessoal-dados-altura">
                      <h2>Altura</h2>
                      <p>{User.Report.Tamanho}</p>
                    </div>
                    <div className="container-perfil-pessoal-dados-id">
                      <h2>ID</h2>
                      <p>{User.Id}</p>
                    </div>
                  </div>
                </div>
                <div className="container-perfil-historico"> </div>
                <div className="container-perfil-report">
                  <h2>Report</h2>
                  <div className="container-perfil-report-BPM">
                    <h2>BPM</h2>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgressWithLabel value={progressBPM} />
                    </Box>
                  </div>
                  <div className="container-perfil-report-pressao">
                    <h2>Pressão</h2>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgressWithLabel value={progressPressao} />
                    </Box>
                  </div>
                  <div className="container-perfil-report-imc">
                    <h2>IMC</h2>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgressWithLabel value={progressIMC} />
                    </Box>
                  </div>
                  <div className="container-perfil-report-glicose">
                    <h2>Glicose</h2>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgressWithLabel value={progressGlicose} />
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
