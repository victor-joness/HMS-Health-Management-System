import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./bolsasDoador.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doadorDoacao } from "../../Features/DoadorSlice";

export default function bolsasDoador({ doadorId }) {
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
      doadorDoacao({
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
        doadorQTD: DoadorValue.doadorQTD,
      })
    ).then((res) => {
      if(res.payload.msg == "Doacao feita com sucesso"){
        handleClose();
        setTimeout(() => {
          window.location.reload(false);
        }, "2000");
      }
    });
  };

  return (
    <div>
      <div className="bolsas" variant="outlined" onClick={handleClickOpen}>
        bolsas
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Adicionar bolsas</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Quantidade de bolsas</label>
              <div className="inputdiv adressdiv">
                <input
                  type="text"
                  placeholder="bolsas"
                  name="doadorQTD"
                  onChange={(e) =>
                    HandleDoadorChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <button type="submit" className="formsubmitbutton">
              {loading ? "Loading..." : "Doar"}
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
