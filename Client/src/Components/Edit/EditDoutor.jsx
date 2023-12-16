import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doutorUpdate } from "../../Features/DoutorSlice";

export default function EditDoutor({doutorId}) {
  const { doutores: doutores } = useSelector((state) => state.doutores);

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
    docID: "",
    doutorPassword: "",
    doutorDetalhes: "",
  };

  let selectedDoutor = doutores.filter((item) => item.id === doutorId)[0];

  const [DoctorValue, setDoctorValue] = useState(selectedDoutor);

  const HandleDoctorChange = (e, k) => {
    setDoctorValue({ ...DoctorValue, [e]: k });
  };

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();  

  const handleClickOpen = () => {
    setOpen(true);
    

    console.log(selectedDoutor);
    console.log(initData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      doutorUpdate({
        doutorId: selectedDoutor.id,
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
        docID: selectedDoutor.docID,
        doutorPassword: DoctorValue.doutorPassword,
        doutorDetalhes: DoctorValue.doutorDetalhes,
      })
    ).then((res) => {
      if(res.payload.msg == "mudaça feita com sucesso"){
        handleClose();
        setTimeout(() => {
          window.location.reload(false);
        }, "1000");
      }
    });
  };

  return (
    <div>
      <div className="edit" variant="outlined" onClick={handleClickOpen}>
        Editar
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Editar Doutor</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
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
                  <option value="Anesthesiologia">Anesthesiologia</option>
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
              {loading ? "Loading..." : "Editar"}
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}