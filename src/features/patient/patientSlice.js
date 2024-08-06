import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'https://hospital-api-f6c5exhyheg3abfd.southeastasia-01.azurewebsites.net/api/patients';


export const fetchPatients = createAsyncThunk('patients/fetchPatients', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(baseURL, {
      
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data?.result.data; 
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch patients');
  }
});

export const addPatient = createAsyncThunk(
  'patients/addPatient',
  async (patientData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(baseURL, patientData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add patient');
    }
  }
);

export const updatePatient = createAsyncThunk(
  'patients/updatePatient',
  async ({ id, patientData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(`${baseURL}/${id}`, patientData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update patient');
    }
  }
);

const patientsSlice = createSlice({
  name: 'patients',
  initialState: {
    patients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patients = action.payload;
        state.loading = false;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Thêm mới bệnh nhân
      .addCase(addPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.patients.push(action.payload); 
        state.loading = false;
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default patientsSlice.reducer;
