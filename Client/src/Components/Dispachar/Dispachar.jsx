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
import { bolsaSaidaCreate } from "../../Features/DoadorSlice";
import { Navigate, useNavigate } from "react-router-dom";


import "./Dispachar.css";
import { toast } from "react-toastify";

export default function Dispachar({ dispacharId }) {
  const { bolsas: bolsas } = useSelector((state) => state.doador);

  const navigate = useNavigate();

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

  let paciente = {
    pacienteBolsas: "",
    grupoBolsas: "",
    qtdBolsas: "",
    valorBolsas: "",
    dataBolsas: "",
  };

  const [PacienteValue, setPacienteValue] = useState(paciente);

  const HandlePacienteChange = (e, k) => {
    setPacienteValue({ ...PacienteValue, [e]: k });
  };

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
    PacienteValue.valorBolsas = PacienteValue.qtdBolsas * 200;
    PacienteValue.grupoBolsas = dispacharId.grupos;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PacienteValue.valorBolsas = PacienteValue.qtdBolsas * 200;

    if(PacienteValue.qtdBolsas > bolsas[0][PacienteValue.grupoBolsas]){
      return toast.error("Quantidade indisponivel");
    }

    //criar retirada de bolsa
    dispatch(bolsaSaidaCreate(PacienteValue)).then((res) => {
      if(res.payload.msg == "Retirada de bolsa com sucesso"){
        setTimeout(() => {
          navigate("/doutor-despachar");
        }, "1000");
      }
    });
  };

  return (
    <div>
      <div
        className="bolsas-despachar"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Despache de bolsas
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Adicionar bolsas</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>Paciente</label>
              <div className="inputdiv">
                <select
                  name="pacienteBolsas"
                  value={PacienteValue.pacienteName}
                  onChange={(e) =>
                    HandlePacienteChange(e.target.name, e.target.value)
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
              <label>Grupo Sanguíneo</label>
              <div className="inputdiv adressdiv">
                <input
                  type="text"
                  placeholder="bolsas"
                  name="grupoBolsas"
                  value={PacienteValue.grupoBolsas}
                  required
                  disabled
                />
              </div>
            </div>

            <div>
              <label>Quantidade de bolsas</label>
              <div className="inputdiv adressdiv">
                <input
                  type="text"
                  placeholder="bolsas"
                  name="qtdBolsas"
                  onChange={(e) =>
                    HandlePacienteChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Valor</label>
              <div className="inputdiv adressdiv">
                <input
                  type="text"
                  placeholder="valor"
                  name="valorBolsas"
                  value={PacienteValue.qtdBolsas * 200}
                  disabled
                />
              </div>
            </div>
            <div>
              <label>Data de saída</label>
              <div className="inputdiv">
                <input
                  type="date"
                  placeholder="dd-mm-yy"
                  name="dataBolsas"
                  onChange={(e) =>
                    HandlePacienteChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <button type="submit" className="formsubmitbutton">
              {loading ? "Loading..." : "Enviar"}
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
