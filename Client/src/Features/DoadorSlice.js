import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  doadores: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  updateStatus: null,
  bolsaStatus: null,
  bolsasRetirada: null,
  bolsas: [],
  bolsasSaidas: []
};

export const doadorFetch = createAsyncThunk(
  "doadores/doadorFetch",
  async () => {
    try {
      const response = await axios.get(
        `${url}/doadores/getDoadores`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const bolsasFetch = createAsyncThunk(
  "doadores/bolsasFetch",
  async () => {
    try {
      const response = await axios.get(
        `${url}/doadores/getBolsas`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const bolsasSaidasFetch = createAsyncThunk(
  "doadores/bolsasSaidasFetch",
  async () => {
    try {
      const response = await axios.get(
        `${url}/doadores/getBolsasSaidas`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//axios fazendo a resuisinção da api, ele vai enviar os valores que eu recebo dos input pra api, na api ele vai salvar no banco de dados.
export const doadorCreate = createAsyncThunk(
  "doadores/doadorCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/doadores`,
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

//axios fazendo a resuisinção da api, ele vai enviar os valores que eu recebo dos input pra api, na api ele vai salvar no banco de dados.
export const bolsaSaidaCreate = createAsyncThunk(
  "doadores/bolsaSaidaCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/doadores/bolsaSaidaCreate`,
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

export const doadorDelete = createAsyncThunk(
  "doadores/doadorDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/doadores/${id}`,
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
export const doadorUpdate = createAsyncThunk(
  "doadores/doadorUpdate",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/doadores/${values.doadorId}`,
        values,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

//axios fazendo a resuisinção da api, aqui vamos atualizar o product
export const doadorDoacao = createAsyncThunk(
  "doadores/doadorDoacao",
  async (values) => {
    console.log(values)
    try {
      const response = await axios.put(
        `${url}/doadores/doacao`,
        values,
        setHeaders()
      );
      console.log(response);
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

const DoadorSlice = createSlice({
  name: "doador",
  initialState,
  reducers: {},
  extraReducers: {
    [doadorFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [doadorFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.doadores = action.payload;
    },
    [doadorFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [bolsasSaidasFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [bolsasSaidasFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.bolsasSaidas = action.payload;
    },
    [bolsasSaidasFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [bolsasFetch.pending]: (state, action) => {
      state.bolsaStatus = "pending";
    },
    [bolsasFetch.fulfilled]: (state, action) => {
      state.bolsaStatus = "success";
      state.bolsas = action.payload;
    },
    [bolsasFetch.rejected]: (state, action) => {
      state.bolsaStatus = "rejected";
    },
    [doadorCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [doadorCreate.fulfilled]: (state, action) => {
      if (action.payload.msg === "Doador já cadastrado") {
        toast.error(action.payload);
      } else {
        state.createStatus = "success";
        state.doadores.push(action.payload.doador);
        toast.success(action.payload);
      }
    },
    [doadorCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [bolsaSaidaCreate.pending]: (state, action) => {
      state.bolsasRetirada = "pending";
    },
    [bolsaSaidaCreate.fulfilled]: (state, action) => {
        state.bolsasRetirada = "success";
        toast.success("Retirada de bolsa com sucesso");
    },
    [bolsaSaidaCreate.rejected]: (state, action) => {
      state.bolsasRetirada = "rejected";
    },
    [doadorDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [doadorDelete.fulfilled]: (state, action) => {
      const newList = state.doadores.filter(
        (doador) => doador.id !== action.meta.arg
      );
      state.doadores = newList;
      state.deleteStatus = "success";
      toast.error("doador Deletado com Sucesso");
    },
    [doadorDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [doadorUpdate.pending]: (state, action) => {
      state.updateStatus = "pending";
    },
    [doadorUpdate.fulfilled]: (state, action) => {
      const updateProducts = state.doadores.map((doador) =>
        doador.id === action.payload.id ? action.payload : doador
      );

      state.doadores = updateProducts;

      state.updateStatus = "success";
      toast.info("Doador Atualizado!");
    },
    [doadorUpdate.rejected]: (state, action) => {
      state.updateStatus = "rejected";
    },
    [doadorDoacao.pending]: (state, action) => {
      state.updateStatus = "pending";
    },
    [doadorDoacao.fulfilled]: (state, action) => {
      const updateProducts = state.doadores.map((doador) =>
        doador.id === action.payload.id ? action.payload : doador
      );

      console.log(updateProducts);
      state.doadores = updateProducts;
      state.updateStatus = "success";
      toast.info("Doação Realizada!");
    },
    [doadorDoacao.rejected]: (state, action) => {
      state.updateStatus = "rejected";
    },
  },
});

export default DoadorSlice.reducer;