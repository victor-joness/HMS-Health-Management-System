import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { farmaciaUpdate } from "../../Features/FarmaciaSlice";

export default function EditFarmacia({ remedioId }) {
  const { farmacias: farmacias } = useSelector((state) => state.farmacia);

  const initData = {
    FarmaciaNome: "",
    FarmaciaTipo: "",
    FarmaciaValor: "",
    FarmaciaQuantidade: "",
    FarmaciaValidade: "",
    FarmaciaLaboratorio: "",
    FarmaciaDetalhes: "",
  };

  let selectedFarmacia = farmacias.filter((item) => item.id === remedioId)[0];

  const [FarmaciaValue, setFarmaciaValue] = useState(selectedFarmacia);

  const HandleFarmaciaChange = (e, k) => {
    setFarmaciaValue({ ...FarmaciaValue, [e]: k });
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
      farmaciaUpdate({
        farmaciaId:remedioId,
        farmaciaNome: FarmaciaValue.FarmaciaNome,
        farmaciaTipo: FarmaciaValue.FarmaciaTipo,
        farmaciaValor: FarmaciaValue.FarmaciaValor,
        farmaciaQuantidade: FarmaciaValue.FarmaciaQuantidade,
        farmaciaValidade: FarmaciaValue.FarmaciaValidade,
        farmaciaLaboratorio: FarmaciaValue.FarmaciaLaboratorio,
        farmaciaDetalhes: FarmaciaValue.FarmaciaDetalhes,
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
        <DialogTitle>Editar Cama</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome do remédio</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="Nome do remédio"
                  name="FarmaciaNome"
                  value={FarmaciaValue.FarmaciaNome}
                  onChange={(e) =>
                    HandleFarmaciaChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Tipo do Remédio</label>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="Tipo do Remédio"
                  name="FarmaciaTipo"
                  value={FarmaciaValue.FarmaciaTipo}
                  onChange={(e) =>
                    HandleFarmaciaChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Preço do remédio</label>
              <div className="inputdiv">
                <input
                  type="number"
                  placeholder="Preço do remédio"
                  name="FarmaciaValor"
                  value={FarmaciaValue.FarmaciaValor}
                  onChange={(e) =>
                    HandleFarmaciaChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Quantidade em estoque</label>
              <div className="inputdiv">
                <input
                  type="number"
                  placeholder="Quantidade"
                  name="FarmaciaQuantidade"
                  value={FarmaciaValue.FarmaciaQuantidade}
                  onChange={(e) =>
                    HandleFarmaciaChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Data de vencimento</label>
              <div className="inputdiv">
                <input
                  type="date"
                  name="FarmaciaValidade"
                  value={FarmaciaValue.FarmaciaValidade}
                  onChange={(e) =>
                    HandleFarmaciaChange(e.target.name, e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Laboratorio de fabricação</label>
              <div className="inputdiv">
                <input
                  type="text"
                  name="FarmaciaLaboratorio"
                  value={FarmaciaValue.FarmaciaLaboratorio}
                  onChange={(e) =>
                    HandleFarmaciaChange(e.target.name, e.target.value)
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
                  name="FarmaciaDetalhes"
                  value={FarmaciaValue.FarmaciaDetalhes}
                  onChange={(e) =>
                    HandleFarmaciaChange(e.target.name, e.target.value)
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
