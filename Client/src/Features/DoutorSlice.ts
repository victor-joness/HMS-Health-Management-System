import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  doutores: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  updateStatus: null,
};

export const doutorFetch = createAsyncThunk(
  "doutores/doutorFetch",
  async () => {
    try {
      const response = await axios.get(
        `${url}/doutores/getDoutores`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//axios fazendo a resuisinção da api, ele vai enviar os valores que eu recebo dos input pra api, na api ele vai salvar no banco de dados.
export const doutorCreate = createAsyncThunk(
  "doutores/doutorCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/doutores`,
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

export const doutorDelete = createAsyncThunk(
  "doutores/doutorDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/doutores/${id}`,
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
export const doutorInsert = createAsyncThunk(
  "doutores/doutorInsert",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/doutores/insert`,
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
export const doutorUpdate = createAsyncThunk(
  "doutores/doutorUpdate",
  async (values) => {
    console.log(values);
    try {
      const response = await axios.put(
        `${url}/doutores/${values.doutorId}`,
        values,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

const DoutorSlice = createSlice({
  name: "doutor",
  initialState,
  reducers: {},
  extraReducers: {
    [doutorFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [doutorFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.doutores = action.payload;
    },
    [doutorFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [doutorCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [doutorCreate.fulfilled]: (state, action) => {
      if (action.payload.msg === "Doutor já cadastrado") {
        toast.error(action.payload);
      } else {
        state.createStatus = "success";
        state.doutores.push(action.payload.doutor);
        toast.success(action.payload);
      }
    },
    [doutorCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [doutorDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [doutorDelete.fulfilled]: (state, action) => {
      const newList = state.doutores.filter(
        (doutor) => doutor.id !== action.meta.arg
      );
      state.doutores = newList;
      state.deleteStatus = "success";
      toast.error("Doutor Deletado com Sucesso");
    },
    [doutorDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [doutorInsert.pending]: (state, action) => {
      state.status = "pending";
    },
    [doutorInsert.fulfilled]: (state, action) => {
      if (action.payload.msg === "Doutor já cadastrado") {
        toast.error(action.payload);
      } else {
        state.createStatus = "success";
        state.doutores.push(action.payload.doutor);
        toast.success(action.payload);
      }
    },
    [doutorInsert.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [doutorUpdate.pending]: (state, action) => {
      state.updateStatus = "pending";
    },
    [doutorUpdate.fulfilled]: (state, action) => {
      const updateProducts = state.doutores.map((doutor) =>
        doutor.id === action.payload.id ? action.payload : doutor
      );

      state.doutores = updateProducts;

      state.updateStatus = "success";
      toast.info("Doutor Atualizado!");
    },
    [doutorUpdate.rejected]: (state, action) => {
      state.updateStatus = "rejected";
    },
  },
});

export default DoutorSlice.reducer;