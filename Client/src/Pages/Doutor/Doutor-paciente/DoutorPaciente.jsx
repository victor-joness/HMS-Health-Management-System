import React, { useState } from "react";
import "./DoutorPaciente.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../Components/Navbar/Navbar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { logoutUser } from "../../../Features/authSlice";

const DoutorPaciente = () => {
  const { pacientes: pacientes } = useSelector((state) => state.pacientes);

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
          <div className="header">
            <h1>Listagem de pacientes</h1>
            <div className="infos">
              <div className="image">
                <img src={`/upload/${auth.Img}`} alt="" />
              </div>
              <h1>{auth.name}</h1>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
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
                <div className=""></div>

                {/* PAGINATION */}
                <div className="container-pagination">
                  <Stack spacing={2}>
                    <Pagination className="pagination" count={10} variant="outlined" shape="rounded" />
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
