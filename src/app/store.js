import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'src/features/auth/authSlice'
import patientsReducer from 'src/features/patient/patientSlice'
import patientStatisticsReducer from 'src/features/static/static'
import searchReducer from 'src/features/patient/searchSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientsReducer,
    patientStatistics: patientStatisticsReducer,
    searchPatients: searchReducer, 
  },
})