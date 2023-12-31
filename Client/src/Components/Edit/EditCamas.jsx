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

  const initData = {
    CamaNumero: "",
    CamaQuarto: "",
    CamaStatus: "", //tres nivies (disponivel, indisponivel, limpeza)
    CamaNivel: "", //nivel da cama pq pode ser de uti, cama normal, ou cama media
    CamaValor: "",
    CamaDetalhes: "",
  };

  let selectedCama = camas.filter((item) => item.id === camaId)[0];

  const [CamaValue, setCamaValue] = useState(selectedCama);

  const HandleCamaChange = (e, k) => {
    console.log(e);
    console.log(k);
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

    console.log(CamaValue);
    dispatch(
      camaUpdate({
        camaId: CamaValue.id,
        camaNumero: CamaValue.camaNumero,
        camaQuarto: CamaValue.camaQuarto,
        camaStatus: CamaValue.camaStatus, //tres status (disponivel, indisponivel, limpeza)
        camaNivel: CamaValue.camaNivel, //nivel da cama pq pode ser de uti, cama normal, ou cama media
        camaValor: CamaValue.camaValor,
        camaDetalhes: CamaValue.camaDetalhes,
      })
    ).then((res) => {
      if (res.payload.msg == "mudaça feita com sucesso") {
        handleClose();
        setTimeout(() => {
          window.location.reload(false);
        }, "1000");
      }
    });
  };

  console.log(CamaValue);

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
                  name="camaNumero"
                  value={CamaValue.camaNumero}
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
                  name="camaQuarto"
                  value={CamaValue.camaQuarto}
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
                  name="camaStatus"
                  value={CamaValue.camaStatus}
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
                  name="camaNivel"
                  value={CamaValue.camaNivel}
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
                  name="camaValor"
                  value={CamaValue.camaValor}
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
                  name="camaDetalhes"
                  value={CamaValue.camaDetalhes}
                  onChange={(e) =>
                    HandleCamaChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <button type="submit" className="formsubmitbutton">
              {loading ? "Loading..." : "Submit"}
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
