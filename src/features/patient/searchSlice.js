import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL
const baseURL = 'https://hospital-api-f6c5exhyheg3abfd.southeastasia-01.azurewebsites.net/api/patients';

// Async thunk for searching patients
export const searchPatients = createAsyncThunk(
  'patients/search',
  async ({ query }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(baseURL, {
        params: {
          PageIndex: 1,
          PageSize: 10,
          firstName: query,
          lastName: query,
          phone: query,
          email: query,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          'accept': 'text/plain',
        },
      });
      return response.data?.result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const patientsSlice = createSlice({
  name: 'patients',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(searchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default patientsSlice.reducer;
