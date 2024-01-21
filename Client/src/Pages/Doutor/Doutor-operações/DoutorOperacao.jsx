import React, { useState, useEffect } from "react";
import "./DoutorOperacao.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";

import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

import { logoutUser } from "../../../Features/authSlice";

import {
  cirurgiaCreate,
  cirurgiaDelete,
  cirurgiaFetch,
  cirurgiaUpdate,
} from "../../../Features/CirurgiaSlice";

const DoutorOperacao = () => {
  const { cirurgias: cirurgias } = useSelector((state) => state.cirurgias);

  const auth = useSelector((state) => {
    return state.auth;
  });

  const pacientes = [
    {
      pacienteName: "victor",
      pacienteIdade: "",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteEmail: "",
      pacienteSangue: "",
      pacienteGenero: "",
      pacienteAniversario: "",
      pacienteEndereco: "",
      pacienteDetalhes: "",
      pacienteQTD: "",
    },
    {
      pacienteName: "Joao",
      pacienteIdade: "",
      pacienteNumero: "",
      pacienteRG: "",
      pacienteEmail: "",
      pacienteSangue: "",
      pacienteGenero: "",
      pacienteAniversario: "",
      pacienteEndereco: "",
      pacienteDetalhes: "",
      pacienteQTD: "",
    },
  ];

  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initData = {
    cirurgiaPaciente: "",
    cirurgiaMedico: "",
    cirurgiaAux1: "",
    cirurgiaAux2: "",
    cirurgiaIdade: "",
    cirurgiaNumero: "",
    cirurgiaRG: "",
    cirurgiaGenero: "",
    cirurgiaGruposanguineo: "",
    cirurgiaData: "",
    cirurgiaDetalhes: "",
  };

  const [CirurgiaValue, setCirurgiaValue] = useState(initData);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.warning("Logout com sucesso");

    setTimeout(() => {
      navigate("/");
    }, "0");
  };

  const HandleAddCirurgia = () => {
    setStatus(false);
  };

  const HandleCirurgiaChange = (e, k) => {
    setCirurgiaValue({ ...CirurgiaValue, [e]: k });
  };

  const HandlelistenCirurgia = () => {
    setStatus(true);
    window.location.reload(false);
  };

  const handleDelete = (id) => {
    //delete cirurgia
    dispatch(cirurgiaDelete(id));
  };

  const handleUpdate = (id) => {
    //update no status da cirurgia
    dispatch(cirurgiaUpdate(id)).then(() => {
      setTimeout(() => {
        HandlelistenCirurgia();
      }, "2000");
    });
  };

  const HandleCirurgiaSubmit = async (e) => {
    e.preventDefault();

    //add bolsas no banco de dados
    //dispatch();

    //add doador no banco de dados
    dispatch(
      cirurgiaCreate({
        cirurgiaPaciente: CirurgiaValue.cirurgiaPaciente,
        cirurgiaMedico: auth.name,
        cirurgiaAux1: CirurgiaValue.cirurgiaAux1,
        cirurgiaAux2: CirurgiaValue.cirurgiaAux2,
        cirurgiaIdade: CirurgiaValue.cirurgiaIdade,
        cirurgiaNumero: CirurgiaValue.cirurgiaNumero,
        cirurgiaRG: CirurgiaValue.cirurgiaRG,
        cirurgiaGenero: CirurgiaValue.cirurgiaGenero,
        cirurgiaGruposanguineo: CirurgiaValue.cirurgiaGruposanguineo,
        cirurgiaData: CirurgiaValue.cirurgiaData,
        cirurgiaDetalhes: CirurgiaValue.cirurgiaDetalhes,
      })
    ).then((res) => {
      toast.success(res.payload.msg);
      setTimeout(() => {
        HandlelistenCirurgia();
      }, "2000");
    });
  };

  useEffect(() => {
    dispatch(cirurgiaFetch());
  }, [dispatch, cirurgiaFetch]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "cirurgiaPaciente", headerName: "Nome do Paciente", width: 160 },
    { field: "cirurgiaMedico", headerName: "Nome do Médico", width: 160 },
    { field: "cirurgiaAux1", headerName: "Nome do Aux1", width: 140 },
    { field: "cirurgiaAux2", headerName: "Nome do Aux2", width: 140 },
    { field: "cirurgiaRG", headerName: "RG do paciente", width: 150 },
    { field: "cirurgiaNumero", headerName: "Número", width: 120 },
    { field: "cirurgiaIdade", headerName: "Idade", type: "number", width: 60 },
    { field: "cirurgiaGruposanguineo", headerName: "Tipo S", width: 60 },
    {
      field: "cirurgiaGenero",
      headerName: "Gênero",
      width: 60,
      renderCell: (params) => {
        return (
          <img className="img-do-grid" src={`/upload/${params.value}`}></img>
        );
      },
    },
    {
      field: "cirurgiaDetalhes",
      headerName: "Detalhes do Paciente",
      width: 200,
    },
    { field: "cirurgiaData", headerName: "Data", width: 110 },
    {
      field: "cirurgiaEstado",
      headerName: "Status",
      width: 70,
      renderCell: (params) => {
        return (
          <img className="img-do-grid" src={`/upload/${params.value}`}></img>
        );
      },
    },
    {
      field: "Ações",
      headerName: "Ações",

      sortable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <div className="actions">
            <button
              onClick={() => handleDelete(params.row.id)}
              className="delete"
            >
              Delete
            </button>
            <button
              onClick={() => handleUpdate(params.row.id)}
              className="update"
            >
              Ok
            </button>
            <button
              onClick={() => handleFalha(params.row.id)}
              className="falha"
            >
              Falha
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="home-container">
        <Navbar Cargo={auth}></Navbar>
        <div className="home-direita">
          <Header title={"Cirurgia / Operação"} cargo={"Doutor"} />
          <div className="container">
            {status ? (
              <div className="add-cirurgia-container-bottom">
                <div className="buttons">
                  <button onClick={HandlelistenCirurgia}>
                    Listagem de Cirurgias
                  </button>
                  <button onClick={HandleAddCirurgia}>
                    Adicionar Cirurgia
                  </button>
                </div>
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
                        rows={cirurgias}
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
              <div className="doador-container-bottom">
                <div className="container">
                  <div className="buttons">
                    <button onClick={HandlelistenCirurgia}>
                      Listagem de Cirurgias
                    </button>
                    <button onClick={HandleAddCirurgia}>
                      Adicionar Cirurgia
                    </button>
                  </div>
                  <div className="AfterSideBar">
                    <div className="Main_Add_Doctor_div">
                      <h1>Add Cirurgia</h1>
                      <form onSubmit={HandleCirurgiaSubmit}>
                        <div>
                          <label>Paciente</label>
                          <div className="inputdiv">
                            <select
                              name="cirurgiaPaciente"
                              value={CirurgiaValue.cirurgiaPaciente}
                              onChange={(e) =>
                                HandleCirurgiaChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option value="">Escolher Paciente</option>
                              {pacientes.map((paciente) => {
                                return (
                                  <option
                                    key={paciente.pacienteName}
                                    value={paciente.pacienteName}
                                  >
                                    {paciente.pacienteName}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label>Médico Chefe</label>
                          <div className="inputdiv adressdiv">
                            <input
                              type="text"
                              placeholder="valor"
                              name="name"
                              value={auth.name}
                              disabled
                            />
                          </div>
                        </div>

                        <div>
                          <label>Auxiliar 1</label>
                          <div className="inputdiv">
                            <textarea
                              type="text"
                              placeholder="Auxiliar 1"
                              rows="4"
                              cols="50"
                              name="cirurgiaAux1"
                              value={CirurgiaValue.cirurgiaAux1}
                              onChange={(e) =>
                                HandleCirurgiaChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label>Auxiliar 2</label>
                          <div className="inputdiv">
                            <textarea
                              type="text"
                              placeholder="Auxiliar 2"
                              rows="4"
                              cols="50"
                              name="cirurgiaAux2"
                              value={CirurgiaValue.cirurgiaAux2}
                              onChange={(e) =>
                                HandleCirurgiaChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label>Idade</label>
                          <div className="inputdiv">
                            <input
                              type="number"
                              placeholder="Idade"
                              name="cirurgiaIdade"
                              value={CirurgiaValue.cirurgiaIdade}
                              onChange={(e) =>
                                HandleCirurgiaChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label>Número emergencial</label>
                          <div className="inputdiv">
                            <input
                              type="number"
                              placeholder="Número emergencial"
                              name="cirurgiaNumero"
                              value={CirurgiaValue.cirurgiaNumero}
                              onChange={(e) =>
                                HandleCirurgiaChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label>RG</label>
                          <div className="inputdiv">
                            <input
                              type="text"
                              placeholder="RG"
                              name="cirurgiaRG"
                              value={CirurgiaValue.cirurgiaRG}
                              onChange={(e) =>
                                HandleCirurgiaChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label>Gênero</label>
                          <div className="inputdiv">
                            <select
                              name="cirurgiaGenero"
                              value={CirurgiaValue.cirurgiaGenero}
                              onChange={(e) =>
                                HandleCirurgiaChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option value="Choose Gender">
                                Escolher Gênero
                              </option>
                              <option value="Masculino">Masculino</option>
                              <option value="Feminino">Feminino</option>
                              <option value="Outro">Outro</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label>Grupo sanguíneo</label>
                          <div className="inputdiv">
                            <select
                              name="cirurgiaGruposanguineo"
                              value={CirurgiaValue.cirurgiaGruposanguineo}
                              onChange={(e) =>
                                HandleCirurgiaChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option value="Choose Blood Group">
                                Selecionar
                              </option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label>Data</label>
                          <div className="inputdiv">
                            <input
                              type="date"
                              placeholder="dd-mm-yy"
                              name="cirurgiaData"
                              value={CirurgiaValue.cirurgiaData}
                              onChange={(e) =>
                                HandleCirurgiaChange(
                                  e.target.name,
                                  e.target.value
                                )
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
                              name="cirurgiaDetalhes"
                              value={CirurgiaValue.cirurgiaDetalhes}
                              onChange={(e) =>
                                HandleCirurgiaChange(
                                  e.target.name,
                                  e.target.value
                                )
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
      </div>
    </div>
  );
};

export default DoutorOperacao;
