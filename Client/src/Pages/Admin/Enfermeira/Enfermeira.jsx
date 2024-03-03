import React, { useEffect, useState } from "react";
import "./Enfermeira.css";
import nurse from "../../../Assets/nurseavatar.png";
import axios from "axios";

import { toast } from "react-toastify";

import { DataGrid } from "@mui/x-data-grid";

import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";
import EditEnfermeira from "../../../Components/Edit/EditEnfermeira";


import { useDispatch, useSelector } from "react-redux";

import { enfermeiraCreate, enfermeiraFetch, EnfermeiraDelete, EnfermeiraInsert} from "../../../Features/EnfermeiraSlice";

const Enfermeira = () => {
  const { enfermeiras: enfermeira } = useSelector((state) => state.enfermeiras);

  const dispatch = useDispatch();

  const initData = {
    EnfermeiraName: "",
    EnfermeiraIdade: "",
    EnfermeiraNumero: "",
    EnfermeiraEmail: "",
    EnfermeiraSangue: "",
    EnfermeiraGenero: "",
    EnfermeiraAniversario: "",
    EnfermeiraEndereco: "",
    EnfermeiraEducacao: "",
    EnfermeiraDepartamento: "",
    EnfermeiraID: Date.now(),
    EnfermeiraPassword: "",
    EnfermeiraDetalhes: "",
  };

  const [EnfermeiraValue, setEnfermeiraValue] = useState(initData);

  const [status, setStatus] = useState(true);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const HandleEnfermeiraChange = (e, k) => {
    setEnfermeiraValue({ ...EnfermeiraValue, [e]: k });
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:5005/api/upload",
        formData
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const HandleEnfermeiraSubmit = async (e) => {
    e.preventDefault();

    const imgUrl = await upload();

    dispatch(
      EnfermeiraInsert({
        EnfermeiraName: EnfermeiraValue.EnfermeiraName,
        EnfermeiraEmail: EnfermeiraValue.EnfermeiraEmail,
        EnfermeiraPassword: EnfermeiraValue.EnfermeiraPassword,
        isAdmin: 0,
        isDoutor: 0,
        isEnfermeira: 1,
        isPaciente: 0,
        Img: file ? imgUrl : "",
      })
    );

    dispatch(
      enfermeiraCreate({
        EnfermeiraName: EnfermeiraValue.EnfermeiraName,
        EnfermeiraIdade: EnfermeiraValue.EnfermeiraIdade,
        EnfermeiraNumero: EnfermeiraValue.EnfermeiraNumero,
        EnfermeiraEmail: EnfermeiraValue.EnfermeiraEmail,
        EnfermeiraSangue: EnfermeiraValue.EnfermeiraSangue,
        EnfermeiraGenero: EnfermeiraValue.EnfermeiraGenero,
        EnfermeiraAniversario: EnfermeiraValue.EnfermeiraAniversario,
        EnfermeiraEndereco: EnfermeiraValue.EnfermeiraEndereco,
        EnfermeiraEducacao: EnfermeiraValue.EnfermeiraEducacao,
        EnfermeiraDepartamento: EnfermeiraValue.EnfermeiraDepartamento,
        EnfermeiraID: EnfermeiraValue.EnfermeiraID,
        EnfermeiraPassword: EnfermeiraValue.EnfermeiraPassword,
        EnfermeiraDetalhes: EnfermeiraValue.EnfermeiraDetalhes,
        EnfermeiraImg: file ? imgUrl : "",
      })
    ).then((res) => {
      if (res.payload.msg == "Enfermeira já cadastrada") {
        toast.error(res.payload.msg);
      } else {
        toast.success(res.payload.msg);
        setTimeout(() => {
          HandlelistenEnfermeira();
        }, "2000");
      }
    });
  };

  const handleDelete = (id) => {
    dispatch(EnfermeiraDelete(id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "EnfermeiraName", headerName: "Nome da Enfermeira", width: 200 },
    { field: "EnfermeiraNumero", headerName: "Número da Enfermeira", width: 170 },
    {
      field: "EnfermeiraIdade",
      headerName: "Idade",
      type: "number",
      width: 70,
    },
    {
      field: "EnfermeiraEmail",
      headerName: "Email da Enfermeira",
      description: "Está coluna não tem valor de filtragem",
      sortable: false,
      width: 200,
    },
    { field: "EnfermeiraSangue", headerName: "Tipo S", width: 60 },
    { field: "EnfermeiraGenero", headerName: "Gênero", width: 100 },
    {
      field: "EnfermeiraDepartamento",
      headerName: "Departamento",
      width: 120,
    },
    { field: "EnfermeiraID", headerName: "EnfermeiraID", width: 150 },
    { field: "EnfermeiraDetalhes", headerName: "Detalhes da Enfermeira", width: 200 },
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
              Delete
            </button>
            <EditEnfermeira enfermeiraId={params.row.id}></EditEnfermeira>
          </div>
        );
      },
    },
  ];

  const HandleGetEnfermeira = (e) => {};

  const HandleAddEnfermeira = () => {
    setStatus(false);
  };

  const HandlelistenEnfermeira = () => {
    setStatus(true);
    window.location.reload(false);
  };

  useEffect(() => {
    dispatch(enfermeiraFetch());
  }, [dispatch, enfermeiraFetch]);

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-direita">
        <Header cargo={"Admin"}/>
        {status ? (
          <div className="add-doutor-container-bottom">
            <div className="buttons">
              <button onClick={HandlelistenEnfermeira}>Listagem de enfermeira</button>
              <button onClick={HandleAddEnfermeira}>Adicionar enfermeira</button>
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
                    rows={enfermeira}
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
          <div className="doutor-container-bottom">
            <div className="container">
              <div className="buttons">
                <button onClick={HandlelistenEnfermeira}>
                  Listagem de enfermeiras
                </button>
                <button onClick={HandleAddEnfermeira}>Adicionar enfermeira</button>
              </div>
              <div className="AfterSideBar">
                <div className="Main_Add_Doctor_div">
                  <h1>Add Enfermeira</h1>
                  <img src={nurse} alt="Enfermeira" className="avatarimg" />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <label className="file" htmlFor="file">
                    Upload Image
                  </label>
                  <form onSubmit={HandleEnfermeiraSubmit}>
                    <div>
                      <label>Nome</label>
                      <div className="inputdiv">
                        <input
                          type="text"
                          placeholder="Nome Completo"
                          name="EnfermeiraName"
                          value={EnfermeiraValue.EnfermeiraName}
                          onChange={(e) =>
                            HandleEnfermeiraChange(e.target.name, e.target.value)
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
                          name="EnfermeiraIdade"
                          value={EnfermeiraValue.EnfermeiraIdade}
                          onChange={(e) =>
                            HandleEnfermeiraChange(e.target.name, e.target.value)
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
                          name="EnfermeiraNumero"
                          value={EnfermeiraValue.EnfermeiraNumero}
                          onChange={(e) =>
                            HandleEnfermeiraChange(e.target.name, e.target.value)
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
                          name="EnfermeiraEmail"
                          value={EnfermeiraValue.EnfermeiraEmail}
                          onChange={(e) =>
                            HandleEnfermeiraChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label>Gênero</label>
                      <div className="inputdiv">
                        <select
                          name="EnfermeiraGenero"
                          value={EnfermeiraValue.EnfermeiraGenero}
                          onChange={(e) =>
                            HandleEnfermeiraChange(e.target.name, e.target.value)
                          }
                          required
                        >
                          <option value="Choose Gender">Escolher Gênero</option>
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
                          name="EnfermeiraSangue"
                          value={EnfermeiraValue.EnfermeiraSangue}
                          onChange={(e) =>
                            HandleEnfermeiraChange(e.target.name, e.target.value)
                          }
                          required
                        >
                          <option value="Choose Blood Group">Selecionar</option>
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
                          name="EnfermeiraAniversario"
                          value={EnfermeiraValue.EnfermeiraAniversario}
                          onChange={(e) =>
                            HandleEnfermeiraChange(e.target.name, e.target.value)
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
                          name="EnfermeiraEndereco"
                          value={EnfermeiraValue.EnfermeiraEndereco}
                          onChange={(e) =>
                            HandleEnfermeiraChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label>Educação</label>
                      <div className="inputdiv">
                        <input
                          type="text"
                          placeholder="eg.MBBS"
                          name="EnfermeiraEducacao"
                          value={EnfermeiraValue.EnfermeiraEducacao}
                          onChange={(e) =>
                            HandleEnfermeiraChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label>Departamento</label>
                      <div className="inputdiv">
                        <select
                          name="EnfermeiraDepartamento"
                          value={EnfermeiraValue.EnfermeiraDepartamento}
                          onChange={(e) =>
                            HandleEnfermeiraChange(e.target.name, e.target.value)
                          }
                          required
                        >
                          <option value="General">Selecionar</option>
                          <option value="Cardiologia">Cardiologia</option>
                          <option value="Neurologia">Neurologia</option>
                          <option value="ENT">ENT</option>
                          <option value="Ophthalmologia">Ophthalmologia</option>
                          <option value="Anesthesiologia">
                            Anesthesiologia
                          </option>
                          <option value="Dermatologia">Dermatologia</option>
                          <option value="Oncologia">Oncologia</option>
                          <option value="Psiquiatria">psiquiatria</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label>Senha</label>
                      <div className="inputdiv">
                        <input
                          type="password"
                          placeholder="Senha"
                          name="EnfermeiraPassword"
                          value={EnfermeiraValue.EnfermeiraPassword}
                          onChange={(e) =>
                            HandleEnfermeiraChange(e.target.name, e.target.value)
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
                          name="EnfermeiraDetalhes"
                          value={EnfermeiraValue.EnfermeiraDetalhes}
                          onChange={(e) =>
                            HandleEnfermeiraChange(e.target.name, e.target.value)
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

export default Enfermeira;