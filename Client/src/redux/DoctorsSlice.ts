import axios from 'axios';
import { Doctor } from '@/entities/Doctor';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { url } from './api';

const initialState = {
  doctors: [] as Doctor[],
  status: null as string | null,
  createStatus: null as string | null,
  deleteStatus: null as string | null,
  updateStatus: null as string | null,
};

export const createDoctor = createAsyncThunk(
  'doctors/create',
  async (doctor: Doctor, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/doctors`, doctor);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDoctor = createAsyncThunk(
  'doutores/update',
  async (doctor: Doctor, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/doctors/${doctor.Id}`, doctor);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  'doutores/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${url}/doctors/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllDoctors = createAsyncThunk(
  'doutores/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/doctors`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const doutoresSlice = createSlice({
  name: 'doutores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDoctors.fulfilled, (state, action) => {
      //toast.success('Médicos carregados com sucesso!');
      state.doctors = action.payload.data;
      state.status = 'success';
    });
    builder.addCase(getAllDoctors.rejected, (state, action) => {
      toast.error('Erro ao carregar médicos!');
      state.status = 'failed';
    });

    builder.addCase(createDoctor.fulfilled, (state, action) => {
      toast.success('Médico criado com sucesso!');
      state.doctors.push(action.payload.data);
      state.createStatus = 'success';
    });
    builder.addCase(createDoctor.rejected, (state, action) => {
      toast.error(action.payload as string);
      state.createStatus = 'failed';
    });

    builder.addCase(updateDoctor.fulfilled, (state, action) => {
      toast.success('Médico atualizado com sucesso!');
      const index = state.doctors.findIndex((doc) => doc.Id?.toString() === action.payload.id);
      if (index !== -1) {
        state.doctors[index] = action.payload;
      }
      state.updateStatus = 'success';
    });
    builder.addCase(updateDoctor.rejected, (state, action) => {
      toast.error(action.payload as string);
      state.updateStatus = 'failed';
    });

    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      toast.success('Médico excluído com sucesso!');
      state.doctors = state.doctors.filter((doc) => doc.Id?.toString() !== action.payload);
      state.deleteStatus = 'success';
    });
    builder.addCase(deleteDoctor.rejected, (state, action) => {
      toast.error(action.payload as string);
      state.deleteStatus = 'failed';
    });
  },
});

export default doutoresSlice.reducer;
