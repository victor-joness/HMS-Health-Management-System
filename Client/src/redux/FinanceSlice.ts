import axios from 'axios'
import { FinanceEmployee } from '@/entities/FinanceEmployee'
import { Transaction } from '@/entities/Transaction'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { url } from './api'
import { toast } from 'react-toastify'

interface FinancesState {
  financesEmployee: FinanceEmployee[]
  transactions: Transaction[]
  status: string | null
  createStatus: string | null
  deleteStatus: string | null
  updateStatus: string | null
  createTransactionStatus: string | null
}

const initialState: FinancesState = {
  financesEmployee: [],
  transactions: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  updateStatus: null,
  createTransactionStatus: null,
}

export const getAllFinances = createAsyncThunk(
  'finances/getAllFinances',
  async () => {
    const response = await axios.get(`${url}/financeEmployees`)
    return response.data.data
  }
)

export const createFinance = createAsyncThunk(
  'finances/createFinance',
  async (finance: Partial<FinanceEmployee>) => {
    const response = await axios.post(`${url}/financeEmployees`, finance)
    return response.data.data
  }
)

export const updateFinance = createAsyncThunk(
  'finances/updateFinance',
  async (finance: FinanceEmployee) => {
    const response = await axios.put(`${url}/financeEmployees/${finance.Id}`, finance)
    return response.data.data
  }
)

export const deleteFinance = createAsyncThunk(
  'finances/deleteFinance',
  async (id: number) => {
    await axios.delete(`${url}/financeEmployees/${id}`)
    return id
  }
)

export const createTransaction = createAsyncThunk(
  'finances/createTransaction',
  async (transaction: Partial<Transaction>) => {
    const response = await axios.post(`${url}/transaction`, transaction)
    return response.data.data
  }
)

export const deleteTransaction = createAsyncThunk(
  'finances/deleteTransaction',
  async (id: number) => {
    await axios.delete(`${url}/transaction/${id}`)
    return id
  }
)

export const updateTransaction = createAsyncThunk(
  'finances/updateTransaction',
  async (transaction: Transaction) => {
    const response = await axios.put(`${url}/finance/${transaction.Id}`, transaction)
    return response.data.data
  }
)

const financesSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFinances.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllFinances.fulfilled, (state, action) => {
        state.financesEmployee = action.payload
        state.status = 'success'
      })
      .addCase(getAllFinances.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(createFinance.fulfilled, (state, action) => {
        state.financesEmployee.push(action.payload)
        state.createStatus = 'success'
        toast.success('Financeiro criado com sucesso!');
      })
      .addCase(createFinance.rejected, (state) => {
        state.createStatus = 'failed'
        state.status = 'failed'
        toast.success('Error ao criar financeiro');
      })
      .addCase(updateFinance.fulfilled, (state, action) => {
        const index = state.financesEmployee.findIndex(
          (finance) => finance.Id === action.payload.Id
        )
        if (index !== -1) {
          state.financesEmployee[index] = action.payload
        }
        state.updateStatus = 'success'
      })
      .addCase(deleteFinance.fulfilled, (state, action) => {
        state.financesEmployee = state.financesEmployee.filter(
          (finance) => finance.Id !== action.payload
        )
        state.deleteStatus = 'success'
      })
      .addCase(createTransaction.pending, (state) => {
        state.createTransactionStatus = 'loading'
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload)
        state.createTransactionStatus = 'success'
      })
      .addCase(createTransaction.rejected, (state) => {
        state.createTransactionStatus = 'failed'
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.createTransactionStatus = 'loading'
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction.Id !== action.payload
        )
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.createTransactionStatus = 'failed'
      })
  },
})

export default financesSlice.reducer
