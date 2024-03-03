import React, { useEffect, useState } from "react";
import "./Camas.css";

import { toast } from "react-toastify";

import { DataGrid } from "@mui/x-data-grid";

import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";

import { useDispatch, useSelector } from "react-redux";

import EditCama from "../../../Components/Edit/EditCamas";

import {
  camaCreate,
  camaFetch,
  camaDelete,
} from "../../../Features/CamaSlice";

const Camas = () => {
  const { camas: camas } = useSelector((state) => state.camas);

  const dispatch = useDispatch();

  const initData = {
    CamaNumero: "",
    CamaQuarto: "",
    CamaStatus: "circulo-vermelho.png", //tres nivies (disponivel, indisponivel, limpeza)
    CamaNivel: "option-null",
    CamaValor: "0",
    CamaDetalhes: "",
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

    if(CamaValue.CamaNivel == "option-null"){
      toast.error("Escolha um nivel valido para a cama");
      return;
    };

    dispatch(
      camaCreate({
        camaNumero: CamaValue.CamaNumero,
        camaQuarto: CamaValue.CamaQuarto,
        camaStatus: CamaValue.CamaStatus, //tres status (disponivel, indisponivel, limpeza)
        camaNivel: CamaValue.CamaNivel, //nivel da cama pq pode ser de uti, cama normal, ou cama media
        camaValor: CamaValue.CamaValor,
        camaDetalhes: CamaValue.CamaDetalhes,
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
    { field: "id", headerName: "ID", width: 70 },
    { field: "camaNumero", headerName: "Número da cama", width: 150 },
    { field: "camaQuarto", headerName: "Quato da cama", width: 150 },
    {
      field: "camaStatus",
      headerName: "Status",
      width: 60,
      renderCell: (params) => {
        return (
          <img className="img-do-grid" src={`/upload/${params.value}`}></img>
        );
      },
    },
    {
      field: "camaNivel",
      headerName: "Nível da cama",
      width: 200,
    },
    { field: "camaValor", headerName: "Valor da cama", width: 120 },
    { field: "camaDetalhes", headerName: "Detalhes da cama", width: 250 },
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
            <EditCama camaId={params.row.id}></EditCama>
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
    window.location.reload(false);
  };

  useEffect(() => {
    dispatch(camaFetch());
  }, [dispatch, camaFetch]);

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
                    rows={camas}
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
                          name="CamaNumero"
                          value={CamaValue.CamaNumero}
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
                          name="CamaQuarto"
                          value={CamaValue.CamaQuarto}
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
                          name="CamaStatus"
                          value={CamaValue.CamaStatus}
                          onChange={(e) =>
                            HandleCamaChange(e.target.name, e.target.value)
                          }
                          required
                        >
                          <option value="circulo-verde.jpg">Disponível</option>
                          <option value="circulo-vermelho.png">Indisponível</option>
                          <option value="circulo-amarelo.png">Limpeza</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label>Nível da cama</label>
                      <div className="inputdiv">
                      <select
                          name="CamaNivel"
                          value={CamaValue.CamaNivel}
                          onChange={(e) =>
                            HandleCamaChange(e.target.name, e.target.value)
                          }
                          required
                        >
                          <option value="option-null">Escolha uma opção</option>
                          <option value="1 - Cama Completa">Cama Completa</option>
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
                          name="CamaValor"
                          value={CamaValue.CamaValor}
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
                          name="CamaDetalhes"
                          value={CamaValue.CamaDetalhes}
                          onChange={(e) =>
                            HandleCamaChange(e.target.name, e.target.value)
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

export default Camas;
