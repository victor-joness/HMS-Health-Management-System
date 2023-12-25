import React, { useState, useEffect } from "react";
import "./DoutorDoador.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Components/Navbar/Navbar";

import { doadorFetch } from "../../../Features/DoadorSlice";

import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import EditDoador from "../../../Components/Edit/EditDoador";
import BolsasDoador from "../../../Components/BolsasDoador/bolsasDoador";

import doadorimg from "../../../Assets/doadoravatar.png";
import { logoutUser } from "../../../Features/authSlice";

import { doadorCreate, doadorDelete} from "../../../Features/DoadorSlice";

const DoutorDoador = () => {
  const { doadores: doadores } = useSelector((state) => state.doador);
  const auth = useSelector((state) => {
    return state.auth;
  });

  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initData = {
    doadorName: "",
    doadorIdade: "",
    doadorNumero: "",
    doadorRG: "",
    doadorEmail: "",
    doadorSangue: "",
    doadorGenero: "",
    doadorAniversario: "",
    doadorEndereco: "",
    doadorDetalhes: "",
    doadorQTD: ""
  };

  const [DoadorValue, setDoadorValue] = useState(initData);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.warning("Logout com sucesso");

    setTimeout(() => {
      navigate("/");
    }, "0");
  };

  const HandleAddDoador = () => {
    setStatus(false);
  };

  const HandleDoadorChange = (e, k) => {
    setDoadorValue({ ...DoadorValue, [e]: k });
  };

  const HandlelistenDoador = () => {
    setStatus(true);
    window.location.reload(false);
  };

  const handleDelete = (id) => {
    //delete doador
    dispatch(doadorDelete(id));
  };

  const HandleDoadorSubmit = async (e) => {
    e.preventDefault();

    const date = new Date();

    dispatch(
      doadorCreate({
        doadorName: DoadorValue.doadorName,
        doadorIdade: DoadorValue.doadorIdade,
        doadorNumero: DoadorValue.doadorNumero,
        doadorRG: DoadorValue.doadorRG,
        doadorEmail: DoadorValue.doadorEmail,
        doadorSangue: DoadorValue.doadorSangue,
        doadorGenero: DoadorValue.doadorGenero,
        doadorAniversario: DoadorValue.doadorAniversario,
        doadorEndereco: DoadorValue.doadorEndereco,
        doadorDetalhes: DoadorValue.doadorDetalhes,
        doadorQTD: 0,
        doadorData: `${date.getDate()}/${date.getUTCMonth()+1}/${date.getFullYear()}`
      })
    ).then((res) => {
      if (res.payload.msg == "Doador já cadastrado") {
        toast.error(res.payload.msg);
      } else {
        toast.success(res.payload.msg);
        setTimeout(() => {
          HandlelistenDoador();
        }, "2000");
      }
    });
  };

  useEffect(() => {
    dispatch(doadorFetch());
  }, [dispatch, doadorFetch]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "doadorName", headerName: "Nome do doador", width: 220 },
    { field: "doadorNumero", headerName: "Número do doador", width: 200 },
    { field: "doadorRG", headerName: "RG do doador", width: 150 },
    {
      field: "doadorIdade",
      headerName: "Idade",
      type: "number",
      width: 70,
    },
    {
      field: "doadorEmail",
      headerName: "Email do doador",
      description: "Está coluna não tem valor de filtragem",
      sortable: false,
      width: 200,
    },
    { field: "doadorSangue", headerName: "Tipo S", width: 60 },
    { field: "doadorGenero", headerName: "Gênero", width: 100 },
    { field: "doadorDetalhes", headerName: "Detalhes do doador", width: 200 },
    { field: "doadorQTD", headerName: "QTD", width: 60 },
    { field: "doadorData", headerName: "Data Update", width: 120 },
    {
      field: "Ações",
      headerName: "Ações",

      sortable: false,
      width: 220,
      renderCell: (params) => {
        return (
          <div className="actions">
            <button
              onClick={() => handleDelete(params.row.id)}
              className="delete"
            >
              Delete
            </button>
            <EditDoador doadorId={params.row.id}></EditDoador>
            <BolsasDoador doadorId={params.row.id}></BolsasDoador>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="home-container">
        <Navbar Cargo={auth}></Navbar>
        <div className="home-direita-doador">
          <div className="header">
            <h1>Doadores de Sangue</h1>
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
              <div className="add-doador-container-bottom">
                <div className="buttons">
                  <button onClick={HandlelistenDoador}>
                    Listagem de doadores
                  </button>
                  <button onClick={HandleAddDoador}>Adicionar doador</button>
                </div>
                <div className="container">
                  <div className="table">
                    <div
                      style={{
                        height: "70.5vh",
                        width: "auto",
                        fontSize: "1.5rem",
                      }}
                    >
                      <DataGrid
                        rows={doadores}
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
                    <button onClick={HandlelistenDoador}>
                      Listagem de doadores
                    </button>
                    <button onClick={HandleAddDoador}>Adicionar Doador</button>
                  </div>
                  <div className="AfterSideBar">
                    <div className="Main_Add_Doctor_div">
                      <h1>Add Doador</h1>
                      <img src={doadorimg} alt="doctor" className="avatarimg" />

                      <form onSubmit={HandleDoadorSubmit}>
                        <div>
                          <label>Nome</label>
                          <div className="inputdiv">
                            <input
                              type="text"
                              placeholder="Nome Completo"
                              name="doadorName"
                              value={DoadorValue.doadorName}
                              onChange={(e) =>
                                HandleDoadorChange(
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
                              name="doadorIdade"
                              value={DoadorValue.doadorIdade}
                              onChange={(e) =>
                                HandleDoadorChange(
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
                              name="doadorNumero"
                              value={DoadorValue.doadorNumero}
                              onChange={(e) =>
                                HandleDoadorChange(
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
                              name="doadorRG"
                              value={DoadorValue.doadorRG}
                              onChange={(e) =>
                                HandleDoadorChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label>Email</label>
                          <div className="inputdiv">
                            <input
                              type="email"
                              placeholder="abc@abc.com"
                              name="doadorEmail"
                              value={DoadorValue.doadorEmail}
                              onChange={(e) =>
                                HandleDoadorChange(
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
                              name="doadorGenero"
                              value={DoadorValue.doadorGenero}
                              onChange={(e) =>
                                HandleDoadorChange(
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
                              name="doadorSangue"
                              value={DoadorValue.doadorSangue}
                              onChange={(e) =>
                                HandleDoadorChange(
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
                          <label>Aniversário</label>
                          <div className="inputdiv">
                            <input
                              type="date"
                              placeholder="dd-mm-yy"
                              name="doadorAniversario"
                              value={DoadorValue.doadorAniversario}
                              onChange={(e) =>
                                HandleDoadorChange(
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label>Endereço</label>
                          <div className="inputdiv adressdiv">
                            <input
                              type="text"
                              placeholder="Endereço"
                              name="doadorEndereco"
                              value={DoadorValue.doadorEndereco}
                              onChange={(e) =>
                                HandleDoadorChange(
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
                              name="doadorDetalhes"
                              value={DoadorValue.doadorDetalhes}
                              onChange={(e) =>
                                HandleDoadorChange(
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

export default DoutorDoador;
