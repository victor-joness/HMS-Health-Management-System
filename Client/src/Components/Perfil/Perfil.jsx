import * as React from "react";
import "./Perfil.css";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Icons } from "../Icons/Icons";

function getArrowIcon(value) {
  if (value.BPM) {
    if (value.BPM < 60) {
      return <Icons.BiDownArrowAlt color="error" />;
    } else if (value.BPM >= 60 && value.BPM < 100) {
      return <Icons.FaGripLines color="error" />;
    } else if (value.BPM >= 100 && value.BPM < 120) {
      return <Icons.BiUpArrowAlt color="error" />;
    } else if (value.BPM >= 120 && value.BPM < 140) {
      return <Icons.BiUpArrowAlt color="error" />;
    } else {
      return <Icons.BiUpArrowAlt color="error" />;
    }
  } else if (value.Pressao) {
    const [sistolica, diastolica] = value.Pressao.split("/").map(Number);

    if (sistolica < 90 || diastolica < 60) {
      return <Icons.BiDownArrowAlt color="error" />;
    } else if (
      sistolica >= 90 &&
      sistolica < 120 &&
      diastolica >= 60 &&
      diastolica < 80
    ) {
      return <Icons.FaGripLines color="error" />;
    } else if (
      sistolica >= 120 &&
      sistolica < 140 &&
      diastolica >= 80 &&
      diastolica < 90
    ) {
      return <Icons.BiUpArrowAlt color="error" />;
    } else if (
      (sistolica >= 140 && sistolica < 160) ||
      (diastolica >= 90 && diastolica < 100)
    ) {
      return <Icons.BiUpArrowAlt color="error" />;
    } else {
      return <Icons.BiUpArrowAlt color="error" />;
    }
  } else if (value.IMC) {
    if (value.IMC < 18.5) {
      return <Icons.BiDownArrowAlt color="error" />;
    } else if (value.IMC >= 18.5 && value.IMC < 25.0) {
      return <Icons.FaGripLines color="error" />;
    } else if (value.IMC >= 25.0 && value.IMC < 30.0) {
      return <Icons.BiUpArrowAlt color="error" />;
    } else {
      return <Icons.BiUpArrowAlt color="error" />;
    }
  } else {
    if (value.Glicose >= 70 && value.Glicose <= 100) {
      return <Icons.FaGripLines color="error" />;
    } else if (value.Glicose > 100) {
      return <Icons.BiUpArrowAlt color="error" />;
    }else{
      return <Icons.BiDownArrowAlt color="error" />;
    }
  }
}

const Perfil = ({ User }) => {
  const HandleEditPerfil = () => {
    console.log("teste");
  };

  //fazer depois uma função que faz o calculo automatico da frequencia calcularFrequencia(User.Report.BPM, User.Idade, User.Report.Genero);

  const IMC =
    (User.Report.Peso / (User.Report.Tamanho * User.Report.Tamanho)) * 10000;

  const PRESSAO =
    (User.Report.Pressao.split("/")[0] / User.Report.Pressao.split("/")[1]) *
    100;

  const [progressBPM, setProgressBPM] = React.useState(parseInt(User.Report.BPM));
  const [progressIMC, setProgressIMC] = React.useState(IMC);
  const [progressPressao, setProgressPressao] = React.useState(PRESSAO);
  const [progressGlicose, setProgressGlicose] = React.useState(
    parseInt(User.Report.Glicose)
  );

  return (
    <div>
      <div className="home-container">
        <Navbar></Navbar>
        <div className="home-direita">
          <Header title={"Perfil"}/>
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
                    <div className="container-perfil-pessoal-dados-idade">
                      <h2>Idade</h2>
                      <p>{User.Idade}</p>
                    </div>
                    <div className="container-perfil-pessoal-dados-peso">
                      <h2>Peso</h2>
                      <p>{User.Report.Peso}</p>
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
                    <div className="container-perfil-report-text">
                      <h2>BPM</h2>
                      <p>{User.Report.BPM}</p>
                    </div>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={progressBPM}
                          sx={{
                            marginRight: getArrowIcon({ BPM: progressBPM })
                              ? 1
                              : 0,
                          }}
                        />
                      </Box>
                      {getArrowIcon({ BPM: progressBPM })}
                    </Box>
                  </div>
                  <div className="container-perfil-report-pressao">
                    <div className="container-perfil-report-text">
                      <h2>Pressão</h2>
                      <p>{User.Report.Pressao}</p>
                    </div>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={progressPressao}
                          sx={{
                            marginRight: getArrowIcon({
                              Pressao: User.Report.Pressao,
                            })
                              ? 1
                              : 0,
                          }}
                        />
                      </Box>
                      {getArrowIcon({ Pressao: User.Report.Pressao })}
                    </Box>
                  </div>
                  <div className="container-perfil-report-imc">
                    <div className="container-perfil-report-text">
                      <h2>IMC</h2>
                      <p>{parseInt(IMC)}</p>
                    </div>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={progressIMC}
                          sx={{
                            marginRight: getArrowIcon({ IMC: progressIMC })
                              ? 1
                              : 0,
                          }}
                        />
                      </Box>
                      {getArrowIcon({ IMC: progressIMC })}
                    </Box>
                  </div>
                  <div className="container-perfil-report-glicose">
                    <div className="container-perfil-report-text">
                      <h2>Glicose</h2>
                      <p>{User.Report.Glicose}</p>
                    </div>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={progressGlicose}
                          sx={{
                            marginRight: getArrowIcon({
                              Glicose: progressGlicose,
                            })
                              ? 1
                              : 0,
                          }}
                        />
                      </Box>
                      {getArrowIcon({ Glicose: progressGlicose })}
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
