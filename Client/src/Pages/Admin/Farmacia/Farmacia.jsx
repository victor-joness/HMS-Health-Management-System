import React, { useEffect, useState } from "react";
import "./Farmacia.css";

import { toast } from "react-toastify";

import { DataGrid } from "@mui/x-data-grid";

import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";

import { useDispatch, useSelector } from "react-redux";

import EditFarmacia from "../../../Components/Edit/EditFarmacia";

import {
  farmaciaCreate,
  farmaciaFetch,
  farmaciaDelete,
} from "../../../Features/FarmaciaSlice";

const Farmacia = () => {
  const { farmacias: farmacias } = useSelector((state) => state.farmacia);

  const dispatch = useDispatch();

  const initData = {
    FarmaciaNome: "",
    FarmaciaTipo: "",
    FarmaciaValor: "",
    FarmaciaQuantidade: "",
    FarmaciaValidade: "",
    FarmaciaLaboratorio: "",
    FarmaciaDetalhes: "",
  };

  const [FarmaciaValue, setFarmaciaValue] = useState(initData);

  const [status, setStatus] = useState(true);

  const [loading, setLoading] = useState(false);

  const HandleFarmaciaChange = (e, k) => {
    setFarmaciaValue({ ...FarmaciaValue, [e]: k });
  };

  const handleDelete = (id) => {
    dispatch(farmaciaDelete(id));
  };

  const HandleFarmaciaSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      farmaciaCreate({
        farmaciaNome: FarmaciaValue.FarmaciaNome,
        farmaciaTipo: FarmaciaValue.FarmaciaTipo,
        farmaciaValor: FarmaciaValue.FarmaciaValor,
        farmaciaQuantidade: FarmaciaValue.FarmaciaQuantidade,
        farmaciaValidade: FarmaciaValue.FarmaciaValidade,
        farmaciaLaboratorio: FarmaciaValue.FarmaciaLaboratorio,
        farmaciaDetalhes: FarmaciaValue.FarmaciaDetalhes,
      })
    ).then((res) => {
      if (res.payload.msg == "Remédio já cadastrado") {
        toast.error(res.payload.msg);
      } else {
        toast.success(res.payload.msg);
        setTimeout(() => {
          HandlelistenFarmacia();
        }, "2000");
      }
    });
  };

  //ADMIN APENAS CRIA, E EDITA E APAGA, QUEM RETIRA OS REMEIDIO É OS ENFERMEIRO E OS MEDICOS

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "FarmaciaNome", headerName: "Nome do Remédio", width: 150 },
    { field: "FarmaciaTipo", headerName: "Tipo", width: 150 },
    { field: "FarmaciaValor", headerName: "Preço", width: 150 },
    { field: "FarmaciaQuantidade", headerName: "Quantidade em estoque", width: 150 },
    { field: "FarmaciaValidade", headerName: "Validade", width: 150 },
    { field: "FarmaciaLaboratorio", headerName: "Laboratorio/Fabricante", width: 150 },
    { field: "FarmaciaDetalhes", headerName: "Detalhes", width: 250 },
    {
      field: "Ações",
      headerName: "Ações",

      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (
          <div className="actions">
            <button
              onClick={() => handleDelete(params.row.id)}
              className="delete"
            >
              Deletar
            </button>
            <EditFarmacia remedioId={params.row.id}></EditFarmacia>
          </div>
        );
      },
    },
  ];

  const HandleAddFarmacia = () => {
    setStatus(false);
  };

  const HandlelistenFarmacia = () => {
    setStatus(true);
    window.location.reload(false);
  };

  useEffect(() => {
    dispatch(farmaciaFetch());
  }, [dispatch, farmaciaFetch]);

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-direita">
        <Header cargo={"Admin"} title={"Gerenciamento de farmacias"} />
        {status ? (
          <div className="add-farmacia-container-bottom">
            <div className="buttons">
              <button onClick={HandlelistenFarmacia}>
                Listagem de Remédios
              </button>
              <button onClick={HandleAddFarmacia}>Adicionar Remédio</button>
            </div>
            <div className="container">
              <div className="table">
                <div
                  style={{
                    height: "70vh",
                    width: "auto",
                    fontSize: "1.5rem",
                  }}
                >
                  <DataGrid
                    rows={farmacias}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="farmacia-container-bottom">
            <div className="container">
              <div className="buttons">
                <button onClick={HandlelistenFarmacia}>
                  Listagem de Remédio
                </button>
                <button onClick={HandleAddFarmacia}>Adicionar Remédio</button>
              </div>
              <div className="AfterSideBar">
                <div className="Main_Add_Farmacia_div">
                  <h1>Adicionar Remédio</h1>

                  <form onSubmit={HandleFarmaciaSubmit}>
                    <div>
                      <label>Nome do remédio</label>
                      <div className="inputdiv">
                        <input
                          type="text"
                          placeholder="Nome do remédio"
                          name="FarmaciaNome"
                          value={FarmaciaValue.FarmaciaNome}
                          onChange={(e) =>
                            HandleFarmaciaChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label>Tipo do Remédio</label>
                      <div className="inputdiv">
                        <input
                          type="text"
                          placeholder="Tipo do Remédio"
                          name="FarmaciaTipo"
                          value={FarmaciaValue.FarmaciaTipo}
                          onChange={(e) =>
                            HandleFarmaciaChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label>Preço do remédio</label>
                      <div className="inputdiv">
                        <input
                          type="number"
                          placeholder="Preço do remédio"
                          name="FarmaciaValor"
                          value={FarmaciaValue.FarmaciaValor}
                          onChange={(e) =>
                            HandleFarmaciaChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label>Quantidade em estoque</label>
                      <div className="inputdiv">
                        <input
                          type="number"
                          placeholder="Quantidade"
                          name="FarmaciaQuantidade"
                          value={FarmaciaValue.FarmaciaQuantidade}
                          onChange={(e) =>
                            HandleFarmaciaChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label>Data de vencimento</label>
                      <div className="inputdiv">
                        <input
                          type="date"
                          name="FarmaciaValidade"
                          value={FarmaciaValue.FarmaciaValidade}
                          onChange={(e) =>
                            HandleFarmaciaChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label>Laboratorio de fabricação</label>
                      <div className="inputdiv">
                        <input
                          type="text"
                          name="FarmaciaLaboratorio"
                          value={FarmaciaValue.FarmaciaLaboratorio}
                          onChange={(e) =>
                            HandleFarmaciaChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label>Outros Detalhes</label>
                      <div className="inputdiv">
                        <textarea
                          type="text"
                          placeholder="Informações extras"
                          rows="4"
                          cols="50"
                          name="FarmaciaDetalhes"
                          value={FarmaciaValue.FarmaciaDetalhes}
                          onChange={(e) =>
                            HandleFarmaciaChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="formsubmitbutton">
                      {loading ? "Loading..." : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Farmacia;
