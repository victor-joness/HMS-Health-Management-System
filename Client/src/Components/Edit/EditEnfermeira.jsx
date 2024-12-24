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
import { EnfermeiraUpdate  } from "../../Features/EnfermeiraSlice";

export default function EditEnfermeira({ enfermeiraId }) {
  const { enfermeiras: enfermeiras } = useSelector(
    (state) => state.enfermeiras
  );

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
    EnfermeiraID: "",
    EnfermeiraPassword: "",
    EnfermeiraDetalhes: "",
  };

  let selectedEnfermeira = enfermeiras.filter(
    (item) => item.id === enfermeiraId
  )[0];

  const [EnfermeiraValue, setEnfermeiraValue] = useState(selectedEnfermeira);

  const HandleEnfermeiraChange = (e, k) => {
    setEnfermeiraValue({ ...EnfermeiraValue, [e]: k });
  };

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      EnfermeiraUpdate({
        EnfermeiraId: selectedEnfermeira.id,
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
        EnfermeiraID: selectedEnfermeira.EnfermeiraID,
        EnfermeiraPassword: EnfermeiraValue.EnfermeiraPassword,
        EnfermeiraDetalhes: EnfermeiraValue.EnfermeiraDetalhes,
      })
    ).then((res) => {
      if (res.payload.msg == "mudaça feita com sucesso") {
        handleClose();
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
        <DialogTitle>Editar Enfermeira</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
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
                  name="EnfermeiraPassword"
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
