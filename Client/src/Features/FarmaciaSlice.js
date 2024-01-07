import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  farmacias: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  updateStatus: null,
};

export const farmaciaFetch = createAsyncThunk(
  "farmacias/farmaciaFetch",
  async () => {
    try {
      const response = await axios.get(
        `${url}/farmacias/getFarmacias`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//axios fazendo a resuisinção da api, ele vai enviar os valores que eu recebo dos input pra api, na api ele vai salvar no banco de dados.
export const farmaciaCreate = createAsyncThunk(
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
);

const FarmaciaSlice = createSlice({
  name: "farmacia",
  initialState,
  reducers: {},
  extraReducers: {
    [farmaciaFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [farmaciaFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.farmacias = action.payload;
    },
    [farmaciaFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [farmaciaCreate.pending]: (state, action) => {
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
    },
  },
});

export default FarmaciaSlice.reducer;