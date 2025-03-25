import axios from 'axios';
import { HumanResourcesEmployee } from '@/entities/HumanResourcesEmployee';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { url } from './api';

const initialState = {
  humanResourcesEmployees: [] as HumanResourcesEmployee[],
  status: null as string | null,
  createStatus: null as string | null,
  deleteStatus: null as string | null,
  updateStatus: null as string | null,
};

export const createHumanResourcesEmployee = createAsyncThunk(
  'humanResourcesEmployee/create',
  async (employee: HumanResourcesEmployee, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/humanResourcesEmployees`, employee);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateHumanResourcesEmployee = createAsyncThunk(
  'humanResourcesEmployee/update',
  async (employee: HumanResourcesEmployee, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/humanResourcesEmployees/${employee.Id}`, employee);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteHumanResourcesEmployee = createAsyncThunk(
  'humanResourcesEmployee/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${url}/humanResourcesEmployees/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllHumanResourcesEmployee = createAsyncThunk(
  'humanResourcesEmployee/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/humanResourcesEmployees`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const humanResourcesEmployeeSlice = createSlice({
  name: 'humanResourcesEmployee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllHumanResourcesEmployee.fulfilled, (state, action) => {
      state.humanResourcesEmployees = action.payload.data;
      state.status = 'success';
    });
    builder.addCase(getAllHumanResourcesEmployee.rejected, (state, action) => {
      toast.error('Erro ao carregar funcionários!');
      state.status = 'failed';
    });

    builder.addCase(createHumanResourcesEmployee.fulfilled, (state, action) => {
      toast.success('Funcionário criado com sucesso!');
      state.humanResourcesEmployees.push(action.payload.data);
      state.createStatus = 'success';
    });
    builder.addCase(createHumanResourcesEmployee.rejected, (state, action) => {
      toast.error(action.payload as string);
      state.createStatus = 'failed';
    });

    builder.addCase(updateHumanResourcesEmployee.fulfilled, (state, action) => {
      toast.success('Funcionário atualizado com sucesso!');
      const index = state.humanResourcesEmployees.findIndex((emp) => emp.Id?.toString() === action.payload.id);
      if (index !== -1) {
        state.humanResourcesEmployees[index] = action.payload;
      }
      state.updateStatus = 'success';
    });
    builder.addCase(updateHumanResourcesEmployee.rejected, (state, action) => {
      toast.error(action.payload as string);
      state.updateStatus = 'failed';
    });

    builder.addCase(deleteHumanResourcesEmployee.fulfilled, (state, action) => {
      toast.success('Funcionário excluído com sucesso!');
      state.humanResourcesEmployees = state.humanResourcesEmployees.filter((emp) => emp.Id?.toString() !== action.payload);
      state.deleteStatus = 'success';
    });
    builder.addCase(deleteHumanResourcesEmployee.rejected, (state, action) => {
      toast.error(action.payload as string);
      state.deleteStatus = 'failed';
    });
  },
});

export default humanResourcesEmployeeSlice.reducer;
