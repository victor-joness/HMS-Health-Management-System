import axios from 'axios';
import { Nurse } from '@/entities/Nurse';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { url } from './api';

const initialState = {
  nurses: [] as Nurse[],
  status: null as string | null,
  createStatus: null as string | null,
  deleteStatus: null as string | null,
  updateStatus: null as string | null,
};

export const createNurse = createAsyncThunk(
  'nurses/create',
  async (nurse: Nurse, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/nurses`, nurse);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateNurse = createAsyncThunk(
  'nurses/update',
  async (nurse: Nurse, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/nurses/${nurse.Id}`, nurse);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteNurse = createAsyncThunk(
  'nurses/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${url}/nurses/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllNurses = createAsyncThunk(
  'nurses/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/nurses`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const nursesSlice = createSlice({
  name: 'nurses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNurses.fulfilled, (state, action) => {
      state.nurses = action.payload.data;
      state.status = 'success';
    });
    builder.addCase(getAllNurses.rejected, (state) => {
      toast.error('Erro ao carregar enfermeiros!');
      state.status = 'failed';
    });

    builder.addCase(createNurse.fulfilled, (state, action) => {
      toast.success('Enfermeiro criado com sucesso!');
      state.nurses.push(action.payload.data);
      state.createStatus = 'success';
    });
    builder.addCase(createNurse.rejected, (state, action) => {
      toast.error(action.payload as string);
      state.createStatus = 'failed';
    });

    builder.addCase(updateNurse.fulfilled, (state, action) => {
      toast.success('Enfermeiro atualizado com sucesso!');
      const index = state.nurses.findIndex((nurse) => nurse.Id?.toString() === action.payload.id);
      if (index !== -1) {
        state.nurses[index] = action.payload;
      }
      state.updateStatus = 'success';
    });
    builder.addCase(updateNurse.rejected, (state, action) => {
      toast.error(action.payload as string);
      state.updateStatus = 'failed';
    });

    builder.addCase(deleteNurse.fulfilled, (state, action) => {
      toast.success('Enfermeiro excluído com sucesso!');
      state.nurses = state.nurses.filter((nurse) => nurse.Id?.toString() !== action.payload);
      state.deleteStatus = 'success';
    });
    builder.addCase(deleteNurse.rejected, (state, action) => {
      toast.error(action.payload as string);
      state.deleteStatus = 'failed';
    });
  },
});

export default nursesSlice.reducer;
