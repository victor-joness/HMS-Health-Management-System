import React, { useEffect, useState } from "react";
import "./Doutor.css";
import doctor from "../../../Assets/doctoravatar.png";

import { toast } from "react-toastify";

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import Navbar from "../../../Components/Navbar/Navbar";
import Header from "../../../Components/Header/Header";

import { useDispatch, useSelector } from "react-redux";

import EditDoutor from "../../../Components/Edit/EditDoutor";

import {
  doutorCreate,
  doutorFetch,
  doutorDelete,
  doutorInsert,
} from "../../../Features/DoutorSlice";

const Doutor = () => {
  const { doutores: doutores } = useSelector((state) => state.doutores);

  const dispatch = useDispatch();

  const initData = {
    doutorName: "",
    doutorIdade: "",
    doutorNumero: "",
    doutorEmail: "",
    doutorSangue: "",
    doutorGenero: "",
    doutorAniversario: "",
    doutorEndereco: "",
    doutorEducacao: "",
    doutorDepartamento: "",
    docID: Date.now(),
    doutorPassword: "",
    doutorDetalhes: "",
  };

  const [DoctorValue, setDoctorValue] = useState(initData);

  const [status, setStatus] = useState(true);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const HandleDoctorChange = (e, k) => {
    setDoctorValue({ ...DoctorValue, [e]: k });
  };

  const handleDelete = (id) => {
    dispatch(doutorDelete(id));
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

  const HandleDoctorSubmit = async (e) => {
    e.preventDefault();

    const imgUrl = await upload();

    dispatch(
      doutorInsert({
        doutorName: DoctorValue.doutorName,
        doutorEmail: DoctorValue.doutorEmail,
        doutorPassword: DoctorValue.doutorPassword,
        isAdmin: 0,
        isDoutor: 1,
        isEnfermeira: 0,
        isPaciente: 0,
        Img: file ? imgUrl : "IMG-USER.png",
      })
    ).then((res) => {
      console.log(res)
    });

    dispatch(
      doutorCreate({
        doutorName: DoctorValue.doutorName,
        doutorIdade: DoctorValue.doutorIdade,
        doutorNumero: DoctorValue.doutorNumero,
        doutorEmail: DoctorValue.doutorEmail,
        doutorSangue: DoctorValue.doutorSangue,
        doutorGenero: DoctorValue.doutorGenero,
        doutorAniversario: DoctorValue.doutorAniversario,
        doutorEndereco: DoctorValue.doutorEndereco,
        doutorEducacao: DoctorValue.doutorEducacao,
        doutorDepartamento: DoctorValue.doutorDepartamento,
        docID: DoctorValue.docID,
        doutorPassword: DoctorValue.doutorPassword,
        doutorDetalhes: DoctorValue.doutorDetalhes,
        doutorImg: file ? imgUrl : "",
      })
    ).then((res) => {
      if (res.payload.msg == "Doutor já cadastrado") {
        toast.error(res.payload.msg);
      } else {
        toast.success(res.payload.msg);
        setTimeout(() => {
          HandlelistenDoutor();
        }, "2000");
      }
    });
  };

  

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "doutorName", headerName: "Nome do doutor", width: 250 },
    { field: "doutorNumero", headerName: "Número do doutor", width: 150 },
    {
      field: "doutorIdade",
      headerName: "Idade",
      type: "number",
      width: 70,
    },
    {
      field: "doutorEmail",
      headerName: "Email do doutor",
      description: "Está coluna não tem valor de filtragem",
      sortable: false,
      width: 200,
    },
    { field: "doutorSangue", headerName: "Tipo S", width: 60 },
    { field: "doutorGenero", headerName: "Gênero", width: 100 },
    {
      field: "doutorDepartamento",
      headerName: "Departamento",
      width: 140,
    },
    { field: "docID", headerName: "docID do doutor", width: 150 },
    { field: "doutorDetalhes", headerName: "Detalhes do doutor", width: 200 },
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
            <EditDoutor doutorId={params.row.id}></EditDoutor>
          </div>
        );
      },
    },
  ];

  const HandleGetDoutor = (e) => {};

  const HandleAddDoutor = () => {
    setStatus(false);
  };

  const HandlelistenDoutor = () => {
    setStatus(true);
    dispatch(doutorFetch());
  };

  useEffect(() => {
    dispatch(doutorFetch());
  }, [dispatch, doutorFetch]);

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-direita">
        <Header cargo={"Admin"}/>
        {status ? (
          <div className="add-doutor-container-bottom">
            <div className="buttons">
              <button onClick={HandlelistenDoutor}>Listagem de doutores</button>
              <button onClick={HandleAddDoutor}>Adicionar doutor</button>
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
                    rows={doutores}
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
                <button onClick={HandlelistenDoutor}>
                  Listagem de doutores
                </button>
                <button onClick={HandleAddDoutor}>Adicionar doutor</button>
              </div>
              <div className="AfterSideBar">
                <div className="Main_Add_Doctor_div">
                  <h1>Add Doutor</h1>
                  <img src={doctor} alt="doctor" className="avatarimg" />
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

                  <form onSubmit={HandleDoctorSubmit}>
                    <div>
                      <label>Nome</label>
                      <div className="inputdiv">
                        <input
                          type="text"
                          placeholder="Nome Completo"
                          name="doutorName"
                          value={DoctorValue.doutorName}
                          onChange={(e) =>
                            HandleDoctorChange(e.target.name, e.target.value)
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
                          name="doutorIdade"
                          value={DoctorValue.doutorIdade}
                          onChange={(e) =>
                            HandleDoctorChange(e.target.name, e.target.value)
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
                          name="doutorNumero"
                          value={DoctorValue.doutorNumero}
                          onChange={(e) =>
                            HandleDoctorChange(e.target.name, e.target.value)
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
                          name="doutorEmail"
                          value={DoctorValue.doutorEmail}
                          onChange={(e) =>
                            HandleDoctorChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label>Gênero</label>
                      <div className="inputdiv">
                        <select
                          name="doutorGenero"
                          value={DoctorValue.doutorGenero}
                          onChange={(e) =>
                            HandleDoctorChange(e.target.name, e.target.value)
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
                          name="doutorSangue"
                          value={DoctorValue.doutorSangue}
                          onChange={(e) =>
                            HandleDoctorChange(e.target.name, e.target.value)
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
                          name="doutorAniversario"
                          value={DoctorValue.doutorAniversario}
                          onChange={(e) =>
                            HandleDoctorChange(e.target.name, e.target.value)
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
                          name="doutorEndereco"
                          value={DoctorValue.doutorEndereco}
                          onChange={(e) =>
                            HandleDoctorChange(e.target.name, e.target.value)
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
                          name="doutorEducacao"
                          value={DoctorValue.doutorEducacao}
                          onChange={(e) =>
                            HandleDoctorChange(e.target.name, e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label>Departamento</label>
                      <div className="inputdiv">
                        <select
                          name="doutorDepartamento"
                          value={DoctorValue.doutorDepartamento}
                          onChange={(e) =>
                            HandleDoctorChange(e.target.name, e.target.value)
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
                          name="doutorPassword"
                          value={DoctorValue.doutorPassword}
                          onChange={(e) =>
                            HandleDoctorChange(e.target.name, e.target.value)
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
                          name="doutorDetalhes"
                          value={DoctorValue.doutorDetalhes}
                          onChange={(e) =>
                            HandleDoctorChange(e.target.name, e.target.value)
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

export default Doutor;
