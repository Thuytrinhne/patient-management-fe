import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'https://hospital-api-f6c5exhyheg3abfd.southeastasia-01.azurewebsites.net';

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/api/auth/login`, { email, password });

    const token = response.data?.result?.accessToken;
    if (!token) {
      throw new Error('Token not found in the response');
    }

    localStorage.clear
    localStorage.setItem('authToken', token);

    return token;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Login failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
