import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  cirurgias: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  updateStatus: null,
};

export const cirurgiaFetch = createAsyncThunk(
  "cirurgia/cirurgiaFetch",
  async () => {
    try {
      const response = await axios.get(
        `${url}/cirurgia/getCirurgias`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//axios fazendo a resuisinção da api, ele vai enviar os valores que eu recebo dos input pra api, na api ele vai salvar no banco de dados.
export const cirurgiaCreate = createAsyncThunk(
  "cirurgia/cirurgiaCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/cirurgia`,
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

export const cirurgiaDelete = createAsyncThunk(
  "cirurgia/cirurgiaDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/cirurgia/${id}`,
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
export const cirurgiaUpdate = createAsyncThunk(
  "cirurgia/cirurgiaUpdate",
  async (id) => {
    try {
      const response = await axios.put(
        `${url}/cirurgia/update/${id}`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
    }
  }
);

//axios fazendo a resuisinção da api, aqui vamos atualizar o product
/* export const doutorUpdate = createAsyncThunk(
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
); */

const CirurgiaSlice = createSlice({
  name: "cirugia",
  initialState,
  reducers: {},
  extraReducers: {
    [cirurgiaFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [cirurgiaFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.cirurgias = action.payload;
    },
    [cirurgiaFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [cirurgiaCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [cirurgiaCreate.fulfilled]: (state, action) => {
      state.createStatus = "success";
      state.cirurgias.push(action.payload.cirurgia);
      toast.success(action.payload);
    },
    [cirurgiaCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [cirurgiaDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [cirurgiaDelete.fulfilled]: (state, action) => {
      const newList = state.cirurgias.filter(
        (cirurgia) => cirurgia.id !== action.meta.arg
      );
      state.cirurgias = newList;
      state.deleteStatus = "success";
      toast.error("cirurgia Deletada com Sucesso");
    },
    [cirurgiaDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [cirurgiaUpdate.pending]: (state, action) => {
      state.updateStatus = "pending";
    },
    [cirurgiaUpdate.fulfilled]: (state, action) => {
      state.updateStatus = "success";
      toast.success("cirurgia Realizada com Sucesso");
    },
    [cirurgiaUpdate.rejected]: (state, action) => {
      state.updateStatus = "rejected";
    },

    /* [doutorDelete.pending]: (state, action) => {
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
    }, */
  },
});

export default CirurgiaSlice.reducer;
