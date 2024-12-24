import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";
import { SurgeryState } from "../Types/TypesExport";
import { Surgery } from "../Entities/Surgery";
import { StatusState } from "../Utils/Enum";

const initialState: SurgeryState = {
  surgerys: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  updateStatus: null,
};

export const surgeryFetch = createAsyncThunk<Surgery[], void>(
  "surgery/surgeryFetch",
  async () => {
    try {
      const response = await axios.get(
        `${url}/surgery/getsurgerys`,
        setHeaders()
      );
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data);
      throw error;
    }
  }
);

export const surgeryCreate = createAsyncThunk<Surgery, Surgery>(
  "surgery/surgeryCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/surgery`,
        values,
        setHeaders()
      );
      return response?.data;
    } catch (error: any) {
      toast.error(error.response?.data);
      throw error;
    }
  }
);

export const surgeryDelete = createAsyncThunk<string, string>(
  "surgery/surgeryDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/surgery/${id}`,
        setHeaders()
      );
      return id;
    } catch (error: any) {
      toast.error(error.response?.data);
      throw error;
    }
  }
);

export const surgeryUpdate = createAsyncThunk<Surgery, string>(
  "surgery/surgeryUpdate",
  async (id) => {
    try {
      const response = await axios.put(
        `${url}/surgery/update/${id}`,
        setHeaders()
      );
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data);
      throw error;
    }
  }
);

const surgerySlice = createSlice({
  name: "surgery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(surgeryFetch.pending, (state) => {
        state.status = StatusState.PENDENTE;
      })
      .addCase(
        surgeryFetch.fulfilled,
        (state, action: PayloadAction<Surgery[]>) => {
          state.status = StatusState.SUCCESSO;
          state.surgerys = action.payload;
        }
      )
      .addCase(surgeryFetch.rejected, (state) => {
        state.status = StatusState.REJEITADA;
      })

      .addCase(surgeryCreate.pending, (state) => {
        state.createStatus = StatusState.PENDENTE;
      })
      .addCase(
        surgeryCreate.fulfilled,
        (state, action: PayloadAction<Surgery>) => {
          state.createStatus = StatusState.SUCCESSO;
          state.surgerys.push(action.payload);
          toast.success("surgery criada com sucesso!");
        }
      )
      .addCase(surgeryCreate.rejected, (state) => {
        state.createStatus = StatusState.REJEITADA;
      })

      .addCase(surgeryDelete.pending, (state) => {
        state.deleteStatus = StatusState.PENDENTE;
      })
      .addCase(
        surgeryDelete.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.deleteStatus = StatusState.SUCCESSO;
          state.surgerys = state.surgerys.filter(
            (surgery) => surgery.Id.toString() != action.payload
          );
          toast.error("surgery deletada com sucesso");
        }
      )
      .addCase(surgeryDelete.rejected, (state) => {
        state.deleteStatus = StatusState.REJEITADA;
      })

      .addCase(surgeryUpdate.pending, (state) => {
        state.updateStatus = StatusState.PENDENTE;
      })
      .addCase(
        surgeryUpdate.fulfilled,
        (state, action: PayloadAction<Surgery>) => {
          state.updateStatus = StatusState.SUCCESSO;
          const updatedsurgerys = state.surgerys.map((surgery) =>
            surgery.Id === action.payload.Id ? action.payload : surgery
          );
          state.surgerys = updatedsurgerys;
          toast.success("surgery atualizada com sucesso!");
        }
      )
      .addCase(surgeryUpdate.rejected, (state) => {
        state.updateStatus = StatusState.REJEITADA;
      });
  },
});

export default surgerySlice.reducer;
