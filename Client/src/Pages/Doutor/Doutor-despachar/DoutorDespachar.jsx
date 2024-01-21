import React, { useState, useEffect } from "react";
import "./DoutorDespachar.css";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";

import { bolsasSaidasFetch } from "../../../Features/DoadorSlice";

import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { logoutUser } from "../../../Features/authSlice";
import { useNavigate } from "react-router-dom";

const DoutorDespachar = () => {
  const navigate = useNavigate();

  const auth = useSelector((state) => {
    return state.auth;
  });

  const retirada = useSelector((state) => {
    return state.doador.bolsasSaidas;
  });

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.warning("Logout com sucesso");

    setTimeout(() => {
      navigate("/");
    }, "0");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "pacienteBolsas", headerName: "Nome do paciente", width: 250 },
    { field: "grupoBolsas", headerName: "Tipo S", width: 70 },
    { field: "qtdBolsas", headerName: "Qtd de bolsas", width: 110 },
    { field: "valorBolsas", headerName: "valor das bolsas (R$)", width: 200 },
    { field: "dataBolsas", headerName: "data de retirada", width: 150 },
  ];

  useEffect(() => {
    dispatch(bolsasSaidasFetch());
  }, [dispatch, bolsasSaidasFetch]);

  return (
    <div>
      <div className="home-container">
        <Navbar Cargo={auth}></Navbar>
        <div className="home-direita">
          <Header title={"Listagem de despachamento"} cargo={"Doutor"} />
          <div className="container">
            <div className="banco-container-bottom">
              <div className="container">
                <div className="table">
                  <div
                    style={{
                      height: "70.6vh",
                      width: "auto",
                      fontSize: "1.5rem",
                    }}
                  >
                    <DataGrid
                      rows={retirada}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      checkboxSelection
                      initialState={{
                        sorting: {
                          sortModel: [{ field: "id", sort: "desc" }],
                        },
                      }}
                    />
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

export default DoutorDespachar;
