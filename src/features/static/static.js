import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL API và token
const todayURL = 'https://hospital-api-f6c5exhyheg3abfd.southeastasia-01.azurewebsites.net/api/statistics/patients/today';
const totalURL = 'https://hospital-api-f6c5exhyheg3abfd.southeastasia-01.azurewebsites.net/api/statistics/patients/total';

// Tạo async thunk để thực hiện yêu cầu GET cho dữ liệu bệnh nhân hôm nay
export const fetchPatientStatisticsToday = createAsyncThunk(
  'patientStatistics/fetchToday',
  async () => {
    const authToken = localStorage.getItem("authToken")
    const response = await axios.get(todayURL, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        accept: 'text/plain',
      },
    });
    return response.data?.result;
  }
);

// Tạo async thunk để thực hiện yêu cầu GET cho tổng số bệnh nhân
export const fetchPatientTotal = createAsyncThunk(
  'patientStatistics/fetchTotal',
  async (_, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(totalURL, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'text/plain',
        },
      });
      return response.data?.result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Tạo slice cho patient statistics
const patientStatisticsSlice = createSlice({
  name: 'patientStatistics',
  initialState: {
    data: null,
    total: null,
    loading: false,
    error: null,
    loadingTotal: false,
    errorTotal: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý fetchPatientStatisticsToday
      .addCase(fetchPatientStatisticsToday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientStatisticsToday.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPatientStatisticsToday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Xử lý fetchPatientTotal
      .addCase(fetchPatientTotal.pending, (state) => {
        state.loadingTotal = true;
        state.errorTotal = null;
      })
      .addCase(fetchPatientTotal.fulfilled, (state, action) => {
        state.loadingTotal = false;
        state.total = action.payload;
      })
      .addCase(fetchPatientTotal.rejected, (state, action) => {
        state.loadingTotal = false;
        state.errorTotal = action.error.message;
      });
  },
});

export default patientStatisticsSlice.reducer;
