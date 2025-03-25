import axios from 'axios';
import { Patient } from '@/entities/Patients';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { url } from './api';

const initialState = {
  patients: [] as Patient[],
  status: null as string | null,
  createStatus: null as string | null,
  deleteStatus: null as string | null,
  updateStatus: null as string | null,
};

export const createPatient = createAsyncThunk(
  'patients/create',
  async (patient: Patient, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/patients`, patient);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePatient = createAsyncThunk(
  'patients/update',
  async (patient: Patient, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/patients/${patient.Id}`, patient);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePatient = createAsyncThunk(
  'patients/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${url}/patients/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllPatients = createAsyncThunk(
  'patients/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/patients`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPatients.fulfilled, (state, action) => {
      state.patients = action.payload.data;
      state.status = 'success';
    });
    builder.addCase(getAllPatients.rejected, (state) => {
      toast.error('Erro ao carregar pacientes!');
      state.status = 'failed';
    });

    builder.addCase(createPatient.fulfilled, (state, action) => {
      toast.success('Paciente criado com sucesso!');
      state.patients.push(action.payload.data);
      state.createStatus = 'success';
    });
    builder.addCase(createPatient.rejected, (state, action) => {
      toast.error(action.payload as string);
      state.createStatus = 'failed';
    });

    builder.addCase(updatePatient.fulfilled, (state, action) => {
      toast.success('Paciente atualizado com sucesso!');
      const index = state.patients.findIndex((patient) => patient.Id?.toString() === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
      state.updateStatus = 'success';
    });
    builder.addCase(updatePatient.rejected, (state, action) => {
      toast.error(action.payload as string);
      state.updateStatus = 'failed';
    });

    builder.addCase(deletePatient.fulfilled, (state, action) => {
      toast.success('Paciente excluído com sucesso!');
      state.patients = state.patients.filter((patient) => patient.Id?.toString() !== action.payload);
      state.deleteStatus = 'success';
    });
    builder.addCase(deletePatient.rejected, (state, action) => {
      toast.error(action.payload as string);
      state.deleteStatus = 'failed';
    });
  },
});

export default patientsSlice.reducer;
