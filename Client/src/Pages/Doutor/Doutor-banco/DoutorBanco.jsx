import React, { useState, useEffect } from "react";
import "./DoutorBanco.css";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../../Components/Navbar/Navbar";
import Dispachar from "../../../Components/Dispachar/Dispachar";
import Header from "../../../Components/Header/Header";

import { bolsasFetch } from "../../../Features/DoadorSlice";

import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { logoutUser } from "../../../Features/authSlice";

const DoutorBanco = () => {
  const [linhas, setLinhas] = useState([]);

  const auth = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();

  const handleDispatch = () => {};

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "grupos", headerName: "Grupos sanguíneo", width: 250 },
    { field: "qtd", headerName: "Quantidade", width: 150 },
    {
      field: "Ações",
      headerName: "Ações",

      sortable: false,
      width: 220,
      renderCell: (params) => {
        return (
          <div className="actions">
            <Dispachar dispacharId={params.row}></Dispachar>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(bolsasFetch()).then((res) => {
      let teste2 = Object.entries(res.payload);
      let teste3 = Object.entries(teste2[0][1]);

      setLinhas([
        { id: 1, grupos: "A+", qtd: teste3[1][1] },
        { id: 2, grupos: "A-", qtd: teste3[2][1] },
        { id: 3, grupos: "B+", qtd: teste3[3][1] },
        { id: 4, grupos: "B-", qtd: teste3[4][1] },
        { id: 5, grupos: "AB+", qtd: teste3[5][1] },
        { id: 6, grupos: "AB-", qtd: teste3[6][1] },
        { id: 7, grupos: "O+", qtd: teste3[7][1] },
        { id: 8, grupos: "O-", qtd: teste3[8][1] },
      ]);
    });
  }, [dispatch, bolsasFetch]);

  return (
    <div>
      <div className="home-container">
        <Navbar Cargo={auth}></Navbar>
        <div className="home-direita">
          <Header title={"Banco de Sangue"} cargo={"Doutor"} />
          <div className="container">
            <div className="banco-container-bottom">
              <div className="container">
                <div className="table">
                  <div className="grid-banco">
                    <DataGrid
                      rows={linhas}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      checkboxSelection
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

export default DoutorBanco;
