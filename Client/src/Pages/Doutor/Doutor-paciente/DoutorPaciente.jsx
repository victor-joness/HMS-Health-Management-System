import React, { useState } from "react";
import "./DoutorPaciente.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../../../Components/Header/Header";
import Navbar from "../../../Components/Navbar/Navbar";
import PacientesContainer from "../../../Components/PacientesContainer/PacientesContainer";

import {
  PacienteStatus,
  Genero,
  TipoSanguineo,
  PacienteFluxo,
} from "../../../Components/Enums/Enums";

import { converterStringParaData } from "../../../Utils/DateTime";

const DoutorPaciente = () => {
  /* const { pacientes: pacientes } = useSelector((state) => state.pacientes); */

  const pacientesStatic = [
    {
      pacienteId: 1,
      ligação: [2, 6],
      pacienteName: "victor mesquita dia",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2024 10:00:00",
      pacienteDataFim: "18/02/2024 10:00:00",
      pacienteEndereco: "rua do centro, 123",
      pacienteDetalhes:
        "Victor é um paciente frequente e tbm gosta de chocolate e tem 20 anos",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.ALTA,
        pacienteFluxo: PacienteFluxo.INTERNADO,
      },
    },
    {
      pacienteId: 2,
      ligação: [15, 5],
      pacienteName: "Joao dia",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2024 10:00:00",
      pacienteDataFim: "18/02/2024 10:00:00",
      pacienteEndereco: "Rua dos tabajara",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.LEVE,
        pacienteFluxo: PacienteFluxo.EM_ANALISE,
      },
    },
    {
      pacienteId: 3,
      ligação: [1, 11],
      pacienteName: "Joao dia2",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2024 10:00:00",
      pacienteDataFim: "18/02/2024 10:00:00",
      pacienteEndereco: "Rua dos tabajara, 456",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.CRITICA,
        pacienteFluxo: PacienteFluxo.INTERNADO,
      },
    },
    {
      pacienteId: 4,
      ligação: [7, 12],
      pacienteName: "Joao mes",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/01/2024 10:00:00",
      pacienteDataFim: "18/02/2024 10:00:00",
      pacienteEndereco: "Rua 20 de agosto, 456",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.LEVE,
        pacienteFluxo: PacienteFluxo.EM_ATENDIMENTO,
      },
    },
    {
      pacienteId: 5,
      ligação: [],
      pacienteName: "Pedro mes",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/01/2024 10:00:00",
      pacienteDataFim: "18/02/2024 10:00:00",
      pacienteEndereco: "Carrapicho em monsenhor",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.NENHUM,
        pacienteFluxo: PacienteFluxo.CONCLUIDO,
      },
    },
    {
      pacienteId: 6,
      ligação: [],
      pacienteName: "Pedro mes",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/01/2024 10:00:00",
      pacienteDataFim: "18/02/2024 10:00:00",
      pacienteEndereco: "Mora em crateus",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.NORMAL,
        pacienteFluxo: PacienteFluxo.EM_ESPERA,
      },
    },
    {
      pacienteId: 7,
      ligação: [],
      pacienteName: "Augusto ano",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2023 10:00:00",
      pacienteDataFim: "",
      pacienteEndereco: "mora em tamboril ",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.NENHUM,
        pacienteFluxo: PacienteFluxo.INTERNADO,
      },
    },
    {
      pacienteId: 8,
      ligação: [],
      pacienteName: "Augusto ano",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2023 10:00:00",
      pacienteDataFim: "",
      pacienteEndereco: "",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.CRITICA,
      },
    },
    {
      pacienteId: 9,
      ligação: [],
      pacienteName: "Jorge ano",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2023 10:00:00",
      pacienteDataFim: "",
      pacienteEndereco: "",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.ALTA,
        pacienteFluxo: PacienteFluxo.EM_COLETA,
      },
    },
    {
      pacienteId: 10,
      ligação: [],
      pacienteName: "Jorge",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2022 10:00:00",
      pacienteDataFim: "",
      pacienteEndereco: "",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.LEVE,
        pacienteFluxo: PacienteFluxo.EM_ATENDIMENTO,
      },
    },
    {
      pacienteId: 11,
      ligação: [4, 13],
      pacienteName: "Maria",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2022 10:00:00",
      pacienteDataFim: "",
      pacienteEndereco: "",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.NORMAL,
        pacienteFluxo: PacienteFluxo.EM_ATENDIMENTO,
      },
    },
    {
      pacienteId: 12,
      ligação: [],
      pacienteName: "Maria",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2022 10:00:00",
      pacienteDataFim: "",
      pacienteEndereco: "",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.CRITICA,
        pacienteFluxo: PacienteFluxo.CONCLUIDO,
      },
    },
    {
      pacienteId: 13,
      ligação: [6, 9],
      pacienteName: "Marcelo",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2022 10:00:00",
      pacienteDataFim: "",
      pacienteEndereco: "",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.ALTA,
        pacienteFluxo: PacienteFluxo.INTERNADO,
      },
    },
    {
      pacienteId: 14,
      ligação: [],
      pacienteName: "Marcelo",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2022 10:00:00",
      pacienteDataFim: "",
      pacienteEndereco: "",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.NENHUM,
        pacienteFluxo: PacienteFluxo.EM_ESPERA,
      },
    },
    {
      pacienteId: 15,
      ligação: [],
      pacienteName: "Rafaela",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2022 10:00:00",
      pacienteDataFim: "",
      pacienteEndereco: "",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.LEVE,
        pacienteFluxo: PacienteFluxo.INTERNADO,
      },
    },
    {
      pacienteId: 16,
      pacienteName: "Rafaela",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2022 10:00:00",
      pacienteDataFim: "",
      pacienteEndereco: "",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.CRITICA,
        pacienteFluxo: PacienteFluxo.EM_ANALISE,
      },
    },
    {
      pacienteId: 17,
      pacienteName: "Baiano",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteDataInicio: "18/02/2022 10:00:00",
      pacienteDataFim: "",
      pacienteEndereco: "",
      pacienteDetalhes: "Joao é um paciente frequente",
      pacienteImg: "IMG-USER.png",
      pacienteInfos: {
        pacienteGenero: Genero.MASCULINO,
        pacientePeso: "80",
        pacienteTamanho: "170",
        pacientePressao: "10/80",
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.ALTA,
        pacienteFluxo: PacienteFluxo.CONCLUIDO,
      },
    },
  ];

  const auth = useSelector((state) => {
    return state.auth;
  });

  const [status, setStatus] = useState(true);
  const [searchPalavra, setSearchPalavra] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filteredItems, setFilteredItems] = useState(pacientesStatic);





  const handleFilterSubmit = (e) => {
    e.preventDefault();

    let searchCategoria = window.document.getElementById("type").value;

    if (
      searchCategoria == "1" ||
      searchCategoria == "2" ||
      searchCategoria == "4" ||
      searchCategoria == "6"
    ) {
      setFilteredItems(
        pacientesStatic.filter(
          (paciente) =>
            paciente.pacienteName
              .toLowerCase()
              .includes(searchPalavra.toLowerCase()) &&
            paciente.pacienteInfos.pacienteFluxo == searchCategoria
        )
      );
    } else if (
      searchCategoria == "hoje" ||
      searchCategoria == "mes" ||
      searchCategoria == "ano"
    ) {
      if (searchCategoria == "hoje") {
        setFilteredItems(
          pacientesStatic.filter((paciente) => {
            const dataInicio = converterStringParaData(
              paciente.pacienteDataInicio
            );
            const dataAtual = new Date();
            return (
              paciente.pacienteName
                .toLowerCase()
                .includes(searchPalavra.toLowerCase()) &&
              dataInicio.dia === dataAtual.getDate() &&
              dataInicio.mes === dataAtual.getMonth() + 1 &&
              dataInicio.ano === dataAtual.getFullYear()
            );
          })
        );
      } else if (searchCategoria == "mes") {
        setFilteredItems(
          pacientesStatic.filter((paciente) => {
            const dataInicio = converterStringParaData(
              paciente.pacienteDataInicio
            );
            const dataAtual = new Date();
            return (
              paciente.pacienteName
                .toLowerCase()
                .includes(searchPalavra.toLowerCase()) &&
              dataInicio.mes === dataAtual.getMonth() &&
              dataInicio.ano === dataAtual.getFullYear()
            );
          })
        );
      } else {
        setFilteredItems(
          pacientesStatic.filter((paciente) => {
            const dataInicio = converterStringParaData(
              paciente.pacienteDataInicio
            );
            const dataAtual = new Date();
            return (
              (paciente.pacienteName
                .toLowerCase()
                .includes(searchPalavra.toLowerCase()) &&
                dataInicio.ano === dataAtual.getFullYear()) ||
              dataInicio.ano === dataAtual.getFullYear() - 1
            );
          })
        );
      }
    } else {
      setFilteredItems(
        pacientesStatic.filter((paciente) =>
          paciente.pacienteName
            .toLowerCase()
            .includes(searchPalavra.toLowerCase())
        )
      );
    }
  };

  const [prioridades, setPrioridade] = useState({
    NENHUM: false,
    LEVE: false,
    NORMAL: false,
    ALTA: false,
    CRITICA: false,
  });

  const mudarPrioridade = (prioridade) => {
    setPrioridade((prevPrioridade) => ({
      ...prevPrioridade,
      [prioridade]: !prevPrioridade[prioridade],
    }));
  };

  const mudarTodasPrioridade = () => {
    //verifica se todas estão ativas, caso sim retorna true, se não false, e ai o reduce faz o inverso
    const allActive = Object.values(prioridades).every((isActive) => isActive);
    const novasPrioridade = Object.keys(prioridades).reduce((acc, prioridade) => {
      acc[prioridade] = !allActive;
      return acc;
    }, {});
    setPrioridade(novasPrioridade);
  };

  return (
    <div>
      <div className="home-container">
        <Navbar Cargo={auth}></Navbar>
        <div className="home-direita">
          <Header title={"Listagem de pacientes"} cargo={"Doutor"} />
          <div className="container">
            {status ? (
              <div className="container-pacientes">
                <form id="" className="filters" onSubmit={handleFilterSubmit}>
                  <div className="container-paciente">
                    <input
                      type="text"
                      name="keyword"
                      className=""
                      placeholder="Buscar por paciente"
                      value={searchPalavra}
                      onChange={(e) => setSearchPalavra(e.target.value)}
                    />
                    <select name="type" id="type" className="">
                      <option value="" selected>
                        Escolher Categoria
                      </option>
                      <option value="1">Em Espera</option>
                      <option value="2">Em Atendimento</option>
                      <option value="4">Internados</option>
                      <option value="6">Concluidos</option>
                      <option value="hoje">Hoje</option>
                      <option value="mes">Mês</option>
                      <option value="ano">Ano</option>
                      <option value="todos">Todos</option>
                    </select>
                    <button className="">Buscar</button>
                    <div className="legenda">
                      Prioridade:
                      {Object.entries(prioridades).map(
                        ([prioridade, isActive]) => (
                          <p
                            key={prioridade}
                            className={`${prioridade} ${
                              isActive ? "isActive" : ""
                            }`}
                            onClick={() => mudarPrioridade(prioridade)}
                          >
                            {prioridade.charAt(0) + prioridade.slice(1).toLowerCase()}
                          </p>
                        )
                      )}
                      <button onClick={mudarTodasPrioridade}>Alterar todos</button>
                    </div>
                  </div>
                </form>

                <PacientesContainer
                  pacientesData={filteredItems}
                ></PacientesContainer>
              </div>
            ) : (
              <div>qualquer coisa</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoutorPaciente;
