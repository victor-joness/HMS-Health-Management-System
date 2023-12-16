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
import { doadorUpdate } from "../../Features/DoadorSlice";

export default function EditDoutor({ doadorId }) {
  const { doadores: doadores } = useSelector((state) => state.doador);

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

  let selectedDoador = doadores.filter((item) => item.id === doadorId)[0];

  const [DoadorValue, setDoadorValue] = useState(selectedDoador);

  const HandleDoadorChange = (e, k) => {
    setDoadorValue({ ...DoadorValue, [e]: k });
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
    //update de doador

    dispatch(
      doadorUpdate({
        doadorId: DoadorValue.id,
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
        doadorQTD: DoadorValue.doadorQTD
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
        <DialogTitle>Editar Doador</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="Nome Completo"
                  name="doadorName"
                  value={DoadorValue.doadorName}
                  onChange={(e) =>
                    HandleDoadorChange(e.target.name, e.target.value)
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
                    HandleDoadorChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label>RG</label>
              <div className="inputdiv adressdiv">
                <input
                  type="text"
                  placeholder="RG do doador"
                  name="doadorRG"
                  value={DoadorValue.doadorRG}
                  onChange={(e) =>
                    HandleDoadorChange(e.target.name, e.target.value)
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
                    HandleDoadorChange(e.target.name, e.target.value)
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
                    HandleDoadorChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Grupo sanguíneo</label>
              <div className="inputdiv">
                <select
                  name="doadorSangue"
                  value={DoadorValue.doadorSangue}
                  onChange={(e) =>
                    HandleDoadorChange(e.target.name, e.target.value)
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
              <label>Gênero</label>
              <div className="inputdiv">
                <select
                  name="doadorGenero"
                  value={DoadorValue.doadorGenero}
                  onChange={(e) =>
                    HandleDoadorChange(e.target.name, e.target.value)
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
              <label>Aniversário</label>
              <div className="inputdiv">
                <input
                  type="date"
                  placeholder="dd-mm-yy"
                  name="doadorAniversario"
                  value={DoadorValue.doadorAniversario}
                  onChange={(e) =>
                    HandleDoadorChange(e.target.name, e.target.value)
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
                    HandleDoadorChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Quantidade doada</label>
              <div className="inputdiv adressdiv">
                <input
                  type="text"
                  placeholder="Quantidade doada"
                  name="doadorQTD"
                  value={DoadorValue.doadorQTD}
                  onChange={(e) =>
                    HandleDoadorChange(e.target.name, e.target.value)
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
