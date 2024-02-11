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
} from "../../../Components/Enums/Enums";

const DoutorPaciente = () => {
  /* const { pacientes: pacientes } = useSelector((state) => state.pacientes); */

  const pacientesStatic = [
    {
      pacienteId: 1,
      ligação: [2, 6],
      pacienteName: "victor mesquita",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
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
      },
    },
    {
      pacienteId: 2,
      ligação: [15, 5],
      pacienteName: "Joao",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
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
      },
    },
    {
      pacienteId: 3,
      ligação: [1, 11],
      pacienteName: "Joao",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
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
      },
    },
    {
      pacienteId: 4,
      ligação: [7, 12],
      pacienteName: "Joao",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
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
      },
    },
    {
      pacienteId: 5,
      ligação: [],
      pacienteName: "Pedro",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
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
      },
    },
    {
      pacienteId: 6,
      ligação: [],
      pacienteName: "Pedro",
      pacienteIdade: "20",
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
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.NORMAL,
      },
    },
    {
      pacienteId: 7,
      ligação: [],
      pacienteName: "Augusto",
      pacienteIdade: "20",
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
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.NENHUM,
      },
    },
    {
      pacienteId: 8,
      ligação: [],
      pacienteName: "Augusto",
      pacienteIdade: "20",
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
      pacienteName: "Jorge",
      pacienteIdade: "20",
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
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.ALTA,
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
      pacienteId: 13,
      ligação: [6, 9],
      pacienteName: "Marcelo",
      pacienteIdade: "20",
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
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.ALTA,
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
      pacienteId: 17,
      pacienteName: "Baiano",
      pacienteIdade: "20",
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
        pacienteGlicose: "80",
        pacienteTipoSanguineo: TipoSanguineo.O_POSITIVO,
        pacienteAlergia: "Amendoin",
        pacienteBPM: "75",
        pacienteStatus: PacienteStatus.ALTA,
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

    setFilteredItems(
      pacientesStatic.filter((paciente) =>
        paciente.pacienteName
          .toLowerCase()
          .includes(searchPalavra.toLowerCase())
      )
    );
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
                      <option value="espera">Em Espera</option>
                      <option value="atendimento">Em Atendimento</option>
                      <option value="internados">Internados</option>
                      <option value="concluidos">Concluidos</option>
                      <option value="hoje">Hoje</option>
                      <option value="mes">Mês</option>
                      <option value="anb">Ano</option>
                      <option value="todos">Todos</option>
                    </select>
                    <button className="">Buscar</button>
                    <div className="legenda">
                      Prioridade:
                      <p className="NENHUM">Nenhum</p>
                      <p className="LEVE">Leve</p>
                      <p className="NORMAL">Normal</p>
                      <p className="ALTA">Alta</p>
                      <p className="CRITICA">Critica</p>
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
