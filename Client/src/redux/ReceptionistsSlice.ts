import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Receptionist } from '@/entities/Receptionist'
import axios from 'axios'
import { url } from './api'
import { toast } from 'react-toastify'

interface ReceptionistsState {
  receptionists: Receptionist[]
  status: string | null
  createStatus: string | null
  deleteStatus: string | null
  updateStatus: string | null
}

const initialState: ReceptionistsState = {
  receptionists: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  updateStatus: null,
}

export const getAllReceptionists = createAsyncThunk('receptionists/getAllReceptionists', async () => {
  const response = await axios.get(`${url}/receptionists`)
  return response.data.data
})

export const createReceptionist = createAsyncThunk('receptionists/createReceptionist', async (receptionist: Partial<Receptionist>) => {
  const response = await axios.post(`${url}/receptionists`, receptionist)
  return response.data.data
})

export const updateReceptionist = createAsyncThunk('receptionists/updateReceptionist', async (receptionist: Receptionist) => {
  const response = await axios.put(`${url}/receptionists/${receptionist.Id}`, receptionist)
  return response.data.data
})

export const deleteReceptionist = createAsyncThunk('receptionists/deleteReceptionist', async (id: number) => {
  await axios.delete(`${url}/receptionists/${id}`)
  return id
})

const receptionistsSlice = createSlice({
  name: 'receptionists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReceptionists.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllReceptionists.fulfilled, (state, action) => {
        state.receptionists = action.payload
        state.status = 'success'
      })
      .addCase(getAllReceptionists.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(createReceptionist.fulfilled, (state, action) => {
        state.receptionists.push(action.payload)
        toast.success('Recepcionista criado com sucesso!');
        state.createStatus = 'success'
      })
      .addCase(updateReceptionist.fulfilled, (state, action) => {
        const index = state.receptionists.findIndex(receptionist => receptionist.Id === action.payload.Id)
        if (index !== -1) {
          state.receptionists[index] = action.payload
        }
        state.updateStatus = 'success'
      })
      .addCase(deleteReceptionist.fulfilled, (state, action) => {
        state.receptionists = state.receptionists.filter(receptionist => receptionist.Id !== action.payload)
        state.deleteStatus = 'success'
      })
  },
})

export default receptionistsSlice.reducer
