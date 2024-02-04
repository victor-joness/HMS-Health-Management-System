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

import { logoutUser } from "../../../Features/authSlice";

const DoutorPaciente = () => {
  /* const { pacientes: pacientes } = useSelector((state) => state.pacientes); */

  const pacientesStatic = [
    {
      pacienteId: 1,
      pacienteName: "victor mesquita",
      pacienteIdade: "20",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteEndereco: "rua do centro, 123",
      pacienteDetalhes: "Victor é um paciente frequente e tbm gosta de chocolate e tem 20 anos",
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
        pacienteStatus: PacienteStatus.NENHUM,
      },
    },
    {
      pacienteId: 5,
      pacienteName: "Joao",
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
        pacienteStatus: PacienteStatus.NORMAL,
      },
    },
    {
      pacienteId: 6,
      pacienteName: "Joao",
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
      pacienteId: 7,
      pacienteName: "Joao",
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
      pacienteId: 8,
      pacienteName: "Joao",
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
      pacienteId: 9,
      pacienteName: "Joao",
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
      pacienteName: "Joao",
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
      pacienteId: 11,
      pacienteName: "Joao",
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
      pacienteId: 12,
      pacienteName: "Joao",
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
      pacienteId: 13,
      pacienteName: "Joao",
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
      pacienteName: "Joao",
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
      pacienteId: 15,
      pacienteName: "Joao",
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
      pacienteId: 16,
      pacienteName: "Joao",
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
      pacienteId: 17,
      pacienteName: "Joao",
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

  const [currPage, setCurrPage] = useState(1);
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandlelistingPacientes = () => {};

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.warning("Logout com sucesso");

    setTimeout(() => {
      navigate("/");
    }, "0");
  };

  const [filteredItems, setFilteredItems] = useState([]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    const keyword = e.target.elements.keyword.value;
    const type = e.target.elements.type.value;

    let newFilteredItems;

    if (keyword && type) {
      newFilteredItems = items.filter(
        (el) =>
          el.classList.contains(type) &&
          el.querySelector("h3").innerText.indexOf(keyword) > -1
      );
    } else if (!keyword && type) {
      newFilteredItems = items.filter((el) => el.classList.contains(type));
    } else if (keyword && !type) {
      newFilteredItems = items.filter(
        (el) => el.querySelector("h3").innerText.indexOf(keyword) > -1
      );
    } else {
      newFilteredItems = items;
    }

    setCurrPage(1);

    if (newFilteredItems.length !== 0) {
      setFilteredItems(newFilteredItems);
    } else {
      // Handle case where no data is found
    }
  };

  const handlePageChange = (page) => {
    setCurrPage(page);
  };

  return (
    <div>
      <div className="home-container">
        <Navbar Cargo={auth}></Navbar>
        <div className="home-direita">
          <Header title={"Listagem de pacientes"} cargo={"Doutor"} />
          <div className="container">
            {status ? (
              <div>
                <form id="" className="filters" onSubmit={handleFilterSubmit}>
                  <div className="container-paciente">
                    <input
                      type="text"
                      name="keyword"
                      className=""
                      placeholder="Buscar por paciente"
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

                <PacientesContainer pacientesData={pacientesStatic}></PacientesContainer>
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
