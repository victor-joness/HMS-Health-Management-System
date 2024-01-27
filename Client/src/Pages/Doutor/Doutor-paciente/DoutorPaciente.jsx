import React, { useState } from "react";
import "./DoutorPaciente.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../../../Components/Header/Header";
import Navbar from "../../../Components/Navbar/Navbar";
import Paciente from "../../../Components/Paciente/Paciente";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  DorStatus,
  Genero,
  TipoSanguineo,
} from "../../../Components/Enums/Enums";

import { logoutUser } from "../../../Features/authSlice";

const DoutorPaciente = () => {
  const { pacientes: pacientes } = useSelector((state) => state.pacientes);

  const pacientesStatic = [
    {
      pacienteId: 1,
      pacienteName: "victor",
      pacienteIdade: "",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteSUS: "",
      pacienteEmail: "",
      pacienteEndereco: "",
      pacienteDetalhes: "Victor é um paciente frequente",
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
        pacienteDor: DorStatus.ALTA,
      },
    },
    {
      pacienteId: 2,
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
        pacienteDor: DorStatus.ALTA,
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
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                    </select>
                    <button className="">Buscar</button>
                  </div>
                </form>

                {/* MAP COM O COMPONENTE QUE VAMOS FAZER */}
                <div className="container-cards">
                  {pacientesStatic.map((x) => (
                    <Paciente key={x.pacienteId} paciente={x}></Paciente>
                  ))}
                </div>

                {/* PAGINATION */}
                <div className="container-pagination">
                  <Stack spacing={2} marginTop={1} marginBottom={1}>
                    <Pagination
                      className="pagination"
                      count={10}
                      variant="outlined"
                      shape="rounded"
                    />
                  </Stack>
                </div>
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
