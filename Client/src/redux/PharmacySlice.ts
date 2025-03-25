import axios from 'axios'
import { Medicines } from '@/entities/Medicines'
import { Pharmacy } from '@/entities/Pharmacy'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { url } from './api'

interface PharmaciesState {
  pharmacies: Pharmacy[]
  medicines: Medicines[]
  status: string | null
  createStatus: string | null
  deleteStatus: string | null
  updateStatus: string | null
  createMedicineStatus: string | null
}

const initialState: PharmaciesState = {
  pharmacies: [],
  medicines: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  updateStatus: null,
  createMedicineStatus: null,
}

export const getAllPharmacies = createAsyncThunk(
  'pharmacies/getAllPharmacies',
  async () => {
    const response = await axios.get(`${url}/pharmacy`)
    return response.data.data
  }
)

export const createPharmacy = createAsyncThunk(
  'pharmacies/createPharmacy',
  async (pharmacy: Partial<Pharmacy>) => {
    const response = await axios.post(`${url}/pharmacy`, pharmacy)
    return response.data.data
  }
)

export const updatePharmacy = createAsyncThunk(
  'pharmacies/updatePharmacy',
  async (pharmacy: Pharmacy) => {
    const response = await axios.put(`${url}/pharmacy/${pharmacy.Id}`, pharmacy)
    return response.data.data
  }
)

export const deletePharmacy = createAsyncThunk(
  'pharmacies/deletePharmacy',
  async (id: number) => {
    await axios.delete(`${url}/pharmacy/${id}`)
    return id
  }
)

// Thunk para criar um novo medicamento
export const createMedicine = createAsyncThunk(
  'pharmacies/createMedicine',
  async (medicine: Partial<Medicines>) => {
    const response = await axios.post(`${url}/medicine`, medicine)
    return response.data.data
  }
)

export const deleteMedicine = createAsyncThunk(
  'pharmacies/deleteMedicine',
  async (id: number) => {
    await axios.delete(`${url}/medicine/${id}`)
    return id
  }
)

export const getMedicinesByPharmacy = createAsyncThunk(
    'pharmacies/getMedicinesByPharmacy',
    async (pharmacyId: string, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/pharmacies/${pharmacyId}/medicines`)
        return response.data
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Erro ao buscar medicamentos')
      }
    }
  )

const pharmaciesSlice = createSlice({
  name: 'pharmacies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPharmacies.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllPharmacies.fulfilled, (state, action) => {
        state.pharmacies = action.payload
        state.status = 'success'
      })
      .addCase(getAllPharmacies.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(createPharmacy.fulfilled, (state, action) => {
        state.pharmacies.push(action.payload)
        state.createStatus = 'success'
      })
      .addCase(updatePharmacy.fulfilled, (state, action) => {
        const index = state.pharmacies.findIndex(
          (pharmacy) => pharmacy.Id === action.payload.Id
        )
        if (index !== -1) {
          state.pharmacies[index] = action.payload
        }
        state.updateStatus = 'success'
      })
      .addCase(deletePharmacy.fulfilled, (state, action) => {
        state.pharmacies = state.pharmacies.filter(
          (pharmacy) => pharmacy.Id !== action.payload
        )
        state.deleteStatus = 'success'
      })
      // Casos para o createMedicine
      .addCase(createMedicine.pending, (state) => {
        state.createMedicineStatus = 'loading'
      })
      .addCase(createMedicine.fulfilled, (state, action) => {
        state.medicines.push(action.payload)
        state.createMedicineStatus = 'success'
      })
      .addCase(createMedicine.rejected, (state) => {
        state.createMedicineStatus = 'failed'
      })
      .addCase(deleteMedicine.pending, (state) => {
        state.createMedicineStatus = 'loading'
      })
      .addCase(deleteMedicine.fulfilled, (state, action) => {
        state.medicines = state.medicines.filter(
          (medicine) => medicine.Id !== action.payload
        )
      })
      .addCase(deleteMedicine.rejected, (state) => {
        state.createMedicineStatus = 'failed'
      })
  },
})

export default pharmaciesSlice.reducer
