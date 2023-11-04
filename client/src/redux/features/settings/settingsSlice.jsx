import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import settingsService from './settingsService';

const initialState = {
  settings: [],
  isError_S: false,
  isSuccess_S: false,
  isLoading_S: false,
  message_S: '',
};

export const getSettings = createAsyncThunk(
  'settings/getSettings',
  async (_, thunkAPI) => {
    try {
      return await settingsService.getSettings();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (settingsData, thunkAPI) => {
    try {
      return await settingsService.updateSettings(settingsData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    RESET_S(state) {
      state.isError_S = false;
      state.isSuccess_S = false;
      state.isLoading_S = false;
      state.message_S = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // --------------- getSettings ------------------//
      .addCase(getSettings.pending, (state) => {
        state.isLoading_S = true;
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.isLoading_S = false;
        state.isSuccess_S = true;
        state.settings = action.payload;
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.isLoading_S = false;
        state.isError_S = true;
        state.message_S = action.payload;
        toast.error(action.payload);
      })

      // --------------- updateSettings ------------------//
      .addCase(updateSettings.pending, (state) => {
        state.isLoading_S = true;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.isLoading_S = false;
        state.isSuccess_S = true;
        state.settings = action.payload;
        toast.success('Settings Updated');
        console.log('------' + action.meta);
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.isLoading_S = false;
        state.isError_S = true;
        state.message_S = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {
  RESET,
  isStopCreatingAccount,
  creatingAccount,
  getStatsSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
