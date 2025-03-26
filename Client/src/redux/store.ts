import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import doctorsReducer from './DoctorsSlice'
import nursesReducer from './NursesSlice'
import pharmacyReducer from "./PharmacySlice"
import receptionistsReducer from "./ReceptionistsSlice"
import humanResourcesEmployees from "./HumanResourcesEmployeesSlice"
import patientsReducer from "./PatientsSlice"
import financesReducer from "./FinanceSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer,
    nurses: nursesReducer,
    pharmacies: pharmacyReducer,
    receptionists: receptionistsReducer,
    humanResourcesEmployees:humanResourcesEmployees,
    patients: patientsReducer,
    finances: financesReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 