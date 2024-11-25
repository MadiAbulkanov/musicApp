import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '../../api/axiosApiClient';
import { TrackHistory } from '../../interfaces/trackHistory.interface';

interface State {
  tracksHistory: TrackHistory[];
  error: null | string;
  isLoading: boolean;
}

interface TrackHistoryRequestData {
    track: string;
}

const initialState: State = {
  tracksHistory: [],
  error: null,
  isLoading: false,
};

export const fetchTrackHistory = createAsyncThunk('fetch/trackHistory', async (token: string) => {
    const config = {
        headers: {
            Authorization: token
        },
       };
    const { data } = await axiosApiClient.get('/track_history/user', config);
    return data;
});

export const createTrackHistory = createAsyncThunk('create/trackHistory', async ({ payload, token }: { payload: TrackHistoryRequestData; token: string }) => {
   const config = {
    headers: {
        Authorization: token
    },
   };
    const { data } = await axiosApiClient.post(`/track_history`, payload, config);
    return data;
});

const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchTrackHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrackHistory.fulfilled, (state, action) => {
        state.tracksHistory = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchTrackHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchProducts';
      })
      .addCase(createTrackHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrackHistory.fulfilled, (state, action) => {
        state.tracksHistory = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createTrackHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchProducts';
      })
  },
});

export default trackHistorySlice;