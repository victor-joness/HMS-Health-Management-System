import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  pacientes: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  updateStatus: null,
};


/* 
 TENHO QUE TRAZER OS PACIENTE COM OS FILTRO AQUI, PQ NÃO POSSO TRAZER TODOS E FAZER O FILTRO NO FRONT, IMAGINA SE TEM 200 MIL PACIENTE, E AI VOU TRAZER TUDO PRA DEPOIS FAZER O FILTRO ?
*/

export const pacientesFetch = createAsyncThunk(
  "pacientes/pacientesFetch",
  async () => {
    try {
      const response = await axios.get(
        `${url}/pacientes/getPacientes`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const pacienteFetch = createAsyncThunk(
  "pacientes/pacienteFetch",
  async (id) => {
    try {
      const response = await axios.get(
        `${url}/pacientes/getPaciente/${id}`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//axios fazendo a resuisinção da api, ele vai enviar os valores que eu recebo dos input pra api, na api ele vai salvar no banco de dados.
/*export const farmaciaCreate = createAsyncThunk(
  "farmacias/farmaciaCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/farmacias`,
        values,
        setHeaders()
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const farmaciaDelete = createAsyncThunk(
  "farmacias/farmaciaDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/farmacias/${id}`,
        setHeaders()
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

//Usado como insert na tabela de users gerais
export const farmaciaInsert = createAsyncThunk(
  "farmacias/farmaciaInsert",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/farmacias/insert`,
        values,
        setHeaders()
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

//axios fazendo a resuisinção da api, aqui vamos atualizar o product
export const farmaciaUpdate = createAsyncThunk(
  "farmacias/farmaciaUpdate",
  async (values) => {
    console.log(values);
    try {
      const response = await axios.put(
        `${url}/farmacias/${values.farmaciaId}`,
        values,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
); */

const PacientesSlice = createSlice({
  name: "pacientes",
  initialState,
  reducers: {},
  extraReducers: {
    [pacientesFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [pacientesFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.pacientes = action.payload;
    },
    [pacientesFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [pacienteFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [pacienteFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.pacientes = action.payload;
    },
    [pacienteFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    /* [farmaciaCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [farmaciaCreate.fulfilled]: (state, action) => {
      if (action.payload.msg === "farmacia já cadastrado") {
        toast.error(action.payload);
      } else {
        state.createStatus = "success";
        state.farmacias.push(action.payload.farmacia);
        toast.success(action.payload);
      }
    },
    [farmaciaCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [farmaciaDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [farmaciaDelete.fulfilled]: (state, action) => {
      const newList = state.farmacias.filter(
        (farmacia) => farmacia.id !== action.meta.arg
      );
      state.farmacias = newList;
      state.deleteStatus = "success";
      toast.error("farmacia Deletado com Sucesso");
    },
    [farmaciaDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [farmaciaInsert.pending]: (state, action) => {
      state.status = "pending";
    },
    [farmaciaInsert.fulfilled]: (state, action) => {
      if (action.payload.msg === "farmacia já cadastrado") {
        toast.error(action.payload);
      } else {
        state.createStatus = "success";
        state.farmacias.push(action.payload.farmacia);
        toast.success(action.payload);
      }
    },
    [farmaciaInsert.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [farmaciaUpdate.pending]: (state, action) => {
      state.updateStatus = "pending";
    },
    [farmaciaUpdate.fulfilled]: (state, action) => {
      const updateProducts = state.farmacias.map((farmacia) =>
        farmacia.id === action.payload.id ? action.payload : farmacia
      );

      state.farmacias = updateProducts;

      state.updateStatus = "success";
      toast.info("farmacia Atualizada!");
    },
    [farmaciaUpdate.rejected]: (state, action) => {
      state.updateStatus = "rejected";
    }, */
  },
});

export default PacientesSlice.reducer;