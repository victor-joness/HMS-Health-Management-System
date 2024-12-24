import React, { useEffect, useState } from "react";
import "./Camas.css";

import { toast } from "react-toastify";

import { DataGrid } from "@mui/x-data-grid";

import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";

import { useDispatch, useSelector } from "react-redux";

import EditCama from "../../../Components/Edit/EditCamas";

import { camaCreate, camaFetch, camaDelete } from "../../../Features/CamaSlice";

const Camas = () => {
  const { camas: camas } = useSelector((state) => state.camas);

  const dispatch = useDispatch();

  const initData = {
    Numero: "",
    Quarto: "",
    Status: "circulo-vermelho.png",
    Nivel: "option-null",
    Valor: "0",
    Detalhes: "",
  };

  const [CamaValue, setCamaValue] = useState(initData);

  const [status, setStatus] = useState(true);

  const [loading, setLoading] = useState(false);

  const HandleCamaChange = (e, k) => {
    setCamaValue({ ...CamaValue, [e]: k });
  };

  const handleDelete = (id) => {
    dispatch(camaDelete(id));
  };

  const HandleCamaSubmit = async (e) => {
    e.preventDefault();

    if (CamaValue.Nivel == "option-null") {
      toast.error("Escolha um nivel valido para a cama");
      return;
    }

    dispatch(
      camaCreate({
        Numero: CamaValue.Numero,
        Quarto: CamaValue.Quarto,
        Status: CamaValue.Status,
        Nivel: CamaValue.Nivel,
        Valor: CamaValue.Valor,
        Detalhes: CamaValue.Detalhes,
      })
    ).then((res) => {
      if (res.payload.msg == "Cama já cadastrado") {
        toast.error(res.payload.msg);
      } else {
        toast.success(res.payload.msg);
        setTimeout(() => {
          HandlelistenCama();
        }, "2000");
      }
    });
  };

  //QUEM EDITA E CRIA E APAGA É O ADMIN, O MEDICO, E ENFERMEIRO E PACIENTE APENAS
  // CONSSEGUEM VER E MUDAR O STATUS DA CAMA, TALVEZ FAZER UMA TABELA DE HISTORICO

  const columns = [
    { field: "Id", headerName: "ID", width: 70 },
    { field: "Numero", headerName: "Número da cama", width: 150 },
    { field: "Quarto", headerName: "Quato da cama", width: 150 },
    {
      field: "Status",
      headerName: "Status",
      width: 60,
      renderCell: (params) => {
        return (
          <img className="img-do-grid" src={`/upload/${params.value}`}></img>
        );
      },
    },
    {
      field: "Nivel",
      headerName: "Nível da cama",
      width: 200,
    },
    { field: "Valor", headerName: "Valor da cama", width: 120 },
    { field: "Detalhes", headerName: "Detalhes da cama", width: 250 },
    {
      field: "Ações",
      headerName: "Ações",

      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (
          <div className="actions">
            <button
              onClick={() => handleDelete(params.row.Id)}
              className="delete"
            >
              Deletar
            </button>
            <EditCama camaId={params.row.Id}></EditCama>
          </div>
        );
      },
    },
  ];

  const HandleAddCama = () => {
    setStatus(false);
  };

  const HandlelistenCama = () => {
    setStatus(true);
    dispatch(camaFetch());
  };

  useEffect(() => {
    dispatch(camaFetch());
  }, [dispatch]);

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-direita">
        <Header cargo={"Admin"} title={"Gerenciamento de camas"} />
        {status ? (
          <div className="add-cama-container-bottom">
            <div className="buttons">
              <button onClick={HandlelistenCama}>Listagem de camas</button>
              <button onClick={HandleAddCama}>Adicionar cama</button>
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
                    rows={camas.map((cama, index) => ({
                      ...cama,
                      Id: cama.Id || index,
                    }))}
                    columns={columns}
                    pageSize={10}
                    getRowId={(row) => row.Id}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="cama-container-bottom">
            <div className="container">
              <div className="buttons">
                <button onClick={HandlelistenCama}>Listagem de camas</button>
                <button onClick={HandleAddCama}>Adicionar cama</button>
              </div>
              <div className="AfterSideBar">
                <div className="Main_Add_Cama_div">
                  <h1>Adicionar Cama</h1>

                  <form onSubmit={HandleCamaSubmit}>
                    <div>
                      <label>Numero da cama</label>
                      <div className="inputdiv">
                        <input
                          type="number"
                          placeholder="Número da cama"
                          name="Numero"
                          value={CamaValue.Numero}
                          onChange={(e) =>
                            HandleCamaChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label>Quarto da cama</label>
                      <div className="inputdiv">
                        <input
                          type="number"
                          placeholder="Quarto da cama"
                          name="Quarto"
                          value={CamaValue.Quarto}
                          onChange={(e) =>
                            HandleCamaChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label>Status da cama</label>
                      <div className="inputdiv">
                        <select
                          name="Status"
                          value={CamaValue.Status}
                          onChange={(e) =>
                            HandleCamaChange(e.target.name, e.target.value)
                          }
                          required
                        >
                          <option value="circulo-verde.jpg">Disponível</option>
                          <option value="circulo-vermelho.png">
                            Indisponível
                          </option>
                          <option value="circulo-amarelo.png">Limpeza</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label>Nível da cama</label>
                      <div className="inputdiv">
                        <select
                          name="Nivel"
                          value={CamaValue.Nivel}
                          onChange={(e) =>
                            HandleCamaChange(e.target.name, e.target.value)
                          }
                          required
                        >
                          <option value="option-null">Escolha uma opção</option>
                          <option value="1 - Cama Completa">
                            Cama Completa
                          </option>
                          <option value="2 - Cama Média">Cama Média</option>
                          <option value="3 - Cama Simples">Cama Simples</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label>Valor da cama</label>
                      <div className="inputdiv">
                        <input
                          type="number"
                          name="Valor"
                          value={CamaValue.Valor}
                          onChange={(e) =>
                            HandleCamaChange(e.target.name, e.target.value)
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
                          name="Detalhes"
                          value={CamaValue.Detalhes}
                          onChange={(e) =>
                            HandleCamaChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="formsubmitbutton"
                      style={{ color: "white" }}
                    >
                      {loading ? "Loading..." : "Adicionar"}
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

export default Camas;
