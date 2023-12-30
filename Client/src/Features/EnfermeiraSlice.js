import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  enfermeiras: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  updateStatus: null,
};

export const enfermeiraFetch = createAsyncThunk(
  "enfermeira/enfermeiraFetch",
  async () => {
    try {
      const res = await axios.get(
        `${url}/enfermeiras/getEnfermeiras`,
        setHeaders()
      );
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const enfermeiraCreate = createAsyncThunk(
  "enfermeira/enfermeiraCreate",
  async (values) => {
    try {
      const res = await axios.post(`${url}/enfermeiras`, values, setHeaders());
      return res?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const EnfermeiraDelete = createAsyncThunk(
  "doutores/EnfermeiraDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/enfermeiras/${id}`,
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
export const EnfermeiraInsert = createAsyncThunk(
  "doutores/EnfermeiraInsert",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/enfermeiras/insert`,
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

export const EnfermeiraUpdate = createAsyncThunk(
  "doutores/EnfermeiraUpdate",
  async (values) => {
    console.log(values);
    try {
      const response = await axios.put(
        `${url}/enfermeiras/${values.EnfermeiraId}`,
        values,
        setHeaders()
      );
      console.log("tetse");
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

const EnfermeiraSlice = createSlice({
  name: "enfermeira",
  initialState,
  reducers: {},
  extraReducers: {
    [enfermeiraFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [enfermeiraFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.enfermeiras = action.payload;
    },
    [enfermeiraFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [enfermeiraCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [enfermeiraCreate.fulfilled]: (state, action) => {
      console.log(action);
      if (action.payload.msg === "enfermeira já cadastrado") {
        toast.error(action.payload);
      } else {
        state.createStatus = "success";
        state.enfermeiras.push(action.payload.enfermeira);
        toast.success(action.payload);
      }
    },
    [enfermeiraCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [EnfermeiraDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [EnfermeiraDelete.fulfilled]: (state, action) => {
      const newList = state.enfermeiras.filter(
        (enfermeira) => enfermeira.id !== action.meta.arg
      );
      state.enfermeiras = newList;
      state.deleteStatus = "success";
      toast.error("Enfermeira Deletado com Sucesso");
    },
    [EnfermeiraDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [EnfermeiraInsert.pending]: (state, action) => {
      state.status = "pending";
    },
    [EnfermeiraInsert.fulfilled]: (state, action) => {
      if (action.payload.msg === "Doutor já cadastrado") {
        toast.error(action.payload);
      } else {
        state.createStatus = "success";
        state.enfermeiras.push(action.payload.enfermeira);
        toast.success(action.payload);
      }
    },
    [EnfermeiraInsert.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [EnfermeiraUpdate.pending]: (state, action) => {
      state.updateStatus = "pending";
    },
    [EnfermeiraUpdate.fulfilled]: (state, action) => {
      const updateProducts = state.enfermeiras.map((enfermeira) =>
        enfermeira.id === action.payload.id ? action.payload : enfermeira
      );

      state.enfermeiras = updateProducts;

      state.updateStatus = "success";
      toast.info("Enfermeira Atualizado!");
    },
    [EnfermeiraUpdate.rejected]: (state, action) => {
      state.updateStatus = "rejected";
    },
  },
});

export default EnfermeiraSlice.reducer;
