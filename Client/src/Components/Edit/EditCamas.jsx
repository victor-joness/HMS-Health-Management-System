import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { camaUpdate } from "../../Features/CamaSlice";

export default function EditCama({ camaId }) {
  const { camas: camas } = useSelector((state) => state.camas);

  let selectedCama = camas.filter((item) => item.Id === camaId)[0];

  const [CamaValue, setCamaValue] = useState(selectedCama);

  const HandleCamaChange = (e, k) => {
    setCamaValue({ ...CamaValue, [e]: k });
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
      camaUpdate({
        Id: CamaValue.Id,
        Numero: CamaValue.Numero,
        Quarto: CamaValue.Quarto,
        Status: CamaValue.Status,
        Nivel: CamaValue.Nivel,
        Valor: CamaValue.Valor,
        Detalhes: CamaValue.Detalhes,
      })
    ).then((res) => {
      console.log(res)
      if (res.payload.message == "Cama atualizada com sucesso") {
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
        <DialogTitle>Editar Cama</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Numero da cama</label>
              <div className="inputdiv">
                <input
                  type="number"
                  placeholder="Número da cama"
                  name="Numero"
                  value={CamaValue.Numero}
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
                  name="Quarto"
                  value={CamaValue.Quarto}
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
                  name="Status"
                  value={CamaValue.Status}
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
                  name="Nivel"
                  value={CamaValue.Nivel}
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
                  name="Valor"
                  value={CamaValue.Valor}
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
                  name="Detalhes"
                  value={CamaValue.Detalhes}
                  onChange={(e) =>
                    HandleCamaChange(e.target.name, e.target.value)
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
