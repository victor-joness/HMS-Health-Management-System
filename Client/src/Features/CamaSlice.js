import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  camas: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  updateStatus: null,
};

export const camaFetch = createAsyncThunk(
  "camas/camaFetch",
  async () => {
    try {
      const response = await axios.get(
        `${url}/camas/getCamas`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//axios fazendo a resuisinção da api, ele vai enviar os valores que eu recebo dos input pra api, na api ele vai salvar no banco de dados.
export const camaCreate = createAsyncThunk(
  "camas/camaCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/camas`,
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

export const camaDelete = createAsyncThunk(
  "camas/camaDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/camas/${id}`,
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
export const camaInsert = createAsyncThunk(
  "camas/camaInsert",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/camas/insert`,
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
export const camaUpdate = createAsyncThunk(
  "camas/camaUpdate",
  async (values) => {
    console.log(values);
    try {
      const response = await axios.put(
        `${url}/camas/${values.camaId}`,
        values,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

const CamaSlice = createSlice({
  name: "cama",
  initialState,
  reducers: {},
  extraReducers: {
    [camaFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [camaFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.camas = action.payload;
    },
    [camaFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [camaCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [camaCreate.fulfilled]: (state, action) => {
      if (action.payload.msg === "cama já cadastrado") {
        toast.error(action.payload);
      } else {
        state.createStatus = "success";
        state.camas.push(action.payload.cama);
        toast.success(action.payload);
      }
    },
    [camaCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [camaDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [camaDelete.fulfilled]: (state, action) => {
      const newList = state.camas.filter(
        (cama) => cama.id !== action.meta.arg
      );
      state.camas = newList;
      state.deleteStatus = "success";
      toast.error("cama Deletado com Sucesso");
    },
    [camaDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [camaInsert.pending]: (state, action) => {
      state.status = "pending";
    },
    [camaInsert.fulfilled]: (state, action) => {
      if (action.payload.msg === "cama já cadastrado") {
        toast.error(action.payload);
      } else {
        state.createStatus = "success";
        state.camas.push(action.payload.cama);
        toast.success(action.payload);
      }
    },
    [camaInsert.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [camaUpdate.pending]: (state, action) => {
      state.updateStatus = "pending";
    },
    [camaUpdate.fulfilled]: (state, action) => {
      const updateProducts = state.camas.map((cama) =>
        cama.id === action.payload.id ? action.payload : cama
      );

      state.camas = updateProducts;

      state.updateStatus = "success";
      toast.info("cama Atualizada!");
    },
    [camaUpdate.rejected]: (state, action) => {
      state.updateStatus = "rejected";
    },
  },
});

export default CamaSlice.reducer;